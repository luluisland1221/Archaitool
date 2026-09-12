/// <reference types="@cloudflare/workers-types" />
import { clearAdminCookie, isSameOrigin, json } from '../_shared/adminAuth';

export const onRequestPost: PagesFunction = async ({ request }) => {
  if (!isSameOrigin(request)) return json({ error: 'Invalid origin' }, 403);
  return json({ ok: true }, 200, { 'Set-Cookie': clearAdminCookie(request) });
};
