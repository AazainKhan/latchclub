"use client"

import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import WaitlistForm from "@/components/shared/WaitlistForm"

export default function FooterCTA() {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    gsap.from(".cta-eyebrow", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: ".cta-section", start: "top 75%" },
    })

    gsap.from(".cta-heading", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".cta-section", start: "top 70%" },
    })

    gsap.from(".cta-sub", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: ".cta-section", start: "top 65%" },
    })

    gsap.from(".cta-buttons", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: ".cta-section", start: "top 60%" },
    })

    gsap.from(".cta-form", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: ".cta-section", start: "top 55%" },
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
        {/* Eyebrow */}
        <p
          className="cta-eyebrow text-teal-300 font-mono text-xs uppercase mb-4"
          style={{ letterSpacing: "0.1em", fontSize: "11px" }}
        >
          Join LatchClub
        </p>

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
          className="cta-sub text-base text-neutral-400 mt-4 max-w-[60ch] mx-auto"
          style={{ lineHeight: 1.7 }}
        >
          Be among the first to experience LatchClub when we launch in Toronto.
          Early access members get priority placement, founding member pricing,
          and first access to every new merchant.
        </p>

        {/* Buttons */}
        <div
          className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
        >
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center h-11 px-8 rounded-lg text-sm font-medium bg-teal-300 text-carbon hover:bg-teal-300/90 transition-opacity"
          >
            Get Early Access
            <span className="ml-1" aria-hidden="true">&rarr;</span>
          </a>
          <a
            href="mailto:invest@latchclub.ca"
            className="inline-flex items-center justify-center h-11 px-8 rounded-lg text-sm font-medium border border-white/20 text-white hover:bg-white/5 transition-opacity bg-transparent"
          >
            Investor Enquiries
            <span className="ml-1" aria-hidden="true">&#8599;</span>
          </a>
        </div>

        {/* Waitlist Form */}
        <div
          className="cta-form mt-10 flex justify-center"
          id="waitlist"
        >
          <WaitlistForm variant="dark" />
        </div>
      </div>
    </section>
  )
}
