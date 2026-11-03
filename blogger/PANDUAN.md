# Panduan Memasang Tema Blogger SMPN 65 Batam

File tema: **`blogger/tema-smpn65batam.xml`**

> ⚠️ Tema ini belum pernah dipasang di Blogger asli. Tampilannya sudah diperiksa dengan simulator lokal,
> tetapi Blogger bisa saja menolak bagian tertentu. Karena itu **langkah 1 wajib dilakukan**.

## 1. Cadangkan tema lama
Blogger → **Tema** → klik panah ▾ di samping tombol **Sesuaikan** → **Cadangkan** → **Download**.
Simpan file ini. Jika tema baru bermasalah, pulihkan dengan file ini.

## 2. Pasang tema baru
**Tema** → panah ▾ → **Pulihkan** → unggah `tema-smpn65batam.xml`.
Jika Blogger bertanya soal widget lama yang tidak ada di tema baru, pilih **Hapus widget**
(widget lama tidak punya tempat di tata letak baru). Jika muncul pesan error, salin pesannya untuk diperbaiki.

## 3. Isi widget di menu **Tata Letak**
| Bagian | Widget | Yang diisi |
|---|---|---|
| Logo & Nama Sekolah | Header | Unggah logo (latar transparan), pilih penempatan **"Sebelum judul dan deskripsi"**. Judul = nama sekolah, deskripsi = slogan. |
| Menu Utama | Menu | Daftar menu. Sesuaikan jika alamat halaman berbeda. |
| Menu Utama | Tombol Aplikasi | Ganti `#` dengan alamat aplikasi SIMANTAP 65. |
| Logo Besar (Beranda) | Gambar | Unggah logo lagi (ukuran ±400 px). |
| Akses Cepat (Beranda) | Daftar Link | Ganti `#` pada SIMANTAP 65. Urutan menentukan ikon: aplikasi, buku, percakapan, foto. |
| Sambutan Kepala Sekolah | Gambar | Foto kepala sekolah; **Keterangan** = kalimat sambutan singkat; **Tautan** = `/p/profil.html`. |
| Ajakan (Beranda) | HTML | Teks ajakan dan tombol ke Layanan BK (sudah terisi). |
| Footer: Kontak | HTML | Isi alamat/telepon/email (contoh di bawah). Kosongkan jika belum ada; bagian ini otomatis tersembunyi. |
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
- **Setelan → Postingan → Maksimum postingan di halaman utama**: `6` (agar kartu berita tersusun 3 kolom).
- **Setelan → Bahasa dan format → Bahasa**: Bahasa Indonesia; **Format tanggal**: pilih yang seperti `6 Oktober 2026`.

## 5. Halaman statis
Buat lewat menu **Halaman → Halaman baru**. Pindah ke tampilan **HTML** (ikon `< >`), lalu tempel isi file:

| Judul halaman | Alamat yang terbentuk | Isi dari |
|---|---|---|
| Profil | `/p/profil.html` | `blogger/halaman/profil.html` |
| Layanan BK | `/p/layanan-bk.html` | `blogger/halaman/layanan-bk.html` |
| Album | `/p/album.html` | `blogger/halaman/album.html` |

Alamat halaman dibentuk dari judul **saat pertama kali diterbitkan**. Jika halaman serupa sudah ada dengan alamat lain,
cukup ubah tautannya di widget **Menu**, **Akses Cepat**, dan **Tautan** (footer).

## 6. Menulis berita
- Beri label **Pengumuman** atau **Literasi** (menu "Literasi Digital" membuka label `Literasi`).
- Gambar pertama di dalam postingan otomatis menjadi gambar kartu berita.
- Tema ini **tidak menampilkan kolom komentar**.

## Mengubah desain
Jangan edit `tema-smpn65batam.xml` langsung. Ubah `assets/css/style.css`, `blogger/src/blogger.css`,
`blogger/src/template.xml`, atau `blogger/src/theme.js`, lalu jalankan:
```bash
python3 blogger/src/build.py
```
