/// <reference types="@cloudflare/workers-types" />
import { isSameOrigin, json, requireAdmin } from '../_shared/adminAuth';
import { cleanText, ensureMailSchema, MailEnv } from '../_shared/mailDb';

export const onRequestGet: PagesFunction<MailEnv> = async ({ request, env }) => {
  if (!(await requireAdmin(request, env))) return json({ error: 'Unauthorized' }, 401);
  await ensureMailSchema(env.DB);
  const result = await env.DB.prepare(`
    SELECT id, thread_id, direction, name, email, inquiry_type, subject, body, status, created_at
    FROM contact_messages ORDER BY created_at DESC LIMIT 500
  `).all();
  return json({ items: result.results ?? [] });
};
export const onRequestPatch: PagesFunction<MailEnv> = async ({ request, env }) => {
  if (!isSameOrigin(request) || !(await requireAdmin(request, env))) return json({ error: 'Unauthorized' }, 401);
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const id = cleanText(body.id, 64);
  const status = cleanText(body.status, 20);
  if (!id || !['unread', 'read', 'replied', 'archived'].includes(status)) return json({ error: 'Invalid update' }, 400);
  await ensureMailSchema(env.DB);
  await env.DB.prepare('UPDATE contact_messages SET status = ? WHERE id = ?').bind(status, id).run();
  return json({ ok: true });
};
