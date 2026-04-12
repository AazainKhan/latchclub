"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";

export function WaitlistCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".waitlist-heading",
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: ".waitlist-heading", start: "top 88%", once: true },
          }
        );
        gsap.fromTo(
          ".waitlist-sub",
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: ".waitlist-sub", start: "top 90%", once: true },
          }
        );
        gsap.fromTo(
          ".waitlist-form",
          { opacity: 0, y: 25 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: ".waitlist-form", start: "top 90%", once: true },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: name, email }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      className="py-20 md:py-28 bg-carbon"
    >
      <div className="max-w-2xl mx-auto px-4 md:px-6 text-center">
        <h2 className="waitlist-heading text-3xl md:text-5xl font-normal tracking-tight text-bone">
          Ready to <em className="italic text-teal-300">unlock</em> your city?
        </h2>

        <p className="waitlist-sub text-bone/40 mt-4 text-base" style={{ lineHeight: 1.7 }}>
          Join the waitlist and be among the first to experience LatchClub when
          we launch in Toronto.
        </p>

        {submitted ? (
          <div className="mt-10 flex items-center justify-center gap-3 p-4 bg-teal-300/10 rounded-xl border border-teal-300/20 max-w-md mx-auto">
            <CheckCircle size={20} className="text-teal-300 shrink-0" />
            <p className="text-bone/70 text-sm">
              You&apos;re on the list! We&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="waitlist-form mt-10 flex flex-col gap-3 max-w-sm mx-auto"
          >
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-12 rounded-full bg-carbon-light border-white/10 text-bone placeholder:text-bone/30 px-5 w-full"
            />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-full bg-carbon-light border-white/10 text-bone placeholder:text-bone/30 px-5 w-full"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-12 bg-teal-300 hover:bg-teal-300/90 text-carbon rounded-full text-sm font-medium w-full mt-1"
            >
              {loading ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
