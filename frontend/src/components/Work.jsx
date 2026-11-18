import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import Modal from "./Modal";

const PROJECTS = [
  {
    id: "atelier-nord",
    title: "Atelier Nord",
    category: "Websites",
    description:
      "A stark, editorial web presence for a Scandinavian architecture practice — full-bleed monochrome photography, quiet typography, and a portfolio that lets the work breathe.",
    image:
      "https://images.pexels.com/photos/3137084/pexels-photo-3137084.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    tags: ["Web Design", "Development", "CMS"],
  },
  {
    id: "ledgerline",
    title: "Ledgerline",
    category: "Mobile Apps",
    description:
      "A wealth-tracking app concept pairing dense financial data with a calm, black-glass interface designed entirely for one-handed use.",
    image:
      "https://images.unsplash.com/photo-1603566234499-85676f87022f?crop=entropy&cs=srgb&fm=jpg&q=85",
    tags: ["UX Strategy", "UI Design", "Prototype"],
  },
  {
    id: "kuro-assistant",
    title: "Kuro Assistant",
    category: "CX & Strategy",
    description:
      "A minimalist conversational interface exploring zero-noise layouts and cognitive clarity — a design system for everyday AI chat experiences.",
    image:
      "https://images.pexels.com/photos/21835402/pexels-photo-21835402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    tags: ["Design System", "Research", "Prototyping"],
  },
  {
    id: "form-field",
    title: "Form & Field",
    category: "Marketing",
    description:
      "A monochrome launch campaign concept for a lifestyle label — art direction, paid social creative, and a conversion-focused landing experience.",
    image:
      "https://images.unsplash.com/photo-1592833578500-1082e18665a3?crop=entropy&cs=srgb&fm=jpg&q=85",
    tags: ["Art Direction", "Paid Social", "Landing Pages"],
  },
];

const FILTERS = ["All", "Websites", "Mobile Apps", "CX & Strategy", "Marketing"];

export default function Work() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);
  const activeProject = active !== null ? PROJECTS[active] : null;

  const filtered = PROJECTS.map((p, i) => ({ ...p, index: i })).filter(
    (p) => filter === "All" || p.category === filter
  );

  return (
    <section id="work" data-testid="portfolio-section" className="relative py-24 md:py-32 border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHead
            index="04"
            label="Our Work"
            title={
              <>
                Selected work, <em className="font-serifit italic font-normal">built to convert.</em>
              </>
            }
          />
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  data-testid={`portfolio-filter-${f.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-all duration-300 ${
                    filter === f
                      ? "bg-white text-[#0A0A0A] border-white"
                      : "border-white/20 text-white/60 hover:border-white/60 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-16">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={0.05 * i} className={i % 2 === 1 ? "lg:mt-20" : ""}>
              <article data-testid={`portfolio-card-${p.id}`} className="group" data-cursor="hover">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#121212] border border-white/10">
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.category}`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                      {p.category}
                    </p>
                    <h3 className="mt-2 font-display font-bold text-xl md:text-2xl tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-md">
                      {p.description}
                    </p>
                  </div>
                  <div
                    aria-hidden="true"
                    data-testid={`portfolio-view-btn-${p.id}`}
                    className="shrink-0 w-11 h-11 border border-white/20 rounded-full flex items-center justify-center text-white/70"
                  >
                    <ArrowUpRight size={17} strokeWidth={1.5} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal open={active !== null} onClose={() => setActive(null)} testid="project-modal">
        {activeProject && (
          <div>
            <div className="aspect-[16/10] overflow-hidden border border-white/10">
              <img
                src={activeProject.image}
                alt={`${activeProject.title} — ${activeProject.category}`}
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              {activeProject.category}
            </p>
            <h3 className="mt-3 font-display font-bold text-2xl md:text-3xl tracking-tight pr-10">
              {activeProject.title}
            </h3>
            <p className="mt-4 text-white/70 leading-relaxed">{activeProject.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {activeProject.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] border border-white/15 px-3 py-1.5 text-white/60"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href="#contact"
              onClick={() => setActive(null)}
              data-testid="project-modal-cta"
              className="btn-primary mt-10 w-full"
            >
              Start a Similar Project
              <ArrowUpRight size={16} strokeWidth={2} />
            </a>
          </div>
        )}
      </Modal>
    </section>
  );
}
