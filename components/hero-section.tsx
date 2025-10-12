"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { useEffect, useState } from "react"

export function HeroSection() {
  const locale = useLocale()
  const [key, setKey] = useState(0)
  
  // 强制组件在locale变化时重新渲染
  useEffect(() => {
    setKey(prev => prev + 1)
  }, [locale])
  
  const t = useTranslations('HeroSection')

  return (
    <section key={`hero-${locale}-${key}`} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/blurred-computer-screen-with-code-and-keyboard-cyb.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          {t('title')}
          <br />
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            {t('brandName')}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          {t('description')}
        </p>

        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6 rounded-full"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {t('ctaButton')}
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  )
}
