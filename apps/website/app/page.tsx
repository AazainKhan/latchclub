import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import { AppWalkthrough } from "@/components/sections/AppWalkthrough";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { Industries } from "@/components/sections/Industries";
import { FAQ } from "@/components/sections/FAQ";
import { WaitlistCTA } from "@/components/sections/WaitlistCTA";
import { HashScrollHandler } from "@/components/shared/HashScrollHandler";

export default function Home() {
  return (
    <>
      <HashScrollHandler />
      <Navbar />
      <main>
        <Hero />
        <AppWalkthrough />
        <Features />
        <Pricing />
        <Industries />
        <FAQ />
        <WaitlistCTA />
      </main>
      <Footer />
    </>
  );
}
