"use client"

import { useRef, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const blurUp = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 80 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const },
  },
}

const noAnimation = {
  hidden: {},
  visible: {},
}

interface StatRow {
  label: string
  value: string
  highlight: boolean
}

const stats: StatRow[] = [
  { label: "Total saved", value: "+$12,500 CAD", highlight: true },
  { label: "Deals redeemed", value: "+245", highlight: false },
  { label: "Avg. savings per deal", value: "$51", highlight: false },
]

export default function Spotlight() {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? noAnimation : blurUp
  const containerVariants = prefersReduced ? noAnimation : container
  const sectionRef = useRef<HTMLElement>(null)

  /* ── GSAP scroll-linked animations ── */
  useEffect(() => {
    if (prefersReduced) return

    const timer = setTimeout(() => {
      if (!sectionRef.current) return

      const ctx = gsap.context(() => {
        /* Parallax scrub on the heading — moves slower than scroll */
        gsap.to(".spotlight-heading", {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: ".spotlight-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })

        /* Scale-in on the metrics card */
        gsap.from(".spotlight-metrics-card", {
          scale: 0.9,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".spotlight-metrics-card",
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        })
      }, sectionRef.current)

      return () => ctx.revert()
    }, 100)

    return () => clearTimeout(timer)
  }, [prefersReduced])

  return (
    <section ref={sectionRef} className="spotlight-section bg-carbon py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Top badge */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.span
            variants={variants}
            className="inline-block rounded-md bg-teal-300 px-3 py-1 text-xs font-medium uppercase text-white"
            style={{ letterSpacing: "0.1em" }}
          >
            Spotlight
          </motion.span>
        </motion.div>

        {/* Two-column header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-5 md:items-end"
        >
          {/* Left column — 60% — GSAP parallax target */}
          <div className="spotlight-heading md:col-span-3">
            <motion.h2
              variants={variants}
              className="font-medium text-4xl md:text-6xl uppercase text-white"
              style={{ letterSpacing: "-0.04em", lineHeight: "0.95" }}
            >
              Intelligent
              <br />
              Savings
            </motion.h2>
          </div>

          {/* Right column — 40% */}
          <motion.div className="md:col-span-2">
            <motion.p
              variants={variants}
              className="text-base text-neutral-400 leading-relaxed"
              style={{ lineHeight: "1.7" }}
            >
              Automatically match you with the best deals using your location,
              preferences, and spending patterns. More savings, zero effort.
            </motion.p>
            <motion.a
              variants={variants}
              href="#"
              className="mt-4 inline-flex items-center gap-1 text-sm text-white transition-colors hover:text-teal-300"
            >
              Learn more
              <span aria-hidden="true">&rarr;</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Metrics card — GSAP scale-in target */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12"
        >
          <div className="spotlight-metrics-card relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:items-center">
              {/* Left heading */}
              <div className="md:col-span-1">
                <p
                  className="text-xs font-medium uppercase text-neutral-400"
                  style={{ letterSpacing: "0.1em" }}
                >
                  Overall savings
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-col gap-6 md:col-span-2">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-baseline justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-neutral-400">
                      {stat.label}
                    </span>
                    <span
                      className={`font-medium ${
                        stat.highlight
                          ? "text-2xl text-teal-300"
                          : "text-lg text-white"
                      }`}
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Decorative sparkle */}
              <div className="hidden items-center justify-center md:flex md:col-span-1">
                <span
                  className="select-none text-6xl text-teal-300/20"
                  aria-hidden="true"
                >
                  ✦
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
