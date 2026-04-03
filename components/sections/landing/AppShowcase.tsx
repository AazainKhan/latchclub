"use client"

import { motion, useReducedMotion } from "framer-motion"
import { UtensilsCrossed, Flower2, Ticket } from "lucide-react"

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

interface CategoryCard {
  icon: React.ReactNode
  title: string
  description: string
  dotColor: string
}

const categories: CategoryCard[] = [
  {
    icon: <UtensilsCrossed className="h-5 w-5 text-teal-300" />,
    title: "Dining",
    description: "200+ restaurant deals with 2-for-1 meals across your city.",
    dotColor: "bg-teal-300",
  },
  {
    icon: <Flower2 className="h-5 w-5 text-neutral-400" />,
    title: "Wellness",
    description: "50% off at 150+ spas, studios, and wellness spots.",
    dotColor: "bg-neutral-200",
  },
  {
    icon: <Ticket className="h-5 w-5 text-neutral-500" />,
    title: "Experiences",
    description: "Exclusive rates on 100+ activities, tours, and events.",
    dotColor: "bg-neutral-400",
  },
]

export default function AppShowcase() {
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
            App Preview
          </motion.p>
          <motion.h2
            variants={variants}
            className="mx-auto mt-4 max-w-lg text-3xl font-medium md:text-4xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="text-neutral-200">Your city&rsquo;s best deals,</span>{" "}
            <span className="text-carbon">in your pocket.</span>
          </motion.h2>
        </motion.div>

        <motion.hr
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 mb-12 border-t border-mist"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={variants}
              className="overflow-hidden rounded-xl border border-mist bg-bone"
            >
              <div className="p-8">
                <div className="flex items-center gap-2.5 pb-5 border-b border-mist">
                  {category.icon}
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${category.dotColor}`}
                  />
                </div>
                <h3
                  className="mt-5 text-lg font-medium text-carbon"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
