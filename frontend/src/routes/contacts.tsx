import { createFileRoute } from "@tanstack/react-router";
import { Shield, Stethoscope, Flame, Phone, UserCheck, Search } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Emergency Contacts — Mahakumbh AI" },
      { name: "description", content: "Police, ambulance, fire, medical, and helpline numbers for Mahakumbh visitors." },
    ],
  }),
  component: Contacts,
});

const contacts = [
  { icon: Shield, l: "Police", n: "100", c: "bg-royal-gradient" },
  { icon: Stethoscope, l: "Ambulance", n: "108", c: "bg-saffron-gradient" },
  { icon: Flame, l: "Fire Brigade", n: "101", c: "bg-[oklch(0.6_0.24_27)]" },
  { icon: Phone, l: "National Emergency", n: "112", c: "bg-royal-gradient" },
  { icon: Stethoscope, l: "Medical Assistance", n: "102", c: "bg-saffron-gradient" },
  { icon: UserCheck, l: "Women Helpline", n: "1091", c: "bg-[oklch(0.45_0.18_265)]" },
  { icon: Search, l: "Lost & Found", n: "1800-XXX-XXXX", c: "bg-[oklch(0.4_0.15_280)]" },
  { icon: Shield, l: "Disaster Mgmt", n: "1078", c: "bg-[oklch(0.5_0.2_30)]" },
];

function Contacts() {
  return (
    <PublicLayout>
      <section className="bg-hero py-14 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Emergency Contacts</h1>
          <p className="mt-3 max-w-2xl text-white/80">Tap any card to call. Save these numbers offline before entering the venue.</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((c) => {
            const isPhone = /^\d/.test(c.n);
            return (
              <a key={c.l} href={isPhone ? `tel:${c.n.replace(/[^\d]/g,"")}` : "#"}
                className="group flex items-center gap-5 rounded-2xl border border-border bg-card p-6 shadow-elegant transition hover:-translate-y-1 hover:shadow-glow">
                <div className={`grid h-16 w-16 place-items-center rounded-2xl text-white ${c.c}`}>
                  <c.icon className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{c.l}</div>
                  <div className="mt-1 font-display text-3xl font-bold">{c.n}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </PublicLayout>
  );
}
