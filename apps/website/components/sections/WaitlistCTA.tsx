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
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>({});

  const validate = (fields: { name: string; email: string }) => {
    const e: { name?: string; email?: string } = {};
    if (!fields.name.trim() || fields.name.trim().length < 2)
      e.name = "Please enter your name";
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = "Please enter a valid email";
    return e;
  };

  const handleBlur = (field: "name" | "email") => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate({ name, email }));
  };

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
    setTouched({ name: true, email: true });
    const errs = validate({ name, email });
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: name, email }),
      });
      const data = await res.json();
      if (data.alreadySignedUp) setAlreadySignedUp(true);
      else if (res.ok) setSubmitted(true);
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
        <h2 className="waitlist-heading text-3xl md:text-5xl font-heading font-medium tracking-tight text-bone">
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
        ) : alreadySignedUp ? (
          <div className="mt-10 flex items-center justify-center gap-3 p-4 bg-teal-300/10 rounded-xl border border-teal-300/20 max-w-md mx-auto">
            <CheckCircle size={20} className="text-teal-300 shrink-0" />
            <p className="text-bone/70 text-sm">
              You&apos;re already on the list — see you at launch! 🎉
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="waitlist-form mt-10 flex flex-col gap-3 max-w-sm mx-auto"
          >
            <div className="flex flex-col gap-1">
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => { setName(e.target.value); if (touched.name) setErrors(validate({ name: e.target.value, email })); }}
                onBlur={() => handleBlur("name")}
                className={`h-12 rounded-full bg-carbon-light border-white/10 text-bone placeholder:text-bone/30 px-5 w-full transition-colors ${touched.name && errors.name ? "border-red-400/60" : ""}`}
              />
              {touched.name && errors.name && (
                <p className="text-red-400 text-xs pl-4">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (touched.email) setErrors(validate({ name, email: e.target.value })); }}
                onBlur={() => handleBlur("email")}
                className={`h-12 rounded-full bg-carbon-light border-white/10 text-bone placeholder:text-bone/30 px-5 w-full transition-colors ${touched.email && errors.email ? "border-red-400/60" : ""}`}
              />
              {touched.email && errors.email && (
                <p className="text-red-400 text-xs pl-4">{errors.email}</p>
              )}
            </div>
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
