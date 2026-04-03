"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform, MotionValue } from "framer-motion"
import { Button } from "@/components/ui/button"

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

/* Scroll-linked animated counter for stats */
function useScrollCounter(
  scrollY: MotionValue<number>,
  target: number,
  scrollStart: number,
  scrollEnd: number,
  prefersReducedMotion: boolean | null
) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(target)
      return
    }

    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest <= scrollStart) {
        setCount(0)
      } else if (latest >= scrollEnd) {
        setCount(target)
      } else {
        const progress = (latest - scrollStart) / (scrollEnd - scrollStart)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * target))
      }
    })

    return unsubscribe
  }, [scrollY, target, scrollStart, scrollEnd, prefersReducedMotion])

  return count
}

/* Floating deal card with deeper per-card parallax */
function FloatingDealCard({
  card,
  prefersReducedMotion,
  parallaxY,
}: {
  card: DealCard
  prefersReducedMotion: boolean | null
  parallaxY: MotionValue<number>
}) {
  const style: Record<string, string | undefined> = {
    top: card.top,
    bottom: card.bottom,
    left: card.left,
    right: card.right,
  }

  return (
    <motion.div
      className="absolute hidden lg:block"
      style={{ ...style, y: prefersReducedMotion ? 0 : parallaxY }}
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
  )
}

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

  /* Global scroll for progress bar + hero parallax */
  const { scrollY, scrollYProgress } = useScroll()

  /* Hero content parallax — moves up faster as you scroll away */
  const heroY = useTransform(scrollY, [0, 800], [0, -200])
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0])

  /* Grid background shift on scroll */
  const gridY = useTransform(scrollY, [0, 800], [0, -60])

  /* Deeper parallax per floating card */
  const cardParallaxValues = dealCards.map((card) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollY, [0, 800], [0, card.parallaxSpeed])
  )

  /* Scroll-linked stat counters */
  const stat1 = useScrollCounter(scrollY, 135, 100, 500, prefersReducedMotion)
  const stat2 = useScrollCounter(scrollY, 9378, 100, 500, prefersReducedMotion)
  const stat3 = useScrollCounter(scrollY, 0, 100, 500, prefersReducedMotion)
  const statValues = [stat1, stat2, stat3]

  /* Scroll indicator line animation */
  const scrollLineHeight = useTransform(scrollY, [0, 200], [0, 48])

  const itemVariants = prefersReducedMotion ? noAnimation : blurUp
  const containerVariants = prefersReducedMotion ? noAnimation : container

  return (
    <>
      {/* Scroll progress indicator — fixed top bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-teal-300 origin-left z-[100]"
      />

      <section
        ref={heroRef}
        id="hero"
        className="relative flex min-h-screen items-center justify-center px-4 md:px-6 overflow-hidden"
        style={{ backgroundColor: "#162028" }}
      >
        {/* Animated grid background */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: prefersReducedMotion ? 0 : gridY }}
        >
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
        </motion.div>

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

        {/* Floating deal cards with deeper parallax */}
        {dealCards.map((card, index) => (
          <FloatingDealCard
            key={card.name}
            card={card}
            prefersReducedMotion={prefersReducedMotion}
            parallaxY={cardParallaxValues[index]}
          />
        ))}

        {/* Main content — parallax out on scroll */}
        <motion.div
          style={{
            y: prefersReducedMotion ? 0 : heroY,
            opacity: prefersReducedMotion ? 1 : heroOpacity,
          }}
          className="relative z-10 mx-auto w-full max-w-6xl"
        >
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
                render={<a href="/deck" target="_blank" rel="noopener noreferrer" />}
              >
                Investor Deck
                <span className="ml-2">&nearr;</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats — bottom right, scroll-linked counters */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mt-24 md:mt-32 flex justify-end"
          >
            <div className="flex gap-12 md:gap-16">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-right">
                  <p className="text-3xl font-medium text-teal-300 tracking-[-0.02em]">
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
        </motion.div>

        {/* Scroll indicator — bottom left */}
        <motion.div
          className="absolute bottom-8 left-6 md:left-10 z-10 flex items-end gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="relative w-[1px] h-12 bg-white/10 overflow-hidden">
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-teal-300"
              style={{ height: prefersReducedMotion ? 48 : scrollLineHeight }}
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
