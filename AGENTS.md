<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# iscminigame — Project Context

Platform **web-only** (tanpa app Android/iOS) untuk boneka koleksi fisik ala Labubu + dunia digital **Wonland** (bergaya Zootopia). Karakter: **Wawan** dan **Wowo** (karakter Suroboyo). Boneka dijual fisik sebagai blind box dengan sertifikat e-digital; chip **NFC** di dalam boneka dipakai untuk klaim, login, dan cek/flexing value. Setelah klaim, user mengkustomisasi boneka **3D** (baju, aksesori, rumah, background) dan berbelanja item di web. Ini **koleksi, bukan investasi** — lihat aturan hukum di bawah.

Cerita dunia dikelola lewat IG (tanpa manusia), TikTok untuk promosi. Keduanya konteks saja; web hanya menautkan ikonnya.

**Status: pivot dari FE-only ke full-stack.** FE v1 (landing, game 3D, toko/lemari/rumah, avatar SVG) sudah ada dengan data mock/localStorage. Backend, auth, dan NFC **belum ada**. Migrasi konteks (hapus `output: "export"` & Capacitor) **selesai**; route groups & backend menyusul.

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
- Auth: Better Auth (Google + email magic link/OTP) + `@simplewebauthn` (passkey)
- Verifikasi NFC SUN: `aes-cmac` di server
- Pembayaran: Midtrans (webhook ke Route Handler)
- Aset 3D + media: Cloudflare R2 + CDN

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

Kondisi saat ini:
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

Struktur target (satu repo, satu app; belum ada): pakai route groups.
```
src/app/
  (marketing)/   # landing, find-yours, beli, tentang, kontak — statis/ringan
  (app)/         # core, butuh sesi: boneka, closet/fashion, garasi, office, family, wallet
  d/[id]/        # halaman tap NFC (belum diklaim / owner / publik)
  admin/         # staf
  api/           # tap, claim, transfer, webhook Midtrans
src/server/      # db, schema, auth, nfc, ledger
```
Aturan: R3F, three, dan Zustand game hanya dimuat di `(app)` dan `d/[id]` lewat dynamic import; `(marketing)` dijaga ringan dan statis. Satu domain agar cookie sesi terbaca di `d/[id]`.

## Data & store

- `Item`: `{ id, cat, name, price, color?, furn?, glb?, scale? }`; `cat`: skin | hair | shirt | pants | car | hat | shoes | furn. `Profile`: `{ id, name, coins, inventory, equipped, placed }`. Warna = item terpisah per warna (id unik), `equipped` tetap `Record<Slot, itemId>`.
- Non-furnitur dengan `price === 0` otomatis dimiliki. Furnitur butuh `inventory[id] > 0`, bisa dibeli berkali-kali (batas penempatan = jumlah dimiliki).
- `useProfile()` = `visiting ?? me` — komponen scene otomatis menampilkan profil yang sedang dikunjungi.
- `defaultsFix()` memperbaiki profil rusak dari storage; panggil saat load.
- Target: `Profile.coins` menjadi saldo **Wonland** dari server; item dan inventori juga dari server.

## Produk & alur

- **Beli boneka** (Midtrans): pilih/cari boneka ("Find yours"), isi data diri, pilih pembayaran, email konfirmasi terkirim. Boneka fisik dikirim dengan kartu sertifikat berisi kode aktivasi.
- **Home:** bisa di-scroll, background video (muted, loop, `playsInline`, poster fallback, dikompres), ikon IG dan TikTok.
- **Akun hanya untuk pemilik boneka:** buat akun = tap NFC valid + kode aktivasi + email. Login selanjutnya via email magic link (tanpa password).
- **Halaman boneka (setelah login):** valuasi boneka di pojok (mis. nilai dalam Wonland/rupiah), boneka **3D di tengah** yang bisa diputar, background bisa diganti, dan 5 tools: **Garasi** (barang dimiliki), **Fashion** (beli baju di web, kustomisasi ala Snapchat), **Office** (aktivitas ekonomi dalam game), **Family**, **Wallet** (top-up Wonland).
- **Dunia Wonland:** berita/event memunculkan item limited (mis. rumah baru), ada leaderboard "paling kaya" (dalam Wonland).
- **Marketplace item** antar user, memakai Wonland. Item yang tidak lagi dijual resmi boleh diperjualbelikan.
- **Cek value tanpa login:** tap NFC atau input ID boneka menampilkan value publik.

