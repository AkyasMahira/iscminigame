# Changelog

Semua perubahan penting pada proyek ini dicatat di file ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/id/1.1.0/),
dan versi mengikuti [Semantic Versioning](https://semver.org/lang/id/).

## [Unreleased]

### Added
- Design token neo-brutalist di `src/app/globals.css` via `@theme`:
  warna (`--color-ink/paper/bg/yellow/pink/green/blue/sky/danger`),
  radius (`--radius-chip/card`), shadow keras (`--shadow-brutal/-lg`).
- Class komponen reusable `.btn`, `.btn-primary`, `.btn-accent`, dan `.input`
  (border 2px, shadow offset, target sentuh min. 44px, state active/disabled).
- Background halaman bergrid (`rgba(0,0,0,.06)`, sel 24px) sesuai `Design.md`.
- Toast dengan jenis `ok` / `err` (`Toast` di `src/store/game.ts`) —
  hijau untuk sukses, merah (`--danger`) untuk gagal.
- Tab **Profil** pada bottom nav (sebelumnya hanya 3 tab).
- Landing/home page (`src/components/home/`): `Navbar`, `Hero`,
  `ProfileCard`, `ProfileSection`, dan `data.ts` (profil + filter mock).
- Route `/play` (`src/app/play/page.tsx`) yang me-load `Game` via
  `dynamic(..., { ssr: false })`; tombol **Masuk** di navbar mengarah ke sini.
- Kategori avatar baru **Topi** (`hat`) & **Sepatu** (`shoes`) di `catalog.ts`
  (warna sebagai item terpisah, `defaultsFix` menambal profil lama).
- `AvatarSvg` (`src/components/avatar/AvatarSvg.tsx`): avatar 2D berlapis SVG
  per slot (`skin/hair/shirt/pants/hat/shoes`) dari `Profile.equipped`.
- Route profil statis `/profile?u=<username>` (`src/app/profile/page.tsx`,
  client-side `useSearchParams`); kartu profil menaut ke sini.
- Sheet **Lemari** diperbarui: preview `AvatarSvg`, grid swatch + state
  Dimiliki/Terkunci+harga; item terkunci memanggil `buy()` (koin kurang →
  diarahkan ke Top-up).

### Changed
- `src/app/layout.tsx`: font diganti ke **Space Grotesk** (Geist Mono tetap
  untuk `Visit ID`), `lang="id"`, metadata judul/deskripsi diisi.
- `src/components/Hud.tsx`: top bar & bottom nav gaya neo-brutalist
  (border tebal, shadow keras, `--paper`, item aktif `--yellow`), dukung
  safe-area (`env(safe-area-inset-*)`), label nav naik ke `text-sm`.
- `src/components/Sheets.tsx`: sheet jadi bottom sheet 70dvh dengan handle &
  sticky header, berubah menjadi panel samping `380px` di `lg`; chip, kartu
  toko, tombol, dan input memakai token; helper text naik ke `text-sm`.
- `src/components/Game.tsx`: layar loading bergaya kartu border + shadow dengan
  progress bar; wrapper game memakai `bg-bg`.
- `src/components/Scene.tsx`: latar canvas diset ke `--sky` (`#bfcbff`).
- `src/lib/payments.ts`: jalur pembayaran jadi **gateway-only** (Xendit/Midtrans);
  teks Top-up di `Sheets.tsx` mengikuti.

### Fixed
- `next.config.ts`: mengembalikan loader `@tailwindcss/turbopack`
  (`turbopack.rules["*.css"]`) yang hilang, sehingga **Tailwind kembali
  dikompilasi** saat build. Sebelumnya `@import "tailwindcss"` tidak
  diproses — utility class tidak ter-generate (CSS build hanya ~4.7 KB berisi
  `@theme` mentah). Konfigurasi `output: "export"` & `images.unoptimized`
  tetap dipertahankan.

### Removed
- Tema scaffold default (warna `--background/--foreground`, font Arial, dan
  override `prefers-color-scheme: dark`) yang bertentangan dengan `Design.md`.
- **Migrasi ke web-only:** `output: "export"` & `images.unoptimized` di
  `next.config.ts` (build jadi server Next.js, bukan static export).
- **Capacitor** (`capacitor.config.ts` + dependency `@capacitor/cli`).
- Deteksi channel IAP di `lib/payments.ts` (`Channel` type & `channel()`),
  menyisakan jalur gateway; signature `pay`/`PACKS`/`rupiah` tetap.

<!--
Belum dirilis. Fokus saat ini: Fase 0 (spike rendering 3D), lalu backend.
-->
