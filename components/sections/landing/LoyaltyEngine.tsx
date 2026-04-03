"use client"

import { motion, useReducedMotion } from "framer-motion"

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

const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
}

const noAnimation = {
  hidden: {},
  visible: {},
}

const noAnimationOpacity = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

interface LoyaltyCard {
  number: string
  icon: string
  title: string
  body: string
  tag: string
}

const cards: LoyaltyCard[] = [
  {
    number: "01",
    icon: "\u2B21",
    title: "3 Coupons Per Merchant",
    body: "Each subscriber gets exactly 3 coupons per merchant per year on annual plans. Enough to build a habit — not enough to drain margin. Merchants stay protected while consumers get real, repeatable value.",
    tag: "MERCHANT PROTECTION",
  },
  {
    number: "02",
    icon: "\u25CE",
    title: "Cross-Merchant Discovery",
    body: "Redeeming at a new merchant earns loyalty points. The system rewards exploration — pushing subscribers to try businesses they wouldn\u2019t have found on their own. Every new visit is a tracked acquisition.",
    tag: "DISCOVERY REWARD",
  },
  {
    number: "03",
    icon: "\u25C8",
    title: "Points Unlock More",
    body: "Accumulated points convert to bonus coupons at your favourites. The more you explore, the more you can return. It\u2019s a flywheel — discovery fuels retention, retention fuels lifetime value.",
    tag: "RETENTION ENGINE",
  },
  {
    number: "04",
    icon: "\u27E1",
    title: "Annual Reset",
    body: "Every year starts fresh. New coupons, new points, fresh opportunities for both sides. Merchants get a clean slate of high-intent traffic. Subscribers get renewed reasons to explore.",
    tag: "ANNUAL CYCLE",
  },
]

export default function LoyaltyEngine() {
  const prefersReduced = useReducedMotion()

  const headerVariants = prefersReduced ? noAnimation : container
  const itemVariants = prefersReduced ? noAnimationOpacity : blurUp
  const gridVariants = prefersReduced ? noAnimation : cardStagger
  const activeCardVariant = prefersReduced ? noAnimationOpacity : cardVariant

  return (
    <section className="bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header — two-column */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16"
        >
          <div>
            <motion.p
              variants={itemVariants}
              className="flex items-center gap-2 text-xs uppercase text-neutral-300"
              style={{ letterSpacing: "0.1em", fontSize: "11px" }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "#03A493" }}
              />
              The Loyalty Engine
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="mt-4 text-3xl font-medium text-carbon md:text-5xl"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              Rewarding{" "}
              <em style={{ color: "#03A493", fontStyle: "italic" }}>
                discovery.
              </em>
              <br />
              Protecting merchants.
            </motion.h2>
          </div>
          <motion.div
            variants={itemVariants}
            className="flex items-end"
          >
            <p
              className="text-base text-neutral-300"
              style={{ lineHeight: 1.7 }}
            >
              The Groupon problem was simple: unlimited discounts drained
              merchants dry. Latch fixes this with a capped coupon model and a
              loyalty engine that rewards consumers for trying new places —
              not just hammering the same deal. Merchants get protected,
              trackable exposure. Consumers get a system that actually gets
              better the more they use it.
            </p>
          </motion.div>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid grid-cols-1 gap-0.5 md:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((card) => (
            <motion.div
              key={card.number}
              variants={activeCardVariant}
              {...(!prefersReduced
                ? {
                    whileHover: {
                      y: -4,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
                    },
                    transition: { duration: 0.15, ease: "easeOut" },
                  }
                : {})}
              className="relative overflow-hidden rounded-none bg-white p-8 first:rounded-t-xl last:rounded-b-xl md:first:rounded-l-xl md:first:rounded-tr-none md:last:rounded-r-xl md:last:rounded-bl-none lg:first:rounded-l-xl lg:last:rounded-r-xl"
            >
              {/* Large faint number */}
              <span
                className="pointer-events-none absolute right-4 top-4 select-none text-7xl font-medium"
                style={{ color: "rgba(3, 164, 147, 0.08)" }}
                aria-hidden="true"
              >
                {card.number}
              </span>

              {/* Icon */}
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: "rgba(3, 164, 147, 0.08)",
                  border: "1px solid rgba(3, 164, 147, 0.15)",
                }}
              >
                <span className="text-base" style={{ color: "#03A493" }}>
                  {card.icon}
                </span>
              </div>

              {/* Title */}
              <h3
                className="mt-5 text-base font-medium text-carbon"
                style={{ letterSpacing: "-0.02em" }}
              >
                {card.title}
              </h3>

              {/* Body */}
              <p
                className="mt-3 text-sm leading-relaxed text-neutral-300"
                style={{ lineHeight: 1.7 }}
              >
                {card.body}
              </p>

              {/* Tag */}
              <span
                className="mt-6 inline-block font-mono text-[10px] uppercase tracking-widest rounded-full px-3 py-1"
                style={{
                  backgroundColor: "rgba(3, 164, 147, 0.06)",
                  color: "#03A493",
                  letterSpacing: "0.08em",
                }}
              >
                {card.tag}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
