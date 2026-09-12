/// <reference types="@cloudflare/workers-types" />
import { createAdminCookie, isSameOrigin, json, passwordMatches } from '../_shared/adminAuth';

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  if (!isSameOrigin(request)) return json({ error: 'Invalid origin' }, 403);
  const { ADMIN_PASSWORD, ADMIN_SESSION_SECRET } = env as Record<string, string>;
  if (!ADMIN_PASSWORD || !ADMIN_SESSION_SECRET) return json({ error: 'Admin access is not configured' }, 503);
  const body = await request.json().catch(() => ({})) as { password?: string };
  if (!body.password || !passwordMatches(body.password, ADMIN_PASSWORD)) return json({ error: 'Incorrect password' }, 401);
  return json({ ok: true }, 200, { 'Set-Cookie': await createAdminCookie(request, ADMIN_SESSION_SECRET) });
};
