# design.md — TEL-U StudySpace (Website Mahasiswa)

Dokumen desain untuk platform reservasi ruang belajar dan ruang diskusi Telkom University Jakarta. Disusun dari tiga masukan: (1) analisis `ayo.co.id/venues` dan halaman detail venue-nya, (2) identitas visual resmi Telkom University, dan (3) brief produk TEL-U StudySpace. Pendekatan visual mengikuti skill `frontend-design`.

---

## 0. Ringkasan keputusan

| Hal | Keputusan |
|---|---|
| Inti ide | Ayo menjual **lapangan per sesi berbayar**. StudySpace menjual **waktu kosong pada ruangan**, tanpa harga. Maka elemen utama yang diwarisi dari Ayo (date strip + slot waktu) dijadikan **identitas visual**: sebuah *penggaris waktu* (time ruler) yang muncul di kartu, detail, dan tiket. |
| Satu hal yang dibuat berani | Penggaris waktu. Semua elemen lain sengaja tenang. |
| Warna | Merah Telkom `#9F1521` sebagai satu-satunya aksen. Putih, charcoal, abu muda. Hijau redup hanya untuk status "kosong". |
| Tipografi | Bricolage Grotesque (judul) + IBM Plex Sans (isi). Bukan Inter, bukan Rubik. |
| Alur | Ayo: daftar → detail → pilih lapangan/jam → keranjang → produk tambahan → bayar. StudySpace: daftar → detail (pilih jam di panel) → konfirmasi → QR. **3 layar, tanpa keranjang dan pembayaran.** |
| Layout | Container 1200 px, grid 12 kolom, basis spasi 4 px. Daftar ruangan: sidebar filter + grid kartu. Detail: konten 8 kolom + panel reservasi sticky 4 kolom. |

---

## 1. Sumber analisis dan batasan

Data yang berhasil diambil lewat Firecrawl:

- `ayo.co.id/venues`: konten halaman, branding terhitung (warna, font, radius, komponen), daftar link.
- `ayo.co.id/v/arena-badminton-ciganjur-abc`: struktur halaman detail dan alur pemilihan jadwal.
- `telkomuniversity.ac.id`: warna, font, URL logo, gaya tombol.

Batasan yang perlu diketahui:

- Jumlah kolom grid Ayo **disimpulkan**, bukan diukur. Situs memakai Bootstrap (12 kolom), menampilkan 15 kartu venue per halaman, dan bentuk kartunya konsisten dengan grid 4 kolom di desktop lebar. Verifikasi dengan DevTools bila perlu angka pasti.
- Nilai CSS yang tercatat dari Ayo: font Rubik, primary `#9E0620`, background `#FCFCFC`, teks `#25282B`, radius input 12 px, radius tombol 8–12 px, basis spasi 4 px.
- Nama gedung, nama ruangan, jam operasional, dan data mahasiswa pada dokumen ini adalah **data contoh**. Ganti dengan data resmi kampus.
- Skill `antislop`, `taste`, dan `emil` yang disebut di brief tidak tersedia di sesi ini. Prinsipnya (hindari tampilan generik, kualitas visual dan detail, motion halus dan bertujuan) diterapkan langsung pada bagian 5, 11, dan 15.

---

## 2. Analisis ayo.co.id

### 2.1 Tema dan karakter

- Terang, bersih, berlatar `#FCFCFC`, teks charcoal `#25282B`, aksen merah marun `#9E0620`. Tombol utama merah solid tanpa bayangan.
- Nuansa: ramah konsumen, praktis, padat informasi. Gambar venue yang membawa warna; antarmuka tetap netral.
- Satu keluarga font (Rubik) untuk semua level. Hierarki dibangun dari ukuran dan bobot.
- Radius bervariasi menurut elemen: 8 px tombol, 12 px input dan tombol utama di detail.

### 2.2 Halaman daftar (`/venues`)

Urutan dari atas ke bawah:

1. Judul halaman + tombol "Daftarkan Venue" (aksi untuk pemilik).
2. Pemilih cabang olahraga (33 pilihan, dropdown bergaya chip).
3. Tombol filter + kolom "Cari venue".
4. Baris hasil: "Menampilkan **2746** venue tersedia" di kiri, "Urutkan berdasarkan" di kanan (Harga Terendah, Harga Tertinggi, Popularitas).
5. Dua banner promo.
6. Grid kartu venue.
7. Pagination bernomor (1–10 … 183, 184, Next).
8. FAQ akordeon (8 pertanyaan), banner unduh aplikasi.

Anatomi kartu venue: foto, label "Venue", nama, rating dan kota, chip cabang olahraga, harga coret (bila promo), "Mulai Rp X/sesi". Seluruh kartu adalah satu link.

### 2.3 Halaman detail (`/v/{slug}`)

1. Breadcrumb: Home › Sewa Lapangan › Nama venue.
2. Galeri: satu foto besar + dua foto sedang + "Lihat semua foto" (lightbox 1/n).
3. Judul, rating, kota, chip cabang olahraga.
4. Deskripsi, lalu **Aturan Venue** (daftar bernomor, dipotong dengan "Baca Selengkapnya").
5. Lokasi dengan tombol "Buka Peta".
6. **Fasilitas** sebagai grid ikon + label, "Lihat semua fasilitas".
7. Panel harga: "Mulai dari Rp 35,000 per sesi" + tombol "Cek Ketersediaan" + kotak keuntungan aplikasi (DP, reschedule, voucher).
8. **Pemilihan jadwal**: baris tanggal horizontal (Sel 3 Nov, Rab 4 Nov, …) dengan panah kiri-kanan dan ikon kalender; filter slot waktu (daftar jam per 1 jam, "Pilih semua slot waktu", "Terapkan"); satu blok per lapangan (foto, nama, jenis, indoor/outdoor, material) dengan grid slot dan tombol "Tambah ke Keranjang".
9. Ulasan: skor, sub-skor (Kebersihan, Kondisi Lapangan, Komunikasi), daftar ulasan, "Lihat semua ulasan".
10. Kebijakan reschedule dan pembatalan.
11. "Rekomendasi Venue Terdekat" (carousel kartu), tautan "Belum menemukan yang kamu cari?".

### 2.4 Alur pemesanan

`Daftar → Detail → Pilih tanggal → Pilih lapangan + slot → Tambah ke Keranjang → "Jadwal Dipilih" (Selanjutnya) → "Produk Tambahan" (opsional) → Bayar → Konfirmasi lewat email`.

Catatan UX yang bagus: slot bisa difilter per jam, jadwal dini hari dihitung menyambung dengan malam sebelumnya, ada ringkasan "Jadwal Dipilih" sebelum lanjut, kebijakan pembatalan ditampilkan di halaman yang sama.

