"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const features = [
  { word: "dine.", hue: 170 },
  { word: "relax.", hue: 190 },
  { word: "explore.", hue: 210 },
  { word: "save.", hue: 150 },
  { word: "discover.", hue: 230 },
  { word: "earn.", hue: 140 },
  { word: "redeem.", hue: 260 },
  { word: "share.", hue: 280 },
  { word: "train.", hue: 200 },
  { word: "unwind.", hue: 300 },
  { word: "connect.", hue: 320 },
  { word: "thrive.", hue: 160 },
  { word: "celebrate.", hue: 340 },
  { word: "live.", hue: 170 },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!listRef.current) return;

    const items = gsap.utils.toArray<HTMLElement>(
      listRef.current.querySelectorAll("li")
    );
    if (!items.length) return;

    // Start all items dimmed except first
    gsap.set(items, { opacity: (i) => (i === 0 ? 1 : 0.15) });

    // Dimmer: stagger items brightening and dimming as you scroll through
    const dimmer = gsap
      .timeline()
      .to(items.slice(1), { opacity: 1, stagger: 0.5 })
      .to(
        items.slice(0, items.length - 1),
        { opacity: 0.15, stagger: 0.5 },
        0
      );

    const dimmerTrigger = ScrollTrigger.create({
      trigger: items[0],
      endTrigger: items[items.length - 1],
      start: "center center",
      end: "center center",
      animation: dimmer,
      scrub: 0.2,
    });

    // Hue cycling on the section
    const hueScroll = gsap.fromTo(
      sectionRef.current,
      { "--scroll-hue": 170 },
      {
        "--scroll-hue": 340,
        ease: "none",
        scrollTrigger: {
          trigger: items[0],
          endTrigger: items[items.length - 1],
          start: "center center",
          end: "center center",
          scrub: 0.2,
        },
      }
    );

    // Chroma entry — fade color in
    const chromaIn = gsap.fromTo(
      sectionRef.current,
      { "--chroma": 0 },
      {
        "--chroma": 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: items[0],
          start: "center center+=60",
          end: "center center",
          scrub: 0.2,
        },
      }
    );

    // Chroma exit — fade color out
    const chromaOut = gsap.fromTo(
      sectionRef.current,
      { "--chroma": 0.25 },
      {
        "--chroma": 0,
        ease: "none",
        scrollTrigger: {
          trigger: items[items.length - 2],
          start: "center center",
          end: "center center-=60",
          scrub: 0.2,
        },
      }
    );

    // Underline animation on "one membership."
    const underline = document.querySelector(".features-underline");
    const closing = document.querySelector(".features-closing");
    let underlineTween: gsap.core.Tween | null = null;
    if (underline && closing) {
      underlineTween = gsap.to(underline, {
        width: "100%",
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: closing,
          start: "top 60%",
          once: true,
        },
      });
    }

    return () => {
      dimmerTrigger.kill();
      hueScroll.scrollTrigger?.kill();
      hueScroll.kill();
      chromaIn.scrollTrigger?.kill();
      chromaIn.kill();
      chromaOut.scrollTrigger?.kill();
      chromaOut.kill();
      underlineTween?.scrollTrigger?.kill();
      underlineTween?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="bg-carbon"
      style={
        {
          "--scroll-hue": 170,
          "--chroma": 0,
        } as React.CSSProperties
      }
    >
      <div className="features-scroll-section flex w-full" style={{ paddingLeft: "clamp(2rem, 8vw, 5rem)" }}>
        {/* Sticky "you can" */}
        <h2
          className="sticky font-semibold text-bone/80 whitespace-nowrap shrink-0"
          style={{
            top: "calc(50% - 0.55lh)",
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            lineHeight: 1.25,
            height: "fit-content",
            backgroundImage: "linear-gradient(to bottom, rgba(245,247,247,0.9) 50%, rgba(245,247,247,0.25))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          you can&nbsp;
        </h2>

        {/* Scrolling feature words */}
        <ul
          ref={listRef}
          className="list-none m-0 p-0"
          style={{ "--count": features.length } as React.CSSProperties}
        >
          {features.map((feature, i) => (
            <li
              key={feature.word}
              className="font-semibold"
              style={
                {
                  "--i": i,
                  fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                  lineHeight: 1.25,
                  color: `oklch(75% var(--chroma, 0) ${feature.hue})`,
                  scrollSnapAlign: "center",
                } as React.CSSProperties
              }
            >
              {feature.word}
            </li>
          ))}
          {/* Last item */}
          <li
            className="font-semibold"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              lineHeight: 1.25,
              backgroundImage: "linear-gradient(to bottom, rgba(245,247,247,0.9) 50%, rgba(245,247,247,0.25))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            do it all.
          </li>
        </ul>
      </div>

      {/* Closing: "in" + "one membership." — tight stack, centered */}
      <div className="flex flex-col items-center justify-center w-full py-16 md:py-24 gap-4 md:gap-6">
        <p
          className="font-semibold text-center"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            lineHeight: 1.25,
            backgroundImage: "linear-gradient(to bottom, rgba(245,247,247,0.9) 50%, rgba(245,247,247,0.25))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          in
        </p>
        <div className="relative inline-block">
          <p
            className="features-closing font-semibold text-center"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              lineHeight: 1.25,
              backgroundImage: "linear-gradient(to bottom, rgba(245,247,247,0.9) 60%, rgba(245,247,247,0.15))",
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