## Domain boneka & NFC (desain target)

**Entitas:** `users` (role), `dolls(uid, character, rarity, owner_id, counter, locked, claimed_at)`, `activation_codes(doll_uid, code_hash, used_at)`, `lands`, `items`, `inventories`, `wallets`, `wonland_ledger` (append-only), `item_listings`, `news_events`, `leaderboard`.

**Tag:** NTAG 424 DNA dengan SUN. URL tiap tap berisi UID + counter + CMAC (`/t?u=…&c=…&m=…`). Server wajib memverifikasi CMAC dan memastikan counter naik; counter mundur/duplikat = tolak + catat sebagai indikasi clone. Value disimpan di **server**, bukan di chip.

**Klaim pertama:** tap valid + **kode aktivasi** (dari e-sertifikat/kartu; simpan hash, sekali pakai, rate limit). Karakter blind box tetap rahasia sampai klaim (animasi reveal).

**Satu URL `/d/<id>` untuk semua kondisi:**
| Kondisi | Hasil |
|---|---|
| Belum diklaim | halaman klaim (minta kode aktivasi) |
| Sesi login = `owner_id` | mode owner: kustomisasi, beli, kelola |
| Login sebagai user lain | halaman publik + badge "Asli", value, follow/visit |
| Tidak login | halaman publik (flexing/cek value) + pilihan Masuk |
| Boneka `locked` | pesan "dilaporkan hilang" |

**Prinsip:** tap = bukti boneka asli & ada di dekat user, **bukan** kunci login tunggal. Pemilik dibedakan lewat sesi akun vs `owner_id`, bukan lewat tap. Perangkat baru = tap + magic link/OTP; aksi sensitif (transfer, hapus, pembelian besar) wajib re-auth. Akun per **user**, boneka adalah item yang terikat ke akun.

**Fitur wajib:** kunci boneka (hilang/dicuri), transfer kepemilikan via kode sekali pakai, halaman publik tanpa data pribadi.

**Platform:** Web NFC API hanya Chrome Android dan tidak ada di iOS — jangan diandalkan. Desain: tap membuka URL di browser (Android & iPhone XS+ native).

## Role

- Role akun (kolom `role`): `guest`, `user`, `support` (kunci/buka kunci boneka, bantu transfer, lihat log tap), `ops` (batch produksi, petakan UID→karakter, cetak kode aktivasi), `admin` (semua + katalog, harga, role, laporan). Tahap awal boleh digabung jadi `user` + `admin`.
- Relasi per boneka: `owner` (`dolls.owner_id`) vs `visitor`. Owner **bukan** role akun.
- `/admin` dijaga middleware cek role di **server** (bukan hanya sembunyikan tombol). `ops`/`admin` wajib passkey/2FA; semua aksi masuk audit log.

## Aturan penting (jangan dilanggar)

