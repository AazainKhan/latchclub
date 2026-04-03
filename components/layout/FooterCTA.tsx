"use client"

import { motion } from "framer-motion"
import WaitlistForm from "@/components/shared/WaitlistForm"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export default function FooterCTA() {
  return (
    <section className="bg-bone py-20 md:py-24 px-6">
      <motion.div
        className="mx-auto max-w-xl text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2
          className="text-2xl md:text-3xl font-medium text-carbon"
          style={{ letterSpacing: "-0.02em" }}
        >
          Ready to start saving?
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
