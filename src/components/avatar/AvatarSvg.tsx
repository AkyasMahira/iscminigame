import { colorOf, type AvatarSlot } from "@/lib/catalog";

export default function AvatarSvg({
  equipped,
  className,
}: {
  equipped: Record<AvatarSlot, string>;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 96"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="20" cy="22" r="9" fill={colorOf(equipped.skin)} />
      <rect x="8" y="32" width="24" height="28" rx="4" fill={colorOf(equipped.shirt)} />
      <rect x="11" y="60" width="7" height="22" fill={colorOf(equipped.pants)} />
      <rect x="22" y="60" width="7" height="22" fill={colorOf(equipped.pants)} />
      <rect x="9" y="82" width="10" height="6" rx="2" fill={colorOf(equipped.shoes)} />
      <rect x="21" y="82" width="10" height="6" rx="2" fill={colorOf(equipped.shoes)} />
      <path d="M12 21 Q20 5 28 21 Z" fill={colorOf(equipped.hair)} />
      <rect x="7" y="12" width="26" height="4" rx="2" fill={colorOf(equipped.hat)} />
      <rect x="13" y="3" width="14" height="9" rx="3" fill={colorOf(equipped.hat)} />
    </svg>
  );
}
