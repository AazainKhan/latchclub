"use client"

import { motion, useReducedMotion } from "framer-motion"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardUp = {
  hidden: { opacity: 0, y: 60, scale: 0.95, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const },
  },
}

const noAnimation = {
  hidden: {},
  visible: {},
}

interface BlogCard {
  badge: string
  badgeColor: string
  title: string
  excerpt: string
  author: string
  date: string
  gradient: string
}

const cards: BlogCard[] = [
  {
    badge: "GUIDE",
    badgeColor: "bg-[#03A493]",
    title: "The Ultimate Toronto Dining Deals Guide",
    excerpt:
      "From hidden gems in Kensington to Queen West's hottest spots...",
    author: "Sarah Chen",
    date: "Mar 24, 2026",
    gradient: "from-[#03A493]/20 to-[#D2DBDE]/30",
  },
  {
    badge: "BLOG",
    badgeColor: "bg-[#162028]",
    title: "How Latchclub Saves the Average Canadian $200/Month",
    excerpt:
      "We crunched the numbers on our early access members...",
    author: "Aazain Khan",
    date: "Mar 19, 2026",
    gradient: "from-[#D2DBDE]/40 to-[#F5F7F7]/60",
  },
  {
    badge: "GUIDE",
    badgeColor: "bg-[#03A493]",
    title: "Wellness on a Budget: Spa Deals Across Canada",
    excerpt:
      "Premium spa experiences don't have to break the bank...",
    author: "Maya Patel",
    date: "Mar 1, 2026",
    gradient: "from-[#162028]/10 to-[#03A493]/15",
  },
]

export default function BlogCards() {
  const prefersReducedMotion = useReducedMotion()
  const variants = prefersReducedMotion ? noAnimation : cardUp
  const containerVariants = prefersReducedMotion ? noAnimation : container

  return (
    <section className="bg-white py-16 md:py-24 dark:bg-[#162028]">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.h2
          variants={prefersReducedMotion ? noAnimation : {
            hidden: { opacity: 0, y: 80 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center text-2xl font-medium uppercase text-[#162028] md:text-4xl dark:text-white"
          style={{ letterSpacing: "-0.04em", lineHeight: "1.1" }}
        >
          Latest from Latchclub
        </motion.h2>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.article
              key={card.title}
              variants={variants}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="cursor-pointer overflow-hidden rounded-2xl bg-[#F5F7F7] dark:bg-white/5"
            >
              {/* Image placeholder */}
              <div
                className={`h-48 bg-gradient-to-br ${card.gradient}`}
              />

              {/* Content */}
              <div className="p-5">
                {/* Badge */}
                <span
                  className={`inline-block rounded-sm px-2 py-0.5 text-[10px] font-medium uppercase text-white ${card.badgeColor}`}
                  style={{ letterSpacing: "0.08em" }}
                >
                  {card.badge}
                </span>

                {/* Title */}
                <h3
                  className="mt-2 text-lg font-medium text-[#162028] dark:text-white"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {card.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-1 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
                  {card.excerpt}
                </p>

                {/* Author row */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {card.author}
                  </span>
                  <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                    &middot;
                  </span>
                  <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                    {card.date}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
