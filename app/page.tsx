import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { VideoGenerator } from "@/components/video-generator"
import { FeaturesSection } from "@/components/features-section"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { WarningBanner } from "@/components/warning-banner"

export default async function Home() {
  return (
    <main className="min-h-screen">
      <WarningBanner />
      <Header />
      <HeroSection />
      <VideoGenerator />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  )
}