"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="relative z-[60] bg-teal-300" data-banner>
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-center px-4 md:px-6">
        <p className="text-xs font-medium text-white tracking-[0.02em]">
          Early Access — Limited spots remaining
          <a
            href="#waitlist"
            className="ml-2 inline-flex items-center text-white/80 underline underline-offset-2 transition-colors hover:text-white"
          >
            Learn more &rarr;
          </a>
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 size-7 text-white/70 hover:text-white hover:bg-transparent"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
        >
          <X className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}
