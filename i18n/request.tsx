import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './i18n-config';
import { headers, cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const hdrs = headers()
  const cookieStore = cookies()
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value
  const headerLocale = hdrs.get('x-locale') || undefined
  const primary = headerLocale?.split(';')[0]?.trim()
  const base = primary?.split('-')[0]
  const candidates = [cookieLocale, primary, base].filter(Boolean) as string[]
  const validLocale = candidates.find((c) => locales.includes(c)) || defaultLocale

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default
  }
})