Catatan yang kurang baik: reschedule dan pembatalan hanya lewat aplikasi, FAQ salah satu pertanyaannya menjawab hal lain (pertanyaan ganda), banyak ikon bergaya berbeda, harga pada FAQ tertulis "Rp-" (data kosong).

---

## 3. Terjemahan ke StudySpace

### 3.1 Diambil

| Pola Ayo | Dipakai sebagai |
|---|---|
| Pencarian dulu, tanpa hero panjang | Hero memuat pencarian tanggal, jam, jumlah peserta |
| Chip kategori di atas daftar | Chip tipe ruangan: Semua, Diskusi, Belajar mandiri, Rapat, Kolaborasi |
| "Menampilkan N … tersedia" + Urutkan | Sama, urutan: Paling sesuai, Kapasitas, Terdekat |
| Kartu satu link penuh | Kartu ruangan, seluruh area bisa diklik |
| Foto besar + 2 foto + "Lihat semua foto" | Galeri detail ruangan |
| Aturan dipotong "Baca Selengkapnya" | Aturan penggunaan ruangan |
| Fasilitas sebagai grid ikon | Fasilitas ruangan, set ikon Lucide tunggal |
| Baris tanggal horizontal + slot per jam | Date strip + slot grid di panel reservasi |
| Ringkasan "Jadwal Dipilih" | Bar ringkasan dan halaman konfirmasi |
| Kebijakan pembatalan di detail | Kebijakan pembatalan dan check-in |
| Rekomendasi terdekat | "Ruangan lain di gedung ini" |
| FAQ akordeon | FAQ di Home |
| Breadcrumb | Breadcrumb di detail dan reservasi |

### 3.2 Diadaptasi

| Ayo | StudySpace | Alasan |
|---|---|---|
| Harga per sesi | Kapasitas dan jam kosong berikutnya | Tidak ada pembayaran |
| Rating dan ulasan | Ditunda ke v2. Diganti **tingkat keramaian per jam** | Ulasan tanpa moderasi berisiko, keramaian lebih berguna untuk memilih jam |
| Slot per lapangan (banyak lapangan per venue) | Satu ruangan = satu penggaris waktu | Ruangan berdiri sendiri |
| Keranjang multi-jadwal | Satu reservasi, satu rentang waktu berurutan, maks 3 jam | Aturan di brief |
| Konfirmasi lewat email | Halaman sukses + tiket QR | Akses masuk lewat QR |
| Panel harga di sisi | Panel **pilih waktu** sticky di sisi | Memotong satu langkah |

### 3.3 Sengaja tidak diambil

Pembayaran, DP, voucher, harga coret, keranjang, banner unduh aplikasi, banner promo, pemilih 33 cabang olahraga, tampilan Bootstrap bawaan, warna link kuning, radius 5 px seragam.

---

## 4. Konsep desain

**Satu kalimat:** StudySpace adalah jadwal ruangan yang bisa dibaca dalam sekali pandang.

Mahasiswa datang dengan satu pertanyaan: *kapan ruangan ini kosong?* Karena itu jawabannya ditampilkan sebagai **penggaris waktu**, deretan segmen 1 jam dari 07:00 sampai 21:00.

- **Di kartu:** penggaris tipis (6 px) menunjukkan kosong dan terisi hari ini, plus penanda "sekarang".
- **Di detail:** penggaris yang sama menjadi pemilih slot berukuran besar. Mahasiswa menyentuh segmen untuk memilih.
- **Di tiket:** rentang yang dipesan ditampilkan sebagai segmen merah pada penggaris, di samping QR.

Tidak ada ilustrasi dekoratif, gradient, atau kartu ikon. Visual hero adalah foto nyata ruangan kampus.

---

## 5. Design tokens

### 5.1 Warna

| Nama | Hex | Pakai untuk |
|---|---|---|
| `red-600` (Telkom) | `#9F1521` | Tombol utama, slot terpilih, status aktif, tautan |
| `red-700` | `#861019` | Hover dan pressed tombol utama |
| `red-50` | `#FBF1F2` | Latar slot dalam rentang, baris terpilih |
| `red-100` | `#F2D6D9` | Border item terpilih |
| `ink-900` | `#2B2829` | Judul |
| `ink-700` | `#353233` | Teks isi (warna teks resmi situs Telkom) |
| `ink-500` | `#6F6A6B` | Teks sekunder, label |
| `ink-400` | `#8F8A8B` | Placeholder, ikon nonaktif |
| `line` | `#E3E0E0` | Border dan pemisah |
| `surface` | `#F6F5F5` | Latar section, panel |
| `white` | `#FFFFFF` | Kanvas |
| `free-600` | `#2F7D5B` | Segmen dan teks "kosong" |
| `free-50` | `#EAF4EF` | Latar badge "Kosong" |
| `busy-600` | `#9A5B00` | Teks "hampir penuh" |
| `busy-50` | `#FFF3DC` | Latar badge "hampir penuh" |

Kontras: `red-600` pada putih sekitar 7,5:1, putih pada `red-600` sama. Teks `ink-500` pada putih di atas 4,5:1.

Aturan pemakaian merah: tombol utama, slot terpilih, indikator tab aktif, tautan, penanda "sekarang". Tidak untuk latar section besar, tidak untuk dekorasi. Pesan error memakai ikon + teks `ink-900` dengan garis kiri merah, supaya tidak terbaca sama dengan CTA.

### 5.2 Tipografi

| Peran | Font | Catatan |
|---|---|---|
| Judul, angka jam besar | **Bricolage Grotesque** (500, 600, 700) | Letter-spacing −0.01em pada ≥28 px |
| Isi, formulir, label | **IBM Plex Sans** (400, 500, 600) | `font-variant-numeric: tabular-nums` untuk jam dan tanggal |

Skala (px / line-height):

| Token | Ukuran | Pakai |
|---|---|---|
| `text-xs` | 12 / 16 | Badge, keterangan |
| `text-sm` | 14 / 20 | Label, meta kartu |
| `text-base` | 16 / 26 | Isi |
| `text-lg` | 18 / 28 | Lead paragraf |
| `text-xl` | 22 / 30 | Judul kartu, sub-judul |
| `text-2xl` | 28 / 34 | Judul section |
| `text-3xl` | 36 / 42 | Judul halaman |
| `text-5xl` | 56 / 60 | Headline hero (desktop); 36 / 40 di mobile |

Aturan: panjang baris isi maksimal 68 karakter (`max-w-prose`). Teks rata kiri di semua tempat, kecuali halaman sukses yang berporos tengah. Sentence case untuk semua label. Tidak memakai huruf kapital semua, tidak ada eyebrow di atas setiap judul, tidak ada satu kata beraksen warna di dalam headline.

