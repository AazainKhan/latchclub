"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is LatchClub?",
    answer:
      "LatchClub is a premium membership that gives you access to exclusive deals at the best dining, wellness, fitness, and lifestyle spots across your city.",
  },
  {
    question: "How does the membership work?",
    answer:
      "Once you sign up, you get instant access to hundreds of offers through the LatchClub app. Simply browse deals near you, show your membership at checkout, and enjoy the savings.",
  },
  {
    question: "Which cities are available?",
    answer:
      "We're launching first in Toronto, with plans to expand across North America. Join the waitlist to be the first in your city.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel your membership at any time with no penalties or hidden fees. We believe the value speaks for itself.",
  },
  {
    question: "How much money can I save?",
    answer:
      "Most members earn up to 5-10x their membership value within the first year. With exclusive deals at premium restaurants and experiences, just three or four uses typically makes the memebership pay for itself.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "We offer a 30-day free trial for our student/senior, general, and premium plans so you can explore the full range of deals before committing.",
  },
  {
    question: "What types of deals are offered?",
    answer:
      "We partner with restaurants, cafés, spas, gyms, salons, entertainment venues, hotels, and more. Categories include dining, wellness, fitness, lifestyle, travel, and retail.",
  },
  {
    question: "How is LatchClub different from coupon apps?",
    answer:
      "LatchClub offers curated deals at premium merchants — not generic discount codes, all on one platform. Every redemption is instant through the app with no clipping or codes.",
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".faq-label",
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: ".faq-label", start: "top 88%", once: true },
          }
        );

        gsap.fromTo(
          ".faq-heading",
          { opacity: 0, y: 25 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: ".faq-heading", start: "top 88%", once: true },
          }
        );

        gsap.fromTo(
          ".faq-item",
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: ".faq-list", start: "top 85%", once: true },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-12 md:py-16 bg-background"
    >
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-10">
          <p className="faq-label text-xs uppercase tracking-[0.2em] text-teal-400 mb-2">
            Support
          </p>
          <h2 className="faq-heading text-2xl md:text-3xl font-heading font-medium tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion className="faq-list space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={i}
              className="faq-item border border-border rounded-lg px-5 bg-card data-[open]:shadow-sm"
            >
              <AccordionTrigger className="text-left text-sm font-normal text-foreground hover:text-teal-400 py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
