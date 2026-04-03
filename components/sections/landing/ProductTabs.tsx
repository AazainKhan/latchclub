"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"

interface TabDeal {
  name: string
  category: string
  discount: string
  link: string
}

interface TabData {
  id: string
  label: string
  tagline: string
  description: string
  deal: TabDeal
}

const tabs: TabData[] = [
  {
    id: "dining",
    label: "DINING",
    tagline: "Save on every meal out",
    description:
      "2-for-1 deals at 200+ restaurants across Toronto, Vancouver, Montreal, and more.",
    deal: {
      name: "Kinka Izakaya",
      category: "Japanese Dining",
      discount: "2-for-1 dinner",
      link: "Simulate deal",
    },
  },
  {
    id: "wellness",
    label: "WELLNESS",
    tagline: "Wellness for less",
    description:
      "50% off at spas, studios, and wellness spots. From massages to yoga to cryotherapy.",
    deal: {
      name: "Scandinave Spa",
      category: "Spa & Relaxation",
      discount: "Day Pass $45 OFF",
      link: "Simulate deal",
    },
  },
  {
    id: "experiences",
    label: "EXPERIENCES",
    tagline: "Do more, spend less",
    description:
      "Exclusive rates on escape rooms, tours, fitness classes, and weekend adventures.",
    deal: {
      name: "ROM Tickets",
      category: "Museum & Culture",
      discount: "Family BOGO",
      link: "Simulate deal",
    },
  },
]

export default function ProductTabs() {
  const container = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState(0)
  const prevTabRef = useRef(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const tabButtonsRef = useRef<(HTMLButtonElement | null)[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)

  const currentTab = tabs[activeTab]

  /* ── GSAP: Pin + scroll-driven tab cycling ── */
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      ScrollTrigger.create({
        trigger: ".product-tabs-section",
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const newTab = Math.min(
            Math.floor(progress * tabs.length),
            tabs.length - 1
          )
          setActiveTab(newTab)
        },
      })

      /* Progress bar scrub */
      gsap.to(".tabs-progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".product-tabs-section",
          start: "top top",
          end: "+=300%",
          scrub: 1,
        },
      })
    },
    { scope: container }
  )

  /* ── GSAP: Entrance animations ── */
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      gsap.from(".product-tabs-heading", {
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".product-tabs-section",
          start: "top 80%",
        },
      })

      gsap.from(".product-tabs-sub", {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".product-tabs-section",
          start: "top 75%",
        },
      })

      gsap.from(".tabs-pill-bar", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".product-tabs-section",
          start: "top 70%",
        },
      })
    },
    { scope: container }
  )

  /* ── Tab content crossfade on activeTab change ── */
  useEffect(() => {
    if (prevTabRef.current === activeTab) return
    prevTabRef.current = activeTab

    const contentEl = contentRef.current
    if (!contentEl) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    gsap.fromTo(
      contentEl,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
    )
  }, [activeTab])

  /* ── Tab indicator slide ── */
  useEffect(() => {
    const indicator = indicatorRef.current
    const activeButton = tabButtonsRef.current[activeTab]
    if (!indicator || !activeButton) return

    const rect = activeButton.getBoundingClientRect()
    const parentRect = activeButton.parentElement?.getBoundingClientRect()
    if (!parentRect) return

    gsap.to(indicator, {
      x: rect.left - parentRect.left,
      width: rect.width,
      duration: 0.3,
      ease: "power3.out",
    })
  }, [activeTab])

  /* ── Set initial indicator position on mount ── */
  useEffect(() => {
    const indicator = indicatorRef.current
    const firstButton = tabButtonsRef.current[0]
    if (!indicator || !firstButton) return

    const rect = firstButton.getBoundingClientRect()
    const parentRect = firstButton.parentElement?.getBoundingClientRect()
    if (!parentRect) return

    gsap.set(indicator, {
      x: rect.left - parentRect.left,
      width: rect.width,
    })
  }, [])

  const setTabButtonRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      tabButtonsRef.current[index] = el
    },
    []
  )

  return (
    <section
      ref={container}
      className="product-tabs-section bg-carbon py-20 md:py-28 relative"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center">
          <h2
            className="product-tabs-heading font-medium text-3xl md:text-5xl uppercase"
            style={{ letterSpacing: "-0.04em", lineHeight: "0.95" }}
          >
            <span className="text-white block">Built for savings.</span>
            <span className="text-neutral-400 block mt-1">
              Designed for you.
            </span>
          </h2>

          <p
            className="product-tabs-sub mx-auto mt-6 max-w-lg text-base text-neutral-400"
            style={{ lineHeight: "1.7" }}
          >
            Everything we build helps Canadians save more. Our categories work on
            their own and even better together.
          </p>
        </div>

        {/* Pill Tab Bar */}
        <div className="mt-12 flex justify-center">
          <div className="tabs-pill-bar relative inline-flex rounded-full bg-white/10 p-1">
            {/* Sliding indicator */}
            <div
              ref={indicatorRef}
              className="tab-indicator absolute top-1 bottom-1 rounded-full bg-teal-300"
              style={{ left: 0, width: 0 }}
            />

            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={setTabButtonRef(index)}
                onClick={() => setActiveTab(index)}
                className={`tab-button-${index} relative rounded-full px-5 py-2 text-xs font-medium uppercase transition-colors`}
                style={{ letterSpacing: "0.1em" }}
              >
                <span
                  className={`relative z-10 ${
                    activeTab === index
                      ? "text-white"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-12">
          <div
            ref={contentRef}
            className="tab-content-active grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center"
          >
            {/* Left — Text */}
            <div>
              <p
                className="text-2xl font-medium text-white md:text-3xl"
                style={{ letterSpacing: "-0.03em", lineHeight: "1.15" }}
              >
                {currentTab.tagline}
              </p>
              <p
                className="mt-4 max-w-md text-base text-neutral-400"
                style={{ lineHeight: "1.7" }}
              >
                {currentTab.description}
              </p>
            </div>

            {/* Right — Mockup Deal Card */}
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
              <p
                className="text-xs font-medium uppercase text-neutral-400"
                style={{ letterSpacing: "0.1em" }}
              >
                {currentTab.deal.category}
              </p>
              <p
                className="mt-3 text-xl font-medium text-white"
                style={{ letterSpacing: "-0.02em" }}
              >
                {currentTab.deal.name}
              </p>
              <span className="mt-3 inline-block rounded-full bg-teal-300 px-2.5 py-0.5 text-xs font-medium text-white">
                {currentTab.deal.discount}
              </span>
              <div className="mt-6 border-t border-white/10 pt-4">
                <span className="inline-flex items-center gap-1 text-xs text-teal-300">
                  {currentTab.deal.link}
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll progress bar at bottom of pinned section */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
        <div
          className="tabs-progress-bar h-full bg-teal-300 origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  )
}
