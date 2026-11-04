<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# iscminigame — Project Context

Cross-platform 3D mini-game sosial (Web, iOS, Android), satu codebase. Pemain kustomisasi avatar/mobil/rumah, kunjungi rumah pemain lain via Visit ID, monetisasi Koin.

**Status: v1 FE selesai (tanpa backend).** Semua data mock/localStorage. Fokus: validasi risiko rendering 3D (Fase 0), baru backend.

## Stack (versi persis — jangan asumsikan dari training)

- Next.js `16.4.2` (App Router, `src/`, alias `@/*`) + React `19.3`
- Tailwind **v4** via `@tailwindcss/turbopack` (`@import "tailwindcss"` di `globals.css`, tema lewat `@theme`)
- R3F `9` (`@react-three/fiber`) + drei `10` + `three 0.186`
- Zustand `5` — state di `src/store/game.ts`
- Capacitor CLI `8`; platform native **belum** ditambahkan
- `next.config.ts`: `output: "export"`, `images.unoptimized: true` → build statis ke `out/`, dipakai Capacitor (`capacitor.config.ts` → `webDir: "out"`)

## Commands

```bash
npm run dev        # http://localhost:3000
npm run lint       # eslint (flat config: next core-web-vitals + typescript)
npx tsc --noEmit   # type-check (TIDAK ada script "typecheck")
npm run build      # static export -> out/
```

**Tidak ada test runner / test suite di repo ini.** Verifikasi = lint + tsc + build. Jangan tulis/andaikan framework test.

## Struktur

```
src/app/page.tsx        # landing/home page: Navbar + Hero + ProfileSection
src/app/play/page.tsx   # route /play: dynamic import Game (ssr:false)
src/components/
  Game.tsx              # root game: init store, Scene + Hud + Sheets
  Scene.tsx             # Canvas R3F, lighting, OrbitControls
  Avatar.tsx            # avatar primitif + jalan ke target (useFrame)
  Vehicle.tsx           # mobil primitif (atau GLB)
  House.tsx             # lantai 8x8, grid snap 0.5, placement/hapus furnitur
  Furniture.tsx         # furnitur primitif (atau GLB)
  Model.tsx             # loader GLB + ErrorBoundary + fallback primitif
  Hud.tsx               # top bar, bottom nav, toast
  Sheets.tsx            # panel: Lemari, Toko, Tata Rumah, Top-up, Profil/Visit
  home/
    Navbar.tsx          # navbar landing (logo, menu, tombol Masuk -> /play)
    Hero.tsx            # badge + judul + search @username
    ProfileCard.tsx     # kartu profil + AvatarSvg (link -> /profile?u=)
    ProfileSection.tsx  # filter chips + grid profil
    data.ts             # PROFILES & FILTERS mock + equippedFor(i)
  avatar/
    AvatarSvg.tsx       # avatar 2D (layer SVG per slot dari Profile.equipped)
src/app/profile/page.tsx# route /profile?u=<username> (client, useSearchParams)
src/lib/
  catalog.ts            # tipe + katalog + helper (byId, count, isOwned, colorOf, defaultsFix)
  api.ts                # MOCK backend (localStorage key "iscminigame:v1", mock player 1001/1002)
  payments.ts           # MOCK bayar + deteksi channel (iap vs gateway)
src/store/game.ts       # Zustand: useGame + useProfile()
```

## Data & store

- `Item`: `{ id, cat, name, price, color?, furn?, glb?, scale? }`; `cat`: skin | hair | shirt | pants | car | hat | shoes | furn. `Profile`: `{ id, name, coins, inventory, equipped, placed }`. Warna = item terpisah per warna (id unik), `equipped` tetap `Record<Slot, itemId>`.
- Non-furnitur dengan `price === 0` otomatis dimiliki. Furnitur butuh `inventory[id] > 0`, bisa dibeli berkali-kali (batas penempatan = jumlah dimiliki).
- `useProfile()` = `visiting ?? me` — komponen scene otomatis menampilkan profil yang sedang dikunjungi.
- `defaultsFix()` memperbaiki profil rusak dari storage; panggil saat load.

## Aturan penting (jangan dilanggar)

1. **Pertahankan signature `lib/api.ts` & `lib/payments.ts`.** Backend nanti ganti isi (fetch), bukan antarmuka.
2. **Static export:** dilarang API routes, server actions, `next/image` optimization, atau fitur yang butuh server Next.js.
3. **Client-only:** game di-load via `dynamic(..., { ssr:false })`. Jangan akses `window`/`localStorage` di luar client component.
4. **Native wajib IAP resmi** (Google/Apple) untuk item digital; gateway (Xendit/Midtrans) hanya web. `channel()` di `payments.ts` yang menentukan.
5. **Koin/inventori client-side & bisa dicurangi** — sementara; saat backend ada semua mutasi divalidasi server.
6. UI Tailwind, mobile-first (`h-dvh`, viewport sempit). Ikuti **`Design.md`** (design system neo-brutalist: border tebal, shadow keras, tanpa gradient/blur) sebelum mengerjakan UI.
7. Performa mobile: `dpr` max 1.5, shadow map 1024. Ukur FPS sebelum menambah light/shadow.

## Gotchas

- GLB ditaruh di `public/models/` (**folder belum ada**) dan diisi field `glb` pada item. `Model.tsx` **fallback otomatis ke primitif** kalau file hilang/gagal load — bukan error, jadi mudah salah sangka model terpasang.
- `public/` saat ini hanya aset scaffold create-next-app; belum ada model 3D.

## Roadmap (ringkas)

- **Fase 0 (prioritas):** spike rendering — siapkan GLB avatar/mobil/furnitur, ukur FPS + waktu load di Android kelas menengah, kompres aset (<~500 KB), catat di `docs/spike-3d.md`.
- **Berikutnya:** avatar modular part-swap GLB; Capacitor (`npx cap add android`); polish tata rumah/animasi/kamera.
- **Backend (setelah Fase 0 aman):** Fastify + PostgreSQL, R2/CDN, ganti isi `api.ts`/`payments.ts`, server-authoritative koin & verifikasi receipt.

## Konvensi kerja

- Perubahan kecil dan terfokus; jalankan `npx tsc --noEmit` (dan `npm run lint`) sebelum selesai.
- Jangan menambah dependency tanpa alasan jelas; sebutkan alasannya.
- Jelaskan singkat apa yang diubah dan kenapa.
