import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/landing/Hero"
import AppShowcase from "@/components/sections/landing/AppShowcase"
import HowItWorks from "@/components/sections/landing/HowItWorks"
import Pricing from "@/components/sections/landing/Pricing"
import FooterCTA from "@/components/layout/FooterCTA"
import Footer from "@/components/layout/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AppShowcase />
        <HowItWorks />
        <Pricing />
      </main>
      <FooterCTA />
      <Footer />
    </>
  )
}
