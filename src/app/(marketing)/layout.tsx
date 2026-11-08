import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wonland — Wawan & Wowo",
  description:
    "Koleksi boneka Wawan & Wowo dari Suroboyo dengan dunia digital Wonland. Temukan karakter, klaim lewat NFC, dan bangun koleksimu.",
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
