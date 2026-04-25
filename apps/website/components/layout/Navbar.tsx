"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/shared/ThemeProvider";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { WaitlistDialog } from "@/components/waitlist/WaitlistDialog";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Investors", href: "/investors" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWaitlistClickFromMobileMenu = (e: React.MouseEvent) => {
    setOpen(false);
    if (!isHome) {
      e.preventDefault();
      // Wait for sheet exit animation before opening dialog so the two
      // overlays don't fight for focus/scroll-lock.
      setTimeout(() => setWaitlistOpen(true), 220);
    }
  };

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

    return () => mm.revert();
  });

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-6 pt-0 md:pt-2"
    >
      <div className="relative w-full max-w-[880px]">
        {/* Mobile background — always visible, edge-to-edge bar so the nav
            stays readable over any section as the user scrolls. */}
        <div
          className="absolute inset-x-[-16px] inset-y-0 pointer-events-none md:hidden"
          style={{
            backgroundColor: "color-mix(in srgb, var(--background) 80%, transparent)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            borderBottom: "1px solid color-mix(in srgb, var(--border) 60%, transparent)",
          }}
        />

        {/* Desktop background layer — scroll-scrubbed pill */}
        <div
          ref={bgRef}
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            backgroundColor: "color-mix(in srgb, var(--background) 85%, transparent)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid var(--border)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
            opacity: 0,
            willChange: "opacity, border-radius",
          }}
        />

        {/* Nav content */}
        <nav className="relative z-10 h-14 flex items-center justify-between px-4 md:px-5">
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <img src="/logo.png" alt="LatchClub" className="w-6 h-6 dark:invert" />
            <span className="text-lg tracking-tight">
              <span className="text-teal-400 font-normal">latch</span><span className="font-medium text-foreground">club</span>
            </span>
          </Link>

          {/* Center nav links — absolutely positioned so they're truly centered regardless of logo/CTA widths */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="text-[13px] tracking-wide text-foreground/50 hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-white/10 text-foreground/50 hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}
            {isHome ? (
              <Button
                nativeButton={false} render={<a href="/#waitlist" />}
                className="bg-teal-300 hover:bg-teal-300/90 text-carbon rounded-full px-5 h-8 text-[13px] font-medium"
              >
                Join the Waitlist
              </Button>
            ) : (
              <Button
                onClick={() => setWaitlistOpen(true)}
                className="bg-teal-300 hover:bg-teal-300/90 text-carbon rounded-full px-5 h-8 text-[13px] font-medium"
              >
                Join the Waitlist
              </Button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-1">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-white/10 text-foreground/50 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <button
                    className="p-2 rounded-full hover:bg-white/10 text-foreground transition-colors"
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
                  {isHome ? (
                    <Button
                      render={<a href="/#waitlist" onClick={() => setOpen(false)} />}
                      className="bg-teal-300 hover:bg-teal-300/90 text-carbon rounded-full h-10 font-medium mt-2"
                    >
                      Join the Waitlist
                    </Button>
                  ) : (
                    <Button
                      onClick={handleWaitlistClickFromMobileMenu}
                      className="bg-teal-300 hover:bg-teal-300/90 text-carbon rounded-full h-10 font-medium mt-2"
                    >
                      Join the Waitlist
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>

      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </header>
  );
}
