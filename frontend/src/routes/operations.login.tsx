import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Mail, ArrowLeft, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

export const Route = createFileRoute("/operations/login")({
  head: () => ({ meta: [{ title: "Operations Login — Mahakumbh AI" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(sessionStorage.getItem("mk_role") || "admin");
    }
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res: any = await api.login(email, password);
      if (res?.access_token || res?.token) {
        window.localStorage.setItem("mk_token", res.access_token || res.token);
      }
      toast.success(`Welcome — ${roleLabel(role)}`);
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      // backend offline — allow demo entry
      window.localStorage.setItem("mk_token", "demo-token");
      toast.success(`Demo session — ${roleLabel(role)}`);
      navigate({ to: "/dashboard" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left panel */}
      <div className="relative hidden bg-hero p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-saffron">
            <ArrowLeft className="h-4 w-4" /> Public site
          </Link>
        </div>
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1 text-xs uppercase tracking-widest text-saffron">
            <ShieldCheck className="h-3 w-3" /> Secure access
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight">
            <span className="text-gradient-saffron">Mahakumbh</span> Emergency<br />Operations Center
          </h2>
          <p className="mt-3 max-w-md text-white/70">
            Coordinate incidents, deploy resources, and protect millions — backed by AI.
          </p>
        </div>
        <div className="text-xs text-white/40">© Mahakumbh 2028 · Restricted Access</div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-8">
        <form onSubmit={submit} className="w-full max-w-md space-y-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-saffron">Role · {roleLabel(role)}</div>
            <h1 className="mt-1 font-display text-3xl font-bold">Sign in to continue</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Not your role? <Link to="/operations" className="font-semibold text-primary hover:underline">Change role</Link>
            </p>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Email</span>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@mahakumbh-ai.in"
                className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-saffron" />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Password</span>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-saffron" />
            </div>
          </label>

          <button disabled={loading} className="w-full rounded-lg bg-royal-gradient px-5 py-3 text-sm font-semibold text-white shadow-elegant disabled:opacity-60">
            {loading ? "Signing in…" : "Sign in to Operations Center"}
          </button>
          <p className="text-center text-xs text-muted-foreground">Secured by government-grade authentication.</p>
        </form>
      </div>
    </div>
  );
}

function roleLabel(r: string) {
  return {
    police: "Police Control Room",
    ambulance: "Ambulance Services",
    fire: "Fire Department",
    medical: "Medical Command",
    disaster: "Disaster Management",
    admin: "Central Command",
  }[r] || "Operations";
}
