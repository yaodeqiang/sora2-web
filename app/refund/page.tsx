import { useTranslations } from "next-intl"

export default function RefundPage() {
  const t = useTranslations('LegalPages')
  return (
    <div className="container mx-auto px-4 py-12 prose prose-neutral">
      <h1>{t('refund.title')}</h1>
      <p>{t('refund.intro')}</p>

      <h2>{t('refund.eligibility.title')}</h2>
      <p>{t('refund.eligibility.desc')}</p>

      <h2>{t('refund.process.title')}</h2>
      <p>{t('refund.process.desc')}</p>

      <h2>{t('refund.timing.title')}</h2>
      <p>{t('refund.timing.desc')}</p>

      <h2>{t('refund.contact.title')}</h2>
      <p>{t('refund.contact.desc')}</p>
    </div>
  )
}