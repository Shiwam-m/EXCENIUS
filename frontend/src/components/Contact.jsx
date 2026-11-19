import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Instagram, Linkedin, Twitter, Dribbble } from "./Icons";
import { Reveal, SectionHead } from "./Reveal";

const getBackendUrl = () => {
  let url = import.meta.env.VITE_BACKEND_URL;
  if (!url) return "/api";
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }
  return url.endsWith("/api") ? url : `${url.replace(/\/$/, "")}/api`;
};

const API = getBackendUrl();

const SERVICE_OPTIONS = [
  "Website Development",
  "Mobile App Development",
  "AI & Automation Solutions",
  "Social Media Management",
  "Digital Advertising & Marketing",
  "Customer Experience (CX)",
  "Full Digital Strategy",
];

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "X (Twitter)", href: "#" },
  { icon: Dribbble, label: "Dribbble", href: "#" },
];

const schema = z.object({
  full_name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Tell us a little more about your project (10+ characters)"),
});

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { full_name: "", email: "", company: "", service: "", message: "" },
  });

  const onSubmit = async (values) => {
    try {
      // 1. Send instant email notification via Web3Forms (100% Free HTTPS, never blocked by Render)
      const formData = new FormData();
      formData.append("access_key", "5b0b4999-e298-4ceb-8e82-4a0644a097b5");
      formData.append("name", values.full_name);
      formData.append("email", values.email);
      formData.append("company", values.company || "N/A");
      formData.append("service", values.service);
      formData.append("message", values.message);
      formData.append("subject", `🔔 New Project Inquiry: ${values.full_name} (${values.service})`);
      formData.append("from_name", "EXCENIUS Studio Website");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      // 2. Also save to backend contacts.json as local backup (non-blocking)
      try {
        await axios.post(`${API}/contact`, values);
      } catch (err) {
        // Backend save is secondary; email is already delivered by Web3Forms!
      }

      if (data.success) {
        toast.success("Message sent — we'll get back to you soon.");
        reset();
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const err = (name) =>
    errors[name] ? (
      <p data-testid={`contact-error-${name}`} className="mt-2 text-xs text-white/50">
        {errors[name].message}
      </p>
    ) : null;

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-24 md:py-32 border-t border-white/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 grid lg:grid-cols-2 gap-14 lg:gap-20">
        <div>
          <SectionHead
            index="06"
            label="Contact"
            title={
              <>
                Have a Project in Mind?{" "}
                <em className="font-serifit italic font-normal">Let&apos;s Make It Happen.</em>
              </>
            }
          />
          <Reveal delay={0.15}>
            <p className="mt-8 text-white/60 leading-relaxed max-w-md">
              Tell us about your idea, and let&apos;s explore how we can turn it into something
              meaningful.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10">
              <p className="field-label mb-2">Email us</p>
              <a
                href="mailto:contact.excenius@gmail.com"
                data-testid="contact-email-link"
                className="font-display font-semibold text-lg md:text-xl hover:text-white/70 transition-colors"
              >
                contact.excenius@gmail.com
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-10">
              <p className="field-label mb-4">Follow us</p>
              <div className="flex gap-3">
                {SOCIALS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      data-testid={`contact-social-${s.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      className="w-11 h-11 border border-white/15 rounded-full flex items-center justify-center text-white/70 hover:bg-white hover:text-[#0A0A0A] transition-all duration-300"
                    >
                      <Icon size={17} strokeWidth={1.5} />
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            data-testid="contact-form"
            className="bg-[#121212] border border-white/10 p-8 md:p-10 space-y-7"
          >
            <div>
              <label htmlFor="full_name" className="field-label block mb-2">
                Full Name *
              </label>
              <input
                id="full_name"
                data-testid="contact-input-name"
                className="field"
                placeholder="Jane Cooper"
                {...register("full_name")}
              />
              {err("full_name")}
            </div>

            <div>
              <label htmlFor="email" className="field-label block mb-2">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                data-testid="contact-input-email"
                className="field"
                placeholder="jane@company.com"
                {...register("email")}
              />
              {err("email")}
            </div>

            <div>
              <label htmlFor="company" className="field-label block mb-2">
                Company Name <span className="text-white/30">(optional)</span>
              </label>
              <input
                id="company"
                data-testid="contact-input-company"
                className="field"
                placeholder="Company Inc."
                {...register("company")}
              />
            </div>

            <div>
              <label htmlFor="service" className="field-label block mb-2">
                Service Interested In *
              </label>
              <div className="relative">
                <select
                  id="service"
                  data-testid="contact-select-service"
                  className="field appearance-none pr-8"
                  {...register("service")}
                >
                  <option value="" className="bg-[#121212]">
                    Select a service
                  </option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s} className="bg-[#121212]">
                      {s}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-white/50 text-xs">
                  ▾
                </span>
              </div>
              {err("service")}
            </div>

            <div>
              <label htmlFor="message" className="field-label block mb-2">
                Project Details *
              </label>
              <textarea
                id="message"
                rows={4}
                data-testid="contact-textarea-message"
                className="field resize-none"
                placeholder="Tell us about your project, goals, and timeline..."
                {...register("message")}
              />
              {err("message")}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              data-testid="contact-submit-button"
              className="btn-primary w-full disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  Sending
                  <Loader2 size={16} className="animate-spin" />
                </>
              ) : (
                <>
                  Send Message
                  <ArrowUpRight size={16} strokeWidth={2} />
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
