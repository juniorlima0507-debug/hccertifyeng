import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  Award,
  TrendingUp,
  GraduationCap,
  Target,
  FileCheck2,
  Infinity as InfinityIcon,
  CheckCircle2,
  BadgePercent,
} from "lucide-react";
import logo from "@/assets/logo.png";
import professor from "@/assets/professor.jpg";
import { saveLead } from "@/lib/leads.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HC Certify — CFA® Level 1 Elite Preparation" },
      {
        name: "description",
        content:
          "Master the CFA® Level 1 with an official prep provider. 80%+ first-attempt pass rate, led by Teacher Henrique Cezar.",
      },
      { property: "og:title", content: "HC Certify — CFA® Level 1 Elite Preparation" },
      {
        property: "og:description",
        content:
          "Join the 80% who pass on the first attempt. Methodology refined over 20 years.",
      },
    ],
  }),
  component: LandingPage,
});

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid professional email").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(25, "Phone number too long"),
  level: z.enum(["CFA Level 01", "CFA Level 02", "CFA Level 03"], {
    message: "Please select a CFA level",
  }),
});

function Professor() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <div className="relative">
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-gold/30 to-navy/20 blur-2xl" />
          <img
            src={professor}
            alt="Teacher Henrique Cezar, CFA"
            className="relative w-full rounded-2xl object-cover shadow-elegant"
          />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Lead Instructor
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">
            Teacher Henrique Cezar, <span className="text-gold">CFA®</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            With over two decades preparing analysts and portfolio managers for
            the CFA Program, Teacher Henrique Cezar has built a reputation for
            translating dense curriculum content into a precise, exam-winning
            framework — the same framework that drives our 80%+ first-attempt
            pass rate.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "20+ years of CFA exam preparation experience",
              "Trained candidates across global investment banks",
              "Architect of the HC Certify methodology",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                <span className="text-foreground/90">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Methodology />
      <Professor />
      <Pillars />
      <PassRateChart />
      <Offer />
      <LeadForm />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="HC Certify" className="h-9 w-9" />
          <span className="font-display text-lg font-bold tracking-tight text-navy-foreground">
            HC <span className="text-gold">Certify</span>
          </span>
        </div>
        <a
          href="#enroll"
          className="inline-flex items-center justify-center rounded-md bg-gold px-4 py-2 text-sm font-semibold text-gold-foreground shadow-gold transition hover:brightness-110"
        >
          Request a Demo
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--gold)_1px,transparent_1px),linear-gradient(90deg,var(--gold)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gold">
            <Award className="h-3.5 w-3.5" />
            CFA Institute Approved Prep Provider
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.1] md:text-6xl">
            Master the CFA<sup className="text-gold">®</sup> Level 1 with an{" "}
            <span className="text-gold">official prep provider.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-navy-foreground/80 md:text-xl">
            Join the elite 80% who pass on the first attempt using a methodology
            refined over 20 years of technical excellence.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#enroll"
              className="inline-flex items-center justify-center rounded-md bg-gold px-7 py-3.5 text-base font-semibold text-gold-foreground shadow-gold transition hover:brightness-110"
            >
              Request a Demo
            </a>
            <a
              href="#methodology"
              className="inline-flex items-center justify-center rounded-md border border-navy-foreground/30 px-7 py-3.5 text-base font-medium text-navy-foreground/90 transition hover:bg-navy-foreground/10"
            >
              Explore Methodology
            </a>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-navy-foreground/15 pt-8 max-w-xl">
            <Stat value="80%+" label="Pass Rate" />
            <Stat value="20yrs" label="Excellence" />
            <Stat value="∞" label="Lifetime Access" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold text-gold md:text-3xl">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-navy-foreground/60">
        {label}
      </div>
    </div>
  );
}

