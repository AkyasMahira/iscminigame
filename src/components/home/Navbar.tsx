import Link from "next/link";

const LINKS = ["Home", "Marketplace", "Tentang Kami", "Hubungi Kami"];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between rounded-card border-2 border-ink bg-paper px-3 py-2 shadow-brutal-lg">
      <span className="rounded-chip border-2 border-ink bg-yellow px-3 py-1 text-sm font-bold">
        ISC PROJECT
      </span>
      <ul className="hidden gap-8 text-[11px] font-bold uppercase tracking-wide md:flex">
        {LINKS.map((m, i) => (
          <li key={m} className={i === 0 ? "border-b-2 border-pink pb-1" : ""}>
            <a href="#">{m}</a>
          </li>
        ))}
      </ul>
      <Link
        href="/play"
        className="rounded-chip border-2 border-ink bg-blue px-4 py-1.5 text-[11px] font-bold uppercase text-paper shadow-brutal"
      >
        ◉ Masuk
      </Link>
    </nav>
  );
}
