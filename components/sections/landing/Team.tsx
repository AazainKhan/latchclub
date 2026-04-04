"use client"

import { useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"

interface TeamMember {
  initials: string
  name: string
  role: string
  bio: string
}

const team: TeamMember[] = [
  {
    initials: "NK",
    name: "Nikhil Karani",
    role: "CO-FOUNDER & CEO",
    bio: "Vision, strategic direction, driving growth. Capital markets background.",
  },
  {
    initials: "DF",
    name: "Dwayne Fernandes",
    role: "CO-FOUNDER & COO",
    bio: "Operations and merchant partnerships. Supply-side growth.",
  },
  {
    initials: "LF",
    name: "Liam Fernandes",
    role: "CO-FOUNDER & CFO",
    bio: "Financial strategy. FP&A, risk management.",
  },
  {
    initials: "AK",
    name: "Aazain Khan",
    role: "CO-FOUNDER & CTO",
    bio: "Product and technology. App development, payment infrastructure.",
  },
]

export default function Team() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const isReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      if (isReduced) {
        gsap.set(".team-header-reveal", { opacity: 1, y: 0 })
        gsap.set(".team-card", { opacity: 1, y: 0 })
        return
      }

      const section = container.current
      if (!section) return

      // Header reveals (keep as entrance)
      gsap.from(".team-header-reveal", {
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

      // Cards — scroll-scrubbed stagger
      const teamTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current?.querySelector(".team-cards-grid") || container.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 0.8,
        },
      })

      const teamCards = container.current?.querySelectorAll(".team-card")
      if (teamCards) {
        teamCards.forEach((card, i) => {
          teamTl.fromTo(
            card,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, ease: "none" },
            i * 0.12
          )
        })
      }
    },
    { scope: container }
  )

  return (
    <section ref={container} className="bg-carbon text-white py-20 md:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p
            className="team-header-reveal font-mono text-[11px] uppercase text-teal-300 mb-4"
            style={{ letterSpacing: "0.1em" }}
          >
            Management Team
          </p>
          <h2
            className="team-header-reveal font-medium text-white"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Built to{" "}
            <span className="italic text-teal-300">execute.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="team-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px">
          {team.map((member) => (
            <div
              key={member.initials}
              className="team-card group relative bg-[#1E2F3A] p-8 overflow-hidden"
            >
              {/* Hover border — teal top line scales in */}
              <span
                className="absolute top-0 left-0 right-0 h-0.5 bg-teal-300 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                aria-hidden="true"
              />

              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-[#243641] border-2 border-teal-300/30 flex items-center justify-center mb-6">
                <span
                  className="font-mono text-sm text-teal-300"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {member.initials}
                </span>
              </div>

              {/* Name */}
              <p
                className="text-base font-medium text-white mb-1"
                style={{ letterSpacing: "-0.02em" }}
              >
                {member.name}
              </p>

              {/* Role */}
              <p
                className="font-mono uppercase text-teal-300 mb-4"
                style={{ fontSize: "10px", letterSpacing: "0.14em" }}
              >
                {member.role}
              </p>

              {/* Bio */}
              <p
                className="text-sm text-neutral-400"
                style={{ lineHeight: 1.7 }}
              >
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