function Methodology() {
  const cards = [
    {
      icon: Award,
      title: "Official Recognition",
      body: "CFA Institute Approved Prep Provider. Our curriculum is rigorously aligned with the latest global body of knowledge required of candidates.",
    },
    {
      icon: TrendingUp,
      title: "Proven Success",
      body: "A consistent 80%+ pass rate, significantly outperforming the global average through strategic, exam-focused training.",
    },
    {
      icon: GraduationCap,
      title: "Expert Leadership",
      body: "Led by Teacher Henrique Cezar, a recognized authority with over two decades of experience in CFA exam preparation.",
    },
  ];
  return (
    <section id="methodology" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Methodology" title="Built on three uncompromising standards" />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group rounded-xl border border-border bg-card p-8 shadow-sm transition hover:border-gold/60 hover:shadow-elegant"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-gold">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-navy">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const pillars = [
    {
      icon: Target,
      title: "Strategic Exam Focus",
      body: "Concentrated mastery of the highest-weighted topics that drive your score.",
    },
    {
      icon: FileCheck2,
      title: "Comprehensive Mock Exams",
      body: "Full-length, exam-realistic simulations with detailed performance analytics.",
    },
    {
      icon: InfinityIcon,
      title: "Lifetime Access",
      body: "Continuous support and material access until you pass — no expiration.",
    },
  ];
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="The Strategic Pillars" title="Three pillars. One outcome." />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="flex gap-5">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md border border-gold/40 bg-gold/10 text-gold">
                <p.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PassRateChart() {
  const bars = [
    { label: "HC Certify Candidates", value: 80, accent: true },
    { label: "Global Average (CFA L1)", value: 44, accent: false },
  ];
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          eyebrow="Performance Benchmark"
          title="Outperforming the global average — by design."
        />
        <div className="mt-12 rounded-xl border border-border bg-card p-8 shadow-sm md:p-12">
          <div className="space-y-8">
            {bars.map((b) => (
              <div key={b.label}>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-sm font-medium text-navy">{b.label}</span>
                  <span
                    className={`font-display text-2xl font-bold ${
                      b.accent ? "text-gold" : "text-muted-foreground"
                    }`}
                  >
                    {b.value}%
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      b.accent ? "bg-gold" : "bg-navy/40"
                    }`}
                    style={{ width: `${b.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            Global average reflects historical CFA Level 1 worldwide pass rates published by the CFA Institute.
          </p>
        </div>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section className="bg-navy py-20 text-navy-foreground">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center md:flex-row md:text-left">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground">
          <BadgePercent className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-2xl font-bold md:text-3xl">
            Seasonal Enrollment — <span className="text-gold">15% off</span> the full prep package.
          </h3>
          <p className="mt-2 text-navy-foreground/80">
            Flexible financing and installment plans available for global candidates.
          </p>
        </div>
        <a
          href="#enroll"
          className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold transition hover:brightness-110"
        >
          Request a Demo
        </a>
      </div>
    </section>
  );
}

function LeadForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const saveLeadFn = useServerFn(saveLead);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      level: String(formData.get("level") ?? ""),
    };
    const parsed = formSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[String(i.path[0])] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitError(null);
    setLoading(true);
    try {
      await saveLeadFn({ data: parsed.data });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitError("We couldn't submit your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="enroll" className="bg-secondary/40 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeader
            eyebrow="Lead Generation"
            title="Connect with a CFA Career Specialist"
            align="left"
          />
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Fill out the form to receive our 2026 Study Plan and secure your 15% discount.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "2026 personalized study roadmap",
              "Direct access to a senior advisor",
              "15% seasonal enrollment discount",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                <span className="text-foreground/90">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-elegant md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircle2 className="h-14 w-14 text-gold" />
              <h3 className="mt-6 font-display text-xl font-semibold text-navy">Thank you.</h3>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                A specialist will be in touch shortly with your action plan and discount details.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <Field
                label="Full Name"
                name="fullName"
                type="text"
                autoComplete="name"
                error={errors.fullName}
              />
              <Field
                label="Professional Email"
                name="email"
                type="email"
                autoComplete="email"
                error={errors.email}
              />
              <Field
                label="Phone / WhatsApp"
                name="phone"
                type="tel"
                autoComplete="tel"
                error={errors.phone}
              />
              <div>
                <span className="mb-2 block text-sm font-medium text-navy">
                  CFA Level of Interest
                </span>
                <div className="grid gap-2 sm:grid-cols-3">
                  {["CFA Level 01", "CFA Level 02", "CFA Level 03"].map((lvl) => (
                    <label
                      key={lvl}
                      className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground transition hover:border-gold has-[:checked]:border-gold has-[:checked]:bg-gold/5"
                    >
                      <input
                        type="radio"
                        name="level"
                        value={lvl}
                        className="h-4 w-4 accent-gold"
                      />
                      <span>{lvl}</span>
                    </label>
                  ))}
                </div>
                {errors.level && (
                  <p className="mt-1.5 text-xs text-destructive">{errors.level}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-navy px-6 py-3.5 text-sm font-semibold text-navy-foreground transition hover:bg-navy/90 disabled:opacity-60"
              >
                {loading ? "Sending…" : "Get My Roadmap & Discount"}
              </button>
              {submitError && (
                <p className="text-center text-xs text-destructive">{submitError}</p>
              )}
              <p className="text-center text-xs text-muted-foreground">
                Your information is confidential and never shared.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        maxLength={255}
        className={`w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-gold/40 ${
          error ? "border-destructive" : "border-input focus:border-gold"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <div
        className={`text-xs font-semibold uppercase tracking-[0.25em] text-gold ${
          align === "center" ? "" : ""
        }`}
      >
        {eyebrow}
      </div>
      <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">{title}</h2>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-navy py-12 text-navy-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="HC Certify" className="h-7 w-7" />
            <span className="font-display font-bold">
              HC <span className="text-gold">Certify</span>
            </span>
          </div>
          <p className="text-xs text-navy-foreground/60">
            © {new Date().getFullYear()} HC Certify. All rights reserved.
          </p>
        </div>
        <p className="mt-8 max-w-4xl text-xs leading-relaxed text-navy-foreground/60">
          CFA Institute does not endorse, promote, or warrant the accuracy or quality of HC Certify.
          CFA® and Chartered Financial Analyst® are registered trademarks owned by CFA Institute.
        </p>
      </div>
    </footer>
  );
}
