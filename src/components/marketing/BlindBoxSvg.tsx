import type { Accent } from "@/lib/mock-dolls";

const ACCENT_FILL: Record<Accent, string> = { yellow: "fill-yellow", pink: "fill-pink", green: "fill-green" };

export default function BlindBoxSvg({ accent = "yellow", className }: { accent?: Accent; className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} fill="none" strokeWidth="3" strokeLinejoin="round" aria-hidden>
      <rect x="12" y="22" width="76" height="20" rx="6" className={`${ACCENT_FILL[accent]} stroke-ink`} />
      <rect x="18" y="38" width="64" height="66" rx="6" className="fill-paper stroke-ink" />
      <rect x="44" y="22" width="12" height="82" className="fill-paper stroke-ink" />
      <text x="50" y="84" textAnchor="middle" fontSize="44" fontWeight="700" className="fill-ink">?</text>
    </svg>
  );
}
