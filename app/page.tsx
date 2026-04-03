import AnnouncementBanner from "@/components/layout/AnnouncementBanner"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/landing/Hero"
import Bridge from "@/components/sections/landing/Bridge"
import Problem from "@/components/sections/landing/Problem"
import Solution from "@/components/sections/landing/Solution"
import LoyaltyEngine from "@/components/sections/landing/LoyaltyEngine"
import Pricing from "@/components/sections/landing/Pricing"
import MerchantROI from "@/components/sections/landing/MerchantROI"
import RevenueModel from "@/components/sections/landing/RevenueModel"
import Team from "@/components/sections/landing/Team"
import Raise from "@/components/sections/landing/Raise"
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
        <Bridge />
        <Problem />
        <Solution />
        <LoyaltyEngine />
        <Pricing />
        <MerchantROI />
        <RevenueModel />
        <Team />
        <Raise />
        <Roadmap />
        <FAQ />
      </main>
      <FooterCTA />
      <Footer />
    </>
  )
}
