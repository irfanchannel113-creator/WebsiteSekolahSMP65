# Panduan Memasang Tema Blogger SMPN 65 Batam

File tema: **`blogger/tema-smpn65batam.xml`**

> ⚠️ Tema ini belum pernah dipasang di Blogger asli. Tampilannya sudah diperiksa dengan simulator lokal,
> tetapi Blogger bisa saja menolak bagian tertentu. Karena itu **langkah 1 wajib dilakukan**.

## Yang tetap / yang berubah
**Tidak berubah:** semua postingan, halaman (mis. `/p/aplikasi-simantap-smpn-65-batam.html`), label, komentar yang
sudah ada, alamat situs, dan judul/deskripsi blog. Tema hanya mengganti tampilan.

**Berubah:** widget di samping dan footer lama. Tema baru memakai widget dengan ID sendiri (`…901`, `…902`, dst.)
supaya isi widget lama tidak tertukar ke tempat yang salah. Akibatnya isi widget lama **tidak terbawa otomatis**,
jadi **salin dulu isinya** sebelum mengganti tema:

| Widget lama | Pindahkan ke widget baru |
|---|---|
| Sambutan Kepala Sekolah | **Sambutan Kepala Sekolah** (Gambar): foto + teks sambutan |
| Lokasi SMPN 65 Batam (peta) | **Lokasi SMPN 65 Batam** (HTML): tempel kode `<iframe>` peta yang lama |
| Daftar Link Penting Dunia Pendidikan | **Link Penting Pendidikan** (Daftar Link) |
| Kata-Kata Mutiara | **Kata-Kata Mutiara** (HTML) |
| Total Pengunjung | Tambah gadget **Statistik Blog** di footer (angka kunjungan tidak hilang karena disimpan oleh Blogger) |
| Blogroll / gadget lain | Bila masih perlu, tambahkan lewat **Tambah Gadget** di bagian *Footer: Kata Mutiara & Gadget Lain* |

## 1. Cadangkan tema lama
Blogger → **Tema** → panah ▾ di samping **Sesuaikan** → **Cadangkan** → **Download**. Simpan file ini.

## 2. Pasang tema baru
**Tema** → panah ▾ → **Pulihkan** → unggah `tema-smpn65batam.xml`.
Jika Blogger bertanya soal widget lama, pilih **Hapus widget** (isinya sudah disalin pada langkah sebelumnya).
Jika muncul pesan error, salin pesannya untuk diperbaiki.

## 3. Periksa widget di menu **Tata Letak**
Tautan berikut **sudah terisi** di tema:

| Menu | Tujuan |
|---|---|
| Beranda | `/` |
| Profil | `/p/profil.html` ← **sesuaikan dengan alamat halaman profil yang sudah ada** |
| Literasi Digital | https://fliphtml5.com/bookcase/gqoiv |
| Album | https://sites.google.com/view/galeri65batam/hasil-karya |
| Aplikasi SIMANTAP | https://play.google.com/store/apps/details?id=com.ict.simantap_smpn_65_batam |
| Bimbingan Konseling | https://www.sra65batam.my.id/ |
| Tombol **SIMANTAP 65** | `/p/aplikasi-simantap-smpn-65-batam.html` |

Tautan ke situs lain otomatis dibuka di tab baru.

**Sub-menu (dropdown) Profil:** di widget **Menu**, tambahkan item tepat di bawah "Profil" dengan nama diawali
garis bawah, misalnya `_Visi dan Misi` → `/p/visi-misi.html`. Garis bawahnya tidak tampil; item itu muncul sebagai
dropdown di bawah Profil.

Yang masih perlu diisi:

| Bagian | Widget | Yang diisi |
|---|---|---|
| Logo & Nama Sekolah | **Logo Kecil (Menu)** | Unggah logo (latar transparan). |
| Logo & Nama Sekolah | Header | Judul = nama sekolah, deskripsi = slogan. Gambar header lama (spanduk) **tidak ditampilkan** di tema ini. |
| Logo Besar (Beranda) | Gambar | Unggah logo lagi (±400 px). |
| Sambutan Kepala Sekolah | Gambar | Foto; **Keterangan** = kalimat sambutan; **Tautan** = alamat halaman sambutan/profil. |
| Footer: Lokasi & Kontak | HTML "Lokasi" | Sudah berisi peta pencarian "SMP Negeri 65 Batam". Untuk titik yang tepat, ganti dengan kode peta lama atau dari Google Maps → **Bagikan** → **Sematkan peta**. |
| Footer: Lokasi & Kontak | HTML "Kontak" | Alamat/telepon/email (contoh di bawah). Kosongkan jika tidak perlu. |
| Footer: Link Penting Pendidikan | Daftar Link | Sudah terisi 3 link; **cocokkan dengan link di widget lama**. |
| Footer: Kata Mutiara & Gadget Lain | HTML + **Tambah Gadget** | Kutipan sudah terisi. Tambah **Statistik Blog** dengan judul "Total Pengunjung". |
| Kategori (Halaman Berita) | Label | Pilih **Semua label**. |

Contoh isi widget **Kontak**:
```html
<ul class="footer-list">
  <li>[Alamat sekolah]</li>
  <li><a href="tel:[nomor]">[nomor telepon]</a></li>
  <li><a href="mailto:[email]">[email]</a></li>
</ul>
```

## 4. Setelan
- **Setelan → Postingan → Maksimum postingan di halaman utama**: `6` (kartu berita tersusun 3 kolom).
- **Setelan → Bahasa dan format**: Bahasa Indonesia; format tanggal seperti `6 Oktober 2026`.

## 5. Halaman Profil (opsional)
Jika ingin halaman profil bergaya baru, buka halaman profil yang ada, pindah ke tampilan **HTML** (ikon `< >`),
lalu tempel isi `blogger/halaman/profil.html` dan ganti teks di dalam [kurung siku].
Halaman lain yang sudah ada tetap bisa dipakai apa adanya.

## 6. Menulis berita
- Gambar pertama di dalam postingan otomatis menjadi gambar kartu berita.
- Label postingan tampil sebagai kategori di halaman berita.
- Tema ini **tidak menampilkan kolom komentar**.

## Mengubah desain
Jangan edit `tema-smpn65batam.xml` langsung. Ubah `assets/css/style.css`, `blogger/src/blogger.css`,
`blogger/src/template.xml`, atau `blogger/src/theme.js`, lalu jalankan:
```bash
python3 blogger/src/build.py
```
