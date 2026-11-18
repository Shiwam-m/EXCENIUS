import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Reveal, SectionHead } from "./Reveal";

const STEPS = [
  {
    step: "01",
    title: "Discover",
    desc: "Understanding the business, goals, and customers — the foundation every decision is built on.",
  },
  {
    step: "02",
    title: "Strategize",
    desc: "Creating the right digital strategy and roadmap, so effort goes where it moves the needle.",
  },
  {
    step: "03",
    title: "Execute",
    desc: "Designing, developing, and implementing solutions with craft and accountability.",
  },
  {
    step: "04",
    title: "Optimize",
    desc: "Improving performance and customer experience through testing, data, and refinement.",
  },
];

export default function Process() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section id="process" data-testid="process-section" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-20">
        <div>
          <div className="lg:sticky lg:top-32">
            <SectionHead
              index="05"
              label="Our Process"
              title={
                <>
                  A process built for <em className="font-serifit italic font-normal">momentum.</em>
                </>
              }
            />
            <Reveal delay={0.15}>
              <p className="mt-8 text-white/60 leading-relaxed max-w-md">
                Four steps, repeated with discipline. You always know what&apos;s happening, why
                it&apos;s happening, and what comes next.
              </p>
            </Reveal>
          </div>
        </div>

        <div ref={ref} className="relative">
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-white/10">
            {!reduce && (
              <motion.div
                data-testid="process-progress-line"
                style={{ scaleY: lineScale }}
                className="absolute inset-0 w-px bg-white origin-top"
              />
            )}
          </div>

          <div className="space-y-14 md:space-y-20">
            {STEPS.map((s, i) => (
              <Reveal key={s.step} delay={0.08 * i}>
                <div data-testid={`process-step-${i + 1}`} className="relative pl-12 md:pl-16">
                  <span className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border border-white/40 bg-[#0A0A0A]">
                    <span className="absolute inset-[3px] rounded-full bg-white" />
                  </span>
                  <span
                    className="font-display font-extrabold text-5xl md:text-6xl leading-none select-none"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" }}
                  >
                    {s.step}
                  </span>
                  <h3 className="mt-4 font-display font-bold text-2xl md:text-3xl tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-white/60 leading-relaxed max-w-md">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
