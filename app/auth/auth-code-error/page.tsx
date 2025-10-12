"use client"
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function AuthCodeErrorPage() {
  const t = useTranslations('AuthError')

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl text-center">
        <h1 className="text-3xl font-bold mb-4">
          {t('title', { default: 'Authentication Failed' })}
        </h1>
        <p className="text-muted-foreground mb-6">
          {t('description', { default: "We couldn't complete the sign-in. Please try again or use another provider." })}
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button variant="default">{t('backHome', { default: 'Back to Home' })}</Button>
          </Link>
          <Link href="#" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
            <Button variant="outline">{t('goBack', { default: 'Go Back' })}</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}