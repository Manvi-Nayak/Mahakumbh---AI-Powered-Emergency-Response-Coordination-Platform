import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shield, Stethoscope, Flame, HeartPulse, AlertTriangle, Building2, ArrowRight, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/operations/")({
  head: () => ({
    meta: [
      { title: "Operations Access — Mahakumbh AI" },
      { name: "description", content: "Role selection for emergency responders and command center administrators." },
    ],
  }),
  component: Operations,
});

const roles = [
  { id: "police", t: "Police Control Room", d: "Crowd control, security ops, and law enforcement dispatch.", icon: Shield, c: "from-[oklch(0.3_0.15_265)] to-[oklch(0.45_0.18_265)]" },
  { id: "ambulance", t: "Ambulance Services", d: "Medical emergency dispatch and patient transfers.", icon: Stethoscope, c: "from-[oklch(0.5_0.2_25)] to-[oklch(0.7_0.18_45)]" },
  { id: "fire", t: "Fire Department", d: "Fire response, rescue ops, and personnel availability.", icon: Flame, c: "from-[oklch(0.55_0.24_25)] to-[oklch(0.72_0.2_50)]" },
  { id: "medical", t: "Medical Command", d: "Hospital capacity, critical cases, medical teams.", icon: HeartPulse, c: "from-[oklch(0.4_0.18_300)] to-[oklch(0.55_0.2_320)]" },
  { id: "disaster", t: "Disaster Management", d: "Floods, stampedes, crowd density, deployment.", icon: AlertTriangle, c: "from-[oklch(0.5_0.2_40)] to-[oklch(0.65_0.22_60)]" },
  { id: "admin", t: "Central Command", d: "Full system visibility and administrative control.", icon: Building2, c: "from-[oklch(0.25_0.12_265)] to-[oklch(0.45_0.18_265)]" },
];

function Operations() {
  const navigate = useNavigate();
  const select = (role: string) => {
    if (typeof window !== "undefined") sessionStorage.setItem("mk_role", role);
    navigate({ to: "/operations/login" });
  };

  return (
    <div className="min-h-screen bg-hero text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-white/70 transition hover:text-saffron">
          <ArrowLeft className="h-4 w-4" /> Back to public site
        </Link>
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1 text-xs uppercase tracking-widest text-saffron">
            Emergency Operations Center
          </div>
          <h1 className="font-display text-4xl font-bold md:text-5xl">Who is accessing the Operations Center?</h1>
          <p className="mt-3 text-white/70">Select your role to continue to the secure login.</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((r) => (
            <button key={r.id} onClick={() => select(r.id)}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${r.c} p-6 text-left shadow-elegant transition hover:-translate-y-1 hover:shadow-glow`}>
              <div className="mb-6 inline-grid h-14 w-14 place-items-center rounded-xl bg-white/10 backdrop-blur">
                <r.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold">{r.t}</h3>
              <p className="mt-2 text-sm text-white/80">{r.d}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron">
                Continue <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-saffron opacity-0 blur-3xl transition group-hover:opacity-30" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
