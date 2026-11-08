const STEPS: [string, string, string][] = [
  ["1", "Beli boneka", "Pilih blind box favoritmu dan selesaikan pembayaran."],
  ["2", "Tap NFC + kode", "Dekatkan boneka ke ponsel, lalu masukkan kode aktivasi dari kartu sertifikat."],
  ["3", "Kustomisasi & koleksi", "Ganti baju, rumah, dan tema dunia bonekamu di Wonland."],
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="scroll-mt-24 px-4 py-16">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="text-2xl font-bold sm:text-3xl">Cara kerja</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {STEPS.map(([n, title, desc]) => (
            <div key={n} className="rounded-card border-2 border-ink bg-paper p-4 shadow-brutal">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-yellow text-sm font-bold">{n}</span>
              <h3 className="mt-3 text-base font-bold">{title}</h3>
              <p className="mt-1 text-sm text-ink/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
