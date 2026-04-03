"use client"

import { motion, useReducedMotion } from "framer-motion"
import WaitlistForm from "@/components/shared/WaitlistForm"

const blurUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const blurUpReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

export default function FooterCTA() {
  const prefersReduced = useReducedMotion()
  const activeVariant = prefersReduced ? blurUpReduced : blurUp

  return (
    <section className="border-t border-mist bg-bone py-24 md:py-32 px-6">
      <motion.div
        className="mx-auto max-w-xl text-center"
        variants={activeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2
          className="text-3xl md:text-4xl font-medium"
          style={{ letterSpacing: "-0.02em" }}
        >
          <span className="text-neutral-200">Ready to start </span>
          <span className="text-carbon">saving?</span>
        </h2>
        <p
          className="text-base text-neutral-300 mt-3"
          style={{ lineHeight: 1.7 }}
        >
          Join thousands of Canadians already on the waitlist.
        </p>
        <div className="mt-6 flex justify-center">
          <WaitlistForm />
        </div>
      </motion.div>
    </section>
  )
}
