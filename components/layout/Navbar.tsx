"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Investors", href: "#" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set(bg, { opacity: 0, borderRadius: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "60px top",
          end: "240px top",
          scrub: 2,
        },
      });

      tl.to(bg, { opacity: 1, borderRadius: 9999, duration: 1, ease: "none" }, 0);
    });

    mm.add("(max-width: 767px)", () => {
      gsap.set(bg, { opacity: 0, borderRadius: 0 });
      gsap.to(bg, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "50px top",
          end: "150px top",
          scrub: 2,
        },
      });
    });
  });

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-6 pt-0 md:pt-2"
    >
      <div className="relative w-full max-w-[880px]">
        {/* Background layer */}
        <div
          ref={bgRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: "rgba(22, 32, 40, 0.82)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.03)",
            opacity: 0,
            willChange: "opacity, border-radius",
          }}
        />

        {/* Nav content */}
        <nav className="relative z-10 h-14 flex items-center justify-between px-4 md:px-5">
          <Link href="/" className="flex items-center gap-0 shrink-0">
            <span className="text-lg tracking-tight text-teal-300 font-normal">
              latch
            </span>
            <span className="text-lg tracking-tight font-medium text-white">
              club
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="text-[13px] tracking-wide text-white/50 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}
            <Button
              nativeButton={false} render={<a href="#waitlist" />}
              className="bg-teal-300 hover:bg-teal-300/90 text-carbon rounded-full px-5 h-8 text-[13px] font-medium"
            >
              Join the Waitlist
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-1">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-white/10 text-white/50 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <button
                    className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                    aria-label="Open menu"
                  />
                }
              >
                <Menu size={18} />
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] pt-12">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <div className="flex flex-col gap-6 p-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href + link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-lg text-foreground hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                  <Button
                    render={<a href="#waitlist" onClick={() => setOpen(false)} />}
                    className="bg-teal-300 hover:bg-teal-300/90 text-carbon rounded-full h-10 font-medium mt-2"
                  >
                    Join the Waitlist
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
