export const BASE_PRICES_USD = {
  starter: 19.9,
  basic: 49.9,
  pro: 99.9,
  enterprise: 199.9,
} as const

// 将各语言(locale)映射到目标货币
export const LOCALE_CURRENCY: Record<string, { currency: string }> = {
  en: { currency: 'USD' },
  zh: { currency: 'CNY' },
  'zh-TW': { currency: 'TWD' },
  ja: { currency: 'JPY' },
  fr: { currency: 'EUR' },
  it: { currency: 'EUR' },
  ko: { currency: 'KRW' },
}

// 支持的汇率列表（用于一次性拉取）
export const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'KRW', 'TWD', 'JPY', 'CNY'] as const

// 实时汇率 API（免费来源：exchangerate.host）
export const EXCHANGE_RATE_API = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API || 'https://open.er-api.com/v6/latest'

// 兜底汇率（当实时拉取失败时使用）
export const DEFAULT_EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  KRW: 1370,
  TWD: 32.5,
  JPY: 150,
  CNY: 7.2,
}

// 固定整数价格（按 USD 基础价 * 默认汇率，向上取整），用于静态展示
export const FIXED_PRICES_INT: Record<string, { starter: number; basic: number; pro: number; enterprise: number }> = {
  USD: { starter: 20, basic: 50, pro: 100, enterprise: 200 },
  EUR: { starter: 19, basic: 46, pro: 92, enterprise: 184 },
  KRW: { starter: 27263, basic: 68363, pro: 136863, enterprise: 273863 },
  TWD: { starter: 647, basic: 1622, pro: 3247, enterprise: 6497 },
  JPY: { starter: 2985, basic: 7485, pro: 14985, enterprise: 29985 },
  CNY: { starter: 144, basic: 360, pro: 720, enterprise: 1440 },
}