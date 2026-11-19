import { ArrowUp } from "lucide-react";
import { Instagram, Linkedin, Twitter, Dribbble } from "./Icons";
import { lenisRef } from "./LenisProvider";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Our Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_LINKS = [
  "Website Development",
  "Mobile App Development",
  "AI & Automation Solutions",
  "Social Media Management",
  "Digital Advertising & Marketing",
  "Customer Experience (CX)",
];

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "X (Twitter)", href: "#" },
  { icon: Dribbble, label: "Dribbble", href: "#" },
];

const toTop = () => {
  if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Footer() {
  return (
    <footer data-testid="footer-section" className="relative border-t border-white/10 pt-20 pb-10 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#home" className="flex items-center gap-2.5" aria-label="EXCENIUS home">
              <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
                <rect width="32" height="32" rx="7" fill="#0A0A0A" stroke="rgba(255,255,255,0.35)" />
                <path d="M21 10H11v12h10M11 16h8" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="square" fill="none" />
              </svg>
              <span className="font-display font-bold tracking-tight text-lg">EXCENIUS</span>
            </a>
            <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-xs">
              We don&apos;t just build digital products. We create meaningful digital experiences
              that help businesses grow.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    data-testid={`footer-social-${s.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className="w-9 h-9 border border-white/15 rounded-full flex items-center justify-center text-white/60 hover:bg-white hover:text-[#0A0A0A] transition-all duration-300"
                  >
                    <Icon size={15} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="field-label mb-5">Quick Links</p>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    data-testid={`footer-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="field-label mb-5">Services</p>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    data-testid={`footer-service-${s.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="field-label mb-5">Get in Touch</p>
            <a
              href="mailto:contact.excenius@gmail.com"
              data-testid="footer-email-link"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              contact.excenius@gmail.com
            </a>
            <p className="mt-6">
              <button
                onClick={toTop}
                data-testid="footer-back-to-top"
                className="inline-flex items-center gap-2 border border-white/20 rounded-full px-5 py-2.5 text-xs font-mono uppercase tracking-[0.2em] text-white/70 hover:bg-white hover:text-[#0A0A0A] transition-all duration-300"
              >
                Back to Top
                <ArrowUp size={14} strokeWidth={1.5} />
              </button>
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-20 text-center font-display font-extrabold leading-none select-none text-outline text-[16.5vw] -mb-2"
        >
          EXCENIUS
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} EXCENIUS. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            Digital Experiences That Move Businesses Forward
          </p>
        </div>
      </div>
    </footer>
  );
}
