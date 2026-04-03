"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useReducedMotion, useInView } from "framer-motion"

const EASE = [0.23, 1, 0.32, 1] as const

interface StatCard {
  stat: string
  label: string
  source: string
  prefix?: string
  suffix?: string
  numericValue?: number
}

const stats: StatCard[] = [
  {
    stat: "$63",
    prefix: "$",
    numericValue: 63,
    label: "Average spend per restaurant visit \u2014 up 12.5% year over year",
    source: "Escoffier, 2025",
  },
  {
    stat: "88%",
    suffix: "%",
    numericValue: 88,
    label: "Of consumers say price is the #1 factor when deciding where to spend",
    source: "Restroworks, 2025",
  },
  {
    stat: "84%",
    suffix: "%",
    numericValue: 84,
    label: "Of Canadians are more selective about where they go than two years ago",
    source: "Restaurants Canada, 2025",
  },
  {
    stat: "80%",
    suffix: "%",
    numericValue: 80,
    label: "Of Canadian restaurants currently carry debt \u2014 operating on the edge",
    source: "Restaurants Canada",
  },
  {
    stat: "3\u20135%",
    label: "Profit margins for full-service restaurants \u2014 the thinnest in hospitality",
    source: "Toast, 2025",
  },
  {
    stat: "$30K",
    prefix: "$",
    suffix: "K",
    numericValue: 30,
    label: "Average annual marketing spend per merchant \u2014 with unclear attribution",
    source: "Yelp Business Survey",
  },
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
}

const cardVariantReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

const fadeUpReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

const headerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

/* Animated counter hook */
function useAnimatedCounter(
  target: number,
  duration: number,
  shouldAnimate: boolean,
  inView: boolean
) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  const start = useCallback(() => {
    if (hasAnimated.current || !shouldAnimate) {
      setCount(target)
      return
    }
    hasAnimated.current = true
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [target, duration, shouldAnimate])

  useEffect(() => {
    if (inView) {
      start()
    }
  }, [inView, start])

  return count
}

/* Individual stat card with counter */
function StatCardItem({
  card,
  prefersReduced,
  inView,
}: {
  card: StatCard
  prefersReduced: boolean | null
  inView: boolean
}) {
  const count = useAnimatedCounter(
    card.numericValue ?? 0,
    1200,
    !prefersReduced && !!card.numericValue,
    inView
  )

  const displayStat =
    card.numericValue && !prefersReduced
      ? `${card.prefix ?? ""}${count}${card.suffix ?? ""}`
      : card.stat

  return (
    <motion.div
      className="group relative bg-[#F5F7F7] p-10 overflow-hidden"
      variants={prefersReduced ? cardVariantReduced : cardVariant}
    >
      {/* Teal top border — CSS hover transition */}
      <div
        className="absolute left-0 right-0 top-0 h-[3px] origin-left scale-x-0 bg-teal-300 transition-transform duration-300 ease-out group-hover:scale-x-100"
        aria-hidden="true"
      />

      <p
        className="text-5xl font-medium text-teal-300"
        style={{ letterSpacing: "-0.04em" }}
      >
        {displayStat}
      </p>

      <p
        className="mt-3 text-sm font-normal text-[#162028]"
        style={{ lineHeight: 1.7 }}
      >
        {card.label}
      </p>

      <p
        className="mt-3 font-mono uppercase text-neutral-300"
        style={{ fontSize: "10px", letterSpacing: "0.1em" }}
      >
        {card.source}
      </p>
    </motion.div>
  )
}

export default function Problem() {
  const prefersReduced = useReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, amount: 0.15 })

  return (
    <section className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          variants={prefersReduced ? { hidden: {}, visible: {} } : headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            className="flex items-center gap-3 mb-4"
            variants={prefersReduced ? fadeUpReduced : fadeUp}
          >
            <span className="h-px w-6 bg-teal-300" />
            <p
              className="font-mono uppercase text-teal-300"
              style={{ fontSize: "11px", letterSpacing: "0.1em" }}
            >
              The Problem
            </p>
          </motion.div>

          <motion.h2
            className="text-3xl font-medium md:text-5xl"
            style={{
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#162028",
            }}
            variants={prefersReduced ? fadeUpReduced : fadeUp}
          >
            A market under pressure on{" "}
            <span className="text-teal-300">both sides.</span>
          </motion.h2>
        </motion.div>

        {/* Stat cards grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 gap-[1px] bg-neutral-200 md:grid-cols-3"
          variants={prefersReduced ? { hidden: {}, visible: {} } : container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {stats.map((card) => (
            <StatCardItem
              key={card.stat}
              card={card}
              prefersReduced={prefersReduced}
              inView={gridInView}
            />
          ))}
        </motion.div>

        {/* Bottom explanatory section */}
        <motion.div
          className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2"
          variants={prefersReduced ? { hidden: {}, visible: {} } : headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.p
            className="max-w-[52ch] text-base text-neutral-400"
            style={{ lineHeight: 1.7 }}
            variants={prefersReduced ? fadeUpReduced : fadeUp}
          >
            Consumers want to go out. Merchants need them to. But the economics
            are broken on both sides &mdash; rising costs squeeze margins while
            inflation erodes spending power. The result is a market where
            everyone loses unless someone rethinks the incentive structure.
          </motion.p>

          <motion.blockquote
            className="border-l-2 border-teal-300 pl-6"
            variants={prefersReduced ? fadeUpReduced : fadeUp}
          >
            <p
              className="text-base font-medium text-[#162028]"
              style={{ lineHeight: 1.7, letterSpacing: "-0.01em" }}
            >
              &ldquo;The tools that exist either extract value from merchants or
              send deal-seekers with no loyalty.&rdquo;
            </p>
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  )
}
