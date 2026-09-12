# Private mail center setup

The private page is `/owner/mail/`. It is absent from public navigation and sends `noindex` directives. Security is enforced by every admin API with an HttpOnly, signed, 12-hour session cookie.

## Cloudflare Pages variables

In **Workers & Pages → your project → Settings → Variables and Secrets**, add these encrypted secrets for Production (and Preview if needed):

- `ADMIN_PASSWORD`: a unique, long owner password.
- `ADMIN_SESSION_SECRET`: at least 32 random bytes. Generate one with `openssl rand -hex 32`.
- `PLUNK_API_KEY`: the Plunk secret key beginning with `sk_` from Project Settings → API Keys. Do not use the public `pk_` key.
- `MAIL_FROM`: `service@archaitool.com`.
- `MAIL_FROM_NAME`: optional, for example `Arch AI Tool`.

Keep the existing `DB` D1 binding. The mail table and indexes are created automatically on the first request.

## Domain email

Verify `archaitool.com` in Plunk and add the DNS records it supplies. Sending happens only inside the Pages Function, so the secret key never reaches the browser. This implementation receives messages submitted through the site's Contact form; it does not import an existing IMAP mailbox.

For another identity layer, create a Cloudflare Access self-hosted application for `/owner/*` and allow only your email address. Keep the built-in password enabled as a second layer.

## Smoke test

1. Submit a message at `/contact/`.
2. Visit `/owner/mail/` and log in.
3. Open the new conversation and reply.
4. Confirm the recipient receives it from `service@archaitool.com` and the conversation shows the outgoing copy.
