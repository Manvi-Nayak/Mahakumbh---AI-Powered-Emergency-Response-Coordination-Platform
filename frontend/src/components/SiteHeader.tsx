import { Link } from "@tanstack/react-router";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const nav = [
    { to: "/", label: "Home" },
    { to: "/report", label: "Report" },
    { to: "/alerts", label: "Live Alerts" },
    { to: "/safety", label: "Safety" },
    { to: "/contacts", label: "Contacts" },
  ];
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-saffron-gradient shadow-glow">
            <span className="font-display text-lg font-bold text-white">ॐ</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold">Mahakumbh 2028</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Emergency Response</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-primary bg-secondary" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/operations"
            className="ml-2 inline-flex items-center gap-1.5 rounded-md bg-royal-gradient px-4 py-2 text-sm font-semibold text-white shadow-elegant transition hover:opacity-95"
          >
            <Shield className="h-4 w-4" />
            Operations
          </Link>
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          <div className="flex flex-col gap-1 p-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary">
                {n.label}
              </Link>
            ))}
            <Link to="/operations" onClick={() => setOpen(false)} className="mt-1 inline-flex items-center gap-1.5 rounded-md bg-royal-gradient px-3 py-2 text-sm font-semibold text-white">
              <Shield className="h-4 w-4" /> Operations Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
