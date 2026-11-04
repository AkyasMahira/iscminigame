# iscminigame — Design System

Panduan UI/UX untuk agent dan developer. Baca bersama `AGENTS.md`. Sumber acuan: Figma "ISC Project" (gaya neo-brutalist).

> Nilai hex di bawah diperkirakan dari screenshot Figma. Kalau ada Figma tokens/Dev Mode, **Figma yang menang**; update file ini.

## 1. Prinsip

1. **Neo-brutalist, tapi ringan.** Border hitam tebal, shadow keras (tanpa blur), warna flat. Jangan pakai gradient, blur, atau shadow lembut.
2. **Mobile-first.** Layout dirancang untuk HP dulu (`h-dvh`, viewport sempit), desktop adalah perluasan.
3. **3D adalah bintang.** Di dalam scene, UI minimal dan transparan. Palet UI tidak boleh menenggelamkan warna aset 3D.
4. **Ringan di WebView.** Hindari efek CSS mahal (`backdrop-filter`, shadow blur besar, animasi layout). Cukup border + shadow offset.

## 2. Token

Taruh di `globals.css` (sesuaikan dengan versi Tailwind yang dipakai).

### Warna

| Token | Hex | Pakai untuk |
|---|---|---|
| `--ink` | `#111111` | Teks, border, shadow |
| `--paper` | `#FFFFFF` | Card, input, panel |
| `--bg` | `#EFEBE0` | Background halaman (krem + grid) |
| `--yellow` | `#FFD84D` | Aksen utama, label status, item dipakai |
| `--pink` | `#F28AB8` | Aksen sekunder, badge, item kedua |
| `--green` | `#6FD6A0` | Sukses, kartu profil, item ketiga |
| `--blue` | `#4F6CF0` | Tombol primer (Masuk/Cari/Daftar), tab aktif |
| `--sky` | `#BFCBFF` | Latar viewport avatar 3D |
| `--danger` | `#E5484D` | Error, hapus |

Aturan: satu halaman maksimal **satu** warna dominan per kelompok kartu. Teks di atas `--blue` selalu putih, di atas warna lain selalu `--ink`.

### Bentuk

| Token | Nilai |
|---|---|
| Border | `2px solid var(--ink)` (card besar `3px`) |
| Radius | `6px` (kecil), `10px` (card/panel). Jangan pill penuh kecuali chip |
| Shadow | `3px 3px 0 var(--ink)` (default), `5px 5px 0 var(--ink)` (panel besar) |
| Grid background | garis `rgba(0,0,0,.06)`, sel `24px` |
| Spacing | skala 4px: `4 8 12 16 24 32` |

### Tipografi

- Font: sans geometris (Space Grotesk / Inter sebagai fallback), judul tebal.
- Judul halaman: `700`, 28–36px. Label kecil/badge: `700`, 10–11px, uppercase, letter-spacing `.05em`.
- Body: 14–16px. **Minimal 14px di mobile** (di Figma beberapa teks terlalu kecil, jangan ditiru).
- Nama pengguna/ID: monospace opsional, awali dengan `@`.

## 3. Komponen

**Button**
- Primer: bg `--blue`, teks putih, border + shadow default.
- Sekunder: bg `--yellow`, teks `--ink`.
- Netral: bg `--paper`.
- Hover/active: geser `translate(2px,2px)` dan shadow jadi `1px`. Disabled: opacity `.5`, tanpa shadow.
- Tinggi minimal **44px** (target sentuh).

**Input**
- Bg `--paper`, border 2px, tinggi 44px. Focus: outline `3px --blue`. Error: border `--danger` + pesan di bawah.
- Password punya tombol mata. Checkbox pakai kotak border tebal.

**Tab (Masuk/Daftar)**
- Tab aktif bg `--ink` atau `--blue` teks putih, tab nonaktif `--paper`. Menempel di atas card.

**Card**
- `--paper` atau salah satu warna aksen, border + shadow. Header kecil berupa label berwarna (misal STATUS, KENDARAAN).

**Label/Chip**
- Badge uppercase kecil berwarna (pink/yellow/green) di pojok card. Filter chip: aktif `--ink` teks putih, nonaktif `--paper`.

**Profile card (hasil pencarian)**
- Grid 2 kolom di mobile, 4 di desktop. Bagian atas warna aksen berisi avatar, bawah putih berisi nama + `@username`. Tombol aksi: Visit, Tambah Teman.

