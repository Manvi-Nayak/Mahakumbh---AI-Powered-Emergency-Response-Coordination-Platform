import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  AlertTriangle, Phone, Shield, Megaphone, ArrowRight, Activity, Brain,
  Truck, Radio, Building2, ClipboardCheck, Users, Stethoscope, Flame,
  Waves, Baby, UserCheck, DoorOpen, MapPin, Clock,
} from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { Splash } from "@/components/Splash";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mahakumbh AI Emergency Response — Report incidents, get help" },
      { name: "description", content: "Real-time emergency assistance, incident reporting and AI-powered response coordination for a safer Mahakumbh." },
    ],
  }),
  component: Home,
});

function Home() {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("mk_splash")) {
      setShowSplash(false);
    }
  }, []);
  const handleDone = () => {
    sessionStorage.setItem("mk_splash", "1");
    setShowSplash(false);
  };

  if (showSplash) return <Splash onDone={handleDone} />;

  return (
    <PublicLayout>
      <Hero />
      <Workflow />
      <Features />
      <LiveAlertsPreview />
      <ContactsPreview />
      <SafetyPreview />
    </PublicLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero py-20 text-white md:py-28">
      {/* particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span key={i} className="animate-float absolute h-1.5 w-1.5 rounded-full bg-saffron"
          style={{ left: `${(i*53)%100}%`, top: `${(i*37)%100}%`, animationDelay: `${i*0.2}s` }} />
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-hidden opacity-20">
        <div className="animate-ganga h-full w-[200%] bg-[linear-gradient(90deg,transparent,oklch(0.74_0.18_55/0.7),transparent)]" />
      </div>
      <div className="mx-auto max-w-6xl px-6 text-center md:px-8">
        <div className="animate-fade-up mx-auto mb-5 inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs uppercase tracking-widest text-saffron">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-saffron" />
          Active · National Emergency Operations
        </div>
        <h1 className="animate-fade-up font-display text-4xl font-bold leading-tight md:text-6xl">
          <span className="text-gradient-saffron">Mahakumbh</span> AI Emergency Response System
        </h1>
        <p className="animate-fade-up mx-auto mt-5 max-w-3xl text-base text-white/80 md:text-lg" style={{ animationDelay: "0.1s" }}>
          Real-Time Emergency Assistance, Incident Reporting, Resource Coordination, and
          AI-Powered Response Management for a Safer Mahakumbh.
        </p>
        <div className="animate-fade-up mt-9 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "0.2s" }}>
          <Link to="/report" className="inline-flex items-center gap-2 rounded-lg bg-saffron-gradient px-6 py-3 text-base font-semibold text-white shadow-glow transition hover:scale-[1.02]">
            <AlertTriangle className="h-5 w-5" /> Report Emergency
          </Link>
          <Link to="/contacts" className="inline-flex items-center gap-2 rounded-lg glass-dark px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10">
            <Phone className="h-5 w-5" /> Emergency Contacts
          </Link>
          <Link to="/safety" className="inline-flex items-center gap-2 rounded-lg glass-dark px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10">
            <Shield className="h-5 w-5" /> Safety Guidelines
          </Link>
          <Link to="/alerts" className="inline-flex items-center gap-2 rounded-lg glass-dark px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10">
            <Megaphone className="h-5 w-5" /> Live Alerts
          </Link>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-4 text-center">
          {[
            ["24/7", "Command Center"],
            ["< 90s", "Avg AI Triage"],
            ["100+", "Response Units"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-xl glass-dark p-4">
              <div className="font-display text-2xl font-bold text-saffron md:text-3xl">{n}</div>
              <div className="text-[11px] uppercase tracking-widest text-white/60">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workflow() {
  const steps = [
    { icon: Users, t: "Citizen Reports" },
    { icon: Brain, t: "AI Analysis" },
    { icon: Activity, t: "Severity Detection" },
    { icon: ClipboardCheck, t: "Resource Recommendation" },
    { icon: Radio, t: "Dispatch Assigned" },
    { icon: Truck, t: "Team Responds" },
    { icon: Shield, t: "Resolution" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-8">
      <SectionHead eyebrow="Workflow" title="How the system works" sub="From citizen report to incident resolution — orchestrated by AI." />
      <div className="mt-12 grid gap-4 md:grid-cols-7">
        {steps.map((s, i) => (
          <div key={s.t} className="relative">
            <div className="rounded-xl border border-border bg-card p-5 text-center shadow-elegant transition hover:-translate-y-1">
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-saffron-gradient text-white shadow-glow">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Step {i+1}</div>
              <div className="mt-1 text-sm font-semibold">{s.t}</div>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-saffron md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: AlertTriangle, t: "Emergency Reporting", d: "Quickly report incidents from anywhere — no login required." },
    { icon: Brain, t: "AI Incident Analysis", d: "Automatic classification, severity scoring, and escalation prediction." },
    { icon: Truck, t: "Resource Coordination", d: "Ambulances, police, fire trucks, and medical teams in one place." },
    { icon: Radio, t: "Emergency Dispatch", d: "Track assignments and live response status." },
    { icon: Activity, t: "Real-Time Monitoring", d: "Live alerts, telemetry, and incident updates." },
    { icon: Building2, t: "Command Center Ops", d: "Centralized control with role-based dashboards." },
  ];
  return (
    <section className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHead eyebrow="Platform" title="Built for large-scale public safety" sub="A single AI-powered nerve center for the world's largest gathering." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.t} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-elegant transition hover:-translate-y-1 hover:shadow-glow">
              <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-saffron-gradient text-white">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-saffron-gradient opacity-0 blur-3xl transition group-hover:opacity-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveAlertsPreview() {
  const alerts = [
    { sev: "critical", t: "Heavy Crowd — Sangam Ghat", time: "2 min ago", loc: "Sector 4" },
    { sev: "high", t: "Route Closure — Bridge 3", time: "8 min ago", loc: "North Approach" },
    { sev: "medium", t: "Medical Emergency", time: "12 min ago", loc: "Camp 17" },
    { sev: "normal", t: "Weather Advisory — Light Rain", time: "30 min ago", loc: "All Sectors" },
  ];
  const sevColor: Record<string, string> = {
    critical: "bg-critical text-white", high: "bg-high text-white",
    medium: "bg-medium text-foreground", normal: "bg-normal text-white",
  };
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-8">
      <div className="flex items-end justify-between">
        <SectionHead eyebrow="Live" title="Real-time alerts" sub="Updates streamed from the command center." align="left" />
        <Link to="/alerts" className="hidden text-sm font-semibold text-primary hover:underline md:inline">View all →</Link>
      </div>
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {alerts.map((a) => (
          <div key={a.t} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-elegant">
            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${sevColor[a.sev]}`}>{a.sev}</span>
            <div className="flex-1">
              <div className="font-semibold">{a.t}</div>
              <div className="mt-0.5 flex gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{a.loc}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{a.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactsPreview() {
  const items = [
    { icon: Shield, l: "Police", n: "100", c: "bg-royal-gradient" },
    { icon: Stethoscope, l: "Ambulance", n: "108", c: "bg-saffron-gradient" },
    { icon: Flame, l: "Fire Brigade", n: "101", c: "bg-[oklch(0.6_0.24_27)]" },
    { icon: Phone, l: "National", n: "112", c: "bg-royal-gradient" },
    { icon: Stethoscope, l: "Medical", n: "102", c: "bg-saffron-gradient" },
    { icon: UserCheck, l: "Lost & Found", n: "Help", c: "bg-[oklch(0.45_0.18_265)]" },
  ];
  return (
    <section className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHead eyebrow="Emergency" title="Emergency contacts" sub="Tap to call. Always available." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <a key={it.l} href={it.n === "Help" ? "/contacts" : `tel:${it.n}`} className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-elegant transition hover:-translate-y-1 hover:shadow-glow">
              <div className={`grid h-14 w-14 place-items-center rounded-xl text-white ${it.c}`}>
                <it.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{it.l}</div>
                <div className="font-display text-2xl font-bold">{it.n}</div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-saffron" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SafetyPreview() {
  const cats = [
    { icon: Users, t: "Crowd Safety" },
    { icon: AlertTriangle, t: "Stampede Prevention" },
    { icon: Stethoscope, t: "Medical Emergencies" },
    { icon: Waves, t: "Flood Awareness" },
    { icon: Baby, t: "Child Safety" },
    { icon: UserCheck, t: "Women Safety" },
    { icon: DoorOpen, t: "Emergency Evacuation" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-8">
      <SectionHead eyebrow="Stay Safe" title="Safety guidelines" sub="Quick guidance for every situation." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cats.map((c) => (
          <Link key={c.t} to="/safety" className="group rounded-2xl border border-border bg-card p-5 shadow-elegant transition hover:-translate-y-1 hover:border-saffron">
            <div className="mb-3 inline-grid h-11 w-11 place-items-center rounded-lg bg-secondary text-saffron transition group-hover:bg-saffron-gradient group-hover:text-white">
              <c.icon className="h-5 w-5" />
            </div>
            <div className="font-semibold">{c.t}</div>
            <div className="mt-1 text-xs text-muted-foreground">Read guidance →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, sub, align = "center" }: { eyebrow: string; title: string; sub?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div className="text-xs font-bold uppercase tracking-[0.25em] text-saffron">{eyebrow}</div>
      <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">{title}</h2>
      {sub && <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">{sub}</p>}
    </div>
  );
}
