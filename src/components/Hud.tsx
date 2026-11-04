"use client";
import { useGame, type Sheet } from "@/store/game";

const NAV: [Exclude<Sheet, null>, string][] = [
  ["wardrobe", "👕 Lemari"],
  ["shop", "🛒 Toko"],
  ["build", "🏠 Rumah"],
  ["profile", "👤 Profil"],
];

export default function Hud() {
  const { me, visiting, sheet, toast, open, leave } = useGame();
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 border-b-2 border-ink bg-paper pt-[env(safe-area-inset-top)]">
        <div className="flex items-center gap-2 p-3">
          {visiting ? (
            <>
              <span className="flex-1 truncate text-sm font-bold">
                Mengunjungi {visiting.name} <span className="font-mono text-ink/60">@{visiting.id}</span>
              </span>
              <button onClick={leave} className="btn btn-primary text-sm">Kembali</button>
            </>
          ) : (
            <>
              <button onClick={() => open("profile")} className="flex-1 truncate text-left text-sm font-bold">
                👤 {me.name} <span className="font-mono text-ink/60">@{me.id}</span>
              </button>
              <button onClick={() => open("topup")} aria-label="Isi Koin" className="btn btn-accent text-sm">
                🪙 {me.coins} +
              </button>
            </>
          )}
        </div>
      </header>

      {!visiting && (
        <nav className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-ink bg-paper pb-[env(safe-area-inset-bottom)]">
          <div className="flex h-16">
            {NAV.map(([k, l]) => {
              const active = sheet === k;
              return (
                <button
                  key={k}
                  onClick={() => open(active ? null : k)}
                  aria-pressed={active}
                  className={`flex-1 border-r-2 border-ink text-sm font-bold last:border-r-0 ${active ? "bg-yellow" : "bg-paper"}`}
                >
                  {l}
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {toast && (
        <div
          role="status"
          className={`fixed left-1/2 top-[calc(env(safe-area-inset-top)+4.25rem)] z-30 -translate-x-1/2 rounded-chip border-2 border-ink px-4 py-2 text-sm font-bold shadow-brutal ${toast.kind === "err" ? "bg-danger text-paper" : "bg-green text-ink"}`}
        >
          {toast.msg}
        </div>
      )}
    </>
  );
}
