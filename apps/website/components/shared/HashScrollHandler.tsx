"use client";

import { useEffect } from "react";

/**
 * Handles hash-based anchor scrolling after GSAP ScrollTrigger
 * has finished setting up pinned sections.
 *
 * Without this, navigating to /#pricing from another page lands
 * at the wrong position because GSAP pin adds extra scroll height
 * after the browser's initial hash scroll.
 */
export function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    // Wait for GSAP ScrollTrigger to finish pinning and layout to stabilize
    const timer = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
