"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const EASE = [0.23, 1, 0.32, 1] as const

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const blurUp = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 32 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

const charContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.018 } },
}

const charVariant = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 10 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

const noAnimation = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

/* Split text for character-level animation */
interface SplitTextProps {
  children: string
  className?: string
}

function SplitText({ children, className }: SplitTextProps) {
  return (
    <motion.span className={className} variants={charContainer} style={{ display: "inline-block" }}>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={charVariant}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

/* Floating deal cards data */
interface DealCard {
  category: string
  name: string
  description: string
  badge: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  rotate: number
  delay: number
  parallaxSpeed: number
}

const dealCards: DealCard[] = [
  {
    category: "Dining",
    name: "Kinka Izakaya",
    description: "2-for-1 Dinner",
    badge: "50% OFF",
    top: "14%",
    left: "4%",
    rotate: -6,
    delay: 0,
    parallaxSpeed: -60,
  },
  {
    category: "Wellness",
    name: "Scandinave Spa",
    description: "Day Pass",
    badge: "$45 OFF",
    top: "10%",
    right: "5%",
    rotate: 4,
    delay: 0.8,
    parallaxSpeed: -90,
  },
  {
    category: "Experiences",
    name: "ROM Tickets",
    description: "Family Pack",
    badge: "BOGO",
    bottom: "26%",
    left: "5%",
    rotate: 3,
    delay: 1.6,
    parallaxSpeed: -40,
  },
  {
    category: "Fitness",
    name: "Barry's Bootcamp",
    description: "First Month",
    badge: "40% OFF",
    bottom: "20%",
    right: "4%",
    rotate: -4,
    delay: 2.4,
    parallaxSpeed: -70,
  },
  {
    category: "Travel",
    name: "Porter Airlines",
    description: "Weekend Getaway",
    badge: "$120 OFF",
    top: "46%",
    right: "2%",
    rotate: 5,
    delay: 3.2,
    parallaxSpeed: -50,
  },
]

/* Stats data */
interface StatItem {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

const stats: StatItem[] = [
  { value: 135, prefix: "$", suffix: "B", label: "Total Market" },
  { value: 9378, label: "Toronto Merchants" },
  { value: 0, label: "Dominant Players" },
]

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const stat1Ref = useRef<HTMLParagraphElement>(null)
  const stat2Ref = useRef<HTMLParagraphElement>(null)
  const stat3Ref = useRef<HTMLParagraphElement>(null)

  const [statValues, setStatValues] = useState([0, 0, 0])

  /* ── GSAP scroll-linked animations ── */
  useEffect(() => {
    if (prefersReducedMotion) {
      setStatValues([135, 9378, 0])
      return
    }

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        /* 1. Hero content scrub-out: moves up and fades as user scrolls past */
        gsap.to(".hero-content", {
          y: -200,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })

        /* 2. Floating cards parallax scrub: each at different speed */
        gsap.to(".deal-card-0", {
          y: dealCards[0].parallaxSpeed,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
        gsap.to(".deal-card-1", {
          y: dealCards[1].parallaxSpeed,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
        gsap.to(".deal-card-2", {
          y: dealCards[2].parallaxSpeed,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
        gsap.to(".deal-card-3", {
          y: dealCards[3].parallaxSpeed,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
        gsap.to(".deal-card-4", {
          y: dealCards[4].parallaxSpeed,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })

        /* 3. Stats counter scrub: numbers count up tied to scroll */
        const counter1 = { val: 0 }
        gsap.to(counter1, {
          val: 135,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-stats",
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
          onUpdate: () => {
            setStatValues((prev) => [Math.round(counter1.val), prev[1], prev[2]])
          },
        })

        const counter2 = { val: 0 }
        gsap.to(counter2, {
          val: 9378,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-stats",
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
          onUpdate: () => {
            setStatValues((prev) => [prev[0], Math.round(counter2.val), prev[2]])
          },
        })

        /* counter3 stays at 0 — "Dominant Players" is always 0 */

        /* 4. Grid background shift on scroll */
        gsap.to(".hero-grid", {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })

        /* 5. Scroll indicator line grows with scroll */
        gsap.to(".scroll-line-fill", {
          height: 48,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "200px top",
            scrub: 1,
          },
        })
      }, heroRef.current!)

      return () => ctx.revert()
    }, 100)

    return () => clearTimeout(timer)
  }, [prefersReducedMotion])

  const itemVariants = prefersReducedMotion ? noAnimation : blurUp
  const containerVariants = prefersReducedMotion ? noAnimation : container

  return (
    <>
      {/* Scroll progress indicator — fixed top bar (kept lightweight with GSAP) */}
      <div className="hero-progress-bar fixed top-0 left-0 right-0 h-[2px] bg-teal-300 origin-left z-[100]" style={{ transform: "scaleX(0)" }} ref={(el) => {
        if (!el || prefersReducedMotion) return
        gsap.to(el, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        })
      }} />

      <section
        ref={heroRef}
        id="hero"
        className="hero-section relative flex min-h-screen items-center justify-center px-4 md:px-6 overflow-hidden"
        style={{ backgroundColor: "#162028" }}
      >
        {/* Animated grid background */}
        <div className="hero-grid absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(3, 164, 147, 0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(3, 164, 147, 0.06) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Teal glow orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(3, 164, 147, 0.12) 0%, transparent 70%)",
              top: "10%",
              left: "20%",
            }}
            animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(3, 164, 147, 0.08) 0%, transparent 70%)",
              bottom: "15%",
              right: "15%",
            }}
            animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: 0.03,
          }}
        />

        {/* Floating deal cards — GSAP parallax via className targeting */}
        {dealCards.map((card, index) => (
          <motion.div
            key={card.name}
            className={`deal-card-${index} absolute hidden lg:block`}
            style={{
              top: card.top,
              bottom: card.bottom,
              left: card.left,
              right: card.right,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 + card.delay * 0.3, ease: EASE }}
          >
            <motion.div
              style={{ rotate: card.rotate }}
              animate={
                prefersReducedMotion
                  ? {}
                  : { y: [0, -8, 0] }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.delay,
              }}
            >
              <div className="rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm p-4 max-w-[160px]">
                <p className="text-[11px] tracking-[0.08em] uppercase text-white/40">{card.category}</p>
                <p className="text-sm font-medium text-white mt-1 tracking-[-0.01em]">{card.name}</p>
                <p className="text-[11px] text-white/40 mt-0.5">{card.description}</p>
                <span className="inline-block mt-2 text-[10px] font-medium bg-teal-300/20 text-teal-300 px-2 py-0.5 rounded-full">
                  {card.badge}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Main content — GSAP scrub-out on scroll */}
        <div className="hero-content relative z-10 mx-auto w-full max-w-6xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            {/* Eyebrow */}
            <motion.span
              variants={itemVariants}
              className="mb-8 inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-neutral-400"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-teal-300 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-300" />
              </span>
              Toronto, Canada &middot; Launching 2026
            </motion.span>

            {/* H1 — character-level stagger */}
            <motion.h1
              variants={prefersReducedMotion ? noAnimation : { hidden: {}, visible: { transition: { staggerChildren: 0.018, delayChildren: 0.1 } } }}
              className="font-medium tracking-[-0.03em] max-w-4xl"
              style={{
                fontSize: "clamp(3.25rem, 7vw, 6rem)",
                lineHeight: 1.0,
              }}
            >
              {prefersReducedMotion ? (
                <>
                  <span className="text-white">The membership that </span>
                  <em className="text-teal-300 italic">pays</em>
                  <br />
                  <span
                    style={{
                      WebkitTextStroke: "1.5px rgba(255,255,255,0.3)",
                      color: "transparent",
                    }}
                  >
                    for itself.
                  </span>
                </>
              ) : (
                <>
                  <SplitText className="text-white">The membership that </SplitText>
                  <motion.em
                    className="text-teal-300 italic"
                    variants={charContainer}
                    style={{ display: "inline-block" }}
                  >
                    {("pays").split("").map((char, i) => (
                      <motion.span
                        key={i}
                        variants={charVariant}
                        style={{ display: "inline-block" }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.em>
                  <br />
                  <motion.span
                    variants={charContainer}
                    style={{
                      display: "inline-block",
                      WebkitTextStroke: "1.5px rgba(255,255,255,0.3)",
                      color: "transparent",
                    }}
                  >
                    {("for itself.").split("").map((char, i) => (
                      <motion.span
                        key={i}
                        variants={charVariant}
                        style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                </>
              )}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="mt-8 max-w-xl text-base text-neutral-400"
              style={{ lineHeight: 1.7 }}
            >
              One membership. Access to premier dining, wellness, fitness, and
              lifestyle experiences across Toronto — at prices that make going out
              feel good again.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Button
                className="h-12 px-8 bg-teal-300 text-carbon hover:bg-teal-300/90 text-sm tracking-[-0.01em]"
                onClick={() => {
                  const el = document.getElementById("waitlist")
                  if (el) el.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Join the Waitlist
                <span className="ml-2">&rarr;</span>
              </Button>
              <Button
                variant="ghost"
                className="h-12 px-8 text-white/60 hover:text-white hover:bg-white/5 text-sm tracking-[-0.01em]"
              >
                View Pricing
                <span className="ml-2">&darr;</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats — bottom right, GSAP scroll-linked counters */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="hero-stats mt-24 md:mt-32 flex justify-end"
          >
            <div className="flex gap-12 md:gap-16">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-right">
                  <p
                    ref={index === 0 ? stat1Ref : index === 1 ? stat2Ref : stat3Ref}
                    className="text-3xl font-medium text-teal-300 tracking-[-0.02em]"
                  >
                    {stat.prefix ?? ""}
                    {index === 2
                      ? statValues[index]
                      : statValues[index].toLocaleString()}
                    {stat.suffix ?? ""}
                  </p>
                  <p className="text-[11px] tracking-[0.1em] uppercase text-neutral-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator — bottom left */}
        <motion.div
          className="absolute bottom-8 left-6 md:left-10 z-10 flex items-end gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="relative w-[1px] h-12 bg-white/10 overflow-hidden">
            <div
              className="scroll-line-fill absolute bottom-0 left-0 w-full bg-teal-300"
              style={{ height: prefersReducedMotion ? 48 : 0 }}
            />
          </div>
          <span className="text-[11px] tracking-[0.1em] uppercase text-neutral-400 pb-0.5">
            Scroll to explore
          </span>
        </motion.div>

        {/* Bottom gradient transition */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #F5F7F7)",
          }}
        />
      </section>
    </>
  )
}
