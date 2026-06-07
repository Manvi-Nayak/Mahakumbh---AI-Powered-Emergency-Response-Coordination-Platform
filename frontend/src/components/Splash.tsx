import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

export function Splash({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const duration = 3200;
    const t = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(p);
      if (p >= 100) { clearInterval(t); setTimeout(onDone, 250); }
    }, 30);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-hero">
      {/* Ganga flow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-1/4 h-32 overflow-hidden opacity-30">
        <div className="animate-ganga h-full w-[200%] bg-[linear-gradient(90deg,transparent,oklch(0.74_0.18_55/0.6),transparent)]" />
      </div>
      {/* Particles */}
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="animate-float absolute h-1.5 w-1.5 rounded-full bg-saffron"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i % 8) * 0.3}s`,
            animationDuration: `${3 + (i % 5)}s`,
          }}
        />
      ))}

      {/* Trishul + Shiva silhouette */}
      <div className="relative mb-6 flex flex-col items-center">
        <svg viewBox="0 0 200 240" className="h-44 w-44 drop-shadow-[0_0_30px_oklch(0.74_0.18_55/0.7)]">
          <defs>
            <linearGradient id="trishul" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.92 0.15 70)" />
              <stop offset="100%" stopColor="oklch(0.62 0.21 35)" />
            </linearGradient>
          </defs>
          {/* Shiva silhouette circle */}
          <circle cx="100" cy="150" r="38" fill="oklch(0.18 0.06 265)" opacity="0.8" />
          <circle cx="100" cy="125" r="14" fill="oklch(0.18 0.06 265)" />
          {/* Crescent */}
          <path d="M 90 108 Q 100 100 110 108" stroke="oklch(0.92 0.12 80)" strokeWidth="2" fill="none" />
          {/* Trishul */}
          <rect x="97" y="20" width="6" height="200" fill="url(#trishul)" />
          <path d="M 60 50 L 70 20 L 80 50 L 80 80 L 70 70 L 60 80 Z" fill="url(#trishul)" />
          <path d="M 100 30 L 110 0 L 120 30 L 120 60 L 110 50 L 100 60 Z M 140 50 L 150 20 L 160 50 L 160 80 L 150 70 L 140 80 Z" fill="url(#trishul)" transform="translate(-30,0)" />
          <path d="M 120 50 L 130 20 L 140 50 L 140 80 L 130 70 L 120 80 Z" fill="url(#trishul)" />
        </svg>
        <div className="absolute inset-0 -z-10 animate-glow-pulse rounded-full" />
      </div>

      <div className="animate-fade-up text-center">
        <h1 className="font-display text-5xl font-bold tracking-wider text-white md:text-6xl">
          <span className="text-gradient-saffron">Mahakumbh</span> 2028
        </h1>
        <p className="mt-3 max-w-md px-4 text-sm font-medium uppercase tracking-[0.2em] text-white/70 md:text-base">
          AI Powered Emergency Response Coordination Platform
        </p>
      </div>

      <div className="mt-10 flex w-64 flex-col items-center gap-2">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-saffron-gradient transition-all duration-150" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <Flame className="h-3 w-3 animate-pulse text-saffron" />
          Initializing Command Center…
        </div>
      </div>
    </div>
  );
}
