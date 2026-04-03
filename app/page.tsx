import AnnouncementBanner from "@/components/layout/AnnouncementBanner"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/landing/Hero"
import ProductTabs from "@/components/sections/landing/ProductTabs"
import Spotlight from "@/components/sections/landing/Spotlight"
import Metrics from "@/components/sections/landing/Metrics"
import AppShowcase from "@/components/sections/landing/AppShowcase"
import Pricing from "@/components/sections/landing/Pricing"
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
        <ProductTabs />
        <Spotlight />
        <Metrics />
        <AppShowcase />
        <Pricing />
        <FAQ />
      </main>
      <FooterCTA />
      <Footer />
    </>
  )
}