### 5.3 Spasi, radius, elevasi

- Basis 4 px. Skala: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Jarak antar-section di halaman: 64 px (mobile), 96 px (desktop).
- Radius menurut hierarki, bukan satu angka:

| Elemen | Radius |
|---|---|
| Segmen penggaris, chip kecil | 2–4 px |
| Tombol, input, slot | 8 px |
| Kartu, foto | 12 px |
| Modal, bottom sheet, tiket | 16 px |

- Elevasi: **tidak ada bayangan pada kartu**. Pemisah memakai border `line` 1 px. Bayangan hanya untuk elemen yang melayang: panel reservasi sticky, popover, toast, bottom sheet → `0 8px 24px rgba(43,40,41,0.10)`.

### 5.4 Snippet Tailwind (v4, `src/assets/main.css`)

```css
@import "tailwindcss";

@theme {
  --color-red-50: #FBF1F2;
  --color-red-100: #F2D6D9;
  --color-red-600: #9F1521;
  --color-red-700: #861019;
  --color-ink-900: #2B2829;
  --color-ink-700: #353233;
  --color-ink-500: #6F6A6B;
  --color-ink-400: #8F8A8B;
  --color-line: #E3E0E0;
  --color-surface: #F6F5F5;
  --color-free-600: #2F7D5B;
  --color-free-50: #EAF4EF;
  --color-busy-600: #9A5B00;
  --color-busy-50: #FFF3DC;

  --font-display: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;

  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  --shadow-float: 0 8px 24px rgb(43 40 41 / 0.10);
  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
}

html { font-family: var(--font-sans); color: var(--color-ink-700); background: #fff; }
h1, h2, h3 { font-family: var(--font-display); color: var(--color-ink-900); }
```

Untuk Tailwind v3, pindahkan nilai yang sama ke `theme.extend` di `tailwind.config.ts`.

---

## 6. Layout dan grid

### 6.1 Grid

| Breakpoint | Lebar | Kolom | Gutter | Padding samping | Container |
|---|---|---|---|---|---|
| default | < 640 | 4 | 16 | 16 | 100% |
| `sm` | ≥ 640 | 8 | 16 | 24 | 100% |
| `md` | ≥ 768 | 8 | 24 | 24 | 100% |
| `lg` | ≥ 1024 | 12 | 24 | 32 | 100% |
| `xl` | ≥ 1280 | 12 | 24 | 32 | 1200 px, tengah |

Navbar 64 px (desktop) / 56 px (mobile), sticky, putih, border bawah `line`.

### 6.2 Pola per halaman

| Halaman | Desktop | Tablet | Mobile |
|---|---|---|---|
| Home hero | 7 kolom teks + 5 kolom foto | Teks di atas, foto di bawah | Teks, dock pencarian, foto |
| Cari ruangan | Sidebar 3 kolom + hasil 9 kolom (grid 3 kartu) | Filter jadi tombol + panel, grid 2 kartu | Filter jadi bottom sheet, 1 kartu |
| Detail | Konten 8 kolom + panel sticky 4 kolom | Panel pindah di bawah galeri | Bar sticky bawah "Pilih waktu" membuka sheet |
| Konfirmasi | Form 7 kolom + ringkasan sticky 5 kolom | Ringkasan di atas form | Ringkasan di bawah form |
| Sukses | Kolom tunggal 560 px, tengah | sama | Tiket menumpuk vertikal |
| Reservasi saya | Daftar 8 kolom tengah | Penuh | Penuh |

Pada mobile, navigasi utama berpindah ke **bottom tab bar** 4 item: Beranda, Cari, Reservasi, Profil.

---

## 7. Sitemap dan alur

### 7.1 Rute

| Rute | Halaman |
|---|---|
| `/` | Home |
| `/ruangan` | Cari ruangan |
| `/ruangan/:id` | Detail ruangan |
| `/reservasi/baru` | Konfirmasi reservasi (query: `ruangan`, `tanggal`, `mulai`, `selesai`) |
| `/reservasi/berhasil/:kode` | Reservasi berhasil |
| `/reservasi-saya` | Daftar reservasi (tab Mendatang, Selesai, Dibatalkan) |
| `/reservasi-saya/:kode` | Detail reservasi |
| `/profil` | Profil |
| `/masuk` | Login contoh |
| `/:pathMatch(.*)*` | 404 |

Rute `reservasi-saya`, `reservasi/*`, dan `profil` dilindungi navigation guard. Belum login → `/masuk?next=…`.

### 7.2 Alur utama

```
Home ──(cari / CTA)──▶ Cari ruangan ──▶ Detail ruangan
                                           │  pilih tanggal + slot di panel
                                           ▼
                                   Konfirmasi reservasi
                                   (keperluan, peserta, ringkasan)
                                           │  Konfirmasi reservasi
                                           ▼
                                   Reservasi berhasil (QR)
                                           │
                          ┌────────────────┴────────────────┐
                          ▼                                 ▼
                 Detail reservasi                    Reservasi saya
```

Pintasan: dari dock pencarian di Home, tanggal dan jam yang sudah diisi dibawa ke daftar ruangan (hanya ruangan yang kosong pada rentang itu), lalu dibawa lagi ke detail dan form.

### 7.3 Aturan bisnis (untuk prototipe)

- Slot 1 jam, jam operasional contoh 07:00–21:00, Senin–Sabtu.
- Satu reservasi = rentang berurutan, **maksimal 3 jam**.
- Slot yang sudah dipesan atau sudah lewat tidak bisa dipilih.
- Peserta tidak boleh melebihi kapasitas ruangan; minimal 1.
- Pembatalan boleh sampai 1 jam sebelum mulai (usulan).
- QR aktif 15 menit sebelum mulai dan reservasi dilepas otomatis bila tidak check-in dalam 15 menit setelah mulai (usulan, selaras dengan rencana ESP32 nanti).

---

## 8. Spesifikasi halaman

### 8.1 Home

