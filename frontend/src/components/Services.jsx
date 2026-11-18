import { useState } from "react";
import { Globe, Smartphone, Share2, TrendingUp, Sparkles, ArrowUpRight, Plus } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import Modal from "./Modal";

const SERVICES = [
  {
    id: "web-dev",
    icon: Globe,
    title: "Website Development",
    tagline: "Modern, Responsive, High-Performance",
    description:
      "We engineer fast, scalable, visually arresting web platforms optimized for flawless conversion and unforgettable digital storytelling.",
    detail:
      "Your website is often the first conversation a customer has with your brand. We design and build custom websites that load fast, rank well, and turn visitors into believers — from marketing sites to full e-commerce platforms.",
    deliverables: [
      "Custom design & development",
      "CMS & e-commerce builds",
      "SEO-ready architecture",
      "Performance & accessibility optimization",
    ],
  },
  {
    id: "mobile-app",
    icon: Smartphone,
    title: "Mobile App Development",
    tagline: "Native & Cross-Platform UX",
    description:
      "User-centric mobile applications built for iOS and Android with intuitive fluid gestures and robust backend architecture.",
    detail:
      "We take products from rough idea to app-store-ready. Every screen is designed around real user behavior, and every build is engineered to feel instant, reliable, and native to the platform.",
    deliverables: [
      "Product strategy & UX flows",
      "iOS & Android development",
      "Design systems for mobile",
      "Launch & store submission support",
    ],
  },
  {
    id: "social-media",
    icon: Share2,
    title: "Social Media Management",
    tagline: "Brand Presence & Engagement",
    description:
      "Strategic content curation, community building, and visual identity execution across all major social networks.",
    detail:
      "We run your social presence end to end — planning content, producing it, publishing consistently, and engaging your community so your brand stays top of mind without you lifting a finger.",
    deliverables: [
      "Monthly content calendars",
      "Copy & creative production",
      "Community management",
      "Growth analytics & reporting",
    ],
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Advertising & Marketing",
    tagline: "Precision Lead Generation",
    description:
      "Data-driven performance marketing campaigns across Search, Display, and Paid Social designed for measurable ROI.",
    detail:
      "We plan and run campaigns that are accountable to business outcomes — leads, sales, and growth. Every campaign is tracked, tested, and refined until the numbers move in the right direction.",
    deliverables: [
      "Paid search & paid social campaigns",
      "High-converting landing pages",
      "Conversion tracking & attribution",
      "Continuous A/B testing & optimization",
    ],
  },
  {
    id: "customer-experience",
    icon: Sparkles,
    title: "Customer Experience (CX)",
    tagline: "UX Audits & Brand Journey",
    description:
      "End-to-end user journey mapping, UX redesigns, and friction removal to transform casual visitors into long-term brand advocates.",
    detail:
      "Growth doesn't stop at the first sale. We map every touchpoint of your customer journey, find the friction, and redesign the experience so customers come back — and bring others with them.",
    deliverables: [
      "Customer journey mapping",
      "UX audits & redesigns",
      "Support & retention strategy",
      "Loyalty & advocacy programs",
    ],
  },
];

export default function Services() {
  const [active, setActive] = useState(null);
  const activeService = active !== null ? SERVICES[active] : null;

  return (
    <section id="services" data-testid="services-section" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHead
            index="01"
            label="Services"
            title={
              <>
                Everything your brand needs to{" "}
                <em className="font-serifit italic font-normal">grow online.</em>
              </>
            }
          />
          <Reveal delay={0.15}>
            <p className="max-w-sm text-white/60 leading-relaxed md:text-right">
              Five disciplines, one goal: digital experiences that move your business forward.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const span = i < 2 ? "lg:col-span-3" : "lg:col-span-2";
            return (
              <Reveal key={s.id} delay={0.06 * i} className={span}>
                <div
                  data-testid={`service-card-${s.id}`}
                  className="group relative h-full flex flex-col bg-[#121212] border border-white/10 hover:border-white/30 p-8 md:p-10 transition-all duration-300 hover:-translate-y-1"
                  data-cursor="hover"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 border border-white/15 flex items-center justify-center text-white/80 group-hover:bg-white group-hover:text-[#0A0A0A] transition-colors duration-300">
                      <Icon size={22} strokeWidth={1.25} />
                    </div>
                    <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                  </div>
                  <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                    {s.tagline}
                  </p>
                  <h3 className="mt-3 font-display font-bold text-xl md:text-2xl tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed flex-1">{s.description}</p>
                  <button
                    onClick={() => setActive(i)}
                    data-testid={`service-learn-more-${s.id}`}
                    className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors self-start"
                  >
                    Learn More
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Modal open={active !== null} onClose={() => setActive(null)} testid="service-modal">
        {activeService && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              {activeService.tagline}
            </p>
            <h3 className="mt-3 font-display font-bold text-2xl md:text-3xl tracking-tight pr-10">
              {activeService.title}
            </h3>
            <p className="mt-5 text-white/70 leading-relaxed">{activeService.detail}</p>
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="field-label mb-4">What&apos;s included</p>
              <ul className="space-y-3">
                {activeService.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-sm text-white/80">
                    <Plus size={14} strokeWidth={1.5} className="text-white/40 shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#contact"
              onClick={() => setActive(null)}
              data-testid="service-modal-cta"
              className="btn-primary mt-10 w-full"
            >
              Start a Project
              <ArrowUpRight size={16} strokeWidth={2} />
            </a>
          </div>
        )}
      </Modal>
    </section>
  );
}