1. **Pertahankan signature `lib/api.ts` & `lib/payments.ts`.** Backend mengganti isi (fetch), bukan antarmuka.
2. **Server-authoritative.** Verifikasi NFC, klaim, transfer, saldo Wonland, inventori, dan pembayaran divalidasi di server. Jangan percaya client. Selama backend belum ada, koin/inventori client-side bisa dicurangi (sementara).
3. **Rahasia hanya di server:** kunci AES tag NFC, secret webhook, dan hash kode aktivasi tidak boleh masuk bundle client atau repo (pakai env).
4. **Hukum/kepatuhan (wajib):**
   - Wonland **satu arah**: uang → Wonland. **Dilarang membuat fitur withdraw/tarik tunai** atau konversi Wonland ke rupiah.
   - **Dilarang memakai kata "investasi"**, "profit", "return", atau menjanjikan kenaikan value di UI, copy, maupun komentar. Value = harga pasar koleksi dari transaksi antar user, bukan janji sistem.
   - Mekanik "saham", "menikah", dan "office" hanya hadiah dalam Wonland, tanpa payout uang nyata.
   - Marketplace item hanya dengan Wonland. Payout rupiah ditahan sampai ada review hukum.
5. **Mutasi Wonland** hanya lewat server dan wajib tercatat di `wonland_ledger` (append-only, atomik dalam transaksi DB).
6. **Client-only untuk 3D:** `dynamic(..., { ssr:false })`. Jangan akses `window`/`localStorage` di luar client component.
7. **Pembayaran web-only** via Midtrans; tidak ada IAP.
8. **Migrasi (selesai):** `output: "export"` & Capacitor sudah dihapus — API routes dan Server Actions boleh dipakai sekarang.
9. UI Tailwind, mobile-first (`h-dvh`, viewport sempit). Ikuti **`Design.md`** (neo-brutalist: border tebal, shadow keras, tanpa gradient/blur) sebelum mengerjakan UI.
10. **Performa 3D di mobile web:** `dpr` max 1.5, shadow map 1024, GLB kecil (<~500 KB per model), fallback primitif. Ukur FPS sebelum menambah light/shadow. Halaman boneka adalah layar utama, jadi 3D harus tetap lancar di HP kelas menengah.

## Gotchas

- GLB ditaruh di `public/models/` (**folder belum ada**) dan diisi field `glb` pada item. `Model.tsx` **fallback otomatis ke primitif** kalau file hilang/gagal load — bukan error, jadi mudah salah sangka model terpasang.
- `public/` saat ini hanya aset scaffold create-next-app; belum ada model 3D Wawan/Wowo.
- Konsep lama "Visit ID" dan avatar generik akan diarahkan ke boneka (Wawan/Wowo) + dunia Wonland.

## Roadmap (ringkas)

0. **Non-kode:** pesan sampel NTAG 424 DNA, tes di iPhone dan Android, termasuk di dalam boneka plush. Konsultasi hukum sebelum fitur wallet/marketplace.
1. **Migrasi konteks:** ~~hapus `output: "export"` & Capacitor~~ (selesai) · **route groups** `(marketing)/(app)/d/[id]` (tugas berikutnya, sebelum backend) · branch `pivot-nfc`.
2. **Backend dasar:** PostgreSQL + Drizzle, skema `users`, `dolls`, `activation_codes`, `items`, `inventories`.
3. **Auth:** Google + email magic link/OTP + passkey, role.
4. **Irisan inti NFC:** `/api/tap` (verifikasi SUN), `/api/claim` (+ kode aktivasi), `/d/<id>` publik/owner, kunci & transfer, halaman boneka dengan value.
5. **Landing (paralel dari langkah 4):** scroll, bg video, Find yours, beli via Midtrans, email konfirmasi.
6. **Boneka 3D + kustomisasi:** model Wawan/Wowo (GLB part-swap), putar boneka, ganti background, toko Fashion. **Spike 3D di HP kelas menengah** (FPS, waktu load, ukuran aset) dicatat di `docs/spike-3d.md` — naik prioritas karena 3D adalah layar utama.
7. **Wonland:** wallet, ledger, top-up Midtrans, lalu Garasi, Office, Family, berita Wonland, leaderboard, marketplace item.

## Konvensi kerja

- Perubahan kecil dan terfokus; jalankan `npx tsc --noEmit` (dan `npm run lint`) sebelum selesai.
- Jangan menambah dependency tanpa alasan jelas; sebutkan alasannya.
- Jelaskan singkat apa yang diubah dan kenapa.