"use client"

import { useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"

interface LoyaltyCard {
  number: string
  title: string
  body: string
  tag: string
}

const cards: LoyaltyCard[] = [
  {
    number: "01",
    title: "3 Coupons Per Merchant",
    body: "Each subscriber gets exactly 3 coupons per merchant per year. Caps exposure. Prevents abuse.",
    tag: "MERCHANT PROTECTION",
  },
  {
    number: "02",
    title: "Cross-Merchant Discovery",
    body: "Redeeming at a new merchant earns loyalty points. The more you explore, the more you earn.",
    tag: "DISCOVERY REWARD",
  },
  {
    number: "03",
    title: "Points Unlock More",
    body: "Accumulated points convert to bonus coupons at your favourites.",
    tag: "RETENTION ENGINE",
  },
  {
    number: "04",
    title: "Annual Reset",
    body: "Every year starts fresh. New coupons, new opportunities.",
    tag: "ANNUAL CYCLE",
  },
]

export default function LoyaltyEngine() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const isReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      if (isReduced) {
        gsap.set(".le-reveal", { opacity: 1, y: 0 })
        return
      }

      const section = container.current
      if (!section) return

      // Header reveals
      gsap.from(".le-header-reveal", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })

      // Cards stagger in
      gsap.from(".le-card", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".le-cards-grid",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })
    },
    { scope: container }
  )

  return (
    <section ref={container} className="bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 mb-16">
          <div>
            <p
              className="le-header-reveal flex items-center gap-2 text-[11px] uppercase text-neutral-300"
              style={{ letterSpacing: "0.1em" }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "#03A493" }}
              />
              The Loyalty Engine
            </p>
            <h2
              className="le-header-reveal mt-4 font-medium text-carbon"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Rewarding{" "}
              <em style={{ color: "#03A493", fontStyle: "italic" }}>
                discovery.
              </em>
              <br />
              Protecting merchants.
            </h2>
          </div>
          <div className="le-header-reveal flex items-end">
            <p
              className="text-base text-neutral-300"
              style={{ lineHeight: 1.7 }}
            >
              The Groupon problem was simple: unlimited discounts drained
              merchants dry. Latch fixes this with a capped coupon model and a
              loyalty engine that rewards consumers for trying new places —
              not just hammering the same deal.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="le-cards-grid grid grid-cols-1 gap-0.5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.number}
              className="le-card relative overflow-hidden bg-white p-8 first:rounded-t-xl last:rounded-b-xl md:first:rounded-l-xl md:first:rounded-tr-none md:last:rounded-r-xl md:last:rounded-bl-none lg:first:rounded-l-xl lg:last:rounded-r-xl"
              style={{ border: "0.5px solid #D2DBDE" }}
            >
              {/* Large faint number */}
              <span
                className="pointer-events-none absolute right-4 top-4 select-none text-7xl font-medium"
                style={{ color: "rgba(3, 164, 147, 0.08)" }}
                aria-hidden="true"
              >
                {card.number}
              </span>

              {/* Title */}
              <h3
                className="relative text-base font-medium text-carbon"
                style={{ letterSpacing: "-0.02em" }}
              >
                {card.title}
              </h3>

              {/* Body */}
              <p
                className="relative mt-3 text-sm text-neutral-300"
                style={{ lineHeight: 1.7 }}
              >
                {card.body}
              </p>

              {/* Tag */}
              <span
                className="relative mt-6 inline-block font-mono text-[10px] uppercase rounded-full px-3 py-1"
                style={{
                  backgroundColor: "rgba(3, 164, 147, 0.06)",
                  color: "#03A493",
                  letterSpacing: "0.08em",
                }}
              >
                {card.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
