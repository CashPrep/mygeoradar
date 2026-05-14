import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { EngineBar } from '@/components/home/EngineBar'
import { FeaturesGrid } from '@/components/home/FeaturesGrid'
import { HowItWorks } from '@/components/home/HowItWorks'
import { SampleResult } from '@/components/home/SampleResult'
import { PricingSection } from '@/components/home/PricingSection'
import { FaqSection } from '@/components/home/FaqSection'
import { CtaBanner } from '@/components/home/CtaBanner'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <EngineBar />
      <FeaturesGrid />
      <HowItWorks />
      <SampleResult />
      <PricingSection />
      <FaqSection />
      <CtaBanner />
      <Footer />
    </main>
  )
}
