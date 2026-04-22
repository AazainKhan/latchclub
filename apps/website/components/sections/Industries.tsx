"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { CardCarousel } from "@/components/ui/card-carousel";

const industries = [
  { src: "https://picsum.photos/seed/dining/500/500", alt: "Dining", title: "Dining", description: "From brunch to fine dining" },
  { src: "https://picsum.photos/seed/wellness/500/500", alt: "Wellness", title: "Wellness", description: "Spas, salons, self-care & pet care" },
  { src: "https://picsum.photos/seed/fitness/500/500", alt: "Fitness", title: "Fitness", description: "Gyms, yoga & sports" },
  { src: "https://picsum.photos/seed/entertainment/500/500", alt: "Entertainment", title: "Entertainment", description: "Shows, events & nightlife" },
  { src: "https://picsum.photos/seed/retail/500/500", alt: "Retail", title: "Retail", description: "Fashion & specialty stores" },
  { src: "https://picsum.photos/seed/hotels/500/500", alt: "Hotels", title: "Hotels", description: "Stays & resort getaways" },
  { src: "https://picsum.photos/seed/travel/500/500", alt: "Travel", title: "Travel", description: "Flights, tours & packages" },
];

export function Industries() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".industries-label", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: ".industries-label", start: "top 88%", once: true },
      });
      gsap.fromTo(".industries-heading", { opacity: 0, y: 25 }, {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".industries-heading", start: "top 88%", once: true },
      });
      gsap.fromTo(".industries-sub", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: ".industries-sub", start: "top 90%", once: true },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="relative z-10 min-h-screen flex flex-col justify-center bg-carbon py-20 md:py-16 overflow-hidden"
    >
      <div className="relative z-20 max-w-6xl mx-auto px-4 md:px-6 text-center mb-8 md:mb-14">
        <p className="industries-label text-xs uppercase tracking-[0.2em] text-teal-300 mb-3">
          Industries
        </p>
        <h2 className="industries-heading text-3xl md:text-4xl font-heading font-medium tracking-tight text-bone">
          Where your membership works
        </h2>
        <p className="industries-sub text-bone/40 mt-4 max-w-xl mx-auto text-base" style={{ lineHeight: 1.7 }}>
          Our partnerships span every category — from your morning coffee to a
          weekend getaway.
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <CardCarousel
          images={industries}
          autoplayDelay={6000}
          showPagination={true}
          showNavigation={true}
        />
      </div>
    </section>
  );
}
