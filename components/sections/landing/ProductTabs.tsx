"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const blurUp = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 80 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const },
  },
}

const noAnimation = {
  hidden: {},
  visible: {},
}

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

const contentVariant = {
  enter: { opacity: 0, y: 20, filter: "blur(4px)" },
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(4px)",
    transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] as const },
  },
}

const contentVariantReduced = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("dining")
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? noAnimation : blurUp
  const containerVariants = prefersReduced ? noAnimation : container
  const activeContent = contentVariant
  const reducedContent = contentVariantReduced

  const currentTab = tabs.find((t) => t.id === activeTab) ?? tabs[0]

  return (
    <section className="bg-carbon py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center"
        >
          <motion.h2
            variants={variants}
            className="font-medium text-3xl md:text-5xl uppercase"
            style={{ letterSpacing: "-0.04em", lineHeight: "0.95" }}
          >
            <span className="text-white block">Built for savings.</span>
            <span className="text-neutral-400 block mt-1">
              Designed for you.
            </span>
          </motion.h2>

          <motion.p
            variants={variants}
            className="mx-auto mt-6 max-w-lg text-base text-neutral-400"
            style={{ lineHeight: "1.7" }}
          >
            Everything we build helps Canadians save more. Our categories work
            on their own and even better together.
          </motion.p>
        </motion.div>

        {/* Pill Tab Bar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 flex justify-center"
        >
          <motion.div
            variants={variants}
            className="inline-flex rounded-full bg-white/10 p-1"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative rounded-full px-5 py-2 text-xs font-medium uppercase transition-colors"
                style={{ letterSpacing: "0.1em" }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-teal-300"
                    transition={{
                      type: "tween",
                      duration: 0.35,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Tab Content */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              variants={prefersReduced ? reducedContent : activeContent}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center"
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
