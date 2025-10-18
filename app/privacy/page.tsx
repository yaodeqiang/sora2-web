import { useTranslations } from "next-intl"

export default function PrivacyPage() {
  const t = useTranslations('LegalPages')
  return (
    <div className="container mx-auto px-4 py-12 prose prose-neutral">
      <h1>{t('privacy.title')}</h1>
      <p>{t('privacy.intro')}</p>

      <h2>{t('privacy.dataWeCollect.title')}</h2>
      <p>{t('privacy.dataWeCollect.desc')}</p>

      <h2>{t('privacy.howWeUse.title')}</h2>
      <p>{t('privacy.howWeUse.desc')}</p>

      <h2>{t('privacy.sharing.title')}</h2>
      <p>{t('privacy.sharing.desc')}</p>

      <h2>{t('privacy.security.title')}</h2>
      <p>{t('privacy.security.desc')}</p>

      <h2>{t('privacy.rights.title')}</h2>
      <p>{t('privacy.rights.desc')}</p>

      <h2>{t('privacy.contact.title')}</h2>
      <p>{t('privacy.contact.desc')}</p>
    </div>
  )
}