/// <reference types="@cloudflare/workers-types" />
import { json, requireAdmin } from '../_shared/adminAuth';

export const onRequestGet: PagesFunction = async ({ request, env }) =>
  json({ authenticated: await requireAdmin(request, env) });
