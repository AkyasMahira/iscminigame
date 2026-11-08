"use client";

import { useState } from "react";
import { DOLLS, formatPrice, rarityAccent, type Accent } from "@/lib/mock-dolls";
import { assets } from "@/lib/assets";
import BlindBoxSvg from "./BlindBoxSvg";
import BuyFlow from "./BuyFlow";

const ACCENT_BG: Record<Accent, string> = { yellow: "bg-yellow", pink: "bg-pink", green: "bg-green" };

export default function FindYours() {
  const [selected, setSelected] = useState<string | null>(null);
  const doll = DOLLS.find((d) => d.id === selected) ?? null;

  return (
    <section id="find-yours" className="scroll-mt-24 px-4 py-16">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="text-2xl font-bold sm:text-3xl">Find yours</h2>
        <p className="mt-3 text-sm text-ink/70">
          Pilih seri blind box favoritmu. Karakter dalam kotak tetap rahasia sampai dibuka.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {DOLLS.map((d) => {
            const img = assets.dollImages[d.id];
            return (
              <div key={d.id} className="overflow-hidden rounded-card border-2 border-ink bg-paper shadow-brutal">
                <div className={`flex h-36 items-center justify-center ${ACCENT_BG[d.accent]}`}>
                  {img ? <img src={img} alt="" className="h-28 w-auto" /> : <BlindBoxSvg accent={d.accent} className="h-28 w-auto" />}
                </div>
                <div className="border-t-2 border-ink p-3">
                  <span className={`rounded-chip border-2 border-ink px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${ACCENT_BG[rarityAccent[d.rarity]]}`}>
                    {d.rarity}
                  </span>
                  <p className="mt-2 text-sm font-bold">{d.name}</p>
                  <p className="text-xs text-ink/60">{d.series}</p>
                  <p className="mt-1 text-sm">{formatPrice(d.price)}</p>
                  <button onClick={() => setSelected(d.id)} className="btn btn-primary mt-3 w-full text-sm">Beli</button>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-ink/60">Harga dan seri adalah contoh untuk demo.</p>
      </div>
      {doll && <BuyFlow doll={doll} onClose={() => setSelected(null)} />}
    </section>
  );
}
