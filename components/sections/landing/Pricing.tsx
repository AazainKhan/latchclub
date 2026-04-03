"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface PricingFeature {
  text: string
}

interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  features: PricingFeature[]
  cta: string
  featured: boolean
  popular?: boolean
}

const tiers: PricingTier[] = [
  {
    name: "Explorer",
    price: "$0",
    period: "forever",
    description: "Get a taste of what Latchclub offers.",
    features: [
      { text: "5 deals per month" },
      { text: "Basic categories" },
      { text: "Email support" },
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Member",
    price: "$15",
    period: "/month",
    description: "Unlock the full Latchclub experience.",
    popular: true,
    features: [
      { text: "Unlimited deals" },
      { text: "All categories" },
      { text: "Priority support" },
      { text: "Early access to new partners" },
      { text: "Member-only events" },
    ],
    cta: "Join Waitlist",
    featured: true,
  },
  {
    name: "Family",
    price: "$25",
    period: "/month",
    description: "Share the savings with your household.",
    features: [
      { text: "Everything in Member" },
      { text: "Up to 4 family members" },
      { text: "Family dashboard" },
      { text: "Shared deal history" },
    ],
    cta: "Join Waitlist",
    featured: false,
  },
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const },
  },
}

const cardVariantReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

const sectionHeader = {
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

const blurUpReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

export default function Pricing() {
  const prefersReduced = useReducedMotion()
  const activeCardVariant = prefersReduced ? cardVariantReduced : cardVariant

  return (
    <section id="pricing" className="bg-white py-20 md:py-28 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header — staggered entrance */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={prefersReduced ? { hidden: {}, visible: {} } : sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            variants={prefersReduced ? blurUpReduced : blurUp}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-300" />
            <p
              className="text-xs uppercase text-neutral-300"
              style={{ letterSpacing: "0.1em", fontSize: "11px" }}
            >
              Pricing
            </p>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-5xl font-medium text-carbon"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
            variants={prefersReduced ? blurUpReduced : blurUp}
          >
            <span className="text-neutral-200">Simple, transparent </span>
            pricing.
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-300 mt-4 max-w-[65ch] mx-auto"
            style={{ lineHeight: 1.7 }}
            variants={prefersReduced ? blurUpReduced : blurUp}
          >
            Start free. Upgrade when you&apos;re ready.
          </motion.p>
        </motion.div>

        {/* Horizontal rule */}
        <div className="border-t border-mist mb-12 md:mb-16" />

        {/* Cards */}
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={activeCardVariant}
              {...(!tier.featured && !prefersReduced
                ? {
                    whileHover: { y: -4 },
                    transition: { duration: 0.15, ease: "easeOut" },
                  }
                : {})}
              className={`
                rounded-xl flex flex-col relative overflow-hidden
                ${tier.featured
                  ? "bg-carbon text-white border-2 border-carbon order-first md:order-none p-8 md:p-10"
                  : "bg-white border border-mist p-8 md:p-10"
                }
              `}
            >
              {/* Decorative watermark on featured card */}
              {tier.featured && (
                <span
                  className="absolute -right-4 -top-4 text-white/[0.04] font-medium pointer-events-none select-none"
                  style={{ fontSize: "160px", letterSpacing: "-0.04em", lineHeight: 1 }}
                  aria-hidden="true"
                >
                  15
                </span>
              )}

              {/* Tier name + popular badge */}
              <div className="relative flex items-center gap-2.5 mb-4">
                <h3
                  className={`text-lg font-medium ${tier.featured ? "text-white" : "text-carbon"}`}
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {tier.name}
                </h3>
                {tier.popular && (
                  <span className="bg-teal-300 text-white text-xs px-2.5 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="relative flex items-baseline gap-1 mb-2">
                <span
                  className={`text-5xl font-medium ${tier.featured ? "text-white" : "text-carbon"}`}
                  style={{ letterSpacing: "-0.04em" }}
                >
                  {tier.price}
                </span>
                <span className={`text-sm ${tier.featured ? "text-neutral-400" : "text-neutral-300"}`}>
                  {tier.period}
                </span>
              </div>

              {/* Description */}
              <p
                className={`relative text-sm mb-8 ${tier.featured ? "text-neutral-400" : "text-neutral-300"}`}
                style={{ lineHeight: 1.7 }}
              >
                {tier.description}
              </p>

              {/* Features */}
              <ul className="relative flex flex-col gap-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-300 mt-2 shrink-0" />
                    <span
                      className={`text-sm ${tier.featured ? "text-neutral-200" : "text-carbon"}`}
                      style={{ lineHeight: 1.7 }}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={tier.featured ? "secondary" : "outline"}
                className={`relative w-full h-11 transition-opacity hover:opacity-90 ${
                  tier.featured
                    ? "bg-white text-carbon hover:bg-white/90"
                    : "border-mist text-carbon hover:bg-bone"
                }`}
              >
                {tier.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
