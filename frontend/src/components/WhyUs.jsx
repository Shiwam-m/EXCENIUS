import { Reveal, SectionHead } from "./Reveal";

const ADVANTAGES = [
  {
    title: "Customer-First Approach",
    desc: "Every decision starts with your customers — their needs, their behavior, their journey.",
  },
  {
    title: "Creative & Strategic Thinking",
    desc: "We blend striking aesthetics with sound strategy, so beautiful work also performs.",
  },
  {
    title: "Modern Technology & Innovation",
    desc: "Built on current, proven frameworks for speed, security, and room to scale.",
  },
  {
    title: "Focus on Results & Growth",
    desc: "Success is measured in real outcomes: leads, conversions, and retention.",
  },
  {
    title: "Personalized Solutions",
    desc: "No cookie-cutter templates. Every solution is shaped around your brand and goals.",
  },
  {
    title: "Attention to Detail & Quality",
    desc: "Pixel-perfect layouts, refined typography, and micro-interactions done right.",
  },
];

export default function WhyUs() {
  return (
    <section id="why" data-testid="why-choose-us-section" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <SectionHead
          index="03"
          label="Why Choose Us"
          title={
            <>
              Why brands choose <em className="font-serifit italic font-normal">EXCENIUS.</em>
            </>
          }
        />

        <Reveal delay={0.1}>
          <div className="why-grid mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {ADVANTAGES.map((a, i) => (
              <div
                key={a.title}
                data-testid={`why-advantage-card-${i}`}
                className="why-card theme-card group bg-[#0A0A0A] p-8 md:p-10 hover:bg-white transition-all duration-300"
                data-cursor="hover"
              >
                <span className="font-mono text-xs text-white/30 group-hover:text-black/40 transition-colors duration-300">
                  0{i + 1}
                </span>
                <h3 className="mt-6 font-display font-semibold text-lg md:text-xl tracking-tight group-hover:text-[#0A0A0A] transition-colors duration-300">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm text-white/60 group-hover:text-black/70 leading-relaxed transition-colors duration-300">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
