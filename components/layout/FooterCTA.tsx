"use client"

import { motion, useReducedMotion } from "framer-motion"
import WaitlistForm from "@/components/shared/WaitlistForm"

const EASE = [0.23, 1, 0.32, 1] as const

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
    transition: { duration: 0.7, ease: EASE },
  },
}

const blurUpReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

export default function FooterCTA() {
  const prefersReduced = useReducedMotion()
  const itemVariant = prefersReduced ? blurUpReduced : blurUp
  const containerVariant = prefersReduced ? { hidden: {}, visible: {} } : container

  return (
    <section className="bg-carbon py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Giant faint background text */}
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-white/[0.02] pointer-events-none select-none whitespace-nowrap"
        style={{ fontSize: "clamp(12rem, 20vw, 18rem)", lineHeight: 1, letterSpacing: "-0.04em" }}
        aria-hidden="true"
      >
        LATCH
      </span>

      <motion.div
        className="mx-auto max-w-2xl text-center relative"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Eyebrow */}
        <motion.p
          className="text-teal-300 font-mono text-xs uppercase mb-4"
          style={{ letterSpacing: "0.1em", fontSize: "11px" }}
          variants={itemVariant}
        >
          Join LatchClub
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="text-3xl md:text-5xl font-medium text-white"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
          variants={itemVariant}
        >
          Ready to{" "}
          <em className="not-italic text-teal-300" style={{ fontStyle: "italic" }}>
            unlock
          </em>{" "}
          your city?
        </motion.h2>

        {/* Sub */}
        <motion.p
          className="text-base text-neutral-400 mt-4 max-w-[60ch] mx-auto"
          style={{ lineHeight: 1.7 }}
          variants={itemVariant}
        >
          Be among the first to experience LatchClub when we launch in Toronto.
          Early access members get priority placement, founding member pricing,
          and first access to every new merchant.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
          variants={itemVariant}
        >
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center h-11 px-8 rounded-lg text-sm font-medium bg-teal-300 text-carbon hover:bg-teal-300/90 transition-opacity"
          >
            Get Early Access
            <span className="ml-1" aria-hidden="true">&rarr;</span>
          </a>
          <a
            href="mailto:invest@latchclub.ca"
            className="inline-flex items-center justify-center h-11 px-8 rounded-lg text-sm font-medium border border-white/20 text-white hover:bg-white/5 transition-opacity bg-transparent"
          >
            Investor Enquiries
            <span className="ml-1" aria-hidden="true">&#8599;</span>
          </a>
        </motion.div>

        {/* Waitlist Form */}
        <motion.div
          className="mt-10 flex justify-center"
          variants={itemVariant}
          id="waitlist"
        >
          <WaitlistForm variant="dark" />
        </motion.div>
      </motion.div>
    </section>
  )
}
