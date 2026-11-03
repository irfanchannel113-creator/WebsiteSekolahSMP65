# Website SMP Negeri 65 Batam

Desain website sekolah bertema biru dan minimalis.

- **Tema Blogger** (untuk dipasang di situs sekolah): `blogger/tema-smpn65batam.xml` — lihat [`blogger/PANDUAN.md`](blogger/PANDUAN.md).
- **Prototipe statis** (HTML, CSS, JavaScript murni) untuk melihat desain: file `*.html` di folder utama.

## Halaman
| File | Isi |
|---|---|
| `index.html` | Beranda: akses cepat, berita terbaru, sambutan kepala sekolah |
| `profil.html` | Sambutan, visi & misi, identitas sekolah |
| `berita.html` | Semua berita dengan filter kategori dan pencarian (`?kategori=Literasi` = Literasi Digital) |
| `artikel.html?id=...` | Detail berita |
| `galeri.html` | Album foto |
| `layanan-bk.html` | Layanan Bimbingan Konseling & Portal Sekolah Ramah Anak |

## Mengubah isi
Semua teks dan tautan ada di **`assets/js/data.js`**. Isian yang kosong (`""` atau `[]`) otomatis disembunyikan
atau ditampilkan sebagai "sedang diperbarui".

Menambah berita: salin satu blok di `berita`, ganti `id` (huruf kecil, pakai tanda hubung), `judul`, `tanggal`
(format `2026-10-06`), `kategori`, `gambar`, `ringkasan`, dan `isi` (satu item = satu paragraf).

## Gambar
Gambar saat ini **dipotong dari tangkapan layar** situs lama, jadi resolusinya rendah. Ganti dengan file asli
menggunakan nama yang sama:

- `assets/img/logo.png` — logo, latar transparan (±440 px)
- `assets/img/kepala-sekolah.jpg` — foto kepala sekolah (rasio 4:3)
- `assets/img/berita/` — gambar berita (rasio 4:3, lebar ±800 px)

## Menjalankan
Buka `index.html` di browser, atau jalankan `python3 -m http.server` lalu buka `http://localhost:8000`.
Bisa dipublikasikan gratis lewat GitHub Pages (Settings → Pages → Deploy from branch).
