import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale } from './i18n/i18n-config';

export async function middleware(request: NextRequest) {
  // 方案B：不加语言前缀；语言来源仅使用 Cookie（无则默认英文）
  const nextLocaleCookie = request.cookies.get('NEXT_LOCALE')?.value
  const detected = locales.includes(nextLocaleCookie || '')
    ? (nextLocaleCookie as string)
    : defaultLocale

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 设置当前语言到响应头；若没有 Cookie 则写入默认语言（英文）
  response.headers.set('x-locale', detected);
  if (!nextLocaleCookie) {
    response.cookies.set({ name: 'NEXT_LOCALE', value: detected, path: '/', maxAge: 60 * 60 * 24 * 365 })
  }

  // Guard against missing Supabase envs on Edge (Vercel). If not set, skip Supabase and avoid 500.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
          cookies: {
            get(name: string) {
              return request.cookies.get(name)?.value
            },
            set(name: string, value: string, options: CookieOptions) {
              response.cookies.set({ name, value, ...options })
            },
            remove(name: string, options: CookieOptions) {
              response.cookies.set({ name, value: '', ...options })
            },
          },
        }
      )
      await supabase.auth.getSession()
    } catch (err) {
      // swallow errors from Supabase init to prevent middleware crash on edge
    }
  }

  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};