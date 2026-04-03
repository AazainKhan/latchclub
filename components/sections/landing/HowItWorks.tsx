"use client"

import { motion, useReducedMotion } from "framer-motion"
import { LayoutGrid, Search, Check } from "lucide-react"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const blurUp = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const noAnimation = {
  hidden: {},
  visible: {},
}

interface Step {
  number: string
  title: string
  description: string
  icon: React.ReactNode
}

const steps: Step[] = [
  {
    number: "01",
    title: "Pick your plan",
    description:
      "Choose the membership tier that fits your lifestyle. Start free or go all-in.",
    icon: <LayoutGrid className="h-5 w-5 text-neutral-300" />,
  },
  {
    number: "02",
    title: "Browse & save",
    description:
      "Discover deals across dining, wellness, and experiences in your city.",
    icon: <Search className="h-5 w-5 text-neutral-300" />,
  },
  {
    number: "03",
    title: "Experience more",
    description:
      "Redeem offers instantly. No codes, no hassle. Just show your phone.",
    icon: <Check className="h-5 w-5 text-neutral-300" />,
  },
]

export default function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()
  const variants = prefersReducedMotion ? noAnimation : blurUp
  const containerVariants = prefersReducedMotion ? noAnimation : container

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center"
        >
          <motion.p
            variants={variants}
            className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.1em] text-neutral-300"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-300" />
            How It Works
          </motion.p>
          <motion.h2
            variants={variants}
            className="mt-4 text-3xl font-medium md:text-5xl"
            style={{ letterSpacing: "-0.03em", lineHeight: "1.1" }}
          >
            <span className="text-neutral-200">Three steps</span>{" "}
            <span className="text-carbon">to saving.</span>
          </motion.h2>
        </motion.div>

        {/* Desktop: horizontal connected steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mt-20 hidden md:block"
        >
          {/* Connecting line — sits behind the cards */}
          <div
            className="pointer-events-none absolute left-0 right-0 border-t border-mist"
            style={{ top: 24 }}
          />

          <div className="grid grid-cols-3 gap-12">
            {steps.map((step) => (
              <motion.div key={step.number} variants={variants} className="relative">
                {/* Icon circle — sits on the connecting line */}
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-mist bg-white">
                  {step.icon}
                </div>

                {/* Large decorative number */}
                <p
                  className="mt-6 text-8xl font-medium text-neutral-100"
                  style={{ letterSpacing: "-0.04em", lineHeight: "1" }}
                >
                  {step.number}
                </p>

                {/* Title */}
                <h3
                  className="mt-4 text-xl font-medium text-carbon"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-2 max-w-xs text-base leading-relaxed text-neutral-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile: vertical connected steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mt-12 md:hidden"
        >
          {/* Vertical connecting line */}
          <div
            className="pointer-events-none absolute bottom-0 left-6 top-0 w-px bg-mist"
            style={{ transform: "translateX(-0.5px)" }}
          />

          <div className="space-y-12">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={variants}
                className="relative flex gap-6"
              >
                {/* Icon circle — on the vertical line */}
                <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-mist bg-white">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="pt-1">
                  {/* Decorative number */}
                  <p
                    className="text-5xl font-medium text-neutral-100"
                    style={{ letterSpacing: "-0.04em", lineHeight: "1" }}
                  >
                    {step.number}
                  </p>

                  <h3
                    className="mt-3 text-lg font-medium text-carbon"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {step.title}
                  </h3>

                  <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-neutral-300">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
