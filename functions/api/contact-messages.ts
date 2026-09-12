/// <reference types="@cloudflare/workers-types" />
import { json } from '../_shared/adminAuth';
import { cleanText, ensureMailSchema, MailEnv } from '../_shared/mailDb';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const onRequestPost: PagesFunction<MailEnv> = async ({ request, env }) => {
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  // Honeypot: bots tend to fill visually hidden fields.
  if (cleanText(body.website, 200)) return json({ ok: true });
  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 254).toLowerCase();
  const inquiryType = cleanText(body.type, 60) || 'general';
  const subject = cleanText(body.subject, 240);
  const message = cleanText(body.message, 10000);
  if (!name || !emailPattern.test(email) || !subject || message.length < 10) {
    return json({ error: 'Please complete all required fields.' }, 400);
  }
  await ensureMailSchema(env.DB);
  const id = crypto.randomUUID();
  await env.DB.prepare(`
    INSERT INTO contact_messages (id, thread_id, direction, name, email, inquiry_type, subject, body, status)
    VALUES (?, ?, 'inbound', ?, ?, ?, ?, ?, 'unread')
  `).bind(id, id, name, email, inquiryType, subject, message).run();
  return json({ ok: true }, 201);
};
