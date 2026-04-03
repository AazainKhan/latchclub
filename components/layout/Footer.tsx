import Link from "next/link"

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "/about" },
]

export default function Footer() {
  return (
    <footer className="border-t border-mist">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg tracking-[-0.02em] text-carbon"
          >
            <span className="font-normal">latch</span>
            <span className="font-medium">club</span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-neutral-300 transition-colors hover:text-carbon"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-neutral-300">
            &copy; 2025 Latchclub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
