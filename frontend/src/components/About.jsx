import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const DISCIPLINES = [
  "Strategy & Identity",
  "Web & Product Design",
  "Engineering & Development",
  "Growth & Marketing",
  "Experience & Support",
];

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="relative py-24 md:py-32 border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid lg:grid-cols-2 gap-14 lg:gap-20">
        <div>
          <SectionHead
            index="02"
            label="About Us"
            title={
              <>
                More Than a Digital Agency.{" "}
                <em className="font-serifit italic font-normal">Your Growth Partner.</em>
              </>
            }
          />
          <Reveal delay={0.15}>
            <p className="mt-8 text-white/60 leading-relaxed max-w-lg">
              We combine technology, creativity, strategy, and customer experience to help
              businesses establish a powerful digital presence. Our goal is not simply to deliver
              services but to create solutions that make a real difference.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <figure className="mt-10 border-l border-white/20 pl-6">
              <blockquote className="about-quote font-serifit italic text-xl md:text-2xl leading-snug text-white/90">
                &ldquo;We don&apos;t just build digital products. We create meaningful digital
                experiences that help businesses grow.&rdquo;
              </blockquote>
              <figcaption className="mt-4 field-label">— Our Philosophy</figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="lg:pt-24">
          <Reveal delay={0.1}>
            <p className="field-label mb-4">What we do, every day</p>
          </Reveal>
          <div>
            {DISCIPLINES.map((d, i) => (
              <Reveal key={d} delay={0.06 * i}>
                <div
                  data-testid={`about-discipline-${i}`}
                  className="about-discipline-row group flex items-center justify-between border-b border-white/10 py-6 hover:bg-white/5 transition-colors duration-300 px-2 -mx-2"
                  data-cursor="hover"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                    <span className="font-display font-semibold text-lg md:text-xl tracking-tight">
                      {d}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    className="text-white/30 group-hover:text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mt-8 text-sm text-white/50 leading-relaxed max-w-md">
              A founder-led studio today. A full-service digital agency tomorrow — built one
              meaningful project at a time.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
