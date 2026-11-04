import type { AvatarSlot } from "@/lib/catalog";

export const PROFILES: [string, string][] = [
  ["Alex Pratama", "alex_pratama"],
  ["Doni Saputra", "dev_doni"],
  ["Siti", "siti.works"],
  ["Kyoto", "kyoto_runner"],
  ["Budi Santoso", "budi_santoso"],
  ["Siti Rahma", "siti_rahma"],
  ["Rizky", "rizky_kreatif"],
  ["Eko Prasetyo", "eko_prasetyo"],
];

export const FILTERS = ["Terbaru", "Terpopuler", "Termahal", "Koleksi langka"];

export const equippedFor = (i: number): Record<AvatarSlot, string> => ({
  skin: `skin_${i % 5}`,
  hair: `hair_${i % 5}`,
  shirt: `shirt_${i % 8}`,
  pants: `pants_${i % 5}`,
  hat: `hat_${i % 5}`,
  shoes: `shoes_${i % 5}`,
});
