"use client";

import Link from "next/link";
import { useState } from "react";
import { InstagramIcon, TikTokIcon } from "./SocialIcons";

const MENU: [string, string][] = [
  ["Cerita", "#cerita"],
  ["Find yours", "#find-yours"],
  ["Cara kerja", "#cara-kerja"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const social = (
    <div className="flex items-center gap-3 text-ink">
      <a href="#" aria-label="Instagram"><InstagramIcon className="h-6 w-6" /></a>
      <a href="#" aria-label="TikTok"><TikTokIcon className="h-6 w-6" /></a>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-[1100px] items-center gap-2 px-4 py-2">
        <a href="#" className="rounded-chip border-2 border-ink bg-yellow px-3 py-1 text-sm font-bold">WONLAND</a>

        <nav className="hidden flex-1 items-center justify-center gap-6 md:flex">
          {MENU.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-bold">{label}</a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          {social}
          <Link href="/play" className="text-xs font-bold text-ink/60">Prototipe game 3D</Link>
          <Link href="/d/demo" className="btn btn-primary text-sm">Masuk</Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Buka menu"
          className="btn ml-auto h-11 w-11 p-0 md:hidden"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="border-t-2 border-ink bg-paper p-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {MENU.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="btn text-sm">{label}</a>
            ))}
            <Link href="/d/demo" onClick={() => setOpen(false)} className="btn btn-primary text-sm">Masuk</Link>
            <Link href="/play" onClick={() => setOpen(false)} className="btn text-sm">Prototipe game 3D</Link>
          </nav>
          <div className="mt-3">{social}</div>
        </div>
      )}
    </header>
  );
}
