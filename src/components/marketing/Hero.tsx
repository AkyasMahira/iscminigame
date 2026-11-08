import { assets } from "@/lib/assets";
import HeroBackground from "./HeroBackground";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-16 text-center">
      {assets.heroVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={assets.heroPoster}
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
      ) : (
        <HeroBackground />
      )}
      <div className="relative mx-auto max-w-2xl rounded-card border-2 border-ink bg-paper p-6 shadow-brutal-lg sm:p-8">
        <span className="inline-block rounded-full border-2 border-ink bg-pink px-3 py-1 text-xs font-bold uppercase tracking-wide">
          Dunia Wonland
        </span>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Kenalan dengan Wawan &amp; Wowo</h1>
        <p className="mt-3 text-sm text-ink/70">
          Koleksi boneka Suroboyo dengan dunia digital Wonland. Temukan karaktermu, klaim lewat NFC, dan bangun koleksimu.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="#find-yours" className="btn btn-primary text-sm">Find yours</a>
          <a href="#cerita" className="btn text-sm">Lihat cerita</a>
        </div>
        <p className="mt-4 text-xs text-ink/60">Semua angka dan harga di situs ini adalah contoh (mock).</p>
      </div>
    </section>
  );
}
