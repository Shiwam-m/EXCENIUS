const ITEMS = [
  "Website Development",
  "Mobile Applications",
  "AI & Automation",
  "Social Media",
  "Performance Marketing",
  "Customer Experience",
  "Digital Strategy",
];

const Row = ({ hidden }) => (
  <div aria-hidden={hidden || undefined} className="flex items-center shrink-0">
    {ITEMS.map((t, i) => (
      <span key={i} className="flex items-center">
        <span
          className="marquee-item font-display font-bold uppercase tracking-tight text-4xl md:text-6xl whitespace-nowrap"
        >
          {t}
        </span>
        <span className="marquee-dot w-2 h-2 rotate-45 mx-8 md:mx-14 shrink-0" />
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <div data-testid="marquee" className="border-y border-white/10 py-8 md:py-10 overflow-hidden">
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
