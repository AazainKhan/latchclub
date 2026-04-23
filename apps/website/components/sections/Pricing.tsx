"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    tier: "General",
    price: "$89.99",
    period: "/yr",
    trial: "Free 30-day trial",
    description: "For everyday explorers across the city.",
    features: [
      "Full merchant directory",
      "3 coupons/merchant/year",
      "Loyalty points",
      "Standard support",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    tier: "Premium",
    price: "$129.99",
    period: "/yr",
    trial: "Free 30-day trial",
    description: "Power users who want it all, first.",
    badge: "Most Popular",
    features: [
      "Everything in General",
      "Early merchant access",
      "Exclusive higher-value offers",
      "Priority support",
    ],
    cta: "Get Started",
    featured: true,
  },
  {
    tier: "Student / Senior",
    price: "$59.99",
    period: "/yr",
    trial: "Free 30-day trial",
    description: "Full access, discounted rate. ID verified.",
    features: [
      "Full merchant directory",
      "3 coupons/merchant/year",
      "Loyalty points",
      "Standard support",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    tier: "Traveler",
    price: "$19.99",
    period: "/mo",
    trial: "Free 3-day trial",
    description: "For tourists and visitors.",
    features: [
      "Location-based discovery",
      "Local equivalent offers",
      "Curated local guides",
      "No commitment required",
    ],
    cta: "Get Started",
    featured: false,
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  // No GSAP entrance animation for pricing cards — the hover micro-animations
  // are the main interaction. Entrance animations caused cards to disappear
  // when navigating via anchor links due to GSAP timing conflicts with
  // ScrollTrigger pinned sections.
  useGSAP(
    () => {
      // Intentionally empty — kept for potential future use
    },
    { scope: sectionRef }
  );

  const handleCardEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const isFeatured = card.dataset.featured === "true";

    // Lift card up
    gsap.to(card, {
      y: -8,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });

    // Glow/border fires immediately, no lag
    gsap.to(card, {
      boxShadow: isFeatured
        ? "0 20px 50px rgba(3,164,147,0.15), 0 8px 24px rgba(0,0,0,0.2)"
        : "0 20px 50px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)",
      borderColor: isFeatured ? "rgba(3,164,147,0.4)" : "rgba(3,164,147,0.2)",
      duration: 0.12,
      ease: "power1.out",
      overwrite: "auto",
    });

    // Stagger-pulse the bullet dots
    const dots = card.querySelectorAll(".feature-dot");
    gsap.fromTo(
      dots,
      { scale: 1 },
      { scale: 1.8, duration: 0.2, stagger: 0.05, ease: "power2.out", yoyo: true, repeat: 1 }
    );

    // Subtle price scale pop
    const price = card.querySelector(".price-value");
    if (price) {
      gsap.fromTo(price, { scale: 1 }, { scale: 1.05, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 });
    }
  }, []);

  const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const isFeatured = card.dataset.featured === "true";

    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(card, {
      boxShadow: isFeatured
        ? "0 20px 25px -5px rgba(22,32,40,0.2)"
        : "0 1px 2px rgba(0,0,0,0.05)",
      borderColor: isFeatured ? "rgba(45,212,191,0.25)" : "rgba(22,32,40,0.1)",
      duration: 0.12,
      ease: "power1.out",
      overwrite: "auto",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-16 md:py-24 bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="pricing-label text-xs uppercase tracking-[0.2em] text-teal-400 mb-3">
            Consumer Pricing
          </p>
          <h2 className="pricing-heading text-3xl md:text-5xl font-heading font-medium tracking-tight text-foreground">
            Plans for every <em className="italic text-teal-400">lifestyle.</em>
          </h2>
          <p className="pricing-sub text-muted-foreground mt-4 max-w-2xl mx-auto text-base" style={{ lineHeight: 1.7 }}>
            Annual subscribers get 3 coupon per merchant per year
          </p>
        </div>

        {/* Cards grid */}
        <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {plans.map((plan) => (
            <div
              key={plan.tier}
              data-featured={plan.featured}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
              className={cn(
                "pricing-card relative rounded-2xl border p-6 md:p-7 flex flex-col cursor-default",
                plan.featured
                  ? "bg-carbon text-bone border-teal-400/25 shadow-xl shadow-carbon/20"
                  : "bg-card text-foreground border-border shadow-sm"
              )}
              style={{ willChange: "transform, box-shadow" }}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-teal-400 text-white text-[11px] font-medium tracking-wide px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Tier name */}
              <p
                className={cn(
                  "text-xs uppercase tracking-[0.12em] mb-5",
                  plan.featured ? "text-teal-300" : "text-teal-400"
                )}
              >
                {plan.tier}
              </p>

              {/* Price */}
              <div className="mb-1">
                <span className="price-value text-4xl md:text-[2.75rem] font-normal tracking-tight inline-block origin-left">
                  {plan.price}
                </span>
                <span
                  className={cn(
                    "text-base ml-0.5",
                    plan.featured ? "text-bone/60" : "text-muted-foreground"
                  )}
                >
                  {plan.period}
                </span>
              </div>

              {/* Trial badge */}
              <p
                className={cn(
                  "text-sm mb-4",
                  plan.featured ? "text-teal-300" : "text-teal-400"
                )}
              >
                {plan.trial}
              </p>

              {/* Description */}
              <p
                className={cn(
                  "text-sm leading-relaxed mb-6",
                  plan.featured ? "text-bone/70" : "text-muted-foreground"
                )}
              >
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <div
                      className={cn(
                        "feature-dot w-1.5 h-1.5 rounded-full mt-[7px] shrink-0",
                        plan.featured ? "bg-teal-300" : "bg-teal-400"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm",
                        plan.featured ? "text-bone/80" : "text-muted-foreground"
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                className={cn(
                  "w-full rounded-xl h-11 font-normal text-sm",
                  plan.featured
                    ? "bg-teal-400 hover:bg-teal-300 text-foreground"
                    : "bg-transparent border border-border text-foreground hover:bg-muted"
                )}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
