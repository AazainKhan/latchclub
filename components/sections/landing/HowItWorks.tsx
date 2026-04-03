"use client"

import { motion, useReducedMotion } from "framer-motion"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
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
}

const steps: Step[] = [
  {
    number: "01",
    title: "Pick your plan",
    description:
      "Choose the membership tier that fits your lifestyle. Start free or go all-in.",
  },
  {
    number: "02",
    title: "Browse & save",
    description:
      "Discover deals across dining, wellness, and experiences in your city.",
  },
  {
    number: "03",
    title: "Experience more",
    description:
      "Redeem offers instantly. No codes, no hassle. Just show your phone.",
  },
]

export default function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()
  const variants = prefersReducedMotion ? noAnimation : blurUp
  const containerVariants = prefersReducedMotion ? noAnimation : container

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
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
            className="mt-4 text-3xl font-medium md:text-4xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="text-neutral-200">Three steps</span>{" "}
            <span className="text-carbon">to saving.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-0 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={variants}
              className={index > 0 ? "border-t border-mist pt-8 mt-8 md:border-t-0 md:pt-0 md:mt-0 md:border-l md:pl-8" : ""}
            >
              <div className="flex items-center gap-2.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-300" />
                <p
                  className="text-6xl font-medium text-neutral-100 md:text-7xl"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  {step.number}
                </p>
              </div>
              <h3
                className="mt-4 text-xl font-medium tracking-tight text-carbon"
                style={{ letterSpacing: "-0.02em" }}
              >
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-300">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
