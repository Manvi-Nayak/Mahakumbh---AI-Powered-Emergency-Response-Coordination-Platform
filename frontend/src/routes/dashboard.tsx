import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard, AlertTriangle, Truck, Radio, Brain, BarChart3, Activity,
  Bell, Settings, LogOut, Search, ArrowUpRight, CheckCircle2, Clock, MapPin,
  Monitor,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar,
  PieChart, Pie, Cell,
} from "recharts";
import { api, WS_URL } from "@/lib/api";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Command Dashboard — Mahakumbh AI" }] }),
  component: Dashboard,
});

const ROLE_LABEL: Record<string, string> = {
  police: "Police Control Room",
  ambulance: "Ambulance Services",
  fire: "Fire Department",
  medical: "Medical Command",
  disaster: "Disaster Management",
  admin: "Central Command",
};

function Dashboard() {
  const navigate = useNavigate();
  // const [role, setRole] = useState("admin");

  const [role, setRole] = useState("admin");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const loadDashboard = async () => {
    try {
      const data = await api.live();
      setDashboardData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("mk_token")) {
      navigate({ to: "/operations" });
      return;
    }
    setRole(sessionStorage.getItem("mk_role") || "admin");
    loadDashboard();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("mk_token");
    sessionStorage.removeItem("mk_role");
    navigate({ to: "/" });
  };

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WS Event:", data);
      loadDashboard();
    };
    return () => socket.close();
  }, []);

  return (
    <div className="flex min-h-screen bg-secondary/30">
      <Sidebar role={role} onLogout={logout} />
      <div className="flex-1">
        <TopBar role={role} />
        <main className="mx-auto max-w-7xl space-y-6 p-6">
          <Stats role={role} dashboardData={dashboardData}/>
          <Charts dashboardData={dashboardData}/>
          <div className="grid gap-6 lg:grid-cols-2">
            <RecentIncidents incidents={dashboardData?.recent_incidents || []}/>
            <LiveFeed />
          </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar({ role, onLogout }: { role: string; onLogout: () => void }) {
  const items = [
    { icon: LayoutDashboard, label: "Dashboard",path: "/dashboard" },
    { icon: AlertTriangle, label: "Incidents", path: "/incidents" },
    { icon: Truck, label: "Resources", path: "/resources" },
    { icon: Radio, label: "Dispatches", path: "/dispatch" },
    { icon: Brain, label: "AI Workflow",path: "/ai-workflow",},
    // { icon: BarChart3, label: "Analytics", path: "/analytics"},
    { icon: Activity, label: "Live Monitoring",path: "/live-command-center" },
    { icon: Bell, label: "Notifications", path: "/notification"},
    // { icon: Settings, label: "Settings" },
    { icon: Monitor, label: "Command Center", path: "/command-center",},
  ];
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-card md:flex md:flex-col">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-saffron-gradient text-white">
          <span className="font-display text-base font-bold">ॐ</span>
        </div>
        <div className="leading-tight">
          <div className="font-display text-sm font-bold">Mahakumbh AI</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{ROLE_LABEL[role]}</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map((i, idx) => (
          <Link key={i.label} to={i.path} className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${idx === 0 ? "bg-saffron-gradient text-white shadow-elegant" : "text-foreground/80 hover:bg-secondary"}`}>
            <i.icon className="h-4 w-4" /> {i.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <button onClick={onLogout} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </aside>
  );
}

function TopBar({ role }: { role: string }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-card/80 px-6 py-3 backdrop-blur">
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-saffron">{ROLE_LABEL[role]}</div>
        <h1 className="font-display text-xl font-bold">Command Dashboard</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Search incidents, units, dispatches…" className="w-72 rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-saffron" />
        </div>
        <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-card hover:bg-secondary">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 animate-pulse rounded-full bg-critical" />
        </button>
        <Link to="/" className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-secondary">Public site</Link>
      </div>
    </header>
  );
}

function Stats({
 role,
 dashboardData,
}: {
 role: string;
 dashboardData: any;
}) {
  const base = [
    {
      l: "Total Incidents",
      v: dashboardData?.stats?.total_incidents || 0,
      d: "all incidents",
      c: "bg-royal-gradient",
    },
    {
      l: "Active Incidents",
      v: dashboardData?.stats?.active_incidents || 0,
      d: "currently active",
      c: "bg-[oklch(0.6_0.24_27)]",
    },
    {
      l: "Resolved",
      v: dashboardData?.stats?.resolved_incidents || 0,
      d: "resolved",
      c: "bg-normal",
    },
    {
      l: "Available Units",
      v: dashboardData?.stats?.available_resources || 0,
      d: "available",
      c: "bg-saffron-gradient",
    },
    {
      l: "Busy Units",
      v: dashboardData?.stats?.busy_resources || 0,
      d: "deployed",
      c: "bg-high",
    },
    {
      l: "Active Dispatches",
      v: dashboardData?.stats?.active_dispatches || 0,
      d: "in progress",
      c: "bg-medium text-foreground",
    },
  ];
  const stats = useMemo(() => (role === "admin" ? base : base.slice(0, 4)), [role]);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((s) => (
        <div key={s.l} className="rounded-xl border border-border bg-card p-4 shadow-elegant">
          <div className={`mb-3 inline-grid h-9 w-9 place-items-center rounded-lg text-white ${s.c}`}>
            <ArrowUpRight className="h-4 w-4" />
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.l}</div>
          <div className="font-display text-2xl font-bold">{s.v.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">{s.d}</div>
        </div>
      ))}
    </div>
  );
}

const trend = Array.from({ length: 12 }).map((_, i) => ({
  h: `${i*2}:00`, incidents: 20 + Math.round(Math.sin(i) * 10 + i * 2), resolved: 18 + Math.round(Math.cos(i) * 8 + i * 1.8),
}));
const utilization = [
  { name: "Police", value: 78 }, { name: "Ambulance", value: 65 },
  { name: "Fire", value: 42 }, { name: "Medical", value: 88 },
];
const dispatchPie = [
  { name: "Completed", value: 412 }, { name: "En Route", value: 27 },
  { name: "Assigned", value: 18 }, { name: "Cancelled", value: 9 },
];
const PIE_COLORS = ["oklch(0.7 0.17 150)", "oklch(0.74 0.18 55)", "oklch(0.45 0.18 265)", "oklch(0.6 0.24 27)"];

// function Charts() {
//   return (
//     <div className="grid gap-4 lg:grid-cols-3">
//       <div className="rounded-xl border border-border bg-card p-5 shadow-elegant lg:col-span-2">
//         <div className="mb-3 flex items-center justify-between">
//           <h3 className="font-display text-base font-semibold">Incident Trends — 24h</h3>
//           <span className="text-xs text-muted-foreground">Live</span>
//         </div>
//         <div className="h-64">
//           <ResponsiveContainer>
//             <LineChart data={trend}>
//               <XAxis dataKey="h" stroke="oklch(0.5 0.03 260)" fontSize={11} />
//               <YAxis stroke="oklch(0.5 0.03 260)" fontSize={11} />
//               <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
//               <Line type="monotone" dataKey="incidents" stroke="oklch(0.6 0.24 27)" strokeWidth={2.5} dot={false} />
//               <Line type="monotone" dataKey="resolved" stroke="oklch(0.7 0.17 150)" strokeWidth={2.5} dot={false} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//       <div className="rounded-xl border border-border bg-card p-5 shadow-elegant">
//         <h3 className="mb-3 font-display text-base font-semibold">Dispatch Status</h3>
//         <div className="h-64">
//           <ResponsiveContainer>
//             <PieChart>
//               <Pie data={dispatchPie} dataKey="value" innerRadius={50} outerRadius={90}>
//                 {dispatchPie.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
//               </Pie>
//               <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
//           {dispatchPie.map((d, i) => (
//             <div key={d.name} className="flex items-center gap-2">
//               <span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
//               <span className="text-muted-foreground">{d.name}</span>
//               <span className="ml-auto font-semibold">{d.value}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="rounded-xl border border-border bg-card p-5 shadow-elegant lg:col-span-3">
//         <h3 className="mb-3 font-display text-base font-semibold">Resource Utilization (%)</h3>
//         <div className="h-48">
//           <ResponsiveContainer>
//             <BarChart data={utilization}>
//               <XAxis dataKey="name" stroke="oklch(0.5 0.03 260)" fontSize={11} />
//               <YAxis stroke="oklch(0.5 0.03 260)" fontSize={11} />
//               <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
//               <Bar dataKey="value" fill="oklch(0.74 0.18 55)" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

function Charts({
  dashboardData,
}: {
  dashboardData: any;
}) {

  const dispatches =
    dashboardData?.recent_dispatches || [];

  const resources =
    dashboardData?.resources || [];

  const assigned =
    dispatches.filter(
      (d: any) => d.status === "assigned"
    ).length;

  const enRoute =
    dispatches.filter(
      (d: any) => d.status === "en_route"
    ).length;

  const completed =
    dispatches.filter(
      (d: any) => d.status === "completed"
    ).length;

  const cancelled =
    dispatches.filter(
      (d: any) => d.status === "cancelled"
    ).length;

  const dispatchPie = [
    { name: "Assigned", value: assigned },
    { name: "En Route", value: enRoute },
    { name: "Completed", value: completed },
    { name: "Cancelled", value: cancelled },
  ];

  const available =
    resources.filter(
      (r: any) => r.status === "available"
    ).length;

  const busy =
    resources.filter(
      (r: any) => r.status === "busy"
    ).length;

  const utilization = [
    {
      name: "Available",
      value: available,
    },
    {
      name: "Busy",
      value: busy,
    },
  ];

  const trend = [
    {
      h: "Current",
      incidents:
        dashboardData?.stats
          ?.total_incidents || 0,
      resolved:
        dashboardData?.stats
          ?.resolved_incidents || 0,
    },
  ];

  const PIE_COLORS = [
    "#2563eb",
    "#f97316",
    "#22c55e",
    "#ef4444",
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-3">

      <div className="rounded-xl border border-border bg-card p-5 shadow-elegant lg:col-span-2">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold">
            Incident Overview
          </h3>
        </div>

        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={trend}>
              <XAxis dataKey="h" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="incidents"
                fill="#f97316"
              />
              <Bar
                dataKey="resolved"
                fill="#22c55e"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 shadow-elegant">
        <h3 className="mb-3 font-display text-base font-semibold">
          Dispatch Status
        </h3>

        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={dispatchPie}
                dataKey="value"
                innerRadius={50}
                outerRadius={90}
              >
                {dispatchPie.map(
                  (_, i) => (
                    <Cell
                      key={i}
                      fill={
                        PIE_COLORS[i]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 shadow-elegant lg:col-span-3">
        <h3 className="mb-3 font-display text-base font-semibold">
          Resource Status
        </h3>

        <div className="h-48">
          <ResponsiveContainer>
            <BarChart
              data={utilization}
            >
              <XAxis
                dataKey="name"
              />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#f97316"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

// const incidents = [
//   { id: "INC-2841", t: "Heavy Crowd — Sangam Ghat", sev: "critical", loc: "Sector 4", time: "2m" },
//   { id: "INC-2840", t: "Medical — Cardiac Arrest", sev: "critical", loc: "Camp 17", time: "5m" },
//   { id: "INC-2839", t: "Lost Child", sev: "high", loc: "Help Desk 12", time: "12m" },
//   { id: "INC-2838", t: "Minor Injury", sev: "medium", loc: "Ghat 2", time: "20m" },
//   { id: "INC-2837", t: "Route Blockage", sev: "high", loc: "Bridge 3", time: "28m" },
// ];
const sevColor: Record<string, string> = {
  critical: "bg-critical text-white", high: "bg-high text-white",
  medium: "bg-medium text-foreground", normal: "bg-normal text-white",
};

function RecentIncidents({
 incidents,
}: {
 incidents: any[];
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-elegant">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold">Recent Incidents</h3>
        <button className="text-xs font-semibold text-primary hover:underline">View all</button>
      </div>
      <div className="divide-y divide-border">
        {incidents.map((i: any) => (
          <div key={i.id} className="flex items-center gap-3 py-3">
            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${sevColor[i.severity?.toLowerCase()]}`}>{i.severity}</span>
            <div className="flex-1">
              <div className="text-sm font-semibold">{i.title}</div>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span>{i.id}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{i.location}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(i.created_at).toLocaleString()}</span>
              </div>
            </div>
            <button className="rounded-md border border-border px-2.5 py-1 text-xs font-semibold hover:bg-secondary">Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveFeed() {
  const events = [
    { t: "Dispatch DSP-918 marked en_route", time: "Just now", icon: Radio, c: "text-saffron" },
    { t: "AI flagged INC-2841 as CRITICAL", time: "30s ago", icon: Brain, c: "text-critical" },
    { t: "Unit AMB-23 arrived at Camp 17", time: "1m ago", icon: CheckCircle2, c: "text-normal" },
    { t: "New incident reported — Sector 4", time: "2m ago", icon: AlertTriangle, c: "text-critical" },
    { t: "Resource AMB-47 marked available", time: "4m ago", icon: Truck, c: "text-primary" },
    { t: "Weather advisory issued — All sectors", time: "8m ago", icon: Bell, c: "text-medium" },
  ];
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-elegant">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold">Live Activity Feed</h3>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-normal" /> Streaming
        </span>
      </div>
      <ul className="space-y-3">
        {events.map((e, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary">
              <e.icon className={`h-4 w-4 ${e.c}`} />
            </div>
            <div className="flex-1">
              <div className="text-sm">{e.t}</div>
              <div className="text-xs text-muted-foreground">{e.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
