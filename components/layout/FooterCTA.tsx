"use client"

import { motion, useReducedMotion } from "framer-motion"
import WaitlistForm from "@/components/shared/WaitlistForm"

const blurUp = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 80 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const },
  },
}

const blurUpReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

const sectionHeader = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export default function FooterCTA() {
  const prefersReduced = useReducedMotion()
  const itemVariant = prefersReduced ? blurUpReduced : blurUp

  return (
    <section className="bg-carbon py-24 md:py-32 px-6">
      <motion.div
        className="mx-auto max-w-xl text-center"
        variants={prefersReduced ? { hidden: {}, visible: {} } : sectionHeader}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.h2
          variants={itemVariant}
          className="text-3xl md:text-5xl font-medium"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          <span className="text-neutral-400">Ready to start </span>
          <span className="text-white">saving?</span>
        </motion.h2>
        <motion.p
          variants={itemVariant}
          className="text-base text-neutral-400 mt-4"
          style={{ lineHeight: 1.7 }}
        >
          Join thousands of Canadians already on the waitlist.
        </motion.p>
        <motion.div variants={itemVariant} className="mt-8 flex justify-center">
          <WaitlistForm variant="dark" />
        </motion.div>
      </motion.div>
    </section>
  )
}
