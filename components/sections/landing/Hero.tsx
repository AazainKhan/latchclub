"use client"

import { useRef } from "react"
import { gsap, SplitText } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import { Button } from "@/components/ui/button"

/* Floating deal cards data */
interface DealCard {
  category: string
  name: string
  description: string
  badge: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  rotate: number
  delay: number
  parallaxSpeed: number
}

const dealCards: DealCard[] = [
  {
    category: "Dining",
    name: "Kinka Izakaya",
    description: "2-for-1 Dinner",
    badge: "50% OFF",
    top: "14%",
    left: "4%",
    rotate: -6,
    delay: 0,
    parallaxSpeed: -60,
  },
  {
    category: "Wellness",
    name: "Scandinave Spa",
    description: "Day Pass",
    badge: "$45 OFF",
    top: "10%",
    right: "5%",
    rotate: 4,
    delay: 0.8,
    parallaxSpeed: -90,
  },
  {
    category: "Experiences",
    name: "ROM Tickets",
    description: "Family Pack",
    badge: "BOGO",
    bottom: "26%",
    left: "5%",
    rotate: 3,
    delay: 1.6,
    parallaxSpeed: -40,
  },
  {
    category: "Fitness",
    name: "Barry's Bootcamp",
    description: "First Month",
    badge: "40% OFF",
    bottom: "20%",
    right: "4%",
    rotate: -4,
    delay: 2.4,
    parallaxSpeed: -70,
  },
  {
    category: "Travel",
    name: "Porter Airlines",
    description: "Weekend Getaway",
    badge: "$120 OFF",
    top: "46%",
    right: "2%",
    rotate: 5,
    delay: 3.2,
    parallaxSpeed: -50,
  },
]

/* Stats data */
interface StatItem {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

const stats: StatItem[] = [
  { value: 135, prefix: "$", suffix: "B", label: "Total Market" },
  { value: 9378, label: "Toronto Merchants" },
  { value: 0, label: "Dominant Players" },
]

export default function Hero() {
  const container = useRef<HTMLElement>(null)

  /* ── GSAP entrance timeline ── */
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        // Show everything immediately for reduced motion
        gsap.set(
          [
            ".hero-eyebrow",
            ".hero-heading",
            ".hero-subtext",
            ".hero-actions",
            ".hero-stats .stat-item",
            ".deal-card",
            ".scroll-indicator",
          ],
          { opacity: 1, y: 0, filter: "none" }
        )
        // Set stat numbers to final values
        document.querySelectorAll(".stat-number").forEach((el) => {
          const target = parseFloat(
            el.getAttribute("data-value") || "0"
          )
          const prefix = el.getAttribute("data-prefix") || ""
          const suffix = el.getAttribute("data-suffix") || ""
          el.textContent = `${prefix}${target >= 1000 ? Math.round(target).toLocaleString() : Math.round(target)}${suffix}`
        })
        return
      }

      const tl = gsap.timeline({
        defaults: { ease: "checkout", force3D: true },
      })

      // SplitText on the heading
      const split = new SplitText(".hero-heading", {
        type: "chars,words",
      })

