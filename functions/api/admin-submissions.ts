/// <reference types="@cloudflare/workers-types" />

const MAX_LIMIT = 500;
const DEFAULT_LIMIT = 200;

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const adminToken = env.ADMIN_TOKEN;
  if (!adminToken) {
    return new Response(JSON.stringify({ error: 'ADMIN_TOKEN is not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const authHeader = request.headers.get('Authorization') || '';
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  const headerToken = request.headers.get('x-admin-token') || '';
  const url = new URL(request.url);
  const queryToken = url.searchParams.get('token') || '';
  const token = bearerToken || headerToken || queryToken;

  if (!token || token !== adminToken) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const status = (url.searchParams.get('status') || '').trim();
  const limitRaw = Number.parseInt(url.searchParams.get('limit') || '', 10);
  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(limitRaw, 1), MAX_LIMIT)
    : DEFAULT_LIMIT;

  const db = env.DB as D1Database;
  const baseQuery =
    'SELECT id, title, url, desc, tags, email, status, submission_ip, created_at FROM submissions';
  const whereClause = status ? ' WHERE status = ?' : '';
  const sql = `${baseQuery}${whereClause} ORDER BY created_at DESC LIMIT ?`;

  try {
    const stmt = db.prepare(sql);
    const result = status ? await stmt.bind(status, limit).all() : await stmt.bind(limit).all();

    return new Response(JSON.stringify({ items: result.results ?? [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message ?? 'Query failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
