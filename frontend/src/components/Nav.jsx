import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Our Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        data-testid="nav-bar"
        className={`fixed top-0 inset-x-0 z-[70] transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-black/70 border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 h-[72px] flex items-center justify-between">
          <a href="#home" data-testid="nav-logo" className="flex items-center gap-2.5" aria-label="NOIRFORM home">
            <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
              <rect width="32" height="32" rx="7" fill="#0A0A0A" stroke="rgba(255,255,255,0.35)" />
              <path d="M10 22V10l12 12V10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="square" fill="none" />
            </svg>
            <span className="font-display font-bold tracking-tight text-lg">NOIRFORM</span>
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              data-testid="nav-cta-talk"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white text-[#0A0A0A] px-5 py-2.5 text-sm font-semibold hover:bg-[#E5E5E5] transition-colors duration-300"
            >
              Let&apos;s Talk
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>
            <button
              data-testid="nav-mobile-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-white/15"
            >
              {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] bg-[#0A0A0A] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-full flex flex-col justify-center px-8">
              {LINKS.map((l, i) => (
                <div key={l.href} className="overflow-hidden border-b border-white/10">
                  <motion.a
                    href={l.href}
                    data-testid={`nav-mobile-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                    onClick={() => setOpen(false)}
                    className="block py-5 font-display font-bold text-4xl tracking-tight"
                    initial={reduce ? false : { y: "110%" }}
                    animate={reduce ? undefined : { y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {l.label}
                  </motion.a>
                </div>
              ))}
              <motion.a
                href="#contact"
                data-testid="nav-mobile-cta-talk"
                onClick={() => setOpen(false)}
                className="btn-primary mt-10"
                initial={reduce ? false : { opacity: 0 }}
                animate={reduce ? undefined : { opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                Let&apos;s Talk
                <ArrowUpRight size={16} strokeWidth={2} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
