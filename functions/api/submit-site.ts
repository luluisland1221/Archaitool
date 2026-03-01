/// <reference types="@cloudflare/workers-types" />

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Some clients (or curl on Windows) may send bodies that parse5 rejects via request.json().
  // Read raw text first, then JSON.parse manually for better compatibility.
  const raw = await request.text();
  let body: any;
  try {
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const title = (body.title || '').trim();
  const url = (body.url || '').trim();
  const desc = (body.desc || '').trim();
  const tags = (body.tags || '').trim();
  const email = (body.email || '').trim();

  if (!title || !url || !desc) {
    return new Response(JSON.stringify({ error: 'title, url, desc are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const submissionIp = request.headers.get('CF-Connecting-IP') ?? null;
  const id = crypto.randomUUID();
  const db = env.DB as D1Database;

  try {
    await db
      .prepare(
        `INSERT INTO submissions
        (id, title, url, desc, tags, email, status, submission_ip, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, datetime('now'))`
      )
      .bind(id, title, url, desc, tags, email, submissionIp)
      .run();
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message ?? 'DB insert failed' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ id, message: 'ok' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