```
┌──────────────────────────────────────────────────────────────┐
│ [Logo Tel-U] StudySpace   Home  Cari Ruangan  Reservasi Saya  [Masuk] │
├──────────────────────────────────────────────────────────────┤
│  Find Your Space.                          ┌───────────────┐ │
│  Focus on Your Goals.                      │               │ │
│                                            │  foto ruangan │ │
│  Pesan ruang belajar dan ruang diskusi     │  kampus       │ │
│  di Telkom University Jakarta. Pilih       │               │ │
│  waktu, konfirmasi, masuk dengan QR.       │ ┌───────────┐ │ │
│                                            │ │Kosong skrg│ │ │
│  ┌──────────┬────────┬─────────┬────────┐  │ │6 dari 14  │ │ │
│  │ Tanggal  │ Mulai  │ Peserta │ Cari   │  │ └───────────┘ │ │
│  └──────────┴────────┴─────────┴────────┘  └───────────────┘ │
├──────────────────────────────────────────────────────────────┤
│  Kosong hari ini                          Lihat semua ruangan│
│  [kartu+ruler] [kartu+ruler] [kartu+ruler] [kartu+ruler]     │
├──────────────────────────────────────────────────────────────┤
│  Cara memesan                                                │
│  1 Pilih ruangan   2 Pilih jam   3 Konfirmasi   4 Pindai QR  │
│  [potongan UI]     [mini slot]   [mini ringkasan] [mini QR]  │
├──────────────────────────────────────────────────────────────┤
│  Aturan layanan (daftar definisi, 2 kolom)                   │
│  Jam operasional │ Durasi maksimal │ Check-in │ Pembatalan   │
├──────────────────────────────────────────────────────────────┤
│  Pertanyaan umum (akordeon, 6 item)                          │
├──────────────────────────────────────────────────────────────┤
│  Footer: logo, tautan jakarta.telkomuniversity.ac.id, bantuan│
└──────────────────────────────────────────────────────────────┘
```

Keputusan:

- Hero memuat **kartu status langsung** ("Kosong sekarang: 6 dari 14 ruangan") yang dihitung dari mock data. Ini menggantikan deretan angka statistik generik.
- Dock pencarian bersatu dengan hero. Tombolnya "Cari ruangan".
- "Cara memesan" memang urutan, jadi pakai angka 1–4. Setiap langkah menampilkan potongan UI yang sebenarnya (slot, ringkasan, QR kecil), bukan ikon.
- "Aturan layanan" ditulis sebagai daftar definisi dua kolom, bukan empat kartu.
- Tidak ada animasi masuk per-section.

Teks:

- Headline: **Find Your Space. Focus on Your Goals.**
- Sub: "Pesan ruang belajar dan ruang diskusi di Telkom University Jakarta. Pilih waktu, konfirmasi, lalu masuk dengan QR."
- FAQ contoh: Siapa yang bisa memesan? Berapa lama maksimal? Bagaimana cara masuk ruangan? Apa yang terjadi jika saya terlambat? Bagaimana membatalkan? Apakah ada biaya?

### 8.2 Cari ruangan

```
┌──────────────────────────────────────────────────────────────┐
│ Cari ruangan                                                 │
│ [Semua] [Diskusi] [Belajar mandiri] [Rapat] [Kolaborasi]     │
├──────────────┬───────────────────────────────────────────────┤
│ Cari nama    │ Menampilkan 12 ruangan      Urutkan: [Sesuai ▾]│
│ [__________] │ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│ Tanggal      │ │ foto 4:3│ │ foto 4:3│ │ foto 4:3│          │
│ [Kam 5 Nov]  │ │ Nama    │ │ Nama    │ │ Nama    │          │
│ Jam          │ │ Gdg·Lt  │ │ Gdg·Lt  │ │ Gdg·Lt  │          │
│ [10:00-12:00]│ │ 2–6 org │ │ 4–10 org│ │ 1–2 org │          │
│ Kapasitas    │ │ ikon×4  │ │ ikon×4  │ │ ikon×4  │          │
│ (•) Semua    │ │ ▮▮▯▯▮▮▮ │ │ ▯▯▮▮▮▯▯ │ │ ▮▮▮▮▮▮▯ │          │
│ ( ) 1–2 ...  │ │Kosong·13│ │Penuh    │ │Kosong   │          │
│ Fasilitas    │ │[Lihat…] │ │[Lihat…] │ │[Lihat…] │          │
│ [ ] Proyektor│ └─────────┘ └─────────┘ └─────────┘          │
│ [ ] Papan    │                                               │
│ Ketersediaan │                                               │
│ [x] Hanya    │                                               │
│     yang kosong                                              │
│ Hapus filter │                                               │
└──────────────┴───────────────────────────────────────────────┘
```

Filter (semuanya berfungsi pada mock data): pencarian nama, kapasitas (1–2, 3–6, 7–10, 11+), fasilitas (multi-pilih), ketersediaan ("Hanya yang kosong" pada tanggal dan jam terpilih), tipe ruangan (chip). Status filter disimpan di query string agar bisa dibagikan dan tahan refresh. Saat ada filter aktif, tampil baris chip "Kapasitas 3–6 ×" yang bisa dihapus satu per satu.

Kartu ruangan (`RoomCard`):

| Bagian | Spesifikasi |
|---|---|
| Foto | Rasio 4:3, radius 12, `object-cover`. Chip tipe di pojok kiri atas (latar putih, teks `ink-700`) |
| Nama | `text-xl`, Bricolage 600, satu baris, dipotong dengan ellipsis |
| Lokasi | "Gedung A · Lantai 2", `text-sm`, `ink-500` |
| Kapasitas | Ikon Users + "2–6 orang" |
| Fasilitas | Maksimal 4 ikon + "+2"; tooltip memuat nama |
| Penggaris waktu | 14 segmen, tinggi 6 px, celah 2 px; penanda "sekarang" merah 2 px |
| Status | Badge: "Kosong sekarang" (hijau), "Kosong mulai 13:00" (amber), "Penuh hari ini" (abu) |
| Tombol | "Lihat detail" (sekunder, outline). Seluruh kartu juga bisa diklik |

Hover: foto naik sedikit skala 1.02 (200 ms), border menjadi `ink-400`. Tanpa bayangan.

### 8.3 Detail ruangan

```
┌──────────────────────────────────────────────────────────────┐
│ Home › Cari ruangan › Ruang Diskusi A2                       │
│ ┌────────────────────────────┬──────────────┐                │
│ │                            │ foto 2       │                │
│ │      foto utama            ├──────────────┤                │
│ │                            │ foto 3  [Lihat semua foto]    │
│ └────────────────────────────┴──────────────┘                │
├────────────────────────────────────────┬─────────────────────┤
│ Ruang Diskusi A2         [Diskusi]     │ ┌─────────────────┐ │
│ Gedung A · Lantai 2                    │ │ Pilih waktu     │ │
│ 2–6 orang · Indoor · Buka 07:00–21:00  │ │ ‹ Sel Rab Kam › │ │
│                                        │ │ 3   4   5  …    │ │
│ Deskripsi                              │ │ ▮ 07:00  ▮ 08:00│ │
│ Fasilitas (grid ikon 3 kolom)          │ │ ▯ 09:00  ▮ 10:00│ │
│ Aturan penggunaan   [Baca selengkapnya]│ │ ▮ 11:00  ▮ 12:00│ │
│ Keramaian per jam (bar horizontal)     │ │ Kam, 5 Nov      │ │
│ Denah lantai                           │ │ 10:00–12:00 · 2j│ │
│ Pembatalan dan check-in                │ │ [Reservasi      │ │
│ Ruangan lain di Gedung A               │ │  sekarang]      │ │
│                                        │ └─────────────────┘ │
└────────────────────────────────────────┴─────────────────────┘
```

