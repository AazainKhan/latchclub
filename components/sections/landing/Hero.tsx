"use client"

import { motion, useReducedMotion } from "framer-motion"
import WaitlistForm from "@/components/shared/WaitlistForm"

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const noAnimation = {
  hidden: {},
  visible: {},
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const itemVariants = prefersReducedMotion ? noAnimation : fadeUp
  const containerVariants = prefersReducedMotion ? noAnimation : container

  return (
    <section
      id="hero"
      className="pt-24 pb-16 md:pt-32 md:pb-24"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-2xl flex-col items-center text-center px-4 md:px-6"
      >
        {/* Badge */}
        <motion.span
          variants={itemVariants}
          className="mb-6 inline-flex items-center rounded-full border border-mist bg-bone px-4 py-1.5 text-sm text-neutral-300"
        >
          Coming to Canada &mdash; Join the waitlist
        </motion.span>

        {/* H1 */}
        <motion.h1
          variants={itemVariants}
          className="font-medium tracking-[-0.03em] text-carbon"
          style={{
            fontSize: "clamp(2.25rem, 5vw + 1rem, 3.25rem)",
            lineHeight: 1.1,
          }}
        >
          Save more. Experience more.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300"
          style={{ lineHeight: 1.75 }}
        >
          Unlock exclusive deals on dining, wellness, and experiences across
          Canada.
        </motion.p>

        {/* Waitlist Form */}
        <motion.div variants={itemVariants} className="mt-8 w-full flex justify-center">
          <WaitlistForm />
        </motion.div>

        {/* Social Proof */}
        <motion.p
          variants={itemVariants}
          className="mt-4 text-sm text-neutral-200"
        >
          Join 1,200+ Canadians already on the waitlist
        </motion.p>
      </motion.div>
    </section>
  )
}
