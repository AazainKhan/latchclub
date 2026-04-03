"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
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
  badge?: string
  buttonVariant: "default" | "outline"
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
    buttonVariant: "outline",
  },
  {
    name: "Member",
    price: "$15",
    description: "Unlock the full Latchclub experience.",
    badge: "Popular",
    features: [
      { text: "Unlimited deals" },
      { text: "All categories" },
      { text: "Priority support" },
      { text: "Early access to new partners" },
      { text: "Member-only events" },
    ],
    cta: "Join Waitlist",
    featured: true,
    buttonVariant: "default",
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
    buttonVariant: "outline",
  },
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className="text-xs uppercase text-neutral-300 mb-4"
            style={{ letterSpacing: "0.1em", fontSize: "11px" }}
          >
            Pricing
          </p>
          <h2
            className="text-3xl md:text-4xl font-medium text-carbon"
            style={{ letterSpacing: "-0.02em" }}
          >
            Simple, transparent pricing.
          </h2>
          <p
            className="text-lg text-neutral-300 mt-4 max-w-[65ch] mx-auto"
            style={{ lineHeight: 1.7 }}
          >
            Start free. Upgrade when you&apos;re ready.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={cardVariant}
              className={`
                rounded-xl bg-white p-6 md:p-8 flex flex-col
                ${tier.featured
                  ? "border-2 border-carbon order-first md:order-none"
                  : "border border-mist"
                }
              `}
            >
              {/* Tier name + badge */}
              <div className="flex items-center gap-2 mb-4">
                <h3
                  className="text-lg font-medium text-carbon"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {tier.name}
                </h3>
                {tier.badge && (
                  <span className="bg-teal-50 text-teal-500 text-xs px-2 py-0.5 rounded-full font-medium">
                    {tier.badge}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-2">
                <span
                  className="text-4xl font-medium text-carbon"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {tier.price}
                </span>
                <span className="text-sm text-neutral-300">/month</span>
              </div>

              {/* Description */}
              <p
                className="text-sm text-neutral-300 mb-6"
                style={{ lineHeight: 1.7 }}
              >
                {tier.description}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5">
                    <Check className="size-4 text-teal-300 mt-0.5 shrink-0" />
                    <span
                      className="text-sm text-carbon"
                      style={{ lineHeight: 1.7 }}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={tier.buttonVariant}
                className={`w-full h-10 ${
                  tier.featured ? "bg-carbon text-white" : ""
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
