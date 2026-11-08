"use client";

import { useState } from "react";
import { formatPrice, type Doll } from "@/lib/mock-dolls";

type Step = "form" | "payment" | "success";

const PAYMENTS = ["Transfer bank", "E-wallet", "QRIS"];

export default function BuyFlow({ doll, onClose }: { doll: Doll; onClose: () => void }) {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [payment, setPayment] = useState(PAYMENTS[0]);
  const [error, setError] = useState(false);

  const submitForm = () => {
    if (!name.trim() || !email.includes("@")) return setError(true);
    setError(false);
    setStep("payment");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Beli ${doll.name}`}
        className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-t-card border-2 border-ink bg-paper p-5 shadow-brutal-lg sm:rounded-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Beli {doll.name}</h2>
          <button onClick={onClose} aria-label="Tutup" className="btn h-11 w-11 p-0">✕</button>
        </div>

        {step === "form" && (
          <div className="mt-4">
            <label htmlFor="buy-name" className="text-xs font-bold uppercase tracking-wide">Nama</label>
            <input id="buy-name" value={name} onChange={(e) => setName(e.target.value)} className="input mt-1" />
            <label htmlFor="buy-email" className="mt-3 block text-xs font-bold uppercase tracking-wide">Email</label>
            <input id="buy-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input mt-1" />
            {error && <p className="mt-2 text-sm font-bold text-danger">Isi nama dan email yang benar.</p>}
            <div className="mt-5 flex gap-2">
              <button onClick={submitForm} className="btn btn-primary flex-1 text-sm">Lanjut</button>
              <button onClick={onClose} className="btn text-sm">Batal</button>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="mt-4">
            <p className="text-sm text-ink/70">{doll.name} — {formatPrice(doll.price)} <span className="text-xs">(contoh)</span></p>
            <fieldset className="mt-3 flex flex-col gap-2">
              <legend className="text-xs font-bold uppercase tracking-wide">Pilih pembayaran (mock)</legend>
              {PAYMENTS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPayment(p)}
                  aria-pressed={payment === p}
                  className={`btn justify-start text-sm ${payment === p ? "bg-yellow" : ""}`}
                >
                  {p}
                </button>
              ))}
            </fieldset>
            <div className="mt-5 flex gap-2">
              <button onClick={() => setStep("success")} className="btn btn-primary flex-1 text-sm">Bayar (mock)</button>
              <button onClick={() => setStep("form")} className="btn text-sm">Kembali</button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="mt-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-green text-xl font-bold">✓</div>
            <p className="mt-3 text-lg font-bold">Pesanan diterima (contoh)</p>
            <p className="mt-1 text-sm text-ink/70">
              Ini prototipe — tidak ada pembayaran sungguhan. Boneka fisik dikirim beserta kartu sertifikat berisi kode aktivasi.
            </p>
            <button onClick={onClose} className="btn btn-primary mt-5 w-full text-sm">Selesai</button>
          </div>
        )}
      </div>
    </div>
  );
}
