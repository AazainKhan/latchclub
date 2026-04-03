"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"

const EASE = [0.23, 1, 0.32, 1] as const

interface PricingFeature {
  text: string
}

interface PricingTier {
  label: string
  price: string
  annual: string
  description: string
  features: PricingFeature[]
  cta: string
  featured: boolean
  badge?: string
}

const tiers: PricingTier[] = [
  {
    label: "STUDENT / SENIOR",
    price: "$5.99/mo",
    annual: "$49.99/yr · Save 30%",
    description: "Full access, discounted rate. ID verified.",
    features: [
      { text: "Full merchant directory" },
      { text: "3 coupons/merchant/year" },
      { text: "Loyalty points" },
      { text: "Standard support" },
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    label: "GENERAL",
    price: "$9.99/mo",
    annual: "$89.99/yr · Save 25%",
    description: "For everyday explorers across the city.",
    features: [
      { text: "Full merchant directory" },
      { text: "3 coupons/merchant/year" },
      { text: "Loyalty points" },
      { text: "Standard support" },
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    label: "PREMIUM",
    price: "$14.99/mo",
    annual: "$129.99/yr · Save 28%",
    description: "Power users who want it all, first.",
    badge: "Most Popular",
    features: [
      { text: "Everything in General" },
      { text: "Early merchant access" },
      { text: "Exclusive higher-value offers" },
      { text: "Priority support" },
    ],
    cta: "Get Early Access",
    featured: true,
  },
  {
    label: "TRAVELER",
    price: "$49.99/mo",
    annual: "No annual — flexible",
    description: "For tourists and visitors. High ARPU, no lock-in.",
    features: [
      { text: "Location-based discovery" },
      { text: "Cross-city access" },
      { text: "Curated local guides" },
      { text: "No commitment required" },
    ],
    cta: "Get Started",
    featured: false,
  },
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
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

const headerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
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

export default function Pricing() {
  const prefersReduced = useReducedMotion()
  const activeCard = prefersReduced ? cardVariantReduced : cardVariant
  const activeFade = prefersReduced ? fadeUpReduced : fadeUp

  return (
    <section id="pricing" className="bg-white dark:bg-[#0f1419] py-20 md:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={prefersReduced ? { hidden: {}, visible: {} } : headerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.p
            className="font-mono text-xs uppercase text-teal-300 mb-4"
            style={{ letterSpacing: "0.1em", fontSize: "11px" }}
            variants={activeFade}
          >
            Consumer Pricing
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-medium text-carbon dark:text-white"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
            variants={activeFade}
          >
            Plans for every{" "}
            <span className="italic text-teal-300">lifestyle.</span>
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-neutral-400 mt-4 max-w-[65ch] mx-auto"
            style={{ lineHeight: 1.7 }}
            variants={activeFade}
          >
            Monthly subscribers get 1 coupon per merchant per month.
            Annual subscribers get all 3 upfront.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.label}
              variants={activeCard}
              {...(!tier.featured && !prefersReduced
                ? {
                    whileHover: { y: -4 },
                    transition: { duration: 0.15, ease: "easeOut" },
                  }
                : {})}
              className={`
                relative rounded-xl flex flex-col overflow-hidden
                ${tier.featured
                  ? "bg-carbon dark:bg-[#0a0f14] text-white border-2 border-carbon dark:border-teal-300/30 p-8 order-first md:order-none"
                  : "bg-white dark:bg-[#1E2F3A] border border-mist dark:border-white/10 p-8"
                }
              `}
            >
              {/* Badge */}
              {tier.badge && (
                <span className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-300 text-carbon text-[11px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
                  {tier.badge}
                </span>
              )}

              {/* Tier label */}
              <p
                className="font-mono text-teal-300 mb-4"
                style={{ fontSize: "10px", letterSpacing: "0.12em" }}
              >
                {tier.label}
              </p>

              {/* Price */}
              <div className="mb-1">
                <span
                  className={`text-4xl font-medium ${tier.featured ? "text-white" : "text-carbon dark:text-white"}`}
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {tier.price}
                </span>
              </div>

              {/* Annual */}
              <p
                className={`text-sm mb-4 ${tier.featured ? "text-neutral-400" : "text-neutral-400"}`}
                style={{ lineHeight: 1.7 }}
              >
                {tier.annual}
              </p>

              {/* Description */}
              <p
                className={`text-sm mb-8 ${tier.featured ? "text-neutral-300" : "text-neutral-400"}`}
                style={{ lineHeight: 1.7 }}
              >
                {tier.description}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-300 mt-2 shrink-0" />
                    <span
                      className={`text-sm ${tier.featured ? "text-neutral-200" : "text-carbon dark:text-neutral-300"}`}
                      style={{ lineHeight: 1.7 }}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {tier.featured ? (
                <Button
                  className="w-full h-11 bg-teal-300 text-carbon hover:bg-teal-300/90 transition-opacity"
                >
                  {tier.cta}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full h-11 border-mist dark:border-white/10 text-carbon dark:text-white hover:bg-bone dark:hover:bg-white/5 transition-opacity"
                >
                  {tier.cta}
                </Button>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
