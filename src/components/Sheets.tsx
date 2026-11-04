"use client";
import { useState, type ReactNode } from "react";
import { CAT_LABEL, FURN_ICON, ITEMS, count, isOwned, type Cat, type Item, type Slot } from "@/lib/catalog";
import { PACKS, channel, pay, rupiah } from "@/lib/payments";
import { useGame } from "@/store/game";
import AvatarSvg from "@/components/avatar/AvatarSvg";

function Sheet({ title, children }: { title: string; children: ReactNode }) {
  const open = useGame((s) => s.open);
  return (
    <section className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-20 max-h-[70dvh] overflow-y-auto rounded-t-card border-x-2 border-t-2 border-ink bg-paper shadow-brutal-lg lg:top-0 lg:bottom-0 lg:left-auto lg:right-0 lg:max-h-none lg:w-[380px] lg:rounded-none lg:border-y-0 lg:border-l-2 lg:border-r-0">
      <div className="sticky top-0 z-10 border-b-2 border-ink bg-paper">
        <div className="flex justify-center pt-2 lg:hidden"><span className="h-1.5 w-12 rounded-full bg-ink" /></div>
        <div className="flex items-center justify-between p-3">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={() => open(null)} aria-label="Tutup" className="btn h-11 w-11 p-0 text-lg">✕</button>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

const Label = ({ children }: { children: ReactNode }) => (
  <p className="mb-1 text-[11px] font-bold uppercase tracking-wide">{children}</p>
);

const Icon = ({ item, size = 32 }: { item: Item; size?: number }) =>
  item.cat === "furn" ? (
    <span style={{ fontSize: size - 6 }} aria-hidden>{FURN_ICON[item.furn!]}</span>
  ) : (
    <span aria-hidden className="inline-block rounded-full border-2 border-ink" style={{ width: size, height: size, background: item.color }} />
  );

function Chips({ cats, value, onPick }: { cats: Cat[]; value: Cat; onPick: (c: Cat) => void }) {
  return (
    <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
      {cats.map((c) => (
        <button
          key={c}
          onClick={() => onPick(c)}
          aria-pressed={value === c}
          className={`min-h-11 shrink-0 rounded-chip border-2 border-ink px-3 text-sm font-bold ${value === c ? "bg-ink text-paper" : "bg-paper"}`}
        >
          {CAT_LABEL[c]}
        </button>
      ))}
    </div>
  );
}

function Wardrobe() {
  const { me, equip, buy } = useGame();
  const [cat, setCat] = useState<Cat>("shirt");
  return (
    <Sheet title="Lemari">
      <div className="mb-3 flex justify-center rounded-card border-2 border-ink bg-sky p-2 text-ink">
        <AvatarSvg equipped={me.equipped} className="h-24 w-auto" />
      </div>
      <Chips cats={["skin", "hair", "shirt", "pants", "hat", "shoes", "car"]} value={cat} onPick={setCat} />
      <div className="grid grid-cols-3 gap-2">
        {ITEMS.filter((i) => i.cat === cat).map((i) => {
          const owned = isOwned(me, i);
          const active = me.equipped[cat as Slot] === i.id;
          return (
            <button
              key={i.id}
              onClick={() => (owned ? equip(i.id) : buy(i.id))}
              title={i.name}
              aria-pressed={active}
              className={`flex flex-col items-center gap-1 rounded-card border-2 border-ink p-2 text-center ${active ? "bg-yellow shadow-brutal" : "bg-paper"}`}
            >
              <span aria-hidden className="inline-block h-10 w-10 rounded-full border-2 border-ink" style={{ background: i.color }} />
              <span className="text-sm font-bold leading-none">{i.name}</span>
              {owned ? (
                <span className="text-[11px] font-bold uppercase tracking-wide">{active ? "Dipakai" : "Pilih"}</span>
              ) : (
                <span className="text-sm font-bold">🔒 🪙 {i.price}</span>
              )}
            </button>
          );
        })}
      </div>
    </Sheet>
  );
}

function Shop() {
  const { me, buy } = useGame();
  const [cat, setCat] = useState<Cat>("shirt");
  return (
    <Sheet title="Toko">
      <Chips cats={["shirt", "pants", "hair", "hat", "shoes", "car", "furn"]} value={cat} onPick={setCat} />
      <div className="grid grid-cols-3 gap-2">
        {ITEMS.filter((i) => i.cat === cat).map((i) => {
          const owned = isOwned(me, i), stackable = i.cat === "furn";
          return (
            <div key={i.id} className="flex flex-col items-center gap-2 rounded-card border-2 border-ink bg-paper p-2 text-center shadow-brutal">
              <Icon item={i} size={40} />
              <span className="text-sm font-bold leading-tight">
                {i.name}{stackable && count(me, i.id) > 0 ? ` ×${count(me, i.id)}` : ""}
              </span>
              <button
                onClick={() => buy(i.id)}
                disabled={owned && !stackable}
                className={`btn w-full px-1 text-sm ${owned && !stackable ? "" : i.price === 0 ? "btn-accent" : "btn-primary"}`}
              >
                {owned && !stackable ? "Dimiliki" : i.price === 0 ? "Gratis" : `🪙 ${i.price}`}
              </button>
            </div>
          );
        })}
      </div>
    </Sheet>
  );
}

function Build() {
  const { me, selFurn, setSelFurn, open } = useGame();
  const owned = ITEMS.filter((i) => i.cat === "furn" && count(me, i.id) > 0);
  return (
    <Sheet title="Tata Rumah">
      {owned.length === 0 ? (
        <div className="rounded-card border-2 border-ink bg-paper p-4 text-center shadow-brutal">
          <p className="mb-3 text-sm text-ink/70">Belum ada furnitur.</p>
          <button onClick={() => open("shop")} className="btn btn-accent">Ke Toko</button>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {owned.map((i) => {
              const left = count(me, i.id) - me.placed.filter((p) => p.itemId === i.id).length;
              return (
                <button
                  key={i.id}
                  onClick={() => setSelFurn(i.id)}
                  aria-pressed={selFurn === i.id}
                  className={`flex min-h-11 items-center gap-1 rounded-chip border-2 border-ink px-3 text-sm font-bold ${selFurn === i.id ? "bg-ink text-paper" : "bg-paper"}`}
                >
                  <span aria-hidden>{FURN_ICON[i.furn!]}</span> {i.name} ({left})
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-ink/70">Ketuk lantai untuk menaruh, ketuk furnitur untuk menyimpan kembali.</p>
        </>
      )}
    </Sheet>
  );
}

function Topup() {
  const { topup, notify } = useGame();
  const [busy, setBusy] = useState<string | null>(null);
  const ch = channel();
  return (
    <Sheet title="Isi Koin">
      <p className="mb-3 text-sm text-ink/70">
        Pembayaran via {ch === "iap" ? "Google Play / App Store (IAP)" : "Xendit / Midtrans"}.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {PACKS.map((p) => (
          <button
            key={p.id}
            disabled={!!busy}
            onClick={async () => {
              setBusy(p.id);
              const r = await pay(p);
              setBusy(null);
              if (r.ok) { topup(p.coins); notify(`+${p.coins} koin`); } else notify("Pembayaran gagal", "err");
            }}
            className="rounded-card border-2 border-ink bg-paper p-3 text-left shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:shadow-none"
          >
            <div className="text-lg font-bold">🪙 {p.coins}</div>
            {p.bonus && (
              <div className="mt-1 inline-block rounded-chip bg-green px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink">
                {p.bonus}
              </div>
            )}
            <div className="mt-1 text-sm font-bold">{busy === p.id ? "Memproses…" : rupiah(p.price)}</div>
          </button>
        ))}
      </div>
    </Sheet>
  );
}

function Profile() {
  const { me, rename, visit } = useGame();
  const [name, setName] = useState(me.name);
  const [id, setId] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  return (
    <Sheet title="Profil">
      <div className="mb-3 flex justify-center rounded-card border-2 border-ink bg-sky p-2 text-ink">
        <AvatarSvg equipped={me.equipped} className="h-24 w-auto" />
      </div>
      <Label>Nama</Label>
      <input value={name} onChange={(e) => setName(e.target.value)} onBlur={() => rename(name)} className="input mb-3" maxLength={16} />
      <Label>Visit ID kamu</Label>
      <div className="mb-3 flex items-center gap-2">
        <b className="font-mono text-lg">@{me.id}</b>
        <button onClick={() => navigator.clipboard?.writeText(me.id)} className="btn btn-accent text-sm">Salin</button>
      </div>
      <Label>Kunjungi pemain lain</Label>
      <p className="mb-2 text-sm text-ink/70">Coba ID 1001 atau 1002.</p>
      <div className="flex gap-2">
        <input
          value={id}
          onChange={(e) => { setId(e.target.value); setErr(false); }}
          placeholder="Visit ID"
          className={`input flex-1 ${err ? "border-danger" : ""}`}
        />
        <button disabled={busy} onClick={async () => { setBusy(true); setErr(!(await visit(id.trim()))); setBusy(false); }} className="btn btn-primary">
          {busy ? "…" : "Visit"}
        </button>
      </div>
      {err && <p className="mt-2 text-sm font-bold text-danger">ID tidak ditemukan</p>}
    </Sheet>
  );
}

export default function Sheets() {
  const { sheet, visiting } = useGame();
  if (visiting || !sheet) return null;
  return { wardrobe: <Wardrobe />, shop: <Shop />, build: <Build />, topup: <Topup />, profile: <Profile /> }[sheet];
}