Panel reservasi (`BookingPanel`), sticky di `top: 80px`:

1. **Date strip**: 7 hari, setiap sel memuat nama hari singkat dan tanggal. Sel hari tutup dan hari lewat dinonaktifkan. Panah kiri/kanan menggeser pekan. Ikon kalender membuka pemilih tanggal untuk lompat jauh.
2. **Slot grid**: 3 kolom, tiap slot tinggi 48 px, teks "08:00" (tabular-nums). Keterangan di bawah grid memberi tahu arti setiap tampilan: kosong, terpilih, terisi.
3. **Ringkasan baris**: "Kam, 5 Nov · 10:00–12:00 · 2 jam" muncul begitu ada slot terpilih.
4. **Tombol**: "Reservasi sekarang". Nonaktif sampai ada slot; saat nonaktif, teks bantu "Pilih minimal satu slot".

Status slot:

| Status | Tampilan |
|---|---|
| Kosong | Putih, border `line`, teks `ink-900` |
| Terpilih | Latar `red-600`, teks putih |
| Dalam rentang | Latar `red-50`, border `red-100` |
| Terisi | Latar `surface` dengan pola garis diagonal, teks `ink-400`, tidak bisa difokus untuk memilih tetapi tetap dibaca layar (`aria-disabled`, label "Terisi") |
| Lewat | `surface` polos, teks `ink-400` |

Interaksi pilih slot:

- Sentuh slot pertama → jam mulai.
- Sentuh slot lain yang berurutan dan total ≤ 3 jam → rentang diperluas.
- Sentuh slot yang tidak berurutan, atau mengulang slot awal → mulai pilihan baru.
- Rentang yang melewati slot terisi ditolak dengan pesan inline: "10:00 sudah dipesan. Pilih rentang lain."
- Melebihi 3 jam: "Maksimal 3 jam per reservasi."

Di mobile, panel berubah menjadi bottom sheet; bar sticky di bawah halaman menampilkan "Pilih waktu" dan, setelah slot dipilih, rentang waktunya.

Bagian **Keramaian per jam** menggantikan ulasan Ayo: bar horizontal tipis per jam (rendah, sedang, tinggi) berdasarkan rata-rata penggunaan mock, agar mahasiswa bisa memilih jam sepi.

### 8.4 Konfirmasi reservasi

```
┌──────────────────────────────────────────────────────────────┐
│ Pilih waktu  ──  Isi detail  ──  Selesai       (langkah 2/3) │
├───────────────────────────────────┬──────────────────────────┤
│ Detail reservasi                  │ Ringkasan reservasi      │
│ Ruangan   [foto kecil] Ruang A2   │ Ruang Diskusi A2         │
│           Gedung A · Lt 2  [Ganti]│ Gedung A · Lantai 2      │
│ Tanggal   [Kam, 5 Nov 2026 ▾]     │ Kam, 5 Nov 2026          │
│ Mulai     [10:00 ▾]  Selesai [12:00 ▾] │ 10:00–12:00 (2 jam) │
│ Keperluan [Diskusi kelompok ▾]    │ 4 peserta                │
│ Catatan   [______________]        │ Keperluan: Diskusi       │
│ Peserta   [–]  4  [+]  maks 6     │ ────────────             │
│                                   │ [x] Saya setuju dengan   │
│                                   │     aturan penggunaan    │
│                                   │ [Konfirmasi reservasi]   │
└───────────────────────────────────┴──────────────────────────┘
```

Field dan validasi (pesan tampil di bawah field, dengan ikon dan teks, muncul saat blur atau submit):

| Field | Aturan | Pesan |
|---|---|---|
| Tanggal | Tidak di masa lalu, hari buka | "Pilih tanggal hari ini atau setelahnya." / "Ruangan tutup pada hari Minggu." |
| Jam mulai | Dalam jam operasional, belum lewat | "Waktu mulai sudah lewat." |
| Jam selesai | Setelah mulai, maks 3 jam, ≤ jam tutup | "Jam selesai harus setelah jam mulai." / "Durasi maksimal 3 jam. Kurangi jam selesai atau geser jam mulai." |
| Rentang | Semua slot kosong | "10:00–11:00 sudah dipesan. Pilih jam lain." |
| Keperluan | Wajib | "Pilih keperluan penggunaan ruangan." |
| Peserta | 1 sampai kapasitas | "Jumlah peserta melebihi kapasitas (maks. 6 orang)." |
| Persetujuan | Wajib dicentang | "Setujui aturan penggunaan untuk melanjutkan." |

Jam mulai/selesai dan slot di detail selalu sinkron; opsi yang tidak valid (terisi, melewati 3 jam) tampil nonaktif di dropdown dengan keterangan. Setelah klik "Konfirmasi reservasi": tombol masuk keadaan loading 1–1,5 detik, lalu sukses → halaman berhasil. Skenario konflik disimulasikan (misalnya 1 dari 8 percobaan) untuk memperlihatkan state error: banner di atas form "Slot 10:00–11:00 baru saja dipesan orang lain. Pilih jam lain" dengan tombol "Pilih jam lain".

### 8.5 Reservasi berhasil

```
                 ✓ Reservasi berhasil
          Tunjukkan QR ini di pintu ruangan.

   ┌───────────────────────────────┬───────────────────┐
   │ Ruang Diskusi A2              │                   │
   │ Gedung A · Lantai 2           │     ▓▓▓▓▓▓▓       │
   │ Kam, 5 Nov 2026               │     ▓ QR  ▓       │
   │ 10:00–12:00                   │     ▓▓▓▓▓▓▓       │
   │ ▯▯▯▯▯▮▮▮▯▯▯▯▯▯  (penggaris)  │                   │
   │ Kode booking  SS-2611-K7Q4    │  Aktif 09:45      │
   ├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┴ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┤
   └───────────────────────────────────────────────────┘

   [Lihat detail reservasi]   [Tambah ke kalender]
   Kembali ke beranda
```

- Tiket 16 px radius, dua bagian dipisah garis putus dan takik setengah lingkaran di tepi (perforasi) agar terbaca sebagai tiket, bukan kartu.
- QR dibuat sungguhan dengan library (lihat bagian 13.4), minimal 192 px, dengan quiet zone putih 16 px. Di bawahnya teks "Aktif mulai 09:45" (15 menit sebelum mulai).
- Penggaris waktu pada tiket menampilkan rentang yang dipesan sebagai segmen merah.
- Satu-satunya animasi bertujuan di halaman ini: tiket muncul sekali (fade + naik 8 px, 240 ms), tanda centang tergambar sekali. Tidak ada confetti.
- "Tambah ke kalender" menghasilkan file `.ics` sungguhan.

