/// <reference types="@cloudflare/workers-types" />

export type AdminEnv = {
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
};

const COOKIE_NAME = 'arch_admin_session';
const SESSION_LIFETIME_SECONDS = 60 * 60 * 12;

const encoder = new TextEncoder();

const toHex = (bytes: ArrayBuffer) =>
  Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('');

const safeEqual = (left: string, right: string) => {
  if (left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return result === 0;
};

const sign = async (value: string, secret: string) => {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
};

const parseCookies = (request: Request) =>
  Object.fromEntries(
    (request.headers.get('Cookie') || '')
      .split(';')
      .map((part) => part.trim().split('='))
      .filter(([key, value]) => Boolean(key && value))
      .map(([key, ...value]) => [key, decodeURIComponent(value.join('='))]),
  );

export const json = (body: unknown, status = 200, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });

export const requireAdmin = async (request: Request, env: AdminEnv) => {
  if (!env.ADMIN_SESSION_SECRET) return false;
  const session = parseCookies(request)[COOKIE_NAME];
  if (!session) return false;
  const [expires, signature] = session.split('.');
  if (!expires || !signature || Number(expires) <= Math.floor(Date.now() / 1000)) return false;
  const expected = await sign(expires, env.ADMIN_SESSION_SECRET);
  return safeEqual(signature, expected);
};

export const createAdminCookie = async (request: Request, secret: string) => {
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_LIFETIME_SECONDS);
  const signature = await sign(expires, secret);
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${COOKIE_NAME}=${expires}.${signature}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_LIFETIME_SECONDS}${secure}`;
};

export const clearAdminCookie = (request: Request) => {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
};

export const passwordMatches = (candidate: string, configured: string) =>
  safeEqual(candidate, configured);

export const isSameOrigin = (request: Request) => {
  const origin = request.headers.get('Origin');
  return !origin || origin === new URL(request.url).origin;
};
