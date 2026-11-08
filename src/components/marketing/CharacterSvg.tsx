import { assets, type CharacterId } from "@/lib/assets";

const NAMES: Record<CharacterId, string> = { wawan: "Wawan", wowo: "Wowo" };

function Wawan({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} fill="none" strokeWidth="3" strokeLinejoin="round" aria-hidden>
      <line x1="50" y1="18" x2="50" y2="4" className="stroke-ink" />
      <circle cx="50" cy="3" r="4" className="fill-blue stroke-ink" />
      <circle cx="20" cy="34" r="9" className="fill-yellow stroke-ink" />
      <circle cx="80" cy="34" r="9" className="fill-yellow stroke-ink" />
      <circle cx="50" cy="46" r="30" className="fill-yellow stroke-ink" />
      <circle cx="40" cy="42" r="3" className="fill-ink" />
      <circle cx="60" cy="42" r="3" className="fill-ink" />
      <path d="M42 54 Q50 62 58 54" className="stroke-ink" fill="none" />
      <rect x="30" y="74" width="40" height="34" rx="12" className="fill-blue stroke-ink" />
      <circle cx="50" cy="91" r="11" className="fill-paper stroke-ink" />
    </svg>
  );
}

function Wowo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} fill="none" strokeWidth="3" strokeLinejoin="round" aria-hidden>
      <path d="M33 24 L25 4 L46 17 Z" className="fill-pink stroke-ink" />
      <path d="M67 24 L75 4 L54 17 Z" className="fill-pink stroke-ink" />
      <ellipse cx="50" cy="44" rx="30" ry="26" className="fill-green stroke-ink" />
      <circle cx="40" cy="40" r="3" className="fill-ink" />
      <circle cx="60" cy="40" r="3" className="fill-ink" />
      <circle cx="34" cy="50" r="4" className="fill-pink" />
      <circle cx="66" cy="50" r="4" className="fill-pink" />
      <path d="M44 52 Q50 58 56 52" className="stroke-ink" fill="none" />
      <path d="M32 68 h36 v30 a18 18 0 0 1 -36 0 Z" className="fill-pink stroke-ink" />
    </svg>
  );
}

export default function CharacterSvg({
  id,
  className,
  showName = true,
}: {
  id: CharacterId;
  className?: string;
  showName?: boolean;
}) {
  const img = assets.characters[id];
  return (
    <figure className="flex flex-col items-center gap-1">
      {img ? <img src={img} alt={NAMES[id]} className={className} /> : id === "wawan" ? <Wawan className={className} /> : <Wowo className={className} />}
      {showName && <figcaption className="text-sm font-bold">{NAMES[id]}</figcaption>}
    </figure>
  );
}