### 8.6 Reservasi saya

```
┌──────────────────────────────────────────────────────────────┐
│ Reservasi saya                                               │
│ [Mendatang 2]  [Selesai 5]  [Dibatalkan 1]                   │
├──────────────────────────────────────────────────────────────┤
│ Berikutnya, hari ini 10:00                                   │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ [foto] Ruang Diskusi A2        [Mendatang]      ┌─QR──┐ │ │
│ │        Kam, 5 Nov · 10:00–12:00                 └─────┘ │ │
│ │        [Lihat detail]  [Batalkan reservasi]             │ │
│ └──────────────────────────────────────────────────────────┘ │
│ ─ baris reservasi lain (thumbnail, nama, waktu, status) ──── │
└──────────────────────────────────────────────────────────────┘
```

- Tab dengan hitungan; tab aktif ditandai garis bawah merah 2 px.
- Reservasi mendatang terdekat tampil sebagai baris besar dengan QR langsung. Reservasi mendatang lainnya memuat tombol "Tampilkan QR" yang membuka modal QR.
- Selesai dan Dibatalkan menampilkan baris ringkas tanpa QR. Badge status: Mendatang (merah muda `red-50`, teks `red-700`), Selesai (abu), Dibatalkan (abu dengan teks dicoret pada waktu).
- Membatalkan membuka dialog konfirmasi: "Batalkan reservasi Ruang Diskusi A2, Kam 5 Nov 10:00–12:00?" dengan tombol "Batalkan reservasi" dan "Tetap pesan". Hasil: toast "Reservasi dibatalkan." dan item pindah ke tab Dibatalkan.
- Data tersimpan di `localStorage` agar bertahan setelah refresh.

Empty state:

| Tab | Judul | Isi | Tombol |
|---|---|---|---|
| Mendatang | Belum ada reservasi mendatang | Pilih ruangan dan jam yang kamu butuhkan. Reservasi akan muncul di sini. | Cari ruangan |
| Selesai | Belum ada riwayat | Reservasi yang sudah lewat akan tersimpan di sini. | — |
| Dibatalkan | Tidak ada pembatalan | Reservasi yang kamu batalkan akan tercatat di sini. | — |

### 8.7 Detail reservasi

Satu kolom 640 px: status, tiket (komponen sama dengan 8.5), rincian (kode, ruangan, tanggal, waktu, peserta, keperluan, dibuat pada), aturan penggunaan singkat, aksi "Batalkan reservasi" bila masih bisa.

### 8.8 Profil

Dua kolom: kiri avatar inisial dan nama, kanan daftar definisi (Nama, NIM, Email, Program studi, Status akun, Terakhir masuk). Tombol "Keluar". Semua data contoh. Tidak ada form edit; bila kolom tidak dapat diubah, ditulis "Data mengikuti akun kampus."

### 8.9 Masuk (login contoh)

Form dua field (NIM, kata sandi) dengan tombol "Masuk". Prototipe menerima kredensial apa pun yang tidak kosong dan membuat sesi contoh di Pinia. Pesan error kosong: "Masukkan NIM." / "Masukkan kata sandi."

---

## 9. Komponen

Folder `src/components/`:

| Grup | Komponen | Catatan |
|---|---|---|
| `ui/` | `BaseButton`, `BaseInput`, `BaseSelect`, `BaseTextarea`, `BaseCheckbox`, `BaseChip`, `BaseBadge`, `BaseTabs`, `BaseAccordion`, `BaseModal`, `BaseSheet`, `BaseToast`, `BaseStepper`, `BaseSkeleton`, `BaseEmptyState`, `BaseBreadcrumb`, `BaseIcon` (pembungkus Lucide) | Tombol: utama (merah), sekunder (outline), teks. Tinggi 44 px (≥ 40 untuk kecil) |
| `layout/` | `AppNavbar`, `BottomTabBar`, `AppFooter`, `PageContainer`, `PageHeader` | |
| `room/` | `RoomCard`, `RoomGrid`, `RoomFilters`, `RoomFilterSheet`, `RoomGallery`, `RoomFacilityGrid`, `RoomRules`, `RoomCrowdChart`, `RoomTypeChips` | |
| `schedule/` | `TimeRuler`, `DateStrip`, `SlotGrid`, `SlotButton`, `BookingPanel`, `BookingSummary` | **Inti identitas** |
| `booking/` | `BookingForm`, `BookingTicket`, `QrCode`, `BookingListItem`, `BookingStatusBadge`, `CancelDialog` | |
| `home/` | `HeroSearch`, `LiveAvailabilityCard`, `HowItWorks`, `ServiceRules`, `FaqList` | |

`TimeRuler` (komponen paling penting):

- Props: `slots` (array status per jam), `now?`, `range?` (rentang terpilih), `size` (`sm` 6 px / `lg` 48 px sebagai pemilih), `interactive`.
- Satu sumber kebenaran: rendering di kartu, panel, dan tiket memakai komponen yang sama dengan ukuran berbeda.
- Segmen: radius 2 px (sm) atau 8 px (lg), celah 2 px (sm) atau 8 px (lg).

Tombol: gunakan kata kerja spesifik. "Reservasi sekarang", "Konfirmasi reservasi", "Lihat detail", "Batalkan reservasi", "Cari ruangan". Tidak ada "Submit" atau "Klik di sini". Tidak ada panah → pada teks tombol.

---

## 10. State dan microcopy

Bahasa: Indonesia, sapaan "kamu", kalimat aktif, sentence case. Satu aksi memakai satu nama di seluruh alur ("Konfirmasi reservasi" → toast "Reservasi dikonfirmasi."; "Batalkan reservasi" → toast "Reservasi dibatalkan.").

| State | Perilaku |
|---|---|
| Loading daftar | Skeleton kartu 6 buah dengan bentuk sama persis dengan kartu asli, tanpa shimmer berlebihan (pulse lambat 1,6 s) |
| Loading slot | Skeleton grid slot saat ganti tanggal (simulasi 300 ms) |
| Loading submit | Tombol menampilkan spinner kecil + teks "Memproses…", field dikunci |
| Sukses | Toast kecil di kanan bawah (desktop) / atas (mobile), hilang dalam 4 detik, bisa ditutup |
| Error validasi | Pesan di bawah field + ikon; fokus pindah ke field pertama yang salah |
| Error sistem | Banner di atas konten dengan tindakan: "Coba lagi" |
| Konflik slot | Lihat 8.4 |
| Kosong | Lihat 8.2 dan 8.6. Judul menyebut kondisi, isi menyebut langkah, satu tombol |
| Tidak ada hasil filter | "Tidak ada ruangan yang cocok. Kurangi filter atau ganti tanggal." + tombol "Hapus semua filter" |
| 404 | "Halaman tidak ditemukan. Alamat mungkin salah atau halaman sudah dipindahkan." + "Kembali ke beranda" |

