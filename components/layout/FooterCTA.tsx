"use client"

import { motion, useReducedMotion } from "framer-motion"
import WaitlistForm from "@/components/shared/WaitlistForm"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const fadeUpReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

export default function FooterCTA() {
  const prefersReduced = useReducedMotion()
  const activeVariant = prefersReduced ? fadeUpReduced : fadeUp

  return (
    <section className="bg-carbon py-24 md:py-32 px-6">
      <motion.div
        className="mx-auto max-w-xl text-center"
        variants={activeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2
          className="text-3xl md:text-5xl font-medium"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          <span className="text-neutral-400">Ready to start </span>
          <span className="text-white">saving?</span>
        </h2>
        <p
          className="text-base text-neutral-400 mt-4"
          style={{ lineHeight: 1.7 }}
        >
          Join thousands of Canadians already on the waitlist.
        </p>
        <div className="mt-8 flex justify-center">
          <WaitlistForm variant="dark" />
        </div>
      </motion.div>
    </section>
  )
}
