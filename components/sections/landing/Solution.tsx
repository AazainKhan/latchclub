"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"

const EASE = [0.23, 1, 0.32, 1] as const

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
    transition: { duration: 0.7, ease: EASE },
  },
}

const staggerLeft = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const staggerRight = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const slideFromLeft = {
  hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
}

const slideFromRight = {
  hidden: { opacity: 0, x: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
}

const noAnimation = {
  hidden: {},
  visible: {},
}

const noAnimationOpacity = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

interface JourneyStep {
  number: string
  title: string
  description: string
}

const consumerSteps: JourneyStep[] = [
  {
    number: "01",
    title: "Subscribe — monthly or annual",
    description: "From $5.99/mo. Cancel anytime on monthly. Save 25% annually.",
  },
  {
    number: "02",
    title: "Browse all merchants",
    description: "Dining, wellness, fitness, activities and more — all in one place.",
  },
  {
    number: "03",
    title: "Redeem your coupons",
    description: "3 per merchant per year on annual. 1 per merchant per month on monthly.",
  },
  {
    number: "04",
    title: "Earn loyalty points",
    description: "Every new merchant you discover earns points toward more access.",
  },
  {
    number: "05",
    title: "Redeem for bonus coupons",
    description: "Use points for extra coupons at the places you love most.",
  },
]

const merchantSteps: JourneyStep[] = [
  {
    number: "01",
    title: "Pay annual onboarding deposit",
    description: "$2,000–$2,500/yr. Founding Partners get Year 1 fully waived.",
  },
  {
    number: "02",
    title: "Set up your profile and offer",
    description: "Define your BOGO or discount. We handle the rest.",
  },
  {
    number: "03",
    title: "Get listed to every subscriber",
    description: "Immediate exposure to thousands of active, paying members.",
  },
  {
    number: "04",
    title: "Receive trackable new customers",
    description: "Every redemption is recorded. You see exactly what Latch delivers.",
  },
  {
    number: "05",
    title: "Access your analytics dashboard",
    description: "Real data. Real insight. Know your ROI to the dollar.",
  },
]

function StepItem({
  step,
  variants,
}: {
  step: JourneyStep
  variants: Variants
}) {
  return (
    <motion.div variants={variants} className="flex gap-4 py-4">
      <span
        className="shrink-0 font-mono text-sm font-medium"
        style={{ color: "#03A493" }}
      >
        {step.number}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{step.title}</p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-400">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Solution() {
  const prefersReduced = useReducedMotion()

  const headerVariants = prefersReduced ? noAnimation : container
  const itemVariants = prefersReduced ? noAnimationOpacity : blurUp
  const leftStagger = prefersReduced ? noAnimation : staggerLeft
  const rightStagger = prefersReduced ? noAnimation : staggerRight
  const leftItem = prefersReduced ? noAnimationOpacity : slideFromLeft
  const rightItem = prefersReduced ? noAnimationOpacity : slideFromRight

  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: "#162028" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header — two-column */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16"
        >
          <div>
            <motion.p
              variants={itemVariants}
              className="font-mono text-xs uppercase"
              style={{ color: "#03A493", letterSpacing: "0.1em" }}
            >
              The Solution
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="mt-4 text-3xl font-medium text-white md:text-5xl"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              Latch connects consumers with local businesses.{" "}
              <em className="not-italic" style={{ color: "#03A493", fontStyle: "italic" }}>
                Simply.
              </em>
            </motion.h2>
          </div>
          <motion.div
            variants={itemVariants}
            className="flex items-end"
          >
            <p
              className="text-base leading-relaxed text-neutral-400"
              style={{ lineHeight: 1.7 }}
            >
              Two sides of the same platform. Consumers save on the things they
              love. Merchants gain trackable, high-intent customers they&apos;d
              never reach otherwise. Latch sits in the middle — aligning
              incentives so both sides win.
            </p>
          </motion.div>
        </motion.div>

        {/* Two-column journey grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-xl" style={{ backgroundColor: "#1E2F3A" }}>
          {/* Consumer Journey */}
          <motion.div
            variants={leftStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="p-8 md:p-10"
          >
            <p
              className="mb-6 font-mono text-xs uppercase"
              style={{ color: "#03A493", letterSpacing: "0.1em" }}
            >
              Consumer Journey
            </p>
            <div className="space-y-1">
              {consumerSteps.map((step) => (
                <StepItem key={step.number} step={step} variants={leftItem} />
              ))}
            </div>
          </motion.div>

          {/* Divider — vertical on desktop, horizontal on mobile */}
          <div className="mx-8 h-px md:mx-0 md:h-auto md:w-px" style={{ backgroundColor: "#03A493", opacity: 0.3 }} />

          {/* Merchant Journey */}
          <motion.div
            variants={rightStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="p-8 md:p-10"
          >
            <p
              className="mb-6 font-mono text-xs uppercase"
              style={{ color: "#03A493", letterSpacing: "0.1em" }}
            >
              Merchant Journey
            </p>
            <div className="space-y-1">
              {merchantSteps.map((step) => (
                <StepItem key={step.number} step={step} variants={rightItem} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
