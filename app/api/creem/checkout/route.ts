import { NextResponse } from 'next/server'

type CheckoutBody = {
  plan?: 'starter' | 'basic' | 'pro' | 'enterprise' | string
  product_id?: string
  currency?: 'USD' | 'EUR' | string
  success_url?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as CheckoutBody

    const apiKey = process.env.CREEM_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing CREEM_API_KEY' }, { status: 500 })
    }

    // USD 产品映射（必填）
    const productMapUSD: Record<string, string | undefined> = {
      starter: process.env.CREEM_PRODUCT_STARTER_ID,
      basic: process.env.CREEM_PRODUCT_BASIC_ID,
      pro: process.env.CREEM_PRODUCT_PRO_ID,
      enterprise: process.env.CREEM_PRODUCT_ENTERPRISE_ID,
    }

    // EUR 产品映射（可选，若缺失则回退至 USD）
    const productMapEUR: Record<string, string | undefined> = {
      starter: process.env.CREEM_PRODUCT_STARTER_ID_EUR,
      basic: process.env.CREEM_PRODUCT_BASIC_ID_EUR,
      pro: process.env.CREEM_PRODUCT_PRO_ID_EUR,
      enterprise: process.env.CREEM_PRODUCT_ENTERPRISE_ID_EUR,
    }

    const preferredCurrency = String(body?.currency || '').toUpperCase()

    const product_id =
      body?.product_id ||
      (body?.plan &&
        ((preferredCurrency === 'EUR' ? productMapEUR[body.plan] : undefined) ||
          productMapUSD[body.plan])) ||
      process.env.CREEM_DEFAULT_PRODUCT_ID
    if (!product_id) {
      return NextResponse.json({ error: 'Missing Creem configuration (product id).' }, { status: 500 })
    }

    const rawSuccessUrl = body?.success_url || process.env.CREEM_SUCCESS_URL
    const disableSuccessUrl = String(process.env.CREEM_DISABLE_SUCCESS_URL || '').toLowerCase() === 'true'
    const env = process.env.NODE_ENV
    const defaultCreemBase = env === 'production' ? 'https://api.creem.io' : 'https://test-api.creem.io'
    const creemBase = process.env.CREEM_API_BASE || defaultCreemBase

    const endpoint = `${creemBase.replace(/\/$/, '')}/v1/checkouts`
    const payload: Record<string, unknown> = { product_id }
    if (!disableSuccessUrl && rawSuccessUrl) payload.success_url = rawSuccessUrl

    const creemRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!creemRes.ok) {
      const detailsText = await creemRes.text().catch(() => '')
      const debug = {
        endpoint,
        payload,
        status: creemRes.status,
      }
      return NextResponse.json({ error: 'Creem checkout creation failed', details: detailsText, debug }, { status: 502 })
    }

    const json = await creemRes.json().catch(() => ({}))
    const url: string | undefined = json?.checkout_url || json?.url
    if (!url) {
      return NextResponse.json({ error: 'No checkout_url returned by Creem' }, { status: 502 })
    }

    return NextResponse.json({ url })
  } catch (err) {
    return NextResponse.json({ error: 'Unexpected error', message: (err as Error)?.message }, { status: 500 })
  }
}