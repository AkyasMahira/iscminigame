# iscminigame — Design System

Panduan UI/UX untuk agent dan developer. Baca bersama `AGENTS.md`. Konteks: koleksi boneka **Wawan** dan **Wowo** + dunia **Wonland**, web-only. Gaya acuan: Figma, neo-brutalist.

> Nilai hex diperkirakan dari screenshot Figma. Kalau ada Figma tokens/Dev Mode, **Figma yang menang**; update file ini.

## 1. Prinsip

1. **Neo-brutalist, tapi ringan.** Border hitam tebal, shadow keras (tanpa blur), warna flat. Tanpa gradient, blur, atau shadow lembut pada **UI**.
2. **Mobile-first.** Rancang untuk HP dulu (`h-dvh`, viewport sempit), desktop adalah perluasan.
3. **UI tetap, dunia 3D bisa dikustomisasi.** Chrome UI (kartu, tombol, nav) selalu mengikuti token di bawah. Isi scene 3D (boneka, baju, background, rumah) dikustomisasi user lewat **item** dan **tema dunia**.
4. **Boneka adalah bintang.** Apa pun tema dunianya, boneka harus tetap terbaca jelas.
5. **Ringan di mobile web.** Hindari efek CSS mahal (`backdrop-filter`, shadow blur besar, animasi layout).
6. **Koleksi, bukan investasi.** Lihat aturan copy di bagian 9.

## 2. Token UI

Taruh di `globals.css` (`@theme`, Tailwind v4).

### Warna

| Token | Hex | Pakai untuk |
|---|---|---|
| `--ink` | `#111111` | Teks, border, shadow |
| `--paper` | `#FFFFFF` | Card, input, panel |
| `--bg` | `#EFEBE0` | Background halaman UI (krem + grid) |
| `--yellow` | `#FFD84D` | Aksen utama, kartu valuasi, item dipakai |
| `--pink` | `#F28AB8` | Aksen sekunder, badge |
| `--green` | `#6FD6A0` | Sukses, item ketiga |
| `--blue` | `#4F6CF0` | Tombol primer, tab aktif |
| `--sky` | `#BFCBFF` | Tema dunia **default** |
| `--danger` | `#E5484D` | Error, hapus |

Aturan: satu halaman maksimal **satu** warna dominan per kelompok kartu. Teks di atas `--blue` selalu putih, di atas warna lain selalu `--ink`.

### Bentuk

| Token | Nilai |
|---|---|
| Border | `2px solid var(--ink)` (card besar `3px`) |
| Radius | `6px` (kecil), `10px` (card/panel). Pill penuh hanya untuk chip |
| Shadow | `3px 3px 0 var(--ink)` (default), `5px 5px 0 var(--ink)` (panel besar) |
| Grid background | garis `rgba(0,0,0,.06)`, sel `24px` |
| Spacing | skala 4px: `4 8 12 16 24 32` |

### Tipografi

- Font: Space Grotesk (fallback Inter). Judul tebal.
- Judul halaman: `700`, 28–36px. Label kecil/badge: `700`, 12px, uppercase, letter-spacing `.05em`.
- Body: 14–16px. **Minimal 14px** untuk konten penting.
- ID dan kode: monospace.

## 3. Komponen

**Button**
- Primer: bg `--blue`, teks putih. Sekunder: bg `--yellow`, teks `--ink`. Netral: bg `--paper`.
- Hover/active: `translate(2px,2px)`, shadow jadi `1px`. Disabled: opacity `.5`, tanpa shadow.
- Tinggi minimal **44px**.

**Input**
- Bg `--paper`, border 2px, tinggi 44px. Focus: outline `3px --blue`. Error: border `--danger` + pesan di bawah.
- Input kode aktivasi: monospace, uppercase, otomatis tanpa spasi.

**Card**
- `--paper` atau satu warna aksen, border + shadow. Header kecil berupa label berwarna.

**Kartu valuasi**
- Pojok kiri atas halaman boneka, bg `--yellow`, angka besar monospace + label "Valuasi". Angka dalam Wonland. Selalu disertai catatan kecil "berdasarkan harga pasar koleksi".

**Chip/Badge**
- Badge uppercase kecil berwarna. Filter chip: aktif `--ink` teks putih, nonaktif `--paper`. Badge **"Asli"** (hijau) untuk boneka terverifikasi NFC. Badge rarity: pink/yellow/green.

**Navbar (marketing)**
- Logo kiri, menu tengah, tombol Masuk kanan, ikon IG dan TikTok. Mobile: menu jadi sheet/hamburger.

**Kartu boneka (Find yours)**
- Grid 2 kolom mobile, 4 desktop. Atas: warna aksen + gambar boneka/blind box. Bawah: nama seri, rarity, harga, tombol Beli.

## 4. Layout halaman boneka (app)

```
┌─────────────────────────┐
│ [Valuasi]        [Saldo]│  top bar
│                         │
│     Boneka 3D (R3F)     │  tengah, bisa diputar
│     di atas tema dunia  │
│                         │
├─────────────────────────┤
│ Garasi·Fashion·Office·  │  bottom nav 5 tools
│ Family·Wallet           │
└─────────────────────────┘
      ↑ Sheet naik dari bawah
```

