"use client"

import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

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

export default function Pricing() {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (isReduced) {
      gsap.set(".pricing-eyebrow, .pricing-heading, .pricing-sub, .pricing-card", {
        opacity: 1,
        y: 0,
        scale: 1,
      })
      return
    }

    // Header reveals (non-scrubbed, entrance)
    gsap.from(".pricing-eyebrow", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: ".pricing-section", start: "top 75%" },
    })

    gsap.from(".pricing-heading", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".pricing-section", start: "top 70%" },
    })

    gsap.from(".pricing-sub", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: ".pricing-section", start: "top 65%" },
    })

    // Scrubbed card stagger
    const cardTl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current?.querySelector(".pricing-cards-grid") || ".pricing-section",
        start: "top 80%",
        end: "top 20%",
        scrub: 0.8,
      },
    })

    const cards = container.current?.querySelectorAll(".pricing-card")
    if (cards) {
      cards.forEach((card, i) => {
        const isFeatured = card.classList.contains("pricing-featured")
        cardTl.fromTo(
          card,
          { y: 60, opacity: 0, scale: isFeatured ? 0.88 : 0.9 },
          {
            y: isFeatured ? -8 : 0,
            opacity: 1,
            scale: isFeatured ? 1.02 : 1,
            duration: 0.4,
            ease: "none",
          },
          i * 0.15
        )
      })
    }
  }, { scope: container })

  return (
    <section
      id="pricing"
      className="pricing-section bg-white dark:bg-[#0f1419] py-20 md:py-28 px-6"
      ref={container}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className="pricing-eyebrow font-mono text-xs uppercase text-teal-300 mb-4"
            style={{ letterSpacing: "0.1em", fontSize: "11px" }}
          >
            Consumer Pricing
          </p>
          <h2
            className="pricing-heading text-3xl md:text-5xl font-medium text-carbon dark:text-white"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            Plans for every{" "}
            <span className="italic text-teal-300">lifestyle.</span>
          </h2>
          <p
            className="pricing-sub text-base md:text-lg text-neutral-400 mt-4 max-w-[65ch] mx-auto"
            style={{ lineHeight: 1.7 }}
          >
            Monthly subscribers get 1 coupon per merchant per month.
            Annual subscribers get all 3 upfront.
          </p>
        </div>

        {/* Cards */}
        <div className="pricing-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.label}
              className={`
                pricing-card relative rounded-xl flex flex-col overflow-hidden transition-transform duration-150 ease-out
                ${tier.featured
                  ? "pricing-featured bg-carbon dark:bg-[#0a0f14] text-white border-2 border-carbon dark:border-teal-300/30 p-8 order-first md:order-none"
                  : "bg-white dark:bg-[#1E2F3A] border border-mist dark:border-white/10 p-8 hover:-translate-y-1"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
