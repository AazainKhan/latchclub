"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SUCCESS_AUTO_CLOSE_MS = 1800;

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>({});

  useEffect(() => {
    if (open) {
      setName("");
      setEmail("");
      setSubmitted(false);
      setAlreadySignedUp(false);
      setLoading(false);
      setErrors({});
      setTouched({});
    }
  }, [open]);

  useEffect(() => {
    if (!submitted && !alreadySignedUp) return;
    const t = setTimeout(() => onOpenChange(false), SUCCESS_AUTO_CLOSE_MS);
    return () => clearTimeout(t);
  }, [submitted, alreadySignedUp, onOpenChange]);

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
      // silent — match WaitlistCTA behavior
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-carbon border border-white/10 p-6 md:p-8 shadow-2xl transition-all duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:scale-95 data-starting-style:scale-95">
          <Dialog.Close
            render={
              <button
                aria-label="Close"
                className="absolute top-3 right-3 p-2 rounded-full text-bone/50 hover:text-bone hover:bg-white/5 transition-colors"
              />
            }
          >
            <X size={16} />
          </Dialog.Close>

          <Dialog.Title className="text-2xl md:text-3xl font-heading font-medium tracking-tight text-bone text-center pr-6">
            Ready to <em className="italic text-teal-300">unlock</em> your city?
          </Dialog.Title>
          <Dialog.Description className="text-bone/40 mt-3 text-sm text-center" style={{ lineHeight: 1.65 }}>
            Join the waitlist and be among the first to experience LatchClub when we launch in Toronto.
          </Dialog.Description>

          {submitted ? (
            <div className="mt-6 flex items-center justify-center gap-3 p-4 bg-teal-300/10 rounded-xl border border-teal-300/20">
              <CheckCircle size={20} className="text-teal-300 shrink-0" />
              <p className="text-bone/70 text-sm">
                You&apos;re on the list! We&apos;ll be in touch soon.
              </p>
            </div>
          ) : alreadySignedUp ? (
            <div className="mt-6 flex items-center justify-center gap-3 p-4 bg-teal-300/10 rounded-xl border border-teal-300/20">
              <CheckCircle size={20} className="text-teal-300 shrink-0" />
              <p className="text-bone/70 text-sm">
                You&apos;re already on the list — see you at launch! 🎉
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
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
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
