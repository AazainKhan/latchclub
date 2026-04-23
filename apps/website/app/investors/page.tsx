"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";

export default function InvestorsPage() {
  return (
    <>
      <Navbar />
      <AuroraBackground className="min-h-screen pt-16">
        <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center">

          <h1
            className="text-4xl md:text-6xl font-heading font-medium tracking-tight text-foreground dark:text-white mb-6"
            style={{ lineHeight: 1.1 }}
          >
            Building the future of local commerce.
          </h1>
          <p
            className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10"
            style={{ lineHeight: 1.7 }}
          >
            LatchClub is reimagining how individuals discover and save at the
            best local businesses. We&apos;re backed by a growing waitlist of
            1,200+ members and expanding across major cities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              nativeButton={false}
              render={
                <a
                  href="https://drive.google.com/file/d/1VZQo3FeoaJaDyby8da7VMkvo344D8ud3/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              className="h-12 px-7 bg-teal-400 hover:bg-teal-400/90 text-white rounded-full text-sm font-medium gap-2"
            >
              <FileText size={16} />
              View Pitch Deck
            </Button>
            <Button
              nativeButton={false}
              render={<a href="/contact" />}
              variant="outline"
              className="h-12 px-7 border-border text-foreground dark:text-white hover:bg-muted rounded-full text-sm font-medium gap-2"
            >
              Contact Us
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </AuroraBackground>
      <Footer />
    </>
  );
}
