/*
 * ============================================================
 *  DATA WEBSITE SMPN 65 BATAM
 *  Semua teks dan tautan diatur di file ini.
 *  - Isian yang dikosongkan ("") atau daftar kosong ([]) otomatis
 *    disembunyikan / ditampilkan sebagai "sedang diperbarui".
 *  - Tanggal ditulis dengan format TAHUN-BULAN-TANGGAL, mis. "2026-10-06".
 * ============================================================
 */
window.SITE = {
  sekolah: {
    nama: "SMP Negeri 65 Batam",
    namaPendek: "SMPN 65 Batam",
    slogan: "Media Informasi & Pengumuman Sekolah",
    logo: "assets/img/logo.png"
  },

  // Identitas sekolah (halaman Profil). Kosongkan nilai yang belum diketahui.
  identitas: [
    { label: "Nama Sekolah", nilai: "SMP Negeri 65 Batam" },
    { label: "NPSN", nilai: "" },
    { label: "Status", nilai: "Negeri" },
    { label: "Akreditasi", nilai: "" },
    { label: "Alamat", nilai: "" },
    { label: "Kota", nilai: "Batam, Kepulauan Riau" }
  ],

  kontak: {
    alamat: "",
    telepon: "",
    email: "",
    instagram: "",   // URL lengkap, mis. "https://instagram.com/..."
    youtube: "",
    facebook: ""
  },

  // Footer: peta lokasi. "embed" = alamat dari Google Maps → Bagikan → Sematkan peta (bagian src="...").
  lokasi: {
    judul: "Lokasi SMPN 65 Batam",
    embed: "https://www.google.com/maps?q=SMP+Negeri+65+Batam&output=embed",
    tautan: "https://www.google.com/maps/search/?api=1&query=SMP+Negeri+65+Batam"
  },

  // Footer: tautan penting dunia pendidikan
  linkPenting: [
    { nama: "Cek NISN Siswa", url: "https://nisn.data.kemendikdasmen.go.id/" },
    { nama: "Download Buku Siswa PAUD, SD, SMP, SMA", url: "https://buku.kemendikdasmen.go.id/" },
    { nama: "Cek Data Dapodik Guru (Info GTK)", url: "https://info.gtk.dikdasmen.go.id/" }
  ],

  // Footer: kata-kata mutiara
  kataMutiara: {
    teks: "Jika kamu tak tahan penatnya belajar, maka kamu akan menanggung perihnya kebodohan.",
    sumber: "Imam Syafi'i"
  },

  // Tautan aplikasi/layanan eksternal. Isi URL lengkap.
  tautan: {
    simantap: "",          // Aplikasi SIMANTAP 65
    portalRamahAnak: ""    // Formulir/portal Sekolah Ramah Anak (jika ada)
  },

  kepalaSekolah: {
    nama: "",
    foto: "assets/img/kepala-sekolah.jpg",
    // Setiap item = satu paragraf.
    sambutan: [
      "Selamat datang di website Aksiguna SMPN 65 Batam."
    ]
  },

  visi: "",
  misi: [],

  // Daftar berita/pengumuman. Yang terbaru otomatis tampil paling atas.
  berita: [
    {
      id: "portal-sekolah-ramah-anak",
      judul: "Kini Hadir Portal Sekolah Ramah Anak SMPN 65 Batam",
      tanggal: "2026-10-06",
      kategori: "Pengumuman",
      gambar: "assets/img/berita/portal-ramah-anak.jpg",
      ringkasan: "Sekolah adalah tempat untuk belajar, bertumbuh, dan merasa aman. Kini, siswa SMPN 65 Batam punya ruang untuk bercerita.",
      // Isi lengkap: satu item = satu paragraf.
      isi: []
    },
    {
      id: "kegiatan-literasi",
      judul: "Kegiatan Literasi SMP Negeri 65 Batam",
      tanggal: "",
      kategori: "Literasi",
      gambar: "",
      ringkasan: "",
      isi: []
    }
  ],

  // Album foto. "keterangan" opsional.
  galeri: [
    { src: "assets/img/berita/portal-ramah-anak.jpg", keterangan: "Portal Sekolah Ramah Anak" }
  ]
};
