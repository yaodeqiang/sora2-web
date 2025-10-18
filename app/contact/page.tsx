import { useTranslations } from "next-intl"

export default function ContactPage() {
  const t = useTranslations('ContactPage')
  return (
    <div className="container mx-auto px-4 py-12 prose prose-neutral">
      <h1>{t('title')}</h1>
      <p>{t('intro')}</p>

      <h2>{t('email.title')}</h2>
      <p>{t('email.desc')}</p>

      <h2>{t('support.title')}</h2>
      <p>{t('support.desc')}</p>

      <h2>{t('company.title')}</h2>
      <p>{t('company.desc')}</p>
    </div>
  )
}