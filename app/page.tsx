import AnnouncementBanner from "@/components/layout/AnnouncementBanner"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/landing/Hero"
import CategoryTicker from "@/components/sections/landing/CategoryTicker"
import HowItWorks from "@/components/sections/landing/HowItWorks"
import AppShowcase from "@/components/sections/landing/AppShowcase"
import ProblemSolution from "@/components/sections/landing/ProblemSolution"
import Pricing from "@/components/sections/landing/Pricing"
import MerchantValue from "@/components/sections/landing/MerchantValue"
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
        <ProblemSolution />
        <Pricing />
        <MerchantValue />
        <FAQ />
      </main>
      <FooterCTA />
      <Footer />
    </>
  )
}
