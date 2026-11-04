<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# iscminigame — Project Context

Platform **web-only** (tanpa app Android/iOS) untuk boneka fisik blind box + dunia digital. Karakter: **Rara, Wowon, Buaya, Hiu**, masing-masing punya *land* sendiri. Boneka dijual dengan sertifikat; tag **NFC** di boneka dipakai untuk klaim, login, dan flexing akun boneka ke user lain. Setelah klaim, user meng-upgrade lewat web (baju, rumah, dll), dibeli dengan Koin/gateway.

**Status: pivot dari FE-only ke full-stack.** FE v1 (landing, game 3D, toko/lemari/rumah, avatar SVG) sudah ada dengan data mock/localStorage. Backend, auth, dan NFC **belum ada**. Migrasi konteks (hapus `output: "export"` & Capacitor) **selesai**; berikutnya backend dasar.

## Stack

Versi persis — jangan asumsikan dari training.

Sudah terpasang:
- Next.js `16.4.2` (App Router, `src/`, alias `@/*`) + React `19.3`
- Tailwind **v4** via `@tailwindcss/turbopack` (`@import "tailwindcss"` di `globals.css`, tema lewat `@theme`)
- R3F `9` (`@react-three/fiber`) + drei `10` + `three 0.186`
- Zustand `5` — state di `src/store/game.ts`

Target (belum terpasang, tambahkan saat fasenya tiba, sebutkan alasan):
- Next.js full-stack: Route Handlers / Server Actions untuk API
- PostgreSQL + Drizzle ORM
- Auth: Better Auth (Google + email OTP) + `@simplewebauthn` (passkey)
- Verifikasi NFC SUN: `aes-cmac` di server
- Pembayaran: Midtrans atau Xendit (webhook ke Route Handler)
- Aset 3D: Cloudflare R2 + CDN

Capacitor dihapus dari rencana (web-only).

## Commands

```bash
npm run dev        # http://localhost:3000
npm run lint       # eslint (flat config: next core-web-vitals + typescript)
npx tsc --noEmit   # type-check (TIDAK ada script "typecheck")
npm run build      # build produksi
```

**Tidak ada test runner / test suite di repo ini.** Verifikasi = lint + tsc + build. Jangan tulis/andaikan framework test.

## Struktur

```
src/app/page.tsx         # landing: Navbar + Hero + ProfileSection
src/app/play/page.tsx    # /play: dynamic import Game (ssr:false)
src/app/profile/page.tsx # /profile?u=<username> (client, useSearchParams)
src/components/
  Game.tsx               # root game: init store, Scene + Hud + Sheets
  Scene.tsx              # Canvas R3F, lighting, OrbitControls
  Avatar.tsx             # avatar primitif + jalan ke target (useFrame)
  Vehicle.tsx            # mobil primitif (atau GLB)
  House.tsx              # lantai 8x8, grid snap 0.5, placement/hapus furnitur
  Furniture.tsx          # furnitur primitif (atau GLB)
  Model.tsx              # loader GLB + ErrorBoundary + fallback primitif
  Hud.tsx                # top bar, bottom nav, toast
  Sheets.tsx             # panel: Lemari, Toko, Tata Rumah, Top-up, Profil/Visit
  home/                  # Navbar, Hero, ProfileCard, ProfileSection, data.ts (mock)
  avatar/AvatarSvg.tsx   # avatar 2D (layer SVG per slot dari Profile.equipped)
src/lib/
  catalog.ts             # tipe + katalog + helper (byId, count, isOwned, colorOf, defaultsFix)
  api.ts                 # MOCK backend (localStorage "iscminigame:v1", mock player 1001/1002)
  payments.ts            # MOCK bayar
src/store/game.ts        # Zustand: useGame + useProfile()
```

Struktur backend yang direncanakan (belum ada): `src/server/` (db, schema, auth, nfc), `src/app/api/` (`tap`, `claim`, `transfer`, webhook pembayaran), `src/app/d/[id]` (halaman publik boneka), `src/app/admin/`.

## Data & store

- `Item`: `{ id, cat, name, price, color?, furn?, glb?, scale? }`; `cat`: skin | hair | shirt | pants | car | hat | shoes | furn. `Profile`: `{ id, name, coins, inventory, equipped, placed }`. Warna = item terpisah per warna (id unik), `equipped` tetap `Record<Slot, itemId>`.
- Non-furnitur dengan `price === 0` otomatis dimiliki. Furnitur butuh `inventory[id] > 0`, bisa dibeli berkali-kali (batas penempatan = jumlah dimiliki).
- `useProfile()` = `visiting ?? me` — komponen scene otomatis menampilkan profil yang sedang dikunjungi.
- `defaultsFix()` memperbaiki profil rusak dari storage; panggil saat load.

## Domain boneka & NFC (desain target)

**Entitas:** `users` (role), `dolls(uid, character, rarity, owner_id, counter, locked, claimed_at)`, `activation_codes(doll_uid, code_hash, used_at)`, `lands(character)`, `items`, `inventories`.

**Tag:** NTAG 424 DNA dengan SUN. URL tiap tap berisi UID + counter + CMAC (`/t?u=…&c=…&m=…`). Server wajib memverifikasi CMAC dan memastikan counter naik; counter mundur/duplikat = tolak + catat sebagai indikasi clone.

