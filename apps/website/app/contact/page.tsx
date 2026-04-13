"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Clock, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setLoading(true);
    // Simulate submit
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
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
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-12 rounded-xl bg-card border-border text-foreground placeholder:text-muted-foreground px-4"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 rounded-xl bg-card border-border text-foreground placeholder:text-muted-foreground px-4"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                      Message
                    </label>
                    <textarea
                      placeholder="How can we help?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={6}
                      className="w-full rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm resize-none focus:outline-none focus:border-teal-400/40 focus:ring-2 focus:ring-teal-400/20 transition-colors"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 px-8 bg-teal-300 hover:bg-teal-300/90 text-carbon rounded-full text-sm font-medium"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
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
