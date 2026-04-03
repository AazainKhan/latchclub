"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type FormStatus = "idle" | "loading" | "success" | "error"

interface WaitlistFormProps {
  className?: string
}

export default function WaitlistForm({ className }: WaitlistFormProps) {
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

  if (status === "success") {
    return (
      <p
        className={cn(
          "text-sm text-teal-400 font-medium tracking-tight",
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
      className={cn("flex flex-row items-center gap-3 max-w-md", className)}
    >
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === "loading"}
        className="h-10 flex-1"
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        className="h-10 px-5 bg-carbon text-white shrink-0"
      >
        {status === "loading" ? "Joining..." : "Join Waitlist"}
      </Button>
      {status === "error" && errorMessage && (
        <p className="text-sm text-error absolute mt-14">{errorMessage}</p>
      )}
    </form>
  )
}
