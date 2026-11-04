export type Cat = "skin" | "hair" | "shirt" | "pants" | "car" | "hat" | "shoes" | "furn";
export type Slot = Exclude<Cat, "furn">;
export type AvatarSlot = Exclude<Slot, "car">;
export type FurnType = "sofa" | "table" | "plant" | "lamp";
export type Item = {
  id: string; cat: Cat; name: string; price: number;
  color?: string; furn?: FurnType; glb?: string; scale?: number; // glb: "/models/xxx.glb"
};
export type Placed = { id: string; itemId: string; x: number; z: number };
export type Profile = {
  id: string; name: string; coins: number;
  inventory: Record<string, number>;
  equipped: Record<Slot, string>;
  placed: Placed[];
};

const colors = (cat: Cat, rows: [string, string, number][]): Item[] =>
  rows.map(([name, color, price], i) => ({ id: `${cat}_${i}`, cat, name, color, price }));

export const ITEMS: Item[] = [
  ...colors("skin", [["Terang", "#ffdbac", 0], ["Sawo muda", "#f1c27d", 0], ["Sawo", "#c68642", 0], ["Cokelat", "#8d5524", 0], ["Langsat", "#e0ac69", 0]]),
  ...colors("hair", [["Hitam", "#111111", 0], ["Cokelat", "#3b2f2f", 0], ["Merah", "#c0392b", 50], ["Pirang", "#f1c40f", 50], ["Abu", "#7f8c8d", 80]]),
  ...colors("shirt", [["Biru", "#4f8cff", 0], ["Putih", "#ffffff", 0], ["Merah", "#ff5a5f", 50], ["Hijau", "#2ecc71", 50], ["Kuning", "#f1c40f", 80], ["Ungu", "#9b59b6", 80], ["Oranye", "#e67e22", 120], ["Tosca", "#1abc9c", 120]]),
  ...colors("pants", [["Navy", "#2c3e50", 0], ["Hitam", "#111111", 0], ["Abu", "#7f8c8d", 40], ["Cokelat", "#8e6e53", 40], ["Biru tua", "#34495e", 60]]),
  ...colors("car", [["Merah", "#ff5a5f", 0], ["Biru", "#4f8cff", 200], ["Hijau", "#2ecc71", 200], ["Kuning", "#f1c40f", 250], ["Hitam", "#222222", 300], ["Putih", "#f5f5f5", 300]]),
  ...colors("hat", [["Hitam", "#111111", 0], ["Putih", "#ffffff", 0], ["Merah", "#ff5a5f", 40], ["Biru", "#4f8cff", 40], ["Kuning", "#f1c40f", 60]]),
  ...colors("shoes", [["Putih", "#ffffff", 0], ["Hitam", "#111111", 0], ["Merah", "#ff5a5f", 50], ["Tosca", "#1abc9c", 50], ["Ungu", "#9b59b6", 80]]),
  { id: "furn_0", cat: "furn", name: "Sofa", price: 150, furn: "sofa" },
  { id: "furn_1", cat: "furn", name: "Meja", price: 100, furn: "table" },
  { id: "furn_2", cat: "furn", name: "Tanaman", price: 50, furn: "plant" },
  { id: "furn_3", cat: "furn", name: "Lampu", price: 70, furn: "lamp" },
];

export const byId = (id: string) => ITEMS.find((i) => i.id === id);
export const count = (p: Profile, id: string) => p.inventory[id] ?? 0;
export const isOwned = (p: Profile, i: Item) => (i.cat === "furn" ? count(p, i.id) > 0 : i.price === 0 || count(p, i.id) > 0);
export const colorOf = (id: string, fb = "#cccccc") => byId(id)?.color ?? fb;

export const CAT_LABEL: Record<Cat, string> = {
  skin: "Kulit", hair: "Rambut", shirt: "Baju", pants: "Celana", car: "Mobil", hat: "Topi", shoes: "Sepatu", furn: "Furnitur",
};
export const FURN_ICON: Record<FurnType, string> = { sofa: "🛋️", table: "🍽️", plant: "🪴", lamp: "💡" };

// Validasi ringan profil dari storage: slot yang rusak dikembalikan ke default
export function defaultsFix(p: Profile): Profile {
  const def: Record<Slot, string> = { skin: "skin_1", hair: "hair_1", shirt: "shirt_0", pants: "pants_0", car: "car_0", hat: "hat_0", shoes: "shoes_0" };
  const equipped = { ...def, ...p.equipped };
  (Object.keys(def) as Slot[]).forEach((k) => { if (!byId(equipped[k])) equipped[k] = def[k]; });
  return { ...p, equipped, inventory: p.inventory ?? {}, placed: (p.placed ?? []).filter((x) => byId(x.itemId)) };
}
