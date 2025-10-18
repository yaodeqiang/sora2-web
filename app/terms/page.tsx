import { useTranslations } from "next-intl"

export default function TermsPage() {
  const t = useTranslations('LegalPages')
  return (
    <div className="container mx-auto px-4 py-12 prose prose-neutral">
      <h1>{t('terms.title')}</h1>
      <p>{t('terms.intro')}</p>

      <h2>{t('terms.use.title')}</h2>
      <p>{t('terms.use.desc')}</p>

      <h2>{t('terms.account.title')}</h2>
      <p>{t('terms.account.desc')}</p>

      <h2>{t('terms.billing.title')}</h2>
      <p>{t('terms.billing.desc')}</p>

      <h2>{t('terms.prohibited.title')}</h2>
      <p>{t('terms.prohibited.desc')}</p>

      <h2>{t('terms.ip.title')}</h2>
      <p>{t('terms.ip.desc')}</p>

      <h2>{t('terms.limitation.title')}</h2>
      <p>{t('terms.limitation.desc')}</p>
    </div>
  )
}