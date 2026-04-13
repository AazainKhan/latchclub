import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Industries", href: "/#industries" },
    { label: "FAQ", href: "/#faq" },
  ],
  Company: [
    { label: "Investors", href: "/investors" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/latch.club?igsh=cGpnd3RqczNyODU2", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/latchclub/", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-carbon text-bone/70">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-0 mb-4">
              <span className="text-xl tracking-tight text-teal-400 font-normal">
                latch
              </span>
              <span className="text-xl tracking-tight font-medium text-bone">
                club
              </span>
            </Link>
            <p className="text-sm text-bone/50 leading-relaxed max-w-xs mb-5">
              The membership that pays for itself. Premier deals on dining,
              wellness, fitness, and lifestyle experiences.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-bone/40 hover:text-teal-400 hover:border-teal-400/30 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs uppercase tracking-widest text-bone/40 mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-bone/60 hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-bone/40">
            &copy; {new Date().getFullYear()} LatchClub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
