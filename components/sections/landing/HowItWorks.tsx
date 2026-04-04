"use client"

import { useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"

interface Step {
  number: string
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: "01",
    title: "Subscribe",
    description:
      "Choose monthly or annual. From $5.99/mo. Cancel anytime.",
  },
  {
    number: "02",
    title: "Browse & Save",
    description:
      "200+ restaurants, spas, fitness spots. All in one place.",
  },
  {
    number: "03",
    title: "Redeem",
    description:
      "Show your phone. No codes, no hassle. Savings applied instantly.",
  },
]

export default function HowItWorks() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const isReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      if (isReduced) {
        // Show first step, set progress to 0
        gsap.set(".hiw-step", { opacity: 1, y: 0 })
        return
      }

      const section = container.current
      if (!section) return

      const stepEls = section.querySelectorAll(".hiw-step")
      const progressFill = section.querySelector(".hiw-progress-fill")
      const stepIndicators = section.querySelectorAll(".hiw-step-dot")

      // Entrance animation
      gsap.from(".hiw-label", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      gsap.from(".hiw-heading", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Pin the section and cycle through steps on scroll
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress // 0 to 1
          const activeIndex = Math.min(
            Math.floor(progress * steps.length),
            steps.length - 1
          )

          // Update progress bar
          if (progressFill) {
            gsap.set(progressFill, {
              scaleX: progress,
            })
          }

          // Update step visibility
          stepEls.forEach((el, i) => {
            const htmlEl = el as HTMLElement
            if (i === activeIndex) {
              gsap.to(htmlEl, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power3.out",
                overwrite: true,
              })
            } else if (i < activeIndex) {
              gsap.to(htmlEl, {
                opacity: 0,
                y: -24,
                duration: 0.3,
                ease: "power3.out",
                overwrite: true,
              })
            } else {
              gsap.to(htmlEl, {
                opacity: 0,
                y: 24,
                duration: 0.3,
                ease: "power3.out",
                overwrite: true,
              })
            }
          })

          // Update step indicators
          stepIndicators.forEach((dot, i) => {
            const htmlDot = dot as HTMLElement
            if (i <= activeIndex) {
              htmlDot.classList.add("bg-teal-300")
              htmlDot.classList.remove("bg-white/20")
            } else {
              htmlDot.classList.remove("bg-teal-300")
              htmlDot.classList.add("bg-white/20")
            }
          })
        },
      })

      // Set initial state: first step visible, others hidden below
      gsap.set(stepEls[0], { opacity: 1, y: 0 })
      stepEls.forEach((el, i) => {
        if (i > 0) gsap.set(el, { opacity: 0, y: 24 })
      })
    },
    { scope: container }
  )

  return (
    <section
      ref={container}
      className="relative bg-carbon text-white overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      <div className="flex flex-col justify-center items-center h-dvh px-6">
        {/* Section label */}
        <p className="hiw-label text-[11px] uppercase tracking-[0.1em] text-white/40 mb-4">
          How It Works
        </p>

        {/* Heading */}
        <h2
          className="hiw-heading text-center font-medium mb-16 md:mb-24"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Three steps to saving.
        </h2>

        {/* Steps — absolutely positioned to crossfade */}
        <div className="relative w-full max-w-2xl mx-auto" style={{ minHeight: "200px" }}>
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`hiw-step ${i === 0 ? "" : "absolute inset-0"} flex flex-col items-center text-center`}
              style={i > 0 ? { position: "absolute", top: 0, left: 0, right: 0 } : {}}
            >
              {/* Large step number */}
              <span
                className="text-teal-300 font-medium"
                style={{
                  fontSize: "clamp(4rem, 10vw, 8rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {step.number}
              </span>

              {/* Title */}
              <h3
                className="mt-4 font-medium text-white"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="mt-4 text-white/50 max-w-md"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                  lineHeight: 1.7,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Step indicator dots */}
        <div className="flex items-center gap-3 mt-16">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`hiw-step-dot w-2 h-2 rounded-full transition-colors duration-300 ${
                i === 0 ? "bg-teal-300" : "bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
          <div
            className="hiw-progress-fill h-full bg-teal-300 origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  )
}
