"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Feature {
  word: string;
  color: string;
}

const features: Feature[] = [
  { word: "dine.", color: "#03A493" },
  { word: "relax.", color: "#4DBCAE" },
  { word: "explore.", color: "#6366F1" },
  { word: "save.", color: "#10B981" },
  { word: "discover.", color: "#03A493" },
  { word: "earn.", color: "#F59E0B" },
  { word: "redeem.", color: "#EC4899" },
  { word: "share.", color: "#80CFC5" },
  { word: "train.", color: "#3B82F6" },
  { word: "unwind.", color: "#A855F7" },
  { word: "connect.", color: "#03A493" },
  { word: "thrive.", color: "#10B981" },
  { word: "celebrate.", color: "#E97451" },
  { word: "live.", color: "#03A493" },
];

const DIM_COLOR = "rgba(245,247,247,0.15)";

function setupDesktopHighlighting(container: HTMLElement, selector: string) {
  const items = gsap.utils.toArray<HTMLElement>(container.querySelectorAll(selector));
  if (!items.length) return [];

  const cleanups: (() => void)[] = [];

  items.forEach((item, i) => {
    const feature = features[i];
    if (!feature) return;

    gsap.set(item, { opacity: 0.15, color: DIM_COLOR });

    const st = ScrollTrigger.create({
      trigger: item,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => gsap.to(item, { opacity: 1, color: feature.color, duration: 0.3, ease: "power2.out", overwrite: true }),
      onLeave: () => gsap.to(item, { opacity: 0.15, color: DIM_COLOR, duration: 0.3, ease: "power2.out", overwrite: true }),
      onEnterBack: () => gsap.to(item, { opacity: 1, color: feature.color, duration: 0.3, ease: "power2.out", overwrite: true }),
      onLeaveBack: () => gsap.to(item, { opacity: 0.15, color: DIM_COLOR, duration: 0.3, ease: "power2.out", overwrite: true }),
    });

    cleanups.push(() => st.kill());
  });

  return cleanups;
}

// Mobile: words accumulate — highlight and stay highlighted as you scroll down,
// dim one-by-one as you scroll back up. Uses gsap.set (instant) to avoid
// animation queuing during fast scroll, which was causing jitter.
function setupMobileHighlighting(container: HTMLElement, selector: string) {
  const items = gsap.utils.toArray<HTMLElement>(container.querySelectorAll(selector));
  if (!items.length) return [];

  const cleanups: (() => void)[] = [];

  items.forEach((item, i) => {
    const feature = features[i];
    if (!feature) return;

    gsap.set(item, { opacity: 0.15, color: DIM_COLOR });

    const st = ScrollTrigger.create({
      trigger: item,
      start: "top 75%",
      onEnter: () => gsap.set(item, { opacity: 1, color: feature.color }),
      onEnterBack: () => gsap.set(item, { opacity: 1, color: feature.color }),
      onLeaveBack: () => gsap.set(item, { opacity: 0.15, color: DIM_COLOR }),
      // onLeave intentionally omitted — word stays highlighted as you scroll past
    });

    cleanups.push(() => st.kill());
  });

  return cleanups;
}

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopListRef = useRef<HTMLUListElement>(null);
  const mobileListRef = useRef<HTMLDivElement>(null);

  // Desktop highlighting
  useEffect(() => {
    if (!desktopListRef.current) return;
    const cleanups = setupDesktopHighlighting(desktopListRef.current, ".feature-word");

    // Underline on "one membership."
    const underline = document.querySelector(".features-underline");
    const closing = document.querySelector(".features-closing");
    let underlineSt: ScrollTrigger | null = null;
    if (underline && closing) {
      const tween = gsap.to(underline, {
        width: "100%",
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: closing, start: "top 60%", once: true },
      });
      underlineSt = tween.scrollTrigger ?? null;
    }

    return () => {
      cleanups.forEach((fn) => fn());
      underlineSt?.kill();
    };
  }, []);

  // Mobile highlighting — accumulate behavior
  useEffect(() => {
    if (!mobileListRef.current) return;
    const cleanups = setupMobileHighlighting(mobileListRef.current, ".mobile-feature-word");
    return () => cleanups.forEach((fn) => fn());
  }, []);

  const gradientText = "linear-gradient(to bottom, rgba(245,247,247,0.9) 50%, rgba(245,247,247,0.25))";
  const gradientTextFade = "linear-gradient(to bottom, rgba(245,247,247,0.9) 60%, rgba(245,247,247,0.15))";

  return (
    <section ref={sectionRef} id="features" className="bg-carbon">
      {/* Desktop: sticky "you can" + scrolling words */}
      <div className="hidden md:flex w-full" style={{ paddingLeft: "clamp(2rem, 8vw, 5rem)" }}>
        <h2
          className="sticky font-heading font-medium whitespace-nowrap shrink-0"
          style={{
            top: "calc(50% - 0.55lh)",
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            lineHeight: 1.25,
            height: "fit-content",
            backgroundImage: gradientText,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          you can&nbsp;
        </h2>

        <ul ref={desktopListRef} className="list-none m-0 p-0">
          {features.map((f) => (
            <li
              key={f.word}
              className="feature-word font-heading font-medium"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1.25, scrollSnapAlign: "center" }}
            >
              {f.word}
            </li>
          ))}
          <li
            className="font-heading font-medium"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              lineHeight: 1.25,
              backgroundImage: gradientText,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            do it all.
          </li>
        </ul>
      </div>

      {/* Mobile: centered vertical list */}
      <div ref={mobileListRef} className="md:hidden px-6 py-20">
        <p
          className="font-heading font-medium text-center mb-6"
          style={{
            fontSize: "clamp(2rem, 10vw, 3.5rem)",
            lineHeight: 1.2,
            backgroundImage: gradientText,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          you can
        </p>
        <div className="space-y-3 text-center">
          {features.map((f) => (
            <p
              key={f.word}
              className="mobile-feature-word font-heading font-medium"
              style={{ fontSize: "clamp(2rem, 10vw, 3.5rem)", lineHeight: 1.2 }}
            >
              {f.word}
            </p>
          ))}
          <p
            className="font-heading font-medium"
            style={{
              fontSize: "clamp(2rem, 10vw, 3.5rem)",
              lineHeight: 1.2,
              backgroundImage: gradientText,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            do it all.
          </p>
        </div>
      </div>

      {/* Closing: "in" + "one membership." */}
      <div className="flex flex-col items-center justify-center w-full py-16 md:py-24 gap-4 md:gap-6">
        <p
          className="font-heading font-medium text-center"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            lineHeight: 1.25,
            backgroundImage: gradientText,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          in
        </p>
        <div className="relative inline-block">
          <p
            className="features-closing font-heading font-medium text-center"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              lineHeight: 1.25,
              backgroundImage: gradientTextFade,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            one membership.
          </p>
          <span
            className="features-underline block h-[3px] md:h-[4px] bg-teal-400 rounded-full mt-2 mx-auto"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </section>
  );
}
