import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

export const SectionHead = ({ index, label, title, className = "" }) => (
  <div className={className}>
    <Reveal>
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50 flex items-center gap-3">
        <span className="inline-block w-2 h-2 bg-white" />
        {index} — {label}
      </p>
    </Reveal>
    <Reveal delay={0.08}>
      <h2 className="mt-6 font-display font-bold tracking-tight leading-[1.05] text-3xl sm:text-4xl lg:text-5xl">
        {title}
      </h2>
    </Reveal>
  </div>
);
