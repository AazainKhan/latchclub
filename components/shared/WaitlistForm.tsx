"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type FormStatus = "idle" | "loading" | "success" | "error"

interface WaitlistFormProps {
  className?: string
  variant?: "light" | "dark"
}

export default function WaitlistForm({ className, variant = "light" }: WaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!email) return

    setStatus("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus("success")
        setEmail("")
      } else {
        const data = await res.json()
        setErrorMessage(data.error || "Something went wrong")
        setStatus("error")
      }
    } catch {
      setErrorMessage("Something went wrong")
      setStatus("error")
    }
  }

  const isDark = variant === "dark"

  if (status === "success") {
    return (
      <p
        className={cn(
          "text-sm font-medium tracking-tight",
          isDark ? "text-teal-300" : "text-teal-400",
          className
        )}
      >
        You&apos;re on the list!
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative flex flex-row items-center gap-3 max-w-md", className)}
    >
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === "loading"}
        className={cn(
          "h-11 flex-1",
          isDark
            ? "bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-teal-300/40"
            : ""
        )}
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "h-11 px-6 shrink-0",
          isDark
            ? "bg-teal-300 text-white hover:bg-teal-300/90"
            : "bg-carbon text-white"
        )}
      >
        {status === "loading" ? "Joining..." : "Join Waitlist"}
      </Button>
      {status === "error" && errorMessage && (
        <p className={cn(
          "text-sm absolute -bottom-7 left-0",
          isDark ? "text-red-400" : "text-error"
        )}>
          {errorMessage}
        </p>
      )}
    </form>
  )
}
