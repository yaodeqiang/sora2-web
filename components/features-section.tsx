"use client"
import { Sparkles, Video, Zap, ImageIcon, Maximize, Award, Layers, Users, Droplet } from "lucide-react"
import { useTranslations } from "next-intl"

export function FeaturesSection() {
  const t = useTranslations('FeaturesSection')
  const features = [
    {
      icon: Sparkles,
      title: t('features.openai.title'),
      description: t('features.openai.description'),
    },
    {
      icon: Video,
      title: t('features.cinema.title'),
      description: t('features.cinema.description'),
    },
    {
      icon: Zap,
      title: t('features.physics.title'),
      description: t('features.physics.description'),
    },
    {
      icon: ImageIcon,
      title: t('features.textImage.title'),
      description: t('features.textImage.description'),
    },
    {
      icon: Maximize,
      title: t('features.aspectRatios.title'),
      description: t('features.aspectRatios.description'),
    },
    {
      icon: Award,
      title: t('features.quality.title'),
      description: t('features.quality.description'),
    },
    {
      icon: Layers,
      title: t('features.scenes.title'),
      description: t('features.scenes.description'),
    },
    {
      icon: Users,
      title: t('features.creator.title'),
      description: t('features.creator.description'),
    },
    {
      icon: Droplet,
      title: t('features.noWatermark.title'),
      description: t('features.noWatermark.description'),
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-white border border-gray-200 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
