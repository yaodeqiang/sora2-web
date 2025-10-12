import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const secret = process.env.CREEM_WEBHOOK_SECRET
    if (!secret) {
      return NextResponse.json({ error: 'Missing CREEM_WEBHOOK_SECRET' }, { status: 500 })
    }

    const sig =
      request.headers.get('x-creem-signature') ||
      request.headers.get('creem-signature') ||
      request.headers.get('X-Creem-Signature')

    if (!sig) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    // 注意：此处为占位逻辑，实际应验证签名并解析事件
    const payload = await request.text()

    // TODO: 验证签名并处理事件类型（checkout.completed等）
    return NextResponse.json({ received: true })
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error', message: (e as Error)?.message }, { status: 500 })
  }
}