Error tidak meminta maaf dan tidak samar. Sebutkan apa yang salah dan cara memperbaikinya.

---

## 11. Motion dan micro-interaction

Prinsip: gerak merespons aksi pengguna; gerak otomatis hanya satu kali dan hanya bila menarik perhatian pada hal penting.

| Momen | Perilaku | Durasi / easing |
|---|---|---|
| Tekan tombol/slot | Skala 0,98 saat ditekan | 100 ms, ease-out |
| Pilih slot | Warna latar berganti ke merah; rentang `red-50` mengisi segmen di antara | 120 ms |
| Bar ringkasan reservasi (mobile) muncul | Naik dari bawah, 100% → 0 | 200 ms ease-out |
| Akordeon | Tinggi dan ikon berputar | 180 ms |
| Modal / sheet | Fade + naik 8 px; sheet naik dari bawah | 200–240 ms |
| Toast | Geser masuk 12 px + fade | 180 ms |
| Hover kartu | Foto skala 1,02 | 200 ms |
| Halaman berhasil | Tiket muncul dan centang tergambar, **sekali** | 240 ms / 300 ms |
| Pergantian halaman | Fade 120 ms | — |

Tidak dipakai: animasi masuk per-section saat scroll, hover mengambang di setiap kartu, parallax, confetti, elemen yang bergerak terus-menerus. Semua animasi berhenti total di bawah `prefers-reduced-motion: reduce` (perubahan keadaan tetap terjadi, tanpa transisi).

---

## 12. Aksesibilitas dan kualitas dasar

- Fokus keyboard terlihat di semua elemen interaktif: outline 2 px `red-600`, offset 2 px.
- Target sentuh minimal 44 × 44 px, termasuk slot dan sel tanggal.
- Slot memakai `button` dengan `aria-pressed`; slot terisi memakai `aria-disabled="true"` dan label "08:00, terisi". Status tidak hanya lewat warna (pola garis + label).
- Date strip dan tab memakai role `tablist` dan navigasi panah.
- Toast memakai `aria-live="polite"`; error form memakai `aria-describedby` dan `role="alert"` untuk ringkasan.
- QR memiliki teks alternatif "QR akses ruangan, kode SS-2611-K7Q4" dan kode booking tertulis di dekatnya sebagai cadangan manual.
- Semua gambar memiliki `alt` yang deskriptif.
- Diuji pada 360, 768, 1024, 1440 px. Tidak ada scroll horizontal pada halaman.
- `lang="id"`, `<title>` per halaman, urutan heading logis (satu `h1` per halaman).

---

## 13. Arsitektur proyek

### 13.1 Struktur folder

```
telu-studyspace/
├─ public/
│  └─ images/
│     ├─ logo-telkom-university.png      # aset resmi, ganti bila perlu
│     ├─ hero/                            # foto hero
│     └─ rooms/                           # foto ruangan (room-a2-1.jpg, ...)
├─ src/
│  ├─ assets/main.css                     # token Tailwind + font
│  ├─ components/ (ui, layout, room, schedule, booking, home)
│  ├─ composables/
│  │  ├─ useAvailability.ts               # hitung status slot dan kosong sekarang
│  │  ├─ useSlotSelection.ts              # aturan rentang berurutan, maks 3 jam
│  │  ├─ useBookingValidation.ts
│  │  └─ useToast.ts
│  ├─ data/
│  │  ├─ rooms.ts                         # mock ruangan
│  │  ├─ facilities.ts                    # id → label + ikon Lucide
│  │  ├─ bookings.seed.ts                 # reservasi awal untuk demo
│  │  └─ student.ts                       # profil contoh
│  ├─ layouts/ (DefaultLayout.vue, AuthLayout.vue)
│  ├─ router/index.ts                     # rute + guard
│  ├─ services/                           # lapisan antarmuka API
│  │  ├─ roomService.ts
│  │  ├─ bookingService.ts
│  │  └─ authService.ts
│  ├─ stores/ (auth.ts, rooms.ts, bookings.ts, ui.ts)
│  ├─ types/ (room.ts, booking.ts, user.ts)
│  ├─ utils/ (date.ts, time.ts, bookingCode.ts, qr.ts, ics.ts, format.ts)
│  ├─ views/ (HomeView, RoomsView, RoomDetailView, BookingNewView,
│  │          BookingSuccessView, MyBookingsView, BookingDetailView,
│  │          ProfileView, LoginView, NotFoundView)
│  ├─ App.vue
│  └─ main.ts
├─ index.html
├─ vite.config.ts
└─ tsconfig.json
```

### 13.2 Dependensi

`vue`, `vue-router`, `pinia`, `lucide-vue-next`, `tailwindcss` + `@tailwindcss/vite`, `qrcode` (pembuat QR), `@fontsource-variable/bricolage-grotesque`, `@fontsource/ibm-plex-sans`, dan `date-fns` (opsional, untuk format tanggal berbahasa Indonesia).

### 13.3 Tipe data dan mock

```ts
// types/room.ts
export type RoomType = 'diskusi' | 'belajar-mandiri' | 'rapat' | 'kolaborasi'

export interface Room {
  id: string
  name: string
  type: RoomType
  building: string        // contoh: "Gedung A"
  floor: number
  capacityMin: number
  capacityMax: number
  facilities: string[]    // id dari data/facilities.ts
  description: string
  rules: string[]
  photos: string[]        // path di /images/rooms
  openDays: number[]      // 0=Min ... 6=Sab
  openHour: number        // 7
  closeHour: number       // 21
  crowd: number[]         // 14 nilai 0..1, rata-rata keramaian per jam
}

// types/booking.ts
export type BookingStatus = 'upcoming' | 'completed' | 'cancelled'

export interface Booking {
  code: string            // SS-2611-K7Q4
  roomId: string
  date: string            // 2026-11-05
  start: string           // "10:00"
  end: string             // "12:00"
  attendees: number
  purpose: string
  note?: string
  status: BookingStatus
  qrToken: string
  createdAt: string
}
```

Mock minimal: 12 ruangan (campuran empat tipe), 3 reservasi awal (satu mendatang, satu selesai, satu dibatalkan) agar semua tab dan state punya isi. Status slot per hari dihitung deterministik dari `roomId + tanggal` agar konsisten saat refresh dan tetap beragam.

