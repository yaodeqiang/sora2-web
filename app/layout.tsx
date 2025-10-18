import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import {NextIntlClientProvider} from 'next-intl';
export const dynamic = 'force-dynamic'
import { locales, defaultLocale } from '../i18n/i18n-config'
import { headers, cookies } from 'next/headers'

export const metadata: Metadata = {
  title: "Video Generator",
  description:
 "Create stunning videos with Sora2 — an independent, third-party tool inspired by OpenAI technology. Generate cinema-quality videos from text and images.",
  generator: "",
  icons: {
    icon: "/futuristic-city-neon.png"
  },
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const hdrs = await headers()
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value
  const headerLocale = hdrs.get('x-locale') || undefined
  const primary = headerLocale?.split(';')[0]?.trim()
  const base = primary?.split('-')[0]
  const candidates = [cookieLocale, primary, base].filter(Boolean) as string[]
  const validLocale = candidates.find((c) => locales.includes(c)) || defaultLocale
  const messages = (await import(`../messages/${validLocale}.json`)).default

  return (
    <html lang={validLocale} className="scroll-smooth">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={validLocale} messages={messages}>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
            <Analytics />
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}