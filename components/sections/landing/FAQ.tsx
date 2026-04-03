"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const },
  },
}

const noAnimation = {
  hidden: {},
  visible: {},
}

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What is Latchclub?",
    answer:
      "Latchclub is a premium deals and membership platform for Canadians. We partner with restaurants, spas, fitness studios, and experience providers to offer exclusive discounts you won't find anywhere else.",
  },
  {
    question: "How does the membership work?",
    answer:
      "Choose a plan that fits your lifestyle. Explorer is free with 5 deals per month. Member ($15/mo) unlocks unlimited deals across all categories. Family ($25/mo) lets up to 4 household members share the savings.",
  },
  {
    question: "Which cities are available?",
    answer:
      "We're launching in Toronto first, with Vancouver and Montreal coming soon. Our goal is to cover every major Canadian city by end of 2026.",
  },
  {
    question: "How do I redeem a deal?",
    answer:
      "Just show your phone at the partner location. No codes, no printing, no hassle. The deal is applied instantly at checkout.",
  },
  {
    question: "When does Latchclub launch?",
    answer:
      "We're currently in early access. Join the waitlist to be first in line when we launch in your city.",
  },
]

export default function FAQ() {
  const prefersReducedMotion = useReducedMotion()
  const variants = prefersReducedMotion ? noAnimation : fadeUp
  const containerVariants = prefersReducedMotion ? noAnimation : container

  return (
    <section className="bg-[#F5F7F7] py-16 md:py-24 dark:bg-[#162028]">
      <div className="mx-auto max-w-3xl px-6">
        {/* Heading */}
        <motion.h2
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center text-2xl font-medium uppercase text-[#162028] md:text-4xl dark:text-white"
          style={{ letterSpacing: "-0.04em", lineHeight: "1.1" }}
        >
          Frequently asked questions
        </motion.h2>

        {/* Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12"
        >
          <Accordion>
            {faqItems.map((item, index) => (
              <motion.div key={index} variants={variants}>
                <AccordionItem
                  className="border-b border-[#D2DBDE] dark:border-white/10"
                >
                  <AccordionTrigger
                    className="py-5 text-base font-normal text-[#162028] no-underline hover:no-underline dark:text-white"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
