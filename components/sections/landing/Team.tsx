"use client"

import { motion, useReducedMotion } from "framer-motion"

const EASE = [0.23, 1, 0.32, 1] as const

interface TeamMember {
  initials: string
  name: string
  role: string
  bio: string
}

const team: TeamMember[] = [
  {
    initials: "NK",
    name: "Nikhil Karani",
    role: "CO-FOUNDER & CEO",
    bio: "Vision, strategic direction, driving growth. Capital markets background spanning equity financings, M&A advisory, and go-public mandates.",
  },
  {
    initials: "DF",
    name: "Dwayne Fernandes",
    role: "CO-FOUNDER & COO",
    bio: "Operations and merchant partnerships. Leading supply-side growth, merchant acquisition, and the founding partner program.",
  },
  {
    initials: "LF",
    name: "Liam Fernandes",
    role: "CO-FOUNDER & CFO",
    bio: "Financial strategy. FP&A, risk management, and the financial architecture underpinning all three revenue streams.",
  },
  {
    initials: "AK",
    name: "Aazain Khan",
    role: "CO-FOUNDER & CTO",
    bio: "Product and technology. App development, payment infrastructure, analytics, and the loyalty engine.",
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

const cardVariantReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

const headerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

const fadeUpReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

export default function Team() {
  const prefersReduced = useReducedMotion()
  const activeCard = prefersReduced ? cardVariantReduced : cardVariant
  const activeFade = prefersReduced ? fadeUpReduced : fadeUp

  return (
    <section className="bg-carbon text-white py-20 md:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          variants={prefersReduced ? { hidden: {}, visible: {} } : headerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.p
            className="font-mono text-xs uppercase text-teal-300 mb-4"
            style={{ letterSpacing: "0.1em", fontSize: "11px" }}
            variants={activeFade}
          >
            Management Team
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-medium text-white"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
            variants={activeFade}
          >
            Built to{" "}
            <span className="italic text-teal-300">execute.</span>
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {team.map((member) => (
            <motion.div
              key={member.initials}
              variants={activeCard}
              className="group relative bg-[#1E2F3A] p-8 overflow-hidden"
            >
              {/* Hover border — teal top line scales in */}
              <span
                className="absolute top-0 left-0 right-0 h-0.5 bg-teal-300 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                aria-hidden="true"
              />

              {/* Avatar */}
              <div
                className="w-16 h-16 rounded-full bg-[#243641] border-2 border-teal-300/30 flex items-center justify-center mb-6"
              >
                <span
                  className="font-mono text-sm text-teal-300"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {member.initials}
                </span>
              </div>

              {/* Name */}
              <p
                className="text-lg font-medium text-white mb-1"
                style={{ letterSpacing: "-0.02em" }}
              >
                {member.name}
              </p>

              {/* Role */}
              <p
                className="font-mono uppercase text-teal-300 mb-4"
                style={{ fontSize: "10px", letterSpacing: "0.14em" }}
              >
                {member.role}
              </p>

              {/* Bio */}
              <p
                className="text-sm text-neutral-400 leading-relaxed"
                style={{ lineHeight: 1.7 }}
              >
                {member.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
