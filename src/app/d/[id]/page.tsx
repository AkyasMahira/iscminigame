"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import CharacterSvg from "@/components/marketing/CharacterSvg";
import BlindBoxSvg from "@/components/marketing/BlindBoxSvg";
import { formatWonland } from "@/lib/mock-dolls";

const DEMO_CODE = "DEMO-1234";
const MAX_ATTEMPTS = 3;
const VALUATION = formatWonland(1250);

function InvalidTag() {
  return (
    <main className="grid min-h-dvh place-items-center bg-bg p-6 text-ink">
      <div className="w-full max-w-sm rounded-card border-2 border-ink bg-paper p-6 text-center shadow-brutal-lg">
        <h1 className="text-lg font-bold">Tag tidak valid</h1>
        <p className="mt-2 text-sm text-ink/70">
          Kode tag tidak dikenali. Pastikan kamu memindai boneka asli, atau hubungi bantuan bila masalah berlanjut.
        </p>
        <Link href="/" className="btn btn-primary mt-5 w-full text-sm">Kembali ke beranda</Link>
      </div>
    </main>
  );
}

function DemoFlow() {
  const [phase, setPhase] = useState<"idle" | "reveal" | "code" | "claimed">("idle");
  const [code, setCode] = useState("");
  const [attempts, setAttempts] = useState(MAX_ATTEMPTS);
  const [wrong, setWrong] = useState(false);

  const submit = () => {
    if (code === DEMO_CODE) {
      setWrong(false);
      setPhase("claimed");
    } else {
      setWrong(true);
      setAttempts((a) => a - 1);
    }
  };

  return (
    <main className="relative min-h-dvh bg-bg px-4 py-8 text-ink">
      {phase === "claimed" && (
        <div className="absolute left-4 top-4 rounded-card border-2 border-ink bg-yellow p-3 shadow-brutal">
          <p className="text-xs font-bold uppercase tracking-wide">Valuasi</p>
          <p className="font-mono text-2xl font-bold">{VALUATION}</p>
          <p className="text-[11px] text-ink/70">berdasarkan harga pasar koleksi (contoh)</p>
        </div>
      )}

      <div className="mx-auto max-w-md pt-10 text-center">
        {phase === "idle" && (
          <>
            <BlindBoxSvg className="mx-auto h-40 w-auto" />
            <h1 className="mt-4 text-xl font-bold">Kotak bonekamu masih tertutup</h1>
            <p className="mt-2 text-sm text-ink/70">Simulasikan tap NFC untuk mulai klaim.</p>
            <button onClick={() => setPhase("reveal")} className="btn btn-primary mt-5 w-full text-sm">Simulasikan tap</button>
          </>
        )}

        {phase === "reveal" && (
          <>
            <div className="animate-shake mx-auto w-fit">
              <BlindBoxSvg className="h-40 w-auto" />
            </div>
            <h1 className="mt-4 text-xl font-bold">Tag terbaca</h1>
            <p className="mt-2 text-sm text-ink/70">Buka kotak untuk melihat isinya.</p>
            <button onClick={() => setPhase("code")} className="btn btn-primary mt-5 w-full text-sm">Buka kotak</button>
          </>
        )}

        {phase === "code" && (
          <>
            <div className="animate-pop">
              <CharacterSvg id="wawan" showName={false} className="mx-auto h-40 w-auto" />
            </div>
            <h1 className="mt-4 text-xl font-bold">Ini Wawan!</h1>
            <p className="mt-2 text-sm text-ink/70">
              Masukkan kode aktivasi dari kartu sertifikat. Kode demo: <span className="font-mono font-bold">DEMO-1234</span>
            </p>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\s/g, "").toUpperCase())}
              placeholder="XXXX-0000"
              aria-label="Kode aktivasi"
              className="input mt-4 font-mono uppercase"
              maxLength={20}
            />
            {wrong && (
              <p className="mt-2 text-sm font-bold text-danger">
                {attempts > 0 ? `Kode salah. Sisa percobaan: ${attempts}.` : "Terlalu banyak percobaan (contoh rate limit)."}
              </p>
            )}
            <button onClick={submit} disabled={attempts <= 0} className="btn btn-primary mt-4 w-full text-sm">Klaim</button>
          </>
        )}

        {phase === "claimed" && (
          <div className="animate-pop pt-8">
            <span className="inline-block rounded-chip border-2 border-ink bg-green px-3 py-1 text-xs font-bold uppercase tracking-wide">Asli</span>
            <CharacterSvg id="wawan" className="mx-auto mt-6 h-48 w-auto" />
            <h1 className="mt-4 text-xl font-bold">Wawan sudah jadi milikmu</h1>
            <p className="mt-2 text-sm text-ink/70">Sekarang kamu bisa kustomisasi boneka di dunia Wonland.</p>
            <Link href="/" className="btn mt-6 w-full text-sm">Selesai</Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default function TapPage() {
  const { id } = useParams<{ id: string }>();
  return id === "demo" ? <DemoFlow /> : <InvalidTag />;
}
