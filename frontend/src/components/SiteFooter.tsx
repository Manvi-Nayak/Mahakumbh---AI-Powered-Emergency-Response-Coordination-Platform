import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SiteFooter() {
  const [form, setForm] = useState({ name: "", email: "", query: "" });
  return (
    <footer className="mt-20 border-t border-border bg-royal-gradient text-white/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4 md:px-8">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-saffron-gradient">
              <span className="font-display text-base font-bold text-white">ॐ</span>
            </div>
            <div className="font-display text-lg font-bold">Mahakumbh AI</div>
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            AI-powered emergency response coordination platform helping citizens and responders
            coordinate incidents in real time during Mahakumbh.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest text-saffron">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["/", "Home"], ["/report", "Report Emergency"], ["/safety", "Safety Guidelines"],
              ["/alerts", "Live Alerts"], ["/contacts", "Emergency Contacts"],
            ].map(([to, label]) => (
              <li key={to}><Link to={to} className="text-white/70 transition hover:text-saffron">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest text-saffron">Emergency</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Police — <span className="font-bold text-white">100</span></li>
            <li>Ambulance — <span className="font-bold text-white">108</span></li>
            <li>Fire Brigade — <span className="font-bold text-white">101</span></li>
            <li>National Emergency — <span className="font-bold text-white">112</span></li>
            <li>Medical — <span className="font-bold text-white">102</span></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest text-saffron">Queries</h4>
          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Query submitted. We'll respond soon."); setForm({ name: "", email: "", query: "" }); }}
            className="space-y-2"
          >
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-saffron" />
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-saffron" />
            <textarea required value={form.query} onChange={(e) => setForm({ ...form, query: e.target.value })} placeholder="Your query" rows={2} className="w-full rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-saffron" />
            <button className="inline-flex items-center gap-1.5 rounded-md bg-saffron-gradient px-3 py-2 text-sm font-semibold text-white">
              <Send className="h-3.5 w-3.5" /> Submit
            </button>
          </form>
          <div className="mt-4 space-y-1 text-xs text-white/60">
            <div className="flex items-center gap-2"><Mail className="h-3 w-3" /> support@mahakumbh-ai.in</div>
            <div className="flex items-center gap-2"><Phone className="h-3 w-3" /> +91 XXXXX XXXXX</div>
            <div className="flex items-center gap-2"><MapPin className="h-3 w-3" /> Prayagraj Control Center</div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © 2028 Mahakumbh Emergency Command Center. Built for public safety.
      </div>
    </footer>
  );
}
