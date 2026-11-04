"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AvatarSvg from "@/components/avatar/AvatarSvg";
import { PROFILES, equippedFor } from "@/components/home/data";

function ProfileView() {
  const sp = useSearchParams();
  const u = sp.get("u") ?? "";
  const idx = PROFILES.findIndex(([, user]) => user === u);

  if (idx < 0) {
    return (
      <main className="grid min-h-screen place-items-center p-6 text-ink">
        <div className="rounded-card border-2 border-ink bg-paper p-6 text-center shadow-brutal-lg">
          <p className="font-bold">Profil tidak ditemukan</p>
          <Link href="/" className="btn btn-primary mt-3 text-sm">Kembali</Link>
        </div>
      </main>
    );
  }

  const [name, user] = PROFILES[idx];
  return (
    <main className="min-h-screen text-ink">
      <div className="mx-auto max-w-md px-6 py-6">
        <Link href="/" className="btn text-sm">← Kembali</Link>
        <div className="mt-6 overflow-hidden rounded-card border-2 border-ink bg-paper shadow-brutal-lg">
          <div className="flex h-44 items-center justify-center border-b-2 border-ink bg-sky text-ink">
            <AvatarSvg equipped={equippedFor(idx)} className="h-32 w-auto" />
          </div>
          <div className="p-4 text-center">
            <p className="text-lg font-bold">{name}</p>
            <p className="font-mono text-sm text-ink/70">@{user}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ProfileView />
    </Suspense>
  );
}
