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
}

const leftCol1Cards: MarqueeCard[] = [
  { category: "Dining", name: "Kinka Izakaya", description: "2-for-1 Dinner", badge: "50% OFF" },
  { category: "Wellness", name: "Scandinave Spa", description: "Day Pass", badge: "$45 OFF" },
  { category: "Fitness", name: "Barry's Bootcamp", description: "First Month", badge: "40% OFF" },
  { category: "Travel", name: "Porter Airlines", description: "Weekend Getaway", badge: "$120 OFF" },
  { category: "Dining", name: "Pai Northern Thai", description: "BOGO Entrées", badge: "2-for-1" },
  { category: "Experience", name: "Escape Manor", description: "Team Booking", badge: "30% OFF" },
]

const leftCol2Cards: MarqueeCard[] = [
  { category: "Wellness", name: "Hammam Spa", description: "Couples Package", badge: "35% OFF" },
  { category: "Dining", name: "Alo Restaurant", description: "Tasting Menu", badge: "$50 OFF" },
  { category: "Fitness", name: "F45 Training", description: "Monthly Pass", badge: "25% OFF" },
  { category: "Experience", name: "ROM Tickets", description: "Family Pack", badge: "BOGO" },
  { category: "Dining", name: "Richmond Station", description: "Prix Fixe", badge: "40% OFF" },
  { category: "Wellness", name: "Body Blitz Spa", description: "Full Day", badge: "$30 OFF" },
]

const rightCol1Cards: MarqueeCard[] = [
  { category: "Experience", name: "CN Tower", description: "EdgeWalk", badge: "20% OFF" },
  { category: "Dining", name: "Canoe Restaurant", description: "Lunch Special", badge: "2-for-1" },
  { category: "Fitness", name: "Ride Cycle Club", description: "10-Pack", badge: "30% OFF" },
  { category: "Wellness", name: "Elmwood Spa", description: "Massage Package", badge: "$40 OFF" },
  { category: "Dining", name: "Byblos Toronto", description: "Date Night", badge: "35% OFF" },
  { category: "Experience", name: "Ripley's Aquarium", description: "Annual Pass", badge: "25% OFF" },
]

const rightCol2Cards: MarqueeCard[] = [
  { category: "Fitness", name: "Othership Sauna", description: "Breathwork", badge: "40% OFF" },
  { category: "Dining", name: "DaiLo", description: "Dim Sum Brunch", badge: "2-for-1" },
  { category: "Wellness", name: "Float Toronto", description: "Float Session", badge: "$25 OFF" },
  { category: "Travel", name: "Flair Airlines", description: "Montreal Trip", badge: "$80 OFF" },
  { category: "Dining", name: "Planta Queen", description: "Lunch Combo", badge: "30% OFF" },
  { category: "Experience", name: "Hot Docs Cinema", description: "Movie Night", badge: "BOGO" },
]

/* Marquee card component — theme-aware */
function MarqueeCardItem({ card }: { card: MarqueeCard }) {
  return (
    <div className="marquee-card w-[220px] h-[280px] rounded-2xl bg-card border border-border p-5 flex flex-col justify-between shrink-0 shadow-sm">
      <div>
        <p className="text-[10px] tracking-[0.1em] uppercase text-teal-400">{card.category}</p>
        <p className="text-sm font-medium text-foreground mt-2 tracking-[-0.01em]">{card.name}</p>
        <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
      </div>
      <span className="inline-block self-start text-[10px] font-medium bg-teal-400/15 text-teal-400 px-2.5 py-1 rounded-full">
        {card.badge}
      </span>
    </div>
  )
}

