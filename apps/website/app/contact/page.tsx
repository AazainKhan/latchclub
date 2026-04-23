"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});

  const validate = (f: { name: string; email: string; message: string }) => {
    const e: { name?: string; email?: string; message?: string } = {};
    if (!f.name.trim() || f.name.trim().length < 2) e.name = "Please enter your name";
    if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Please enter a valid email";
    if (!f.message.trim() || f.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleBlur = (field: "name" | "email" | "message") => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate({ name, email, message }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const errs = validate({ name, email, message });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(
          data?.error ||
            "Something went wrong. Please try again or email corporate@latchclub.ca directly."
        );
      }
    } catch {
      setSubmitError(
        "Couldn't reach the server. Please try again or email corporate@latchclub.ca directly."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="max-w-2xl mb-14 md:mb-20">
            <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-foreground mb-5">
              Get in touch
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Have a question about LatchClub, want to partner with us, or just
              want to say hello? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="flex items-start gap-4 p-6 bg-teal-300/10 rounded-2xl border border-teal-300/20">
                  <CheckCircle size={24} className="text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      Message sent!
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Thanks for reaching out. We&apos;ll get back to you
                      within 1–2 business days.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                        Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => { setName(e.target.value); if (touched.name) setErrors(validate({ name: e.target.value, email, message })); }}
                        onBlur={() => handleBlur("name")}
                        className={`h-12 rounded-xl bg-card border-border text-foreground placeholder:text-muted-foreground px-4 transition-colors ${touched.name && errors.name ? "border-red-400/60" : ""}`}
                      />
                      {touched.name && errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); if (touched.email) setErrors(validate({ name, email: e.target.value, message })); }}
                        onBlur={() => handleBlur("email")}
                        className={`h-12 rounded-xl bg-card border-border text-foreground placeholder:text-muted-foreground px-4 transition-colors ${touched.email && errors.email ? "border-red-400/60" : ""}`}
                      />
                      {touched.email && errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                      Message
                    </label>
                    <textarea
                      placeholder="How can we help?"
                      value={message}
                      onChange={(e) => { setMessage(e.target.value); if (touched.message) setErrors(validate({ name, email, message: e.target.value })); }}
                      onBlur={() => handleBlur("message")}
                      rows={6}
                      className={`w-full rounded-xl bg-card border text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-colors ${touched.message && errors.message ? "border-red-400/60" : "border-border focus:border-teal-400/40"}`}
                    />
                    {touched.message && errors.message && (
                      <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 px-8 bg-teal-300 hover:bg-teal-300/90 text-carbon rounded-full text-sm font-medium"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>

                  {submitError && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 p-4 bg-red-400/10 rounded-xl border border-red-400/20"
                    >
                      <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                      <p className="text-red-400 text-sm leading-relaxed">
                        {submitError}
                      </p>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Right: Info cards */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="w-10 h-10 rounded-xl bg-teal-300/10 flex items-center justify-center mb-4">
                  <Mail size={18} className="text-teal-400" />
                </div>
                <p className="text-foreground font-medium text-sm mb-1">Email us</p>
                <p className="text-muted-foreground text-sm">corporate@latchclub.ca</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="w-10 h-10 rounded-xl bg-teal-300/10 flex items-center justify-center mb-4">
                  <MapPin size={18} className="text-teal-400" />
                </div>
                <p className="text-foreground font-medium text-sm mb-1">Based in</p>
                <p className="text-muted-foreground text-sm">Toronto, Canada</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
