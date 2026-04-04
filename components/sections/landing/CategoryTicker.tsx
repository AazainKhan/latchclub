"use client"

import { useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"

const categories = [
  "Drink & Dining",
  "Health & Wellness",
  "Fitness & Leisure",
  "Activities & Entertainment",
  "Retail Shopping",
  "Hotels & Resorts",
  "Airlines & Travel",
]

export default function CategoryTicker() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      const track = container.current?.querySelector(".ticker-track")
      if (!track) return

      // Calculate width of one set of items
      const items = track.querySelectorAll(".ticker-item")
      let totalWidth = 0
      items.forEach((item, i) => {
        if (i < categories.length)
          totalWidth += (item as HTMLElement).offsetWidth
      })

      gsap.to(track, {
        x: -totalWidth,
        duration: 25,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x: number) => x % totalWidth),
        },
      })
    },
    { scope: container }
  )

  return (
    <div
      ref={container}
      className="bg-carbon border-y border-white/5 py-4 overflow-hidden"
    >
      <div className="ticker-track flex items-center gap-0 whitespace-nowrap">
        {/* Duplicate items 3x for seamless loop */}
        {[...categories, ...categories, ...categories].map((cat, i) => (
          <div
            key={i}
            className="ticker-item flex items-center shrink-0 px-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-300 mr-3 shrink-0" />
            <span className="text-sm text-white/50 font-normal tracking-wide">
              {cat}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
