"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "/about" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 80)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 transition-colors duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-mist"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg tracking-[-0.02em] text-carbon"
        >
          <span className="font-normal">latch</span>
          <span className="font-medium">club</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-normal text-neutral-300 transition-colors hover:text-carbon"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Button
          size="sm"
          className="hidden bg-carbon text-white md:inline-flex"
          onClick={() => {
            document
              .getElementById("hero")
              ?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          Join Waitlist
        </Button>

        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-6">
            <SheetHeader>
              <SheetTitle className="text-lg tracking-[-0.02em] text-carbon">
                <span className="font-normal">latch</span>
                <span className="font-medium">club</span>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <SheetClose
                  key={link.label}
                  render={
                    <Link
                      href={link.href}
                      className="text-base font-normal text-neutral-300 transition-colors hover:text-carbon"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
              <SheetClose
                render={
                  <Button
                    className="mt-4 w-full bg-carbon text-white"
                    onClick={() => {
                      document
                        .getElementById("hero")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }}
                  />
                }
              >
                Join Waitlist
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
