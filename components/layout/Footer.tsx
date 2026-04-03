import Link from "next/link"

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "/about" },
]

export default function Footer() {
  return (
    <footer className="bg-carbon border-t border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <Link
              href="/"
              className="text-lg"
              style={{ letterSpacing: "-0.02em" }}
            >
              <span className="text-white/70">latch</span>
              <span className="font-medium text-white">club</span>
            </Link>
            <span className="text-xs text-white/30">
              Designed in Canada
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Latchclub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
