"use client"

import { motion, useReducedMotion } from "framer-motion"
import { UtensilsCrossed, Flower2, Ticket } from "lucide-react"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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

interface CategoryCard {
  icon: React.ReactNode
  title: string
  description: string
  dealCount: string
  accentColor: string
}

const categories: CategoryCard[] = [
  {
    icon: <UtensilsCrossed className="h-6 w-6 text-teal-300" />,
    title: "Dining",
    description: "2-for-1 meals at 200+ restaurants",
    dealCount: "48 deals",
    accentColor: "bg-teal-300",
  },
  {
    icon: <Flower2 className="h-6 w-6 text-neutral-400" />,
    title: "Wellness",
    description: "50% off spas, fitness & wellness",
    dealCount: "36 deals",
    accentColor: "bg-neutral-200",
  },
  {
    icon: <Ticket className="h-6 w-6 text-neutral-500" />,
    title: "Experiences",
    description: "Exclusive rates on activities & events",
    dealCount: "27 deals",
    accentColor: "bg-neutral-400",
  },
]

export default function AppShowcase() {
  const prefersReducedMotion = useReducedMotion()
  const variants = prefersReducedMotion ? noAnimation : fadeUp
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
            className="text-[11px] uppercase tracking-[0.1em] text-neutral-300"
          >
            App Preview
          </motion.p>
          <motion.h2
            variants={variants}
            className="mx-auto mt-4 max-w-lg text-3xl font-medium tracking-tight text-carbon md:text-4xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Your city&#39;s best deals, in your pocket.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={variants}
              className="overflow-hidden rounded-xl border border-mist bg-white"
            >
              <div className={`h-[3px] ${category.accentColor}`} />
              <div className="p-6">
                <div className="mb-4">{category.icon}</div>
                <h3
                  className="text-lg font-medium text-carbon"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                  {category.description}
                </p>
                <span className="mt-4 inline-block rounded-full border border-mist bg-bone px-3 py-1 text-xs text-neutral-300">
                  {category.dealCount}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