Semua data diakses lewat `services/*` yang mengembalikan `Promise` dengan jeda simulasi (200–600 ms). Ketika backend Laravel siap, hanya isi service yang diganti; view, store, dan komponen tidak berubah.

### 13.4 Persiapan integrasi mendatang (tanpa mengimplementasikannya)

Payload QR dibuat dalam bentuk yang bisa langsung diverifikasi perangkat atau API nanti:

```json
{ "v": 1, "b": "SS-2611-K7Q4", "r": "room-a2", "s": "2026-11-05T10:00", "e": "2026-11-05T12:00", "t": "<token-acak-24-karakter>" }
```

Prototipe memakai token acak lokal. Saat backend ada, `t` diganti token yang ditandatangani server dan divalidasi oleh Laravel API. Tidak ada kode ESP32, MQTT, atau pemindai webcam pada tahap ini.

---

## 14. Aset

- **Logo:** gunakan logo resmi dari situs Telkom University. Sumber yang ditemukan: `https://b856188.assetcdn.net/2.0/856188/wp-content/uploads/2022/02/logo3-e1511767184374.png`. Unduh manual lalu simpan di `public/images/logo-telkom-university.png`. Jangan menggambar ulang logo. Idealnya minta versi SVG dari tim humas atau panduan identitas kampus. Tinggi logo di navbar 32–36 px dengan ruang bebas sekitar 8 px.
- **Favicon:** `https://telkomuniversity.ac.id/wp-content/uploads/fbrfg/favicon-96x96.png` (sementara).
- **Foto ruangan dan hero:** gunakan foto asli ruangan kampus Jakarta. Selama belum ada, pakai foto placeholder satu gaya (rasio 4:3, cahaya alami, tanpa orang yang bisa dikenali). Jangan memakai gambar buatan AI sebagai foto ruangan. Ukuran: kartu 800×600, hero 1200×1500, galeri 1600×1067, WebP kualitas 80.
- **Ikon:** Lucide saja, stroke 1,75, ukuran 16 / 20 / 24. Tidak mencampur set ikon.

---

## 15. Review terhadap kecenderungan desain generik

Rencana pertama diperiksa terhadap brief dan diperbaiki sebelum dibakukan:

| Kecenderungan di rencana awal | Perubahan | Alasan |
|---|---|---|
| Inter atau Rubik sebagai font | Bricolage Grotesque + IBM Plex Sans | Inter adalah bawaan hampir semua produk SaaS; Rubik terlalu identik dengan Ayo |
| Hero merah bergradien dengan ilustrasi abstrak | Hero putih, foto nyata, dock pencarian, kartu status langsung | Brief melarang gradient dan visual tak relevan |
| Empat kartu ikon "Kenapa StudySpace" | Daftar definisi aturan layanan | Isinya aturan, bukan fitur untuk dijual |
| Deretan statistik besar | Kartu "Kosong sekarang 6 dari 14" yang dihitung nyata | Angka yang berguna, bukan hiasan |
| Radius 12 px dan bayangan lembut di semua kartu | Radius bertingkat, tanpa bayangan pada kartu | Hierarki visual dan tampilan lebih tegas |
| Label huruf kapital kecil di atas tiap judul | Dihapus | Menambah derau tanpa informasi |
| Animasi fade-slide di setiap section | Dihapus; hanya gerak sebagai respons aksi + satu momen tiket | Mengurangi kesan template |
| Penomoran 01/02/03 di banyak tempat | Hanya pada "Cara memesan" dan stepper formulir | Hanya di tempat yang memang berurutan |
| Ulasan bintang | Diganti keramaian per jam | Lebih relevan untuk memilih ruangan |

Pemeriksaan akhir ("lepas satu aksesori"): bagian "Aturan layanan" di Home dipersingkat menjadi empat baris, dan galeri detail tidak memakai carousel otomatis.

---

## 16. Urutan implementasi dan QA

### 16.1 Urutan kerja

1. Inisialisasi Vite + Vue 3 + TypeScript, pasang Tailwind, Pinia, Router, Lucide, font, `qrcode`.
2. Tulis token di `main.css`, komponen `ui/` dasar, dan layout (navbar, bottom tab bar, footer).
3. Siapkan `types/`, `data/`, `services/`, `stores/`.
4. Bangun `TimeRuler`, `DateStrip`, `SlotGrid`, `useSlotSelection` lalu uji terpisah.
5. Halaman: Cari ruangan → Detail → Konfirmasi → Berhasil → Reservasi saya → Detail reservasi → Profil → Login → Home → 404.
6. Hubungkan guard, query string, toast, state loading dan error.
7. Pass terakhir: aksesibilitas, responsif, reduced motion, tangkapan layar tiap breakpoint.

### 16.2 Daftar periksa

- [ ] Semua tautan navigasi dan tombol berfungsi; tidak ada tombol mati.
- [ ] Filter kapasitas, fasilitas, ketersediaan, dan pencarian nama bekerja bersama.
- [ ] Pilih slot menghormati aturan berurutan dan maksimal 3 jam; slot terisi tidak bisa dipilih.
- [ ] Semua pesan validasi pada bagian 8.4 muncul pada kondisi yang benar.
- [ ] Reservasi baru muncul di "Reservasi saya" dan tetap ada setelah refresh.
- [ ] Pembatalan memindahkan item ke tab Dibatalkan dan melepas slotnya.
- [ ] QR dapat dipindai ponsel dan memuat token yang unik per reservasi.
- [ ] Empty, loading, error, dan sukses tampil di setiap halaman yang relevan.
- [ ] Kontras, fokus, dan target sentuh memenuhi bagian 12.
- [ ] Tampilan rapi di 360, 768, 1024, 1440 px tanpa scroll horizontal.
- [ ] Tidak ada kesalahan di console dan `npm run build` sukses.
- [ ] Logo asli terpasang di `public/images/`; tidak ada logo buatan.

---

## 17. Ringkasan sumber data analisis

| Item | Nilai | Sumber |
|---|---|---|
| Font Ayo | Rubik | Firecrawl branding, ayo.co.id/venues |
| Warna primer Ayo | `#9E0620` | idem |
| Latar / teks Ayo | `#FCFCFC` / `#25282B` | idem |
| Radius Ayo | tombol 8–12 px, input 12 px | idem |
| Framework Ayo | Bootstrap | idem |
| Warna primer Telkom University | `#9F1521` | Firecrawl branding, telkomuniversity.ac.id |
| Teks Telkom University | `#353233` | idem |
| Warna sekunder Telkom University | `#002147` (tidak dipakai; brief meminta merah, putih, charcoal, abu) | idem |
| Font Telkom University | Inter (judul), Arial (isi) | idem |
