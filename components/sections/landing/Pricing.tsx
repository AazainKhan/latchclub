"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface PricingFeature {
  text: string
}

interface PricingTier {
  name: string
  price: string
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
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const cardVariantReduced = {
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
    <section id="pricing" className="bg-bone py-16 md:py-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-300" />
            <p
              className="text-xs uppercase text-neutral-300"
              style={{ letterSpacing: "0.1em", fontSize: "11px" }}
            >
              Pricing
            </p>
          </div>
          <h2
            className="text-3xl md:text-5xl font-medium text-carbon"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            <span className="text-neutral-200">Simple, transparent </span>
            pricing.
          </h2>
          <p
            className="text-lg text-neutral-300 mt-4 max-w-[65ch] mx-auto"
            style={{ lineHeight: 1.7 }}
          >
            Start free. Upgrade when you&apos;re ready.
          </p>
        </div>

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
          {/* Gradient orb behind featured card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-300/5 rounded-full blur-3xl pointer-events-none" />

          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={activeCardVariant}
              className={`
                rounded-xl flex flex-col relative
                ${tier.featured
                  ? "bg-carbon text-white border-2 border-carbon order-first md:order-none p-8 md:p-10"
                  : "bg-white border border-mist p-8 md:p-10"
                }
              `}
            >
              {/* Tier name + popular badge */}
              <div className="flex items-center gap-2.5 mb-4">
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
              <div className="flex items-baseline gap-1 mb-2">
                <span
                  className={`text-5xl font-medium ${tier.featured ? "text-white" : "text-carbon"}`}
                  style={{ letterSpacing: "-0.04em" }}
                >
                  {tier.price}
                </span>
                <span className={`text-sm ${tier.featured ? "text-neutral-400" : "text-neutral-300"}`}>
                  /month
                </span>
              </div>

              {/* Description */}
              <p
                className={`text-sm mb-8 ${tier.featured ? "text-neutral-400" : "text-neutral-300"}`}
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
                className={`w-full h-11 transition-opacity hover:opacity-90 ${
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
