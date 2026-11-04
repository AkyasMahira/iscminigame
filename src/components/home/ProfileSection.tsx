import { FILTERS, PROFILES } from "./data";
import ProfileCard from "./ProfileCard";

export default function ProfileSection({
  q,
  filter,
  onFilter,
}: {
  q: string;
  filter: string;
  onFilter: (f: string) => void;
}) {
  const list = PROFILES.filter(([n, u]) =>
    (n + u).toLowerCase().includes(q.replace("@", "").toLowerCase())
  );

  return (
    <section className="mt-14">
      <h2 className="text-lg font-bold">Profil pilihan</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-chip border-2 border-ink px-3 py-1.5 text-[10px] font-bold ${
              filter === f ? "bg-ink text-paper" : "bg-paper"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {list.map(([name, user], i) => (
          <ProfileCard key={user} name={name} user={user} i={i} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="rounded-chip border-2 border-ink bg-paper px-4 py-2 text-[10px] font-bold shadow-brutal">
          Muat lebih banyak
        </button>
      </div>
    </section>
  );
}
