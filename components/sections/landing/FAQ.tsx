"use client"

import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

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
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    gsap.from(".faq-heading", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "checkout",
      scrollTrigger: { trigger: ".faq-section", start: "top 75%" },
    })

    gsap.from(".faq-item", {
      y: 40,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: "checkout",
      scrollTrigger: { trigger: ".faq-items", start: "top 80%" },
    })
  }, { scope: container })

  return (
    <section
      className="faq-section bg-[#F5F7F7] py-16 md:py-24 dark:bg-[#162028]"
      ref={container}
    >
      <div className="mx-auto max-w-3xl px-6">
        {/* Heading */}
        <h2
          className="faq-heading text-center text-2xl font-medium uppercase text-[#162028] md:text-4xl dark:text-white"
          style={{ letterSpacing: "-0.04em", lineHeight: "1.1" }}
        >
          Frequently asked questions
        </h2>

        {/* Accordion */}
        <div className="faq-items mt-12">
          <Accordion>
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
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
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
