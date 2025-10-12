import { DEFAULT_EXCHANGE_RATES, EXCHANGE_RATE_API, SUPPORTED_CURRENCIES } from '@/config/pricing'

export type RatesMap = Record<string, number>

export async function fetchExchangeRates(base: string = 'USD'): Promise<RatesMap> {
  try {
    const url = `${EXCHANGE_RATE_API}/${encodeURIComponent(base)}`
    const res = await fetch(url, { next: { revalidate: 60 * 60 } })
    if (!res.ok) throw new Error(`Exchange API error: ${res.status}`)
    const json = await res.json()
    const rates: RatesMap = json?.rates || json?.conversion_rates || {}
    // 合并兜底汇率（缺失则补齐）
    for (const cur of SUPPORTED_CURRENCIES) {
      if (!(cur in rates)) {
        rates[cur] = DEFAULT_EXCHANGE_RATES[cur]
      }
    }
    return rates
  } catch (e) {
    // 失败时返回兜底汇率
    const rates: RatesMap = {}
    for (const cur of SUPPORTED_CURRENCIES) {
      rates[cur] = DEFAULT_EXCHANGE_RATES[cur]
    }
    return rates
  }
}

export function ceilConvert(amountUSD: number, targetCurrency: string, rates: RatesMap): number {
  const rate = rates[targetCurrency] ?? DEFAULT_EXCHANGE_RATES[targetCurrency] ?? 1
  return Math.ceil(amountUSD * rate)
}

export function formatCurrencyInt(amountInt: number, currency: string, locale: string): string {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })
    return formatter.format(amountInt)
  } catch {
    // Fallback：简单拼接
    return `${amountInt} ${currency}`
  }
}