/* Marquee column — renders cards doubled for seamless loop */
function MarqueeColumn({ cards, className }: { cards: MarqueeCard[]; className?: string }) {
  return (
    <div className={`marquee-col flex flex-col gap-4 ${className || ""}`}>
      {cards.map((card, i) => (
        <MarqueeCardItem key={`a-${i}`} card={card} />
      ))}
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
        gsap.set([".hero-heading", ".hero-subtext", ".hero-actions"], { opacity: 1, y: 0, filter: "none" })
        gsap.set(".marquee-wrap", { opacity: 1 })
        return
      }

      /* ── Vertical marquee animation ── */
      const colHeight = 6 * (280 + 16)

      gsap.to(".marquee-up", {
        y: -colHeight,
        duration: 30,
        ease: "none",
        repeat: -1,
        modifiers: {
          y: gsap.utils.unitize((y: number) => y % colHeight),
        },
      })

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

      gsap.from(".marquee-wrap", { opacity: 0, duration: 1.5, delay: 0.5, ease: "power2.out" })

      /* ── Entrance timeline ── */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      const headingWords = container.current?.querySelectorAll(".hero-heading span, .hero-heading em")

      if (headingWords && headingWords.length > 0) {
        tl.from(headingWords, { y: 50, opacity: 0, filter: "blur(6px)", stagger: 0.08, duration: 0.7 })
      } else {
        tl.from(".hero-heading", { y: 50, opacity: 0, filter: "blur(6px)", duration: 0.8 }, "-=0.4")
      }
      tl.from(".hero-subtext", { y: 30, opacity: 0, duration: 0.7 }, "-=0.3")
        .from(".hero-actions", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".hero-stats .stat-item", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.3")
    },
    { scope: container }
  )

  /* ── Scroll-linked parallax ── */
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
  })

  return (
    <section
      ref={container}
      id="hero"
      className="hero-section relative z-10 h-[100dvh] overflow-hidden bg-background isolate"
    >
      {/* Teal glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(3,164,147,0.08) 0%, transparent 70%)", top: "10%", left: "30%" }} />
        <div className="absolute w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(3,164,147,0.05) 0%, transparent 70%)", bottom: "15%", right: "20%" }} />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, opacity: 0.02 }} />

      {/* ═══ MAIN LAYOUT ═══ */}
      <div className="relative z-10 flex h-full">

        {/* LEFT MARQUEE COLUMNS */}
        <div className="marquee-wrap marquee-left hidden lg:flex gap-3 w-[460px] shrink-0 overflow-hidden relative">
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-background via-transparent to-background" style={{ backgroundSize: "100% 100%", backgroundImage: "linear-gradient(to bottom, var(--background) 0%, var(--background) 6%, transparent 24%, transparent 84%, var(--background) 100%)" }} />
          <MarqueeColumn cards={leftCol1Cards} className="marquee-up pt-12" />
          <MarqueeColumn cards={leftCol2Cards} className="marquee-down pt-24" />
        </div>

        {/* CENTER CONTENT */}
        <div className="hero-content flex-1 flex flex-col justify-center items-center text-center px-6 pt-24 pb-16 md:pt-28 md:pb-0">
          <h1 className="hero-heading font-heading font-medium tracking-[-0.03em] max-w-2xl" style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", lineHeight: 1.05 }}>
            <span className="text-foreground">The membership that </span>
            <em className="text-teal-400 italic">pays</em>
            <br />
            <span className="text-foreground/20">for itself.</span>
          </h1>

          <p className="hero-subtext mt-8 max-w-md text-base text-muted-foreground" style={{ lineHeight: 1.7 }}>
            One membership. Access to premier dining, wellness, fitness, and lifestyle experiences across Toronto — at prices that make going out feel good again.
          </p>

          <div className="hero-actions mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Button
              className="h-12 px-8 bg-teal-400 text-white hover:bg-teal-400/90 text-sm"
              onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
            >
              Join the Waitlist <span className="ml-2">&rarr;</span>
            </Button>
            <Button variant="ghost" className="h-12 px-8 text-muted-foreground hover:text-foreground hover:bg-foreground/5 text-sm">
              View Pricing <span className="ml-2">&darr;</span>
            </Button>
          </div>

          <p className="mt-8 text-xs tracking-wide text-muted-foreground/60">
            Join 1,200+ Canadians already on the waitlist
          </p>
        </div>

        {/* RIGHT MARQUEE COLUMNS */}
        <div className="marquee-wrap marquee-right hidden lg:flex gap-3 w-[460px] shrink-0 overflow-hidden relative">
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(to bottom, var(--background) 0%, var(--background) 6%, transparent 24%, transparent 84%, var(--background) 100%)" }} />
          <MarqueeColumn cards={rightCol1Cards} className="marquee-down pt-8" />
          <MarqueeColumn cards={rightCol2Cards} className="marquee-up pt-20" />
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20 bg-gradient-to-b from-transparent to-background" />
    </section>
  )
}
