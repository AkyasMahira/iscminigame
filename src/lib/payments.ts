// Web -> Payment Gateway (Midtrans).
export type Pack = { id: string; coins: number; price: number; bonus?: string };
export const PACKS: Pack[] = [
  { id: "p1", coins: 100, price: 15000 },
  { id: "p2", coins: 550, price: 75000, bonus: "+50 bonus" },
  { id: "p3", coins: 1200, price: 150000, bonus: "+200 bonus" },
  { id: "p4", coins: 2600, price: 300000, bonus: "+600 bonus" },
];

export const rupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");

// MOCK. Real: gateway -> buat invoice/Snap token di backend lalu redirect.
export async function pay(_pack: Pack): Promise<{ ok: boolean; ref: string }> {
  await new Promise((r) => setTimeout(r, 900));
  return { ok: true, ref: "mock-" + Date.now() };
}
