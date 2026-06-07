// import { createFileRoute } from "@tanstack/react-router";
// import { Megaphone, MapPin, Clock, Activity } from "lucide-react";
// import { PublicLayout } from "@/components/PublicLayout";

// export const Route = createFileRoute("/alerts")({
//   head: () => ({
//     meta: [
//       { title: "Live Alerts — Mahakumbh AI" },
//       { name: "description", content: "Live emergency alerts, advisories, and route closures from the command center." },
//     ],
//   }),
//   component: Alerts,
// });

// const alerts = [
//   { sev: "critical", t: "Heavy Crowd Density", d: "Crowd density exceeding safe limits near Sangam Ghat. Avoid Sector 4 entry gates.", loc: "Sector 4 — Sangam Ghat", time: "2 min ago" },
//   { sev: "high", t: "Route Closure — Bridge 3", d: "North Approach Bridge 3 closed for crowd diffusion. Use Bridge 2 or Bridge 5.", loc: "North Approach", time: "8 min ago" },
//   { sev: "high", t: "Medical Emergency — Camp 17", d: "Multiple medical responses ongoing. Yield to ambulance corridor.", loc: "Camp 17", time: "12 min ago" },
//   { sev: "medium", t: "Weather Advisory", d: "Light rainfall expected 6–8 PM. Use covered walkways.", loc: "All Sectors", time: "30 min ago" },
//   { sev: "medium", t: "Lost Child Reunification", d: "Child reunited at Help Desk 12. Parents please collect.", loc: "Help Desk 12", time: "45 min ago" },
//   { sev: "normal", t: "Safety Advisory", d: "Carry ID and emergency contact card at all times.", loc: "General", time: "1 hr ago" },
// ];

// const sevStyles: Record<string, { bg: string; text: string; ring: string }> = {
//   critical: { bg: "bg-critical", text: "text-white", ring: "ring-critical/40" },
//   high:     { bg: "bg-high", text: "text-white", ring: "ring-high/40" },
//   medium:   { bg: "bg-medium", text: "text-foreground", ring: "ring-medium/40" },
//   normal:   { bg: "bg-normal", text: "text-white", ring: "ring-normal/40" },
// };

// function Alerts() {
//   return (
//     <PublicLayout>
//       <section className="bg-hero py-14 text-white">
//         <div className="mx-auto max-w-5xl px-6">
//           <div className="mb-3 inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1 text-xs uppercase tracking-widest text-saffron">
//             <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-saffron" /> Live · Updated continuously
//           </div>
//           <h1 className="font-display text-4xl font-bold md:text-5xl">Live Emergency Alerts</h1>
//           <p className="mt-3 max-w-2xl text-white/80">Real-time advisories from the Mahakumbh Command Center. Alerts stream in as situations evolve.</p>
//         </div>
//       </section>

//       <div className="mx-auto max-w-5xl px-6 py-12">
//         <div className="grid gap-4">
//           {alerts.map((a, i) => {
//             const s = sevStyles[a.sev];
//             return (
//               <div key={i} className={`rounded-2xl border border-border bg-card p-5 shadow-elegant ring-1 ${s.ring}`}>
//                 <div className="flex flex-wrap items-start gap-4">
//                   <div className={`grid h-12 w-12 place-items-center rounded-xl ${s.bg} ${s.text}`}>
//                     <Megaphone className="h-5 w-5" />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex flex-wrap items-center gap-2">
//                       <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.bg} ${s.text}`}>{a.sev}</span>
//                       <h3 className="font-display text-lg font-semibold">{a.t}</h3>
//                     </div>
//                     <p className="mt-1 text-sm text-muted-foreground">{a.d}</p>
//                     <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
//                       <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{a.loc}</span>
//                       <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{a.time}</span>
//                       <span className="flex items-center gap-1"><Activity className="h-3 w-3" />Live</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </PublicLayout>
//   );
// }


import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Megaphone,
  MapPin,
  Clock,
  Activity,
} from "lucide-react";

import { PublicLayout } from "@/components/PublicLayout";
import { api } from "@/lib/api";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      {
        title: "Live Alerts — Mahakumbh AI",
      },
      {
        name: "description",
        content:
          "Live emergency alerts, advisories, and route closures from the command center.",
      },
    ],
  }),

  component: Alerts,
});

const sevStyles: Record<
  string,
  {
    bg: string;
    text: string;
    ring: string;
  }
> = {
  critical: {
    bg: "bg-critical",
    text: "text-white",
    ring: "ring-critical/40",
  },

  high: {
    bg: "bg-high",
    text: "text-white",
    ring: "ring-high/40",
  },

  medium: {
    bg: "bg-medium",
    text: "text-foreground",
    ring: "ring-medium/40",
  },

  normal: {
    bg: "bg-normal",
    text: "text-white",
    ring: "ring-normal/40",
  },
};

function Alerts() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAlerts = async () => {
    try {
      const data = await api.alerts();

      setAlerts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  return (
    <PublicLayout>
      <section className="bg-hero py-14 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1 text-xs uppercase tracking-widest text-saffron">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-saffron" />
            Live · Updated continuously
          </div>

          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Live Emergency Alerts
          </h1>

          <p className="mt-3 max-w-2xl text-white/80">
            Real-time advisories from the Mahakumbh Command
            Center. Alerts are generated directly from active
            incidents in the system.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {loading ? (
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            Loading alerts...
          </div>
        ) : alerts.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            No active alerts.
          </div>
        ) : (
          <div className="grid gap-4">
            {alerts.map((alert) => {
              const severity =
                alert.severity?.toLowerCase() || "medium";

              const style =
                sevStyles[severity] || sevStyles.medium;

              return (
                <div
                  key={alert.id}
                  className={`rounded-2xl border border-border bg-card p-5 shadow-elegant ring-1 ${style.ring}`}
                >
                  <div className="flex flex-wrap items-start gap-4">
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-xl ${style.bg} ${style.text}`}
                    >
                      <Megaphone className="h-5 w-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style.bg} ${style.text}`}
                        >
                          {severity}
                        </span>

                        <h3 className="font-display text-lg font-semibold">
                          {alert.title}
                        </h3>
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {alert.description ||
                          "No description available"}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.location ||
                            "Location unavailable"}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Incident #{alert.id}
                        </span>

                        <span className="flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          {alert.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}