- **5 tools:** Garasi (barang dimiliki), Fashion (baju/aksesori, tema dunia), Office, Family, Wallet. Item aktif pakai `--yellow`.
- **Sheet:** tinggi maks `70dvh`, handle di atas, scene tetap terlihat. Satu sheet aktif sekaligus. Tutup lewat swipe turun, tombol X, atau tap di luar.
- **Desktop (≥1024px):** sheet jadi panel samping `~380px`.
- Hormati safe-area (`env(safe-area-inset-*)`) untuk top bar dan bottom nav.

### Kustomisasi 3D

Semua yang bisa diubah user adalah **item** di katalog, dengan satu sumber kebenaran `Profile.equipped`:

| Slot | Contoh |
|---|---|
| Boneka | baju, topi, sepatu, aksesori, warna |
| `theme` | tema dunia: background + pencahayaan |
| Rumah/furnitur | penempatan di tata rumah |
| Kendaraan | di garasi |

**Tema dunia** (background yang bisa diganti):
- Tiap tema mendefinisikan: warna/gambar latar, warna lantai, ambient/directional light. Tidak boleh menambah shadow map atau light ekstra.
- **Tema default netral** (`--sky`). Tema lain boleh berwarna, tapi boneka wajib kontras dengan latar (cek di preview, hindari latar dengan warna dominan sama dengan baju default).
- Latar berupa warna solid atau satu gambar kecil terkompres (≤200 KB). **Tidak ada video di dalam scene.**
- Tema bisa dibeli (Wonland), limited, atau gratis. Tema aktif tersimpan di profil.

**Interaksi boneka:**
- Satu jari: **putar boneka** (bukan kamera). Dua jari: zoom dengan batas min/max.
- Tombol reset pose/kamera. Auto-rotate pelan saat idle (nonaktif jika `prefers-reduced-motion`).
- Preview item (Fashion) langsung terlihat di boneka sebelum dibeli.

## 5. Landing (marketing)

- **Hero:** background video (muted, loop, `playsInline`, poster fallback, ≤2 MB), judul dunia Wonland, CTA "Find yours". Pastikan teks tetap terbaca di atas video (panel `--paper` atau overlay solid, bukan blur).
- **Section scroll:** cerita Wonland + karakter → Find yours → cara kerja 3 langkah (Beli, Tap NFC + kode, Kustomisasi) → footer.
- Ikon IG dan TikTok di navbar dan footer.
- Landing tidak memuat three/R3F; gunakan gambar atau SVG untuk boneka.
- Label kecil "Prototipe" selama fase demo.

## 6. Halaman tap `/d/<id>`

Satu halaman, lima kondisi. Semua memakai layout yang sama; yang berubah hanya panel aksi.

| Kondisi | Tampilan |
|---|---|
| Belum diklaim | Reveal boneka (animasi blind box) → input kode aktivasi → lanjut daftar/masuk |
| Owner | Mode lengkap: kustomisasi, beli, 5 tools |
| User lain / tamu | Read-only: boneka, valuasi, badge "Asli", tombol Masuk |
| Terkunci | Kartu "Boneka ini dilaporkan hilang", tanpa aksi |
| Tag tidak valid | Pesan error + saran bantuan |

Auth: tap NFC + kode aktivasi + magic link email. Tanpa password, tanpa tab Daftar bebas (hanya pemilik boneka yang bisa membuat akun).

## 7. State wajib

| State | Perilaku |
|---|---|
| Loading 3D | Skeleton + progress bar bergaya border tebal. Fallback primitif (`Model.tsx`) tetap tampil, jangan layar kosong |
| Error GLB | Fallback primitif otomatis, tanpa popup |
| Kosong | Kartu dengan ilustrasi sederhana + 1 CTA (mis. "Belum ada baju → ke Fashion") |
| Beli | Konfirmasi singkat; Wonland kurang → arahkan ke Wallet |
| Toast | Pojok atas, border + shadow, hilang 2–3 detik. Hijau sukses, merah gagal |
| Offline/gagal API | Toast + tombol coba lagi |
| Kode salah | Pesan jelas + sisa percobaan (rate limit) |

## 8. Aksesibilitas

- Kontras teks minimal 4.5:1. Cek teks kecil di atas `--yellow`, `--pink`, `--green`, dan teks di atas video hero.
- Target sentuh ≥ 44px. Jangan andalkan warna saja; tambah ikon/teks untuk status.
- Fokus keyboard terlihat. Elemen interaktif pakai `button`/`a`, bukan `div`.
- Hormati `prefers-reduced-motion`: matikan auto-rotate, animasi reveal, dan video autoplay non-esensial.

## 9. Copy & konten

- **Dilarang:** "investasi", "profit", "return", "cuan", janji kenaikan nilai.
- **Pakai:** "koleksi", "valuasi", "harga pasar", "langka/limited".
- Mata uang dalam game: **Wonland**. Tidak ada kata "tarik tunai" atau "withdraw".
- Semua angka demo ditandai jelas sebagai contoh/mock.

## 10. Do / Don't

**Do**
- Pakai token, jangan hardcode hex/ukuran di komponen.
- Pertahankan shadow offset keras dan border tebal di UI.
- Uji di layar 360×640 sebelum desktop.
- Uji tiap tema dunia dengan boneka default sebelum dirilis.

**Don't**
- Jangan tambah gradient, blur, glassmorphism, atau shadow lembut pada UI.
- Jangan buat teks penting di bawah 14px.
- Jangan letakkan panel besar permanen di atas boneka 3D.
- Jangan tambah library UI/ikon/animasi berat tanpa alasan (lihat konvensi di `AGENTS.md`).
- Jangan taruh video atau aset berat di dalam scene 3D.