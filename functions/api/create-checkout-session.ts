/// <reference types="@cloudflare/workers-types" />
import Stripe from 'stripe';

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const priceId = (payload.priceId || '').trim();
  const submissionId = (payload.submissionId || '').trim();
  const email = (payload.email || '').trim();

  if (!priceId || !submissionId) {
    return new Response(JSON.stringify({ error: 'priceId and submissionId are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
    httpClient: Stripe.createFetchHttpClient(),
  });
  const cryptoProvider = Stripe.createSubtleCryptoProvider();

  const session = await stripe.checkout.sessions.create(
    {
      mode: 'payment',
      customer_email: email || undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { submissionId },
      success_url: `${env.PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.PUBLIC_SITE_URL}/pricing`,
    },
    { cryptoProvider }
  );

  return new Response(JSON.stringify({ url: session.url }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
