import { create } from "zustand";
import * as api from "@/lib/api";
import { ITEMS, byId, count, defaultsFix, isOwned, type Profile, type Slot } from "@/lib/catalog";

export type Sheet = null | "wardrobe" | "shop" | "build" | "topup" | "profile";

export type Toast = { msg: string; kind: "ok" | "err" };

type S = {
  ready: boolean; me: Profile; visiting: Profile | null; sheet: Sheet; toast: Toast | null;
  target: [number, number]; selFurn: string | null;
  init: () => Promise<void>;
  open: (s: Sheet) => void;
  notify: (m: string, kind?: Toast["kind"]) => void;
  equip: (id: string) => void;
  buy: (id: string) => void;
  topup: (coins: number) => void;
  place: (x: number, z: number) => void;
  removePlaced: (id: string) => void;
  setSelFurn: (id: string) => void;
  rename: (n: string) => void;
  visit: (id: string) => Promise<boolean>;
  leave: () => void;
  walkTo: (x: number, z: number) => void;
};

let t: ReturnType<typeof setTimeout>;
const rid = () => Math.random().toString(36).slice(2, 9);

export const useGame = create<S>((set, get) => {
  const commit = (me: Profile) => { set({ me }); api.saveMe(me); };
  return {
    ready: false, me: api.defaultProfile(), visiting: null, sheet: null, toast: null,
    target: [0, 2], selFurn: null,

    init: async () => set({ me: defaultsFix(await api.loadMe()), ready: true }),

    open: (sheet) => {
      const { me, selFurn } = get();
      let sel = selFurn;
      if (sheet === "build" && !sel) sel = ITEMS.find((i) => i.cat === "furn" && count(me, i.id) > 0)?.id ?? null;
      set({ sheet, selFurn: sel });
    },

    notify: (msg, kind = "ok") => { set({ toast: { msg, kind } }); clearTimeout(t); t = setTimeout(() => set({ toast: null }), 2400); },

    equip: (id) => {
      const { me } = get(); const it = byId(id);
      if (!it || it.cat === "furn" || !isOwned(me, it)) return;
      commit({ ...me, equipped: { ...me.equipped, [it.cat as Slot]: id } });
    },

    buy: (id) => {
      const { me, notify } = get(); const it = byId(id);
      if (!it) return;
      if (it.cat !== "furn" && isOwned(me, it)) return notify("Sudah dimiliki", "err");
      if (me.coins < it.price) { notify("Koin kurang", "err"); set({ sheet: "topup" }); return; }
      commit({ ...me, coins: me.coins - it.price, inventory: { ...me.inventory, [id]: count(me, id) + 1 } });
      notify(`${it.name} dibeli`);
    },

    topup: (coins) => { const { me } = get(); commit({ ...me, coins: me.coins + coins }); },

    place: (x, z) => {
      const { me, selFurn, notify } = get();
      if (!selFurn) return notify("Pilih furnitur dulu", "err");
      if (me.placed.filter((p) => p.itemId === selFurn).length >= count(me, selFurn)) return notify("Stok habis, beli di Toko", "err");
      if (me.placed.some((p) => p.x === x && p.z === z)) return;
      commit({ ...me, placed: [...me.placed, { id: rid(), itemId: selFurn, x, z }] });
    },

    removePlaced: (id) => { const { me } = get(); commit({ ...me, placed: me.placed.filter((p) => p.id !== id) }); },
    setSelFurn: (selFurn) => set({ selFurn }),
    rename: (name) => { const { me } = get(); const n = name.trim().slice(0, 16); if (n) commit({ ...me, name: n }); },

    visit: async (id) => {
      const p = await api.getProfileById(id);
      if (!p) return false;
      set({ visiting: p, sheet: null });
      return true;
    },
    leave: () => set({ visiting: null }),
    walkTo: (x, z) => set({ target: [x, z] }),
  };
});

export const useProfile = () => useGame((s) => s.visiting ?? s.me);
