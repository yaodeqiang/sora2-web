import { NextRequest } from 'next/server'
import Stripe from 'stripe'

const stripeSecret = process.env.STRIPE_SECRET_KEY
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function POST(req: NextRequest) {
  if (!stripeSecret) {
    return new Response(
      JSON.stringify({ error: 'Missing STRIPE_SECRET_KEY in env' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }

  const stripe = new Stripe(stripeSecret, {
    apiVersion: '2024-06-20',
  })

  try {
    const body = await req.json().catch(() => ({}))
    // 假设前端传 priceId；若未传，使用占位符，需替换为你的真实 Stripe price ID
    const priceId = body.priceId || 'price_XXXXXXXXXXXXXX'
    const quantity = typeof body.quantity === 'number' ? body.quantity : 1

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity,
        },
      ],
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
      // 可按需开启本地支付方式：
      // payment_method_types: ['card', 'alipay', 'wechat_pay'],
    })

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || 'Unknown error' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }
}