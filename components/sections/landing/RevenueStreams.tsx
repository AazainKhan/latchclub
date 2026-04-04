"use client"

import { useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"

interface RevenueStream {
  number: string
  badge: string
  badgeLive: boolean
  title: string
  body: string
  amount: string
}

const streams: RevenueStream[] = [
  {
    number: "01",
    badge: "LIVE AT LAUNCH",
    badgeLive: true,
    title: "Merchant Onboarding",
    body: "Annual deposit per merchant. Founding Partners get Year 1 waived to accelerate early adoption and build density.",
    amount: "$2,000\u2013$2,500/yr per merchant",
  },
  {
    number: "02",
    badge: "LIVE AT LAUNCH",
    badgeLive: true,
    title: "Consumer Subscriptions",
    body: "Monthly and annual plans across four tiers. Freemium entry point converts to paid through usage-gated value.",
    amount: "$5.99 to $49.99/mo \u00B7 Four tiers",
  },
  {
    number: "03",
    badge: "PHASE 2",
    badgeLive: false,
    title: "Payment Processing",
    body: "In-app payments with auto-calculated discounts at checkout. Frictionless redemption drives repeat usage.",
    amount: "Small % per transaction",
  },
]

export default function RevenueStreams() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const isReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      if (isReduced) {
        gsap.set(".rs-reveal", { opacity: 1, y: 0 })
        return
      }

      const section = container.current
      if (!section) return

      // Header reveals
      gsap.from(".rs-header-reveal", {
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
      gsap.from(".rs-card", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".rs-cards-grid",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })
    },
    { scope: container }
  )

  return (
    <section ref={container} className="bg-carbon py-20 md:py-28 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="rs-header-reveal flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-300" />
            <p
              className="text-[11px] uppercase text-neutral-400"
              style={{ letterSpacing: "0.1em" }}
            >
              Revenue Model
            </p>
          </div>
          <h2
            className="rs-header-reveal font-medium text-white"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Three{" "}
            <span className="italic text-teal-300">compounding</span>{" "}
            revenue streams.
          </h2>
          <p
            className="rs-header-reveal text-base md:text-lg text-neutral-400 mt-4 max-w-[65ch]"
            style={{ lineHeight: 1.7 }}
          >
            Each stream reinforces the others — more merchants attract more
            subscribers, more subscribers attract more merchants.
          </p>
        </div>

        {/* Cards */}
        <div className="rs-cards-grid grid grid-cols-1 md:grid-cols-3 gap-px">
          {streams.map((stream) => (
            <div
              key={stream.number}
              className="rs-card relative overflow-hidden p-10"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "0.5px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Large faint number */}
              <span
                className="absolute -right-2 -top-4 font-medium pointer-events-none select-none"
                style={{
                  fontSize: "120px",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "rgba(3, 164, 147, 0.05)",
                }}
                aria-hidden="true"
              >
                {stream.number}
              </span>

              {/* Badge */}
              <span
                className={`relative inline-block text-[10px] uppercase px-2.5 py-1 rounded-full mb-6 ${
                  stream.badgeLive
                    ? "bg-teal-300/10 text-teal-300"
                    : "bg-neutral-700 text-neutral-400"
                }`}
                style={{ letterSpacing: "0.08em" }}
              >
                {stream.badge}
              </span>

              {/* Title */}
              <h3
                className="relative font-medium text-white text-lg mb-3"
                style={{ letterSpacing: "-0.02em" }}
              >
                {stream.title}
              </h3>

              {/* Body */}
              <p
                className="relative text-sm text-neutral-400"
                style={{ lineHeight: 1.7 }}
              >
                {stream.body}
              </p>

              {/* Amount */}
              <div
                className="relative pt-4 mt-4"
                style={{ borderTop: "0.5px solid rgba(255, 255, 255, 0.1)" }}
              >
                <p className="text-teal-300 font-mono text-sm">
                  {stream.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