**Navbar**
- Desktop: logo kiri, menu tengah, tombol Masuk/profil kanan.
- Mobile dalam game: **bottom nav** (lihat bagian 4), bukan navbar atas.

## 4. Layout game (mobile-first)

```
┌─────────────────────────┐
│ Top bar: avatar · nama  │  Hud.tsx
│ · saldo Koin · [+]      │
├─────────────────────────┤
│                         │
│     Scene 3D (R3F)      │  Scene.tsx, fullscreen
│     tanpa chrome UI     │
│                         │
├─────────────────────────┤
│ Bottom nav (4–5 tab)    │  Hud.tsx
└─────────────────────────┘
        ↑ Sheet naik dari bawah (Sheets.tsx)
```

- **Bottom nav:** Lemari · Toko · Rumah · Cari/Visit · Profil. Item aktif pakai `--yellow`.
- **Sheet (bottom sheet):** tinggi maks `70dvh`, handle di atas, scene tetap terlihat di belakang. Satu sheet aktif sekaligus. Tutup lewat swipe turun, tombol X, atau tap di luar.
- **Desktop (≥1024px):** sheet berubah jadi panel samping `~380px`.
- Hormati safe-area: `padding: env(safe-area-inset-*)` untuk top bar dan bottom nav.

### Pemetaan layar → komponen

| Layar | Lokasi | Catatan |
|---|---|---|
| Login/Daftar | halaman/overlay | Tab Masuk/Daftar + tombol Google |
| Homepage + Cari | `Hud` + sheet Visit | Input `@username`, grid profil pilihan |
| Editor avatar | sheet **Lemari** | Tab kategori: kulit, rambut, baju, celana. Preview 3D tetap di scene |
| Toko | sheet **Toko** | Grid item, harga Koin, state "Dimiliki" |
| Top-up | sheet **Top-up** | Channel dari `payments.ts`: IAP (native) atau gateway (web). UI sama |
| Tata rumah | sheet **Tata Rumah** | Mode tempel/hapus, counter stok furnitur |
| Visit room | `visiting` aktif | **HUD minimal**: nama pemilik, tombol keluar, emote/chat |
| Profil | sheet **Profil** | Item dipakai, tombol Visit/Teman jika profil orang lain |

## 5. Scene 3D vs UI

- Di dalam scene, hanya overlay kecil: top bar tipis, tombol keluar, emote. Tanpa panel besar yang menutupi karakter.
- Latar scene netral dan tidak jenuh agar aset 3D menonjol. UI ngejreng, dunia 3D tenang.
- Kontrol sentuh: satu jari putar kamera, dua jari zoom. Sediakan tombol reset kamera.
- Tombol kategori dan UI scene sebaiknya `pointer-events: none` pada wrapper, `auto` hanya pada elemen interaktif, agar gestur ke canvas tidak terhalang.

## 6. State wajib

| State | Perilaku |
|---|---|
| Loading 3D | Skeleton + progress bar bergaya border tebal. Fallback primitif (`Model.tsx`) tetap tampil, jangan layar kosong |
| Error GLB | Fallback primitif otomatis, tanpa popup |
| Kosong | Kartu dengan ilustrasi sederhana + 1 CTA (mis. "Belum ada furnitur → ke Toko") |
| Beli | Konfirmasi singkat; Koin kurang → arahkan ke Top-up |
| Toast | Pojok atas, border + shadow, hilang 2–3 detik. Warna: hijau sukses, merah gagal |
| Offline/gagal API | Toast + tombol coba lagi |

## 7. Aksesibilitas

- Kontras teks minimal 4.5:1. Cek kombinasi teks kecil di atas `--yellow`, `--pink`, `--green`.
- Target sentuh ≥ 44px. Jangan andalkan warna saja (tambah ikon/teks untuk status).
- Fokus keyboard terlihat jelas. Elemen interaktif pakai `button`/`a`, bukan `div`.
- Hormati `prefers-reduced-motion`: matikan animasi non-esensial.

## 8. Do / Don't

**Do**
- Pakai token, jangan hardcode hex/ukuran di komponen.
- Pertahankan shadow offset keras dan border tebal secara konsisten.
- Uji di layar 360×640 sebelum desktop.

**Don't**
- Jangan tambah gradient, blur, glassmorphism, atau shadow lembut.
- Jangan buat teks di bawah 14px untuk konten penting.
- Jangan letakkan panel besar permanen di atas scene 3D.
- Jangan tambah library UI/ikon/animasi berat tanpa alasan (lihat konvensi di `AGENTS.md`).