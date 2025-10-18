"use client"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"

export function Footer() {
  const t = useTranslations('Footer')
  const locale = useLocale()
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href={`/`} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('brand')}
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">{t('brandDescription')}</p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">{t('product.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-gray-600 hover:text-purple-600 text-sm">
                  {t('product.features')}
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-600 hover:text-purple-600 text-sm">
                  {t('product.pricing')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  {t('product.api')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  {t('product.docs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">{t('company.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  {t('company.about')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  {t('company.blog')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  {t('company.careers')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-purple-600 text-sm">
                  {t('company.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">{t('legal.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-purple-600 text-sm">
                  {t('legal.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-purple-600 text-sm">
                  {t('legal.terms')}
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-gray-600 hover:text-purple-600 text-sm">
                  {t('legal.cookies')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">{t('copyright')}</p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                {t('social.twitter')}
              </Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                {t('social.discord')}
              </Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                {t('social.github')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
