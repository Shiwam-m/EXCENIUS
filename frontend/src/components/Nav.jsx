import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X, ChevronDown, Check } from "lucide-react";
import Logo from "./Logo";
import { useTheme } from "../context/ThemeContext";

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
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef(null);
  const reduce = useReducedMotion();
  const { theme, setTheme, themes } = useTheme();

  const currentTheme = themes.find((t) => t.id === theme) || themes[0];

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

  // Click outside to close theme menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) {
        setThemeMenuOpen(false);
      }
    };
    if (themeMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [themeMenuOpen]);

  return (
    <>
      <header
        data-testid="nav-bar"
        className={`fixed top-0 inset-x-0 z-[70] transition-all duration-300 ${
          scrolled
            ? "nav-scrolled backdrop-blur-xl border-b"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 h-[72px] flex items-center justify-between">
          <a href="#home" data-testid="nav-logo" className="flex items-center gap-3 group" aria-label="EXCENIUS home">
            <Logo size={36} />
            <span className="font-display font-bold tracking-tight text-xl">EXCENIUS</span>
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
            {/* Theme Selector Dropdown */}
            <div className="relative" ref={themeMenuRef}>
              <button
                type="button"
                onClick={() => setThemeMenuOpen((prev) => !prev)}
                data-testid="theme-selector-btn"
                aria-expanded={themeMenuOpen}
                aria-label={`Current theme: ${currentTheme.label}. Click to choose theme.`}
                title={`Current: ${currentTheme.label}`}
                className="h-10 px-3 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all text-xs font-mono uppercase tracking-wider"
              >
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 border"
                  style={{ background: currentTheme.swatch, borderColor: currentTheme.border }}
                />
                <span className="hidden sm:inline font-medium">{currentTheme.badge}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 opacity-60 ${themeMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {themeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="theme-dropdown absolute top-full right-0 mt-2.5 w-64 bg-[#121212] border border-white/15 p-2 rounded-2xl shadow-2xl backdrop-blur-2xl z-[90]"
                  >
                    <div className="theme-dropdown-header px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/40 border-b border-white/10 mb-1">
                      Select Theme
                    </div>
                    <div className="space-y-1">
                      {themes.map((t) => {
                        const isSelected = theme === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => {
                              setTheme(t.id);
                              setThemeMenuOpen(false);
                            }}
                            className={`theme-dropdown-item w-full flex items-center justify-between p-2.5 rounded-xl transition-all ${
                              isSelected
                                ? "bg-white/15 text-white font-medium"
                                : "hover:bg-white/5 text-white/70 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className="w-4 h-4 rounded-full shrink-0 border"
                                style={{ background: t.swatch, borderColor: t.border }}
                              />
                              <div className="text-left">
                                <div className="font-display text-xs font-semibold leading-tight">
                                  {t.label}
                                </div>
                                <div className="text-[10px] text-white/40 leading-tight font-mono mt-0.5">
                                  {t.subtitle}
                                </div>
                              </div>
                            </div>
                            {isSelected && <Check size={14} className="shrink-0 text-white ml-2" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
                    className="block py-4 font-display font-bold text-3xl tracking-tight"
                    initial={reduce ? false : { y: "110%" }}
                    animate={reduce ? undefined : { y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {l.label}
                  </motion.a>
                </div>
              ))}

              {/* Mobile Theme Selector */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block mb-2.5">
                  Select Theme
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTheme(t.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-mono transition-colors ${
                        theme === t.id
                          ? "border-white bg-white/15 text-white"
                          : "border-white/10 bg-white/5 text-white/60 hover:text-white"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0 border"
                        style={{ background: t.swatch, borderColor: t.border }}
                      />
                      <span className="truncate">{t.badge}</span>
                    </button>
                  ))}
                </div>
              </div>

              <motion.a
                href="#contact"
                data-testid="nav-mobile-cta-talk"
                onClick={() => setOpen(false)}
                className="btn-primary mt-6"
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
