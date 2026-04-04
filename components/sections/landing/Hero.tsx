"use client"

import { useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import { Button } from "@/components/ui/button"

/* ── Marquee card data ── */
interface MarqueeCard {
  category: string
  name: string
  description: string
  badge: string
  gradient: string
}

const leftCol1Cards: MarqueeCard[] = [
  { category: "Dining", name: "Kinka Izakaya", description: "2-for-1 Dinner", badge: "50% OFF", gradient: "from-[#1a2a35] to-[#0f1a22]" },
  { category: "Wellness", name: "Scandinave Spa", description: "Day Pass", badge: "$45 OFF", gradient: "from-[#162530] to-[#0c1820]" },
  { category: "Fitness", name: "Barry's Bootcamp", description: "First Month", badge: "40% OFF", gradient: "from-[#1a2530] to-[#101c25]" },
  { category: "Travel", name: "Porter Airlines", description: "Weekend Getaway", badge: "$120 OFF", gradient: "from-[#15222e] to-[#0b1620]" },
  { category: "Dining", name: "Pai Northern Thai", description: "BOGO Entrées", badge: "2-for-1", gradient: "from-[#1a2a35] to-[#0f1a22]" },
  { category: "Experience", name: "Escape Manor", description: "Team Booking", badge: "30% OFF", gradient: "from-[#162530] to-[#0c1820]" },
]

const leftCol2Cards: MarqueeCard[] = [
  { category: "Wellness", name: "Hammam Spa", description: "Couples Package", badge: "35% OFF", gradient: "from-[#162530] to-[#0c1820]" },
  { category: "Dining", name: "Alo Restaurant", description: "Tasting Menu", badge: "$50 OFF", gradient: "from-[#1a2a35] to-[#0f1a22]" },
  { category: "Fitness", name: "F45 Training", description: "Monthly Pass", badge: "25% OFF", gradient: "from-[#1a2530] to-[#101c25]" },
  { category: "Experience", name: "ROM Tickets", description: "Family Pack", badge: "BOGO", gradient: "from-[#15222e] to-[#0b1620]" },
  { category: "Dining", name: "Richmond Station", description: "Prix Fixe", badge: "40% OFF", gradient: "from-[#1a2a35] to-[#0f1a22]" },
  { category: "Wellness", name: "Body Blitz Spa", description: "Full Day", badge: "$30 OFF", gradient: "from-[#162530] to-[#0c1820]" },
]

const rightCol1Cards: MarqueeCard[] = [
  { category: "Experience", name: "CN Tower", description: "EdgeWalk", badge: "20% OFF", gradient: "from-[#15222e] to-[#0b1620]" },
  { category: "Dining", name: "Canoe Restaurant", description: "Lunch Special", badge: "2-for-1", gradient: "from-[#1a2a35] to-[#0f1a22]" },
  { category: "Fitness", name: "Ride Cycle Club", description: "10-Pack", badge: "30% OFF", gradient: "from-[#1a2530] to-[#101c25]" },
  { category: "Wellness", name: "Elmwood Spa", description: "Massage Package", badge: "$40 OFF", gradient: "from-[#162530] to-[#0c1820]" },
  { category: "Dining", name: "Byblos Toronto", description: "Date Night", badge: "35% OFF", gradient: "from-[#1a2a35] to-[#0f1a22]" },
  { category: "Experience", name: "Ripley's Aquarium", description: "Annual Pass", badge: "25% OFF", gradient: "from-[#15222e] to-[#0b1620]" },
]

const rightCol2Cards: MarqueeCard[] = [
  { category: "Fitness", name: "Othership Sauna", description: "Breathwork", badge: "40% OFF", gradient: "from-[#1a2530] to-[#101c25]" },
  { category: "Dining", name: "DaiLo", description: "Dim Sum Brunch", badge: "2-for-1", gradient: "from-[#1a2a35] to-[#0f1a22]" },
  { category: "Wellness", name: "Float Toronto", description: "Float Session", badge: "$25 OFF", gradient: "from-[#162530] to-[#0c1820]" },
  { category: "Travel", name: "Flair Airlines", description: "Montreal Trip", badge: "$80 OFF", gradient: "from-[#15222e] to-[#0b1620]" },
  { category: "Dining", name: "Planta Queen", description: "Lunch Combo", badge: "30% OFF", gradient: "from-[#1a2a35] to-[#0f1a22]" },
  { category: "Experience", name: "Hot Docs Cinema", description: "Movie Night", badge: "BOGO", gradient: "from-[#15222e] to-[#0b1620]" },
]

/* Marquee card component */
function MarqueeCardItem({ card }: { card: MarqueeCard }) {
  return (
    <div className={`marquee-card w-[220px] h-[280px] rounded-2xl bg-gradient-to-b ${card.gradient} border border-white/[0.08] p-5 flex flex-col justify-between shrink-0`}>
      <div>
        <p className="text-[10px] tracking-[0.1em] uppercase text-teal-300/70">{card.category}</p>
        <p className="text-sm font-medium text-white mt-2 tracking-[-0.01em]">{card.name}</p>
        <p className="text-xs text-white/40 mt-1">{card.description}</p>
      </div>
      <span className="inline-block self-start text-[10px] font-medium bg-teal-300/15 text-teal-300 px-2.5 py-1 rounded-full">
        {card.badge}
      </span>
    </div>
  )
}

/* Marquee column — renders cards doubled for seamless loop */
function MarqueeColumn({ cards, className }: { cards: MarqueeCard[]; className?: string }) {
  return (
    <div className={`marquee-col flex flex-col gap-4 ${className || ""}`}>
      {/* Original set */}
      {cards.map((card, i) => (
        <MarqueeCardItem key={`a-${i}`} card={card} />
      ))}
      {/* Cloned set for seamless loop */}
      {cards.map((card, i) => (
        <MarqueeCardItem key={`b-${i}`} card={card} />
      ))}
    </div>
  )
}

export default function Hero() {
  const container = useRef<HTMLElement>(null)

  /* ── GSAP entrance timeline ── */
  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      if (isReduced) {
        gsap.set([".hero-heading", ".hero-subtext", ".hero-actions", ".scroll-indicator"], { opacity: 1, y: 0, filter: "none" })
        gsap.set(".marquee-wrap", { opacity: 1 })
        return
      }

      /* ── Vertical marquee animation ── */
      // Each column scrolls continuously. Col 1 & 3 go UP, Col 2 & 4 go DOWN.
      const colHeight = 6 * (280 + 16) // 6 cards * (280px height + 16px gap)

      // Columns scrolling UP (start at 0, move to -colHeight)
      gsap.to(".marquee-up", {
        y: -colHeight,
        duration: 30,
        ease: "none",
        repeat: -1,
        modifiers: {
          y: gsap.utils.unitize((y: number) => y % colHeight),
        },
      })

      // Columns scrolling DOWN (start at -colHeight, move to 0)
      gsap.set(".marquee-down", { y: -colHeight })
      gsap.to(".marquee-down", {
        y: 0,
        duration: 25,
        ease: "none",
        repeat: -1,
        modifiers: {
          y: gsap.utils.unitize((y: number) => {
            const val = y % colHeight
            return val > 0 ? val - colHeight : val
          }),
        },
      })

      // Fade in marquee columns
      gsap.from(".marquee-wrap", { opacity: 0, duration: 1.5, delay: 0.5, ease: "power2.out" })

      /* ── Entrance timeline ── */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Animate heading words (not chars — chars break layout wrapping)
      const headingWords = container.current?.querySelectorAll(".hero-heading span, .hero-heading em")

      if (headingWords && headingWords.length > 0) {
        tl.from(headingWords, { y: 50, opacity: 0, filter: "blur(6px)", stagger: 0.08, duration: 0.7 })
      } else {
        tl.from(".hero-heading", { y: 50, opacity: 0, filter: "blur(6px)", duration: 0.8 }, "-=0.4")
      }
      tl.from(".hero-subtext", { y: 30, opacity: 0, duration: 0.7 }, "-=0.3")
        .from(".hero-actions", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".hero-stats .stat-item", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.3")
        .from(".scroll-indicator", { opacity: 0, duration: 0.5 }, "-=0.2")
    },
    { scope: container }
  )

  /* ── Scroll-linked scrub + parallax (NO scope — needs global selectors) ── */
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!container.current) return

    const section = container.current

    gsap.to(section.querySelector(".hero-content")!, {
      y: -150,
      opacity: 0,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1.5 },
    })

    gsap.to(section.querySelector(".marquee-left")!, {
      y: -60,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
    })

    gsap.to(section.querySelector(".marquee-right")!, {
      y: -40,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
    })

    gsap.to(section.querySelector(".hero-grid")!, {
      y: -80,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
    })

    const scrollFill = section.querySelector(".scroll-line-fill")
    if (scrollFill) {
      gsap.to(scrollFill, {
        height: 48,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "200px top", scrub: 1 },
      })
    }

    const progressBar = document.querySelector(".scroll-progress-bar")
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
      })
    }
  })

  return (
    <>
      <div className="scroll-progress-bar fixed top-0 left-0 right-0 h-[2px] bg-teal-300 origin-left z-[100]" style={{ transform: "scaleX(0)" }} />

      <section
        ref={container}
        id="hero"
        className="hero-section relative h-[85dvh] max-h-[900px] overflow-hidden"
        style={{ backgroundColor: "#162028" }}
      >
        {/* Grid background */}
        <div className="hero-grid absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(3,164,147,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(3,164,147,0.05) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Teal glow orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(3,164,147,0.1) 0%, transparent 70%)", top: "10%", left: "30%" }} />
          <div className="absolute w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(3,164,147,0.06) 0%, transparent 70%)", bottom: "15%", right: "20%" }} />
        </div>

        {/* Noise overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, opacity: 0.03 }} />

        {/* ═══ MAIN LAYOUT: marquee columns | center content | marquee columns ═══ */}
        <div className="relative z-10 flex h-full">

          {/* LEFT MARQUEE COLUMNS (2 columns) */}
          <div className="marquee-wrap marquee-left hidden lg:flex gap-3 w-[460px] shrink-0 overflow-hidden relative">
            <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, #162028 0%, transparent 12%, transparent 88%, #162028 100%)" }} />
            <MarqueeColumn cards={leftCol1Cards} className="marquee-up pt-12" />
            <MarqueeColumn cards={leftCol2Cards} className="marquee-down pt-24" />
          </div>

          {/* CENTER CONTENT */}
          <div className="hero-content flex-1 flex flex-col justify-center items-center text-center px-6 pt-24 pb-16 md:pt-28 md:pb-0">
            {/* Heading */}
            <h1 className="hero-heading font-medium tracking-[-0.03em] max-w-2xl" style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", lineHeight: 1.05 }}>
              <span className="text-white">The membership that </span>
              <em className="text-teal-300 italic">pays</em>
              <br />
              <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.3)", color: "transparent" }}>for itself.</span>
            </h1>

            {/* Subtext */}
            <p className="hero-subtext mt-8 max-w-md text-base text-neutral-400" style={{ lineHeight: 1.7 }}>
              One membership. Access to premier dining, wellness, fitness, and lifestyle experiences across Toronto — at prices that make going out feel good again.
            </p>

            {/* CTA buttons */}
            <div className="hero-actions mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Button
                className="h-12 px-8 bg-teal-300 text-carbon hover:bg-teal-300/90 text-sm"
                onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
              >
                Join the Waitlist <span className="ml-2">&rarr;</span>
              </Button>
              <Button variant="ghost" className="h-12 px-8 text-white/60 hover:text-white hover:bg-white/5 text-sm">
                View Pricing <span className="ml-2">&darr;</span>
              </Button>
            </div>

            {/* Social proof line */}
            <p className="mt-8 text-xs tracking-wide text-white/30">
              Join 1,200+ Canadians already on the waitlist
            </p>
          </div>

          {/* RIGHT MARQUEE COLUMNS (2 columns) */}
          <div className="marquee-wrap marquee-right hidden lg:flex gap-3 w-[460px] shrink-0 overflow-hidden relative">
            <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, #162028 0%, transparent 12%, transparent 88%, #162028 100%)" }} />
            <MarqueeColumn cards={rightCol1Cards} className="marquee-down pt-8" />
            <MarqueeColumn cards={rightCol2Cards} className="marquee-up pt-20" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-8 left-6 md:left-10 z-20 flex items-end gap-3">
          <div className="relative w-[1px] h-12 bg-white/10 overflow-hidden">
            <div className="scroll-line-fill absolute bottom-0 left-0 w-full bg-teal-300" style={{ height: 0 }} />
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20" style={{ background: "linear-gradient(to bottom, transparent, #162028)" }} />
      </section>
    </>
  )
}
