"use client"

import { motion, useReducedMotion } from "framer-motion"

const EASE = [0.23, 1, 0.32, 1] as const

interface ListItem {
  text: string
}

const memberPoints: ListItem[] = [
  { text: "3 coupons per merchant, per year \u2014 use them whenever you want" },
  { text: "Monthly plan: 1 coupon per merchant per month across all merchants" },
  { text: "Earn loyalty points every time you discover somewhere new" },
  { text: "Redeem points for more access at the places you love most" },
]

const investorPoints: ListItem[] = [
  { text: "Three compounding revenue streams from day one" },
  { text: "Asset-light model with low capital requirements" },
  { text: "3.3\u00D7 merchant ROI \u2014 the math sells itself" },
  { text: "Seed round: $750K \u00B7 12-month target: $500K+ ARR" },
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
}

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

const noAnimation = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

const noContainer = {
  hidden: {},
  visible: {},
}

export default function Bridge() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      className="px-6 py-20 md:py-28"
      style={{ backgroundColor: "#1E2F3A" }}
    >
      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[1fr_auto_1fr] md:gap-0"
        variants={prefersReduced ? noContainer : container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Left column — For Members */}
        <motion.div
          className="md:pr-12"
          variants={prefersReduced ? noAnimation : slideLeft}
        >
          <span className="inline-block rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-xs text-teal-300">
            For Members
          </span>

          <h2
            className="mt-6 text-3xl font-medium text-white md:text-4xl"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            Living well shouldn&apos;t be a{" "}
            <span className="italic text-teal-300">luxury.</span>
          </h2>

          <p
            className="mt-6 max-w-[52ch] text-base text-neutral-400"
            style={{ lineHeight: 1.7 }}
          >
            Toronto is one of the most expensive cities in North America. Latch
            gives you access to a curated network of restaurants, wellness
            studios, fitness spaces, and lifestyle experiences &mdash; all at a
            price that makes it effortless to say yes.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {memberPoints.map((item) => (
              <li
                key={item.text}
                className="flex items-start gap-3 text-sm text-neutral-300"
                style={{ lineHeight: 1.7 }}
              >
                <span className="mt-1.5 shrink-0 text-teal-300">&rarr;</span>
                {item.text}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Vertical divider — desktop only */}
        <div className="hidden items-stretch md:flex">
          <div
            className="w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #03A493, transparent)",
            }}
          />
        </div>

        {/* Right column — For Investors */}
        <motion.div
          className="md:pl-12"
          variants={prefersReduced ? noAnimation : slideRight}
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-400">
            For Investors
          </span>

          <h2
            className="mt-6 text-3xl font-medium text-white md:text-4xl"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            A $135B market with{" "}
            <span className="italic text-teal-300">zero</span> dominant
            players.
          </h2>

          <p
            className="mt-6 max-w-[52ch] text-base text-neutral-400"
            style={{ lineHeight: 1.7 }}
          >
            No savings membership platform has scaled across North America.
            Latch enters a category that The Entertainer proved in Dubai &mdash;
            a $2B business &mdash; and brings it to a market 10&times; larger,
            with better unit economics and a model built to protect merchants
            from day one.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {investorPoints.map((item) => (
              <li
                key={item.text}
                className="flex items-start gap-3 text-sm text-neutral-300"
                style={{ lineHeight: 1.7 }}
              >
                <span className="mt-1.5 shrink-0 text-teal-300">&rarr;</span>
                {item.text}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  )
}
