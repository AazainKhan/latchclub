"use client"

import { gsap } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import WaitlistForm from "@/components/shared/WaitlistForm"

export default function FooterCTA() {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    gsap.from(".cta-heading", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".cta-section", start: "top 75%" },
    })

    gsap.from(".cta-sub", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: ".cta-section", start: "top 70%" },
    })

    gsap.from(".cta-form", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: ".cta-section", start: "top 65%" },
    })
  }, { scope: container })

  return (
    <section
      className="cta-section bg-carbon py-24 md:py-32 px-6 relative overflow-hidden"
      ref={container}
    >
      {/* Giant faint background text */}
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-white/[0.02] pointer-events-none select-none whitespace-nowrap"
        style={{ fontSize: "clamp(12rem, 20vw, 18rem)", lineHeight: 1, letterSpacing: "-0.04em" }}
        aria-hidden="true"
      >
        LATCH
      </span>

      <div className="mx-auto max-w-2xl text-center relative">
        {/* Headline */}
        <h2
          className="cta-heading text-3xl md:text-5xl font-medium text-white"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          Ready to{" "}
          <em className="not-italic text-teal-300" style={{ fontStyle: "italic" }}>
            unlock
          </em>{" "}
          your city?
        </h2>

        {/* Sub */}
        <p
          className="cta-sub text-base text-neutral-400 mt-4 max-w-[55ch] mx-auto"
          style={{ lineHeight: 1.7 }}
        >
          Join the waitlist and be among the first to experience LatchClub
          when we launch in Toronto.
        </p>

        {/* Waitlist Form — single clear CTA */}
        <div className="cta-form mt-8 flex justify-center" id="waitlist">
          <WaitlistForm variant="dark" />
        </div>
      </div>
    </section>
  )
}
