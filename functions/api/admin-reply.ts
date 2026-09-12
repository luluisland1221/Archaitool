/// <reference types="@cloudflare/workers-types" />
import { isSameOrigin, json, requireAdmin } from '../_shared/adminAuth';
import { cleanText, ensureMailSchema, MailEnv } from '../_shared/mailDb';

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
}[char] || char));

export const onRequestPost: PagesFunction<MailEnv> = async ({ request, env }) => {
  if (!isSameOrigin(request) || !(await requireAdmin(request, env))) return json({ error: 'Unauthorized' }, 401);
  if (!env.PLUNK_API_KEY?.startsWith('sk_') || !env.MAIL_FROM) {
    return json({ error: 'Plunk secret key or sender is not configured' }, 503);
  }
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const threadId = cleanText(body.threadId, 64);
  const to = cleanText(body.to, 254).toLowerCase();
  const subject = cleanText(body.subject, 240);
  const message = cleanText(body.message, 10000);
  if (!threadId || !to || !subject || !message) return json({ error: 'Reply is incomplete' }, 400);

  const fromName = cleanText(env.MAIL_FROM_NAME || 'Arch AI Tool', 120);
  const id = crypto.randomUUID();
  const response = await fetch('https://next-api.useplunk.com/v1/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.PLUNK_API_KEY}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': id,
    },
    body: JSON.stringify({
      from: { name: fromName, email: env.MAIL_FROM },
      to,
      subject,
      body: `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#17202a;white-space:pre-wrap">${escapeHtml(message)}</div>`,
      reply: env.MAIL_FROM,
    }),
  });
  const result = await response.json().catch(() => ({})) as {
    success?: boolean;
    data?: { emails?: Array<{ email?: string }> };
    error?: { message?: string };
  };
  if (!response.ok || !result.success) {
    return json({ error: result.error?.message || 'Email provider rejected the message' }, 502);
  }

  await ensureMailSchema(env.DB);
  const providerId = result.data?.emails?.[0]?.email || null;
  await env.DB.prepare(`
    INSERT INTO contact_messages (id, thread_id, direction, name, email, subject, body, status, provider_id)
    VALUES (?, ?, 'outbound', ?, ?, ?, ?, 'sent', ?)
  `).bind(id, threadId, fromName, to, subject, message, providerId).run();
  await env.DB.prepare("UPDATE contact_messages SET status = 'replied' WHERE id = ?")
    .bind(threadId).run();
  return json({ ok: true, id });
};
