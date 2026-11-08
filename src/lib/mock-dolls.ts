export type Rarity = "Umum" | "Langka" | "Limited";
export type Accent = "yellow" | "pink" | "green";

export type Doll = {
  id: string;
  name: string;
  series: string;
  rarity: Rarity;
  price: number;
  accent: Accent;
};

// Data contoh (mock) untuk presentasi — belum dari server.
export const DOLLS: Doll[] = [
  { id: "series-1", name: "Wawan", series: "Seri 1", rarity: "Umum", price: 250000, accent: "yellow" },
  { id: "series-2", name: "Wowo", series: "Seri 1", rarity: "Umum", price: 250000, accent: "pink" },
  { id: "series-3", name: "Wawan — Langka", series: "Seri 2", rarity: "Langka", price: 400000, accent: "green" },
  { id: "series-4", name: "Wowo — Limited", series: "Seri 2", rarity: "Limited", price: 600000, accent: "yellow" },
];

export const rarityAccent: Record<Rarity, Accent> = {
  Umum: "green",
  Langka: "yellow",
  Limited: "pink",
};

export const formatPrice = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;
export const formatWonland = (n: number) => `${n.toLocaleString("id-ID")} Wonland`;
