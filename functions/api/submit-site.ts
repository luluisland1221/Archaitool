/// <reference types="@cloudflare/workers-types" />

const DEFAULT_ALLOWED_ORIGINS = ['https://archaitool.com', 'https://www.archaitool.com'];

const getAllowedOrigins = (env: Record<string, unknown>) => {
  const raw = typeof env.ALLOWED_ORIGINS === 'string' ? env.ALLOWED_ORIGINS : '';
  const parsed = raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  return parsed.length ? parsed : DEFAULT_ALLOWED_ORIGINS;
};

const buildCorsHeaders = (request: Request, env: Record<string, unknown>) => {
  const origin = request.headers.get('Origin');
  if (!origin) {
    return {};
  }
  const allowedOrigins = getAllowedOrigins(env);
  if (!allowedOrigins.includes(origin)) {
    return null;
  }
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
};

const withCors = (response: Response, corsHeaders: Record<string, string> | null) => {
  if (!corsHeaders) {
    return response;
  }
  const headers = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value));
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
};

type SubmissionPayload = {
  id: string;
  title: string;
  url: string;
  desc: string;
  tags: string;
  email: string;
  submissionIp: string | null;
  createdAt: string;
};

const getStringEnv = (env: Record<string, unknown>, key: string) =>
  typeof env[key] === 'string' ? String(env[key]).trim() : '';

const sendNotificationEmail = async (env: Record<string, unknown>, submission: SubmissionPayload) => {
  const apiKey = getStringEnv(env, 'RESEND_API_KEY');
  const toRaw = getStringEnv(env, 'NOTIFY_EMAIL_TO');
  const from = getStringEnv(env, 'NOTIFY_EMAIL_FROM');

  if (!apiKey || !toRaw || !from) {
    return;
  }

  const to = toRaw.includes(',')
    ? toRaw
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
    : toRaw;

  const subject = `New tool submission: ${submission.title}`;
  const text = [
    `Title: ${submission.title}`,
    `URL: ${submission.url}`,
    `Description: ${submission.desc}`,
    `Tags: ${submission.tags || '-'}`,
    `Email: ${submission.email || '-'}`,
    `IP: ${submission.submissionIp || '-'}`,
    `Created: ${submission.createdAt}`,
    `ID: ${submission.id}`,
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'archaitool/1.0',
      'Idempotency-Key': submission.id,
    },
    body: JSON.stringify({ from, to, subject, text }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Email send failed: ${res.status} ${res.statusText} ${errText}`.trim());
  }
};

export const onRequest: PagesFunction = async ({ request, env }) => {
  const corsHeaders = buildCorsHeaders(request, env as Record<string, unknown>);
  if (corsHeaders === null) {
    return new Response('Forbidden', { status: 403 });
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return withCors(new Response('Method Not Allowed', { status: 405 }), corsHeaders);
  }

  // Some clients (or curl on Windows) may send bodies that parse5 rejects via request.json().
  // Read raw text first, then JSON.parse manually for better compatibility.
  const raw = await request.text();
  let body: any;
  try {
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return withCors(
      new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }),
      corsHeaders
    );
  }

  const title = (body.title || '').trim();
  const url = (body.url || '').trim();
  const desc = (body.desc || '').trim();
  const tags = (body.tags || '').trim();
  const email = (body.email || '').trim();

  if (!title || !url || !desc) {
    return withCors(
      new Response(JSON.stringify({ error: 'title, url, desc are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }),
      corsHeaders
    );
  }

  const submissionIp = request.headers.get('CF-Connecting-IP') ?? null;
  const id = crypto.randomUUID();
  const db = env.DB as D1Database;
  const createdAt = new Date().toISOString();

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
    return withCors(
      new Response(JSON.stringify({ error: error.message ?? 'DB insert failed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }),
      corsHeaders
    );
  }

  try {
    await sendNotificationEmail(env as Record<string, unknown>, {
      id,
      title,
      url,
      desc,
      tags,
      email,
      submissionIp,
      createdAt,
    });
  } catch (error) {
    console.error('Email notification failed:', error);
  }

  return withCors(
    new Response(JSON.stringify({ id, message: 'ok' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }),
    corsHeaders
  );
};
