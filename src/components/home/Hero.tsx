export default function Hero({ q, onQuery }: { q: string; onQuery: (v: string) => void }) {
  return (
    <section className="mt-16 text-center">
      <span className="rounded-full border-2 border-ink bg-pink px-3 py-1 text-[10px] font-bold uppercase">
        Profil Avatar
      </span>
      <h1 className="mt-5 text-6xl font-bold tracking-tight">Cari siapa?</h1>
      <p className="mt-4 text-sm text-ink/70">Temukan avatar, rumah, dan koleksi milik siapa saja.</p>

      <div className="mx-auto mt-8 flex max-w-[410px] overflow-hidden rounded-card border-2 border-ink bg-paper shadow-brutal">
        <span className="flex items-center border-r-2 border-ink bg-bg px-4 text-sm font-bold">@</span>
        <input
          value={q}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Ketik username..."
          className="min-w-0 flex-1 px-3 text-sm outline-none"
        />
        <button className="border-l-2 border-ink bg-blue px-5 py-3 text-[11px] font-bold text-paper">
          🔍 CARI
        </button>
      </div>
    </section>
  );
}
