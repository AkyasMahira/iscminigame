import CharacterSvg from "./CharacterSvg";

export default function WorldStory() {
  return (
    <section id="cerita" className="scroll-mt-24 px-4 py-16">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="text-2xl font-bold sm:text-3xl">Dunia Wonland</h2>
        <p className="mt-3 max-w-2xl text-sm text-ink/70">
          Wawan dan Wowo, dua karakter dari Suroboyo, tinggal di Wonland — dunia digital tempat koleksimu hidup.
          Setiap boneka fisik punya kembaran digital yang bisa kamu kustomisasi.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-8">
          <div className="flex flex-col items-center rounded-card border-2 border-ink bg-paper p-4 shadow-brutal">
            <CharacterSvg id="wawan" className="h-40 w-auto" />
            <p className="mt-2 text-center text-sm text-ink/70">Si periang yang suka berpetualang.</p>
          </div>
          <div className="flex flex-col items-center rounded-card border-2 border-ink bg-paper p-4 shadow-brutal">
            <CharacterSvg id="wowo" className="h-40 w-auto" />
            <p className="mt-2 text-center text-sm text-ink/70">Sahabat setia yang penuh ide.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
