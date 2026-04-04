import AnnouncementBanner from "@/components/layout/AnnouncementBanner"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/landing/Hero"
import CategoryTicker from "@/components/sections/landing/CategoryTicker"
import HowItWorks from "@/components/sections/landing/HowItWorks"
import AppShowcase from "@/components/sections/landing/AppShowcase"
import LoyaltyEngine from "@/components/sections/landing/LoyaltyEngine"
import ProblemSolution from "@/components/sections/landing/ProblemSolution"
import Pricing from "@/components/sections/landing/Pricing"
import MerchantValue from "@/components/sections/landing/MerchantValue"
import RevenueStreams from "@/components/sections/landing/RevenueStreams"
import Team from "@/components/sections/landing/Team"
import Roadmap from "@/components/sections/landing/Roadmap"
import FAQ from "@/components/sections/landing/FAQ"
import FooterCTA from "@/components/layout/FooterCTA"
import Footer from "@/components/layout/Footer"

export default function Home() {
  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <main>
        <Hero />
        <CategoryTicker />
        <HowItWorks />
        <AppShowcase />
        <LoyaltyEngine />
        <ProblemSolution />
        <Pricing />
        <MerchantValue />
        <RevenueStreams />
        <Team />
        <Roadmap />
        <FAQ />
      </main>
      <FooterCTA />
      <Footer />
    </>
  )
}