**Klaim pertama:** tap valid + **kode aktivasi** (kode gosok di kartu sertifikat; simpan hash, sekali pakai, rate limit). Karakter blind box tetap rahasia sampai klaim (animasi reveal).

**Satu URL `/d/<id>` untuk semua kondisi:**
| Kondisi | Hasil |
|---|---|
| Belum diklaim | halaman klaim (minta kode aktivasi) |
| Sesi login = `owner_id` | mode owner: upgrade, beli, kelola |
| Login sebagai user lain | halaman publik + badge "Asli", follow/visit |
| Tidak login | halaman publik (flexing) + tombol Masuk |
| Boneka `locked` | pesan "dilaporkan hilang" |

**Prinsip:** tap = bukti boneka asli & ada di dekat user, **bukan** kunci login tunggal. Login normal via Google/passkey; perangkat baru = tap + OTP email; aksi sensitif (transfer, hapus, beli besar) wajib re-auth. Pemilik dibedakan lewat sesi akun vs `owner_id`, bukan lewat tap. Akun per **user**, boneka adalah item yang terikat ke akun.

**Fitur wajib:** kunci boneka (hilang/dicuri), transfer kepemilikan via kode sekali pakai, halaman publik tanpa data pribadi.

**Platform:** Web NFC API hanya Chrome Android dan tidak ada di iOS — jangan diandalkan. Desain: tap membuka URL di browser (Android & iPhone XS+ native).

## Role

- Role akun (kolom `role`): `guest` (belum login), `user`, `support` (kunci/buka kunci boneka, bantu transfer, lihat log tap), `ops` (batch produksi, petakan UID→karakter, cetak kode aktivasi), `admin` (semua + katalog, harga, role, laporan). Tahap awal boleh digabung jadi `user` + `admin`.
- Relasi per boneka: `owner` (`dolls.owner_id`) vs `visitor`. Owner **bukan** role akun.
- `/admin` dijaga middleware cek role di **server** (bukan hanya sembunyikan tombol). `ops`/`admin` wajib passkey/2FA; semua aksi masuk audit log.

## Aturan penting (jangan dilanggar)

1. **Pertahankan signature `lib/api.ts` & `lib/payments.ts`.** Backend mengganti isi (fetch), bukan antarmuka.
2. **Server-authoritative.** Verifikasi NFC, klaim, transfer, koin, inventori, dan pembayaran divalidasi di server. Jangan percaya client. Selama backend belum ada, koin/inventori client-side bisa dicurangi (sementara).
3. **Rahasia hanya di server:** kunci AES tag NFC, secret webhook, dan hash kode aktivasi tidak boleh masuk bundle client atau repo (pakai env).
4. **Client-only untuk 3D:** game di-load via `dynamic(..., { ssr:false })`. Jangan akses `window`/`localStorage` di luar client component.
5. **Pembayaran web-only** via gateway (Midtrans/Xendit); tidak ada IAP.
6. **Migrasi:** `output: "export"` dan Capacitor dihapus pada langkah migrasi; setelah itu API routes dan Server Actions boleh dipakai. Sebelum langkah itu selesai, jangan menambah API routes.
7. UI Tailwind, mobile-first (`h-dvh`, viewport sempit). Ikuti **`Design.md`** (neo-brutalist: border tebal, shadow keras, tanpa gradient/blur) sebelum mengerjakan UI.
8. Performa mobile: `dpr` max 1.5, shadow map 1024. Ukur FPS sebelum menambah light/shadow.

## Gotchas

- GLB ditaruh di `public/models/` (**folder belum ada**) dan diisi field `glb` pada item. `Model.tsx` **fallback otomatis ke primitif** kalau file hilang/gagal load — bukan error, jadi mudah salah sangka model terpasang.
- `public/` saat ini hanya aset scaffold create-next-app; belum ada model 3D.
- Konsep lama "Visit ID" dan avatar generik akan diarahkan ke boneka + land per karakter.

## Roadmap (ringkas)

1. **Migrasi konteks:** hapus `output: "export"` dan Capacitor, perbarui dokumen, buat branch `pivot-nfc`.
2. **Backend dasar:** PostgreSQL + Drizzle, skema `users`, `dolls`, `activation_codes`, `items`, `inventories`.
3. **Auth:** Google + email OTP + passkey, role.
4. **NFC:** `/api/tap` (verifikasi SUN), `/api/claim` (+ kode aktivasi), `/d/<id>` publik/owner, kunci & transfer.
5. **Kustomisasi avatar** (Lemari, `AvatarSvg`) dan **land per karakter**.
6. **Pembayaran:** gateway + webhook, Koin server-authoritative.
7. **Fase 0 spike 3D** (paralel): GLB avatar/mobil/furnitur, ukur FPS + waktu load di Android kelas menengah, kompres aset (<~500 KB), catat di `docs/spike-3d.md`. Lalu avatar modular part-swap GLB.

## Konvensi kerja

- Perubahan kecil dan terfokus; jalankan `npx tsc --noEmit` (dan `npm run lint`) sebelum selesai.
- Jangan menambah dependency tanpa alasan jelas; sebutkan alasannya.
- Jelaskan singkat apa yang diubah dan kenapa.