      tl.from(".hero-eyebrow", {
        y: 30,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          split.chars,
          {
            y: 40,
            opacity: 0,
            filter: "blur(8px)",
            stagger: 0.02,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".hero-subtext",
          { y: 30, opacity: 0, duration: 0.7 },
          "-=0.3"
        )
        .from(
          ".hero-actions",
          { y: 30, opacity: 0, duration: 0.7 },
          "-=0.4"
        )
        .from(
          ".hero-stats .stat-item",
          { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 },
          "-=0.3"
        )
        .from(
          ".deal-card",
          {
            y: 40,
            opacity: 0,
            scale: 0.9,
            stagger: 0.15,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".scroll-indicator",
          { opacity: 0, duration: 0.5 },
          "-=0.2"
        )
    },
    { scope: container }
  )

  /* ── GSAP scroll-linked scrub-out + parallax ── */
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return

      // Hero content scrubs out as you scroll
      gsap.to(".hero-content", {
        y: -150,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      })

      // Each floating card has different parallax speed
      document.querySelectorAll(".deal-card").forEach((card, i) => {
        gsap.to(card, {
          y: -40 - i * 25,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
      })

      // Grid shifts on scroll
      gsap.to(".hero-grid", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Stats count up tied to scroll
      const statEls = document.querySelectorAll(".stat-number")
      statEls.forEach((el) => {
        const target = parseFloat(
          el.getAttribute("data-value") || "0"
        )
        const prefix = el.getAttribute("data-prefix") || ""
        const suffix = el.getAttribute("data-suffix") || ""
        const proxy = { val: 0 }
        gsap.to(proxy, {
          val: target,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-stats",
            start: "top 85%",
            end: "top 45%",
            scrub: 1,
          },
          onUpdate: () => {
            el.textContent = `${prefix}${target >= 1000 ? Math.round(proxy.val).toLocaleString() : Math.round(proxy.val)}${suffix}`
          },
        })
      })

      // Scroll indicator line grows with scroll
      gsap.to(".scroll-line-fill", {
        height: 48,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "200px top",
          scrub: 1,
        },
      })

      // Scroll progress bar (full page)
      gsap.to(".scroll-progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      })
    },
    { scope: container }
  )

  return (
    <>
      {/* Scroll progress indicator -- fixed top bar */}
      <div
        className="scroll-progress-bar fixed top-0 left-0 right-0 h-[2px] bg-teal-300 origin-left z-[100]"
        style={{ transform: "scaleX(0)" }}
      />

      <section
        ref={container}
        id="hero"
        className="hero-section relative flex min-h-screen items-center justify-center px-4 md:px-6 overflow-hidden"
        style={{ backgroundColor: "#162028" }}
      >
        {/* Animated grid background */}
        <div className="hero-grid absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(3, 164, 147, 0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(3, 164, 147, 0.06) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Teal glow orbs -- CSS animation for ambient pulse */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="hero-glow-1 absolute w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(3, 164, 147, 0.12) 0%, transparent 70%)",
              top: "10%",
              left: "20%",
              animation:
                "heroGlowPulse 8s ease-in-out infinite",
            }}
          />
          <div
            className="hero-glow-2 absolute w-[400px] h-[400px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(3, 164, 147, 0.08) 0%, transparent 70%)",
              bottom: "15%",
              right: "15%",
              animation:
                "heroGlowPulse 10s ease-in-out 2s infinite",
            }}
          />
        </div>

        {/* Ambient glow keyframes -- dangerouslySetInnerHTML avoids styled-jsx dependency */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes heroGlowPulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.15); opacity: 1; }
          }
        ` }} />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: 0.03,
          }}
        />

        {/* Floating deal cards -- GSAP parallax via className targeting */}
        {dealCards.map((card, index) => (
          <div
            key={card.name}
            className={`deal-card deal-card-${index} absolute hidden lg:block`}
            style={{
              top: card.top,
              bottom: card.bottom,
              left: card.left,
              right: card.right,
              opacity: 0,
            }}
          >
            <div
              style={{
                transform: `rotate(${card.rotate}deg)`,
              }}
            >
              <div className="rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm p-4 max-w-[160px]">
                <p className="text-[11px] tracking-[0.08em] uppercase text-white/40">
                  {card.category}
                </p>
                <p className="text-sm font-medium text-white mt-1 tracking-[-0.01em]">
                  {card.name}
                </p>
                <p className="text-[11px] text-white/40 mt-0.5">
                  {card.description}
                </p>
                <span className="inline-block mt-2 text-[10px] font-medium bg-teal-300/20 text-teal-300 px-2 py-0.5 rounded-full">
                  {card.badge}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Main content -- GSAP scrub-out on scroll */}
        <div className="hero-content relative z-10 mx-auto w-full max-w-6xl">
          <div className="flex flex-col items-start">
            {/* Eyebrow */}
            <span
              className="hero-eyebrow mb-8 inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-neutral-400"
              style={{ opacity: 0 }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-teal-300 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-300" />
              </span>
              Toronto, Canada &middot; Launching 2026
            </span>

            {/* H1 -- GSAP SplitText handles character animation */}
            <h1
              className="hero-heading font-medium tracking-[-0.03em] max-w-4xl"
              style={{
                fontSize: "clamp(3.25rem, 7vw, 6rem)",
                lineHeight: 1.0,
              }}
            >
              <span className="text-white">
                The membership that{" "}
              </span>
              <em className="text-teal-300 italic">pays</em>
              <br />
              <span
                style={{
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.3)",
                  color: "transparent",
                }}
              >
                for itself.
              </span>
            </h1>

            {/* Subtext */}
            <p
              className="hero-subtext mt-8 max-w-xl text-base text-neutral-400"
              style={{ lineHeight: 1.7, opacity: 0 }}
            >
              One membership. Access to premier dining, wellness, fitness,
              and lifestyle experiences across Toronto — at prices that
              make going out feel good again.
            </p>

            {/* CTA buttons */}
            <div
              className="hero-actions mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              style={{ opacity: 0 }}
            >
              <Button
                className="h-12 px-8 bg-teal-300 text-carbon hover:bg-teal-300/90 text-sm tracking-[-0.01em]"
                onClick={() => {
                  const el = document.getElementById("waitlist")
                  if (el) el.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Join the Waitlist
                <span className="ml-2">&rarr;</span>
              </Button>
              <Button
                variant="ghost"
                className="h-12 px-8 text-white/60 hover:text-white hover:bg-white/5 text-sm tracking-[-0.01em]"
              >
                View Pricing
                <span className="ml-2">&darr;</span>
              </Button>
            </div>
          </div>

          {/* Stats -- bottom right, GSAP scroll-linked counters */}
          <div className="hero-stats mt-24 md:mt-32 flex justify-end">
            <div className="flex gap-12 md:gap-16">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="stat-item text-right"
                  style={{ opacity: 0 }}
                >
                  <p
                    className="stat-number text-3xl font-medium text-teal-300 tracking-[-0.02em]"
                    data-value={stat.value}
                    data-prefix={stat.prefix || ""}
                    data-suffix={stat.suffix || ""}
                  >
                    {stat.prefix ?? ""}0{stat.suffix ?? ""}
                  </p>
                  <p className="text-[11px] tracking-[0.1em] uppercase text-neutral-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator -- bottom left */}
        <div
          className="scroll-indicator absolute bottom-8 left-6 md:left-10 z-10 flex items-end gap-3"
          style={{ opacity: 0 }}
        >
          <div className="relative w-[1px] h-12 bg-white/10 overflow-hidden">
            <div
              className="scroll-line-fill absolute bottom-0 left-0 w-full bg-teal-300"
              style={{ height: 0 }}
            />
          </div>
          <span className="text-[11px] tracking-[0.1em] uppercase text-neutral-400 pb-0.5">
            Scroll to explore
          </span>
        </div>

        {/* Bottom gradient transition */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #F5F7F7)",
          }}
        />
      </section>
    </>
  )
}
