import AnnouncementBanner from "@/components/layout/AnnouncementBanner"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/landing/Hero"
import ProductTabs from "@/components/sections/landing/ProductTabs"
import Spotlight from "@/components/sections/landing/Spotlight"
import SocialProof from "@/components/sections/landing/SocialProof"
import PartnerCarousel from "@/components/sections/landing/PartnerCarousel"
import Metrics from "@/components/sections/landing/Metrics"
import AppShowcase from "@/components/sections/landing/AppShowcase"
import FooterCTA from "@/components/layout/FooterCTA"
import BlogCards from "@/components/sections/landing/BlogCards"
import Pricing from "@/components/sections/landing/Pricing"
import FAQ from "@/components/sections/landing/FAQ"
import Footer from "@/components/layout/Footer"

export default function Home() {
  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <main>
        <Hero />
        <ProductTabs />
        <Spotlight />
        <SocialProof />
        <PartnerCarousel />
        <Metrics />
        <AppShowcase />
        <FooterCTA />
        <BlogCards />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
