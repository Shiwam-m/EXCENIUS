import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const Line = ({ children, delay }) => (
  <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
    <motion.span
      className="block"
      initial={{ y: "112%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.3]);
  const d = reduce ? 0 : 1.25;

  return (
    <section
      id="home"
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      <div className="hero-gradient absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-transparent" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 pt-32 pb-14 md:pb-16"
      >
        <div className="overflow-hidden mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: d }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50 flex items-center gap-3"
          >
            <span className="inline-block w-2 h-2 bg-white" />
            Full-Service Digital Studio
          </motion.p>
        </div>

        <h1
          data-testid="hero-headline"
          className="font-display font-extrabold tracking-[-0.02em] leading-[1.05] text-[9.5vw] sm:text-[9vw] lg:text-[5.9rem]"
        >
          <Line delay={d + 0.1}>Building Digital</Line>
          <Line delay={d + 0.22}>
            <em className="font-serifit italic font-normal">Experiences</em> That
          </Line>
          <Line delay={d + 0.34}>
            Move Businesses <em className="font-serifit italic font-normal">Forward.</em>
          </Line>
        </h1>

        <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          <motion.p
            data-testid="hero-subheadline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: d + 0.55, ease: EASE }}
            className="max-w-md text-white/60 text-base sm:text-lg leading-relaxed"
          >
            From websites and mobile applications to social media and performance marketing, we
            help brands create meaningful digital experiences and achieve measurable growth.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: d + 0.7, ease: EASE }}
          >
            <a href="#services" data-testid="hero-cta-services" className="btn-primary">
              Explore Our Services
              <ArrowUpRight size={16} strokeWidth={2} />
            </a>
            <a href="#contact" data-testid="hero-cta-contact" className="btn-outline">
              Let&apos;s Work Together
            </a>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 md:mt-16 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: d + 1.1, duration: 0.8 }}
        >
          Scroll
          <span className="h-px w-16 bg-white/20 overflow-hidden">
            {!reduce && (
              <motion.span
                className="block h-full w-1/2 bg-white"
                animate={{ x: [-40, 64] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
              />
            )}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
