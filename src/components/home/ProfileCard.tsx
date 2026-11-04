import Link from "next/link";
import AvatarSvg from "@/components/avatar/AvatarSvg";
import { equippedFor } from "./data";

const BG = ["bg-yellow", "bg-pink", "bg-green", "bg-blue"];

export default function ProfileCard({ name, user, i }: { name: string; user: string; i: number }) {
  return (
    <Link
      href={`/profile?u=${user}`}
      className="overflow-hidden rounded-card border-2 border-ink bg-paper shadow-brutal transition hover:-translate-y-1"
    >
      <div className={`flex h-[120px] items-center justify-center ${BG[i % 4]} text-ink`}>
        <AvatarSvg equipped={equippedFor(i)} className="h-20 w-auto" />
      </div>
      <div className="border-t-2 border-ink px-3 py-2.5">
        <p className="text-sm font-bold">{name}</p>
        <p className="text-[10px]">@{user}</p>
      </div>
    </Link>
  );
}
