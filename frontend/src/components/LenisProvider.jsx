import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

export const lenisRef = { current: null };

export default function LenisProvider({ children }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef.current = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e) => {
      const a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (href && href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        lenis.scrollTo(href, { offset: -84, duration: 1.3 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduce]);

  return children;
}
