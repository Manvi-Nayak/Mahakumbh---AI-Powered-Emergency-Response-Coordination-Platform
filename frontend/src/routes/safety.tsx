import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, AlertTriangle, Stethoscope, Waves, Baby, UserCheck, DoorOpen, ChevronDown } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Safety Guidelines — Mahakumbh AI" },
      { name: "description", content: "Crowd safety, medical, flood, child & women safety guidance for pilgrims and visitors." },
    ],
  }),
  component: Safety,
});

const guides = [
  { icon: Users, t: "Crowd Safety", points: ["Stay within designated walkways", "Follow one-way traffic at peak ghats", "Keep family group together; share meet-point", "Avoid pushing — maintain steady pace"] },
  { icon: AlertTriangle, t: "Stampede Prevention", points: ["Move with crowd flow; never against it", "If you fall, curl up and protect head", "Avoid panic-driven movement", "Report bottlenecks to nearest officer"] },
  { icon: Stethoscope, t: "Medical Emergencies", points: ["Locate nearest medical camp (color-coded signs)", "Carry essential medication & ID", "For chest pain / fainting — dial 108", "Stay hydrated, especially in summer"] },
  { icon: Waves, t: "Flood Awareness", points: ["Heed water-level warnings near Sangam", "Avoid bathing during heavy current advisories", "Move to higher ground if alert sounds", "Stay clear of slippery embankments"] },
  { icon: Baby, t: "Child Safety", points: ["Use Mahakumbh ID wristbands for children", "Brief children on meeting point", "Hold hands in crowded zones", "Report missing child immediately to Help Desk"] },
  { icon: UserCheck, t: "Women Safety", points: ["24/7 Women's Help Desks at each sector", "Avoid isolated routes after dark", "Trust your instincts; report harassment", "Helpline: 1091"] },
  { icon: DoorOpen, t: "Emergency Evacuation", points: ["Identify nearest exit on entry", "Follow officer instructions calmly", "Don't run; brisk walk to assembly point", "Help elderly & children around you"] },
];

function Safety() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <PublicLayout>
      <section className="bg-hero py-14 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Safety Guidelines</h1>
          <p className="mt-3 max-w-2xl text-white/80">Practical guidance to stay safe at Mahakumbh. Tap each topic to expand.</p>
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="space-y-3">
          {guides.map((g, i) => {
            const isOpen = open === i;
            return (
              <div key={g.t} className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center gap-4 p-5 text-left">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-saffron-gradient text-white">
                    <g.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold">{g.t}</h3>
                    <div className="text-xs text-muted-foreground">{g.points.length} safety tips</div>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="border-t border-border bg-secondary/40 px-6 py-5">
                    <ul className="space-y-2 text-sm">
                      {g.points.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PublicLayout>
  );
}
