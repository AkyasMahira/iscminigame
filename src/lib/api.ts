// Mock backend (localStorage). Nanti ganti isi fungsi ini dengan fetch ke API — signature tetap.
import type { Profile } from "./catalog";

const KEY = "iscminigame:v1";
const wait = (ms = 200) => new Promise((r) => setTimeout(r, ms));
const newId = () => String(Math.floor(100000 + Math.random() * 900000));

export const defaultProfile = (): Profile => ({
  id: newId(), name: "Pemain", coins: 300,
  inventory: { furn_0: 1 },
  equipped: { skin: "skin_1", hair: "hair_1", shirt: "shirt_0", pants: "pants_0", car: "car_0", hat: "hat_0", shoes: "shoes_0" },
  placed: [],
});

export async function loadMe(): Promise<Profile> {
  await wait();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Profile;
  } catch {}
  const p = defaultProfile();
  await saveMe(p);
  return p;
}

export async function saveMe(p: Profile): Promise<void> {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {}
}

const MOCK: Record<string, Profile> = {
  "1001": {
    id: "1001", name: "Rani", coins: 0, inventory: {},
    equipped: { skin: "skin_4", hair: "hair_2", shirt: "shirt_5", pants: "pants_4", car: "car_2", hat: "hat_2", shoes: "shoes_1" },
    placed: [
      { id: "a", itemId: "furn_1", x: 0, z: -1 }, { id: "b", itemId: "furn_2", x: 3, z: -3 },
      { id: "c", itemId: "furn_3", x: -3, z: 1 }, { id: "d", itemId: "furn_0", x: -1.5, z: -3 },
    ],
  },
  "1002": {
    id: "1002", name: "Budi", coins: 0, inventory: {},
    equipped: { skin: "skin_3", hair: "hair_0", shirt: "shirt_4", pants: "pants_2", car: "car_1", hat: "hat_1", shoes: "shoes_2" },
    placed: [{ id: "a", itemId: "furn_0", x: 0, z: -3 }, { id: "b", itemId: "furn_2", x: -3, z: -3 }],
  },
};

export async function getProfileById(id: string): Promise<Profile | null> {
  await wait(300);
  return MOCK[id] ?? null;
}
