"use client"
import { Button } from "@/components/ui/button"
import { Check, Loader2 } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { LOCALE_CURRENCY, FIXED_PRICES_INT } from "@/config/pricing"
import { formatCurrencyInt } from "@/lib/exchange"
import { createClient } from "@/lib/supabase/client"
import { LoginModal } from "@/components/login-modal"

export function PricingSection() {
  const t = useTranslations('PricingSection')
  const locale = useLocale()
  // 不再使用实时汇率，价格展示为写死的整数
  const router = useRouter()
  const [loginOpen, setLoginOpen] = useState(false)
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  // 移除实时汇率拉取

  // 当从 Creem 页面返回（含 bfcache 恢复）时，重置按钮加载状态
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      // e.persisted 表示从缓存恢复
      if ((e as any)?.persisted) {
        setLoadingPlan(null)
      }
    }
    window.addEventListener('pageshow', onPageShow as any)
    return () => window.removeEventListener('pageshow', onPageShow as any)
  }, [])

  const currency = LOCALE_CURRENCY[locale]?.currency ?? 'USD'

  const computedPrices = useMemo(() => {
    const fixed = FIXED_PRICES_INT[currency] || FIXED_PRICES_INT['USD']
    return {
      starter: formatCurrencyInt(fixed.starter, currency, locale),
      basic: formatCurrencyInt(fixed.basic, currency, locale),
      pro: formatCurrencyInt(fixed.pro, currency, locale),
      enterprise: formatCurrencyInt(fixed.enterprise, currency, locale),
    }
  }, [currency, locale])

  const plans = [
    {
      name: t('plans.starter.name'),
      price: computedPrices.starter,
      description: t('plans.starter.description'),
      credits: t('plans.starter.credits'),
      videos: t('plans.starter.videos'),
      popular: false,
      planKey: 'starter',
    },
    {
      name: t('plans.basic.name'),
      price: computedPrices.basic,
      description: t('plans.basic.description'),
      credits: t('plans.basic.credits'),
      videos: t('plans.basic.videos'),
      popular: true,
      planKey: 'basic',
    },
    {
      name: t('plans.pro.name'),
      price: computedPrices.pro,
      description: t('plans.pro.description'),
      credits: t('plans.pro.credits'),
      videos: t('plans.pro.videos'),
      popular: false,
      planKey: 'pro',
    },
    {
      name: t('plans.enterprise.name'),
      price: computedPrices.enterprise,
      description: t('plans.enterprise.description'),
      credits: t('plans.enterprise.credits'),
      videos: t('plans.enterprise.videos'),
      popular: false,
      planKey: 'enterprise',
    },
  ]

  const handleCheckout = async (planKey: string) => {
    try {
      // 未登录先要求登录
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()
      if (!data?.user) {
        setLoginOpen(true)
        return
      }

      setLoadingPlan(planKey)
      const res = await fetch('/api/creem/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 后端目前示例按固定 priceId；这里传 plan 以便后续映射
        body: JSON.stringify({ plan: planKey, currency: currency === 'EUR' ? 'EUR' : 'USD' })
      })
      if (!res.ok) {
        throw new Error('Failed to create checkout session')
      }
      const json = await res.json()
      const url = json?.url
      if (!url) throw new Error('Missing checkout url')
      // 跳转到 Creem 支付页面
      window.location.href = url
    } catch (e) {
      // 简单兜底：回到首页或提示
      router.push('/?checkout=error')
    } finally {
      // 防止返回后按钮仍保持禁用
      setLoadingPlan(null)
    }
  }

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              tabIndex={0}
              onMouseEnter={() => setHoveredPlan((plan as any).planKey)}
              onMouseLeave={() => setHoveredPlan((prev) => (prev === (plan as any).planKey ? null : prev))}
              onFocus={() => setHoveredPlan((plan as any).planKey)}
              onBlur={() => setHoveredPlan((prev) => (prev === (plan as any).planKey ? null : prev))}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                hoveredPlan === (plan as any).planKey
                  ? "border-purple-500 bg-gradient-to-b from-purple-50 to-white shadow-lg shadow-purple-500/20 ring-2 ring-purple-300 transform scale-[1.02]"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {/* 悬停样式以第二栏为准，不显示热门徽标以避免误导 */}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600"> {t('perMonth')}</span>
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{t('includes')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{plan.credits}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{plan.videos}</span>
                </div>
              </div>

              <Button
                className={`w-full ${
                  hoveredPlan === (plan as any).planKey
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    : "bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200"
                }`}
                onClick={() => handleCheckout((plan as any).planKey)}
                disabled={!!loadingPlan}
              >
                {loadingPlan === (plan as any).planKey ? (
                  <span className="inline-flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                    {t('cta')}
                  </span>
                ) : (
                  t('cta')
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* 登录弹窗 */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  )
}
