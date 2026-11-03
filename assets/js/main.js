(function () {
  "use strict";

  var S = window.SITE;
  var page = document.body.getAttribute("data-page");

  /* ---------- Utilitas ---------- */
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function $(sel) { return document.querySelector(sel); }
  function formatTanggal(iso) {
    if (!iso) return "";
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  }
  function urutBerita() {
    return S.berita.slice().sort(function (a, b) {
      return (b.tanggal || "").localeCompare(a.tanggal || "");
    });
  }
  function param(name) {
    return new URLSearchParams(location.search).get(name);
  }

  var ICON = {
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    app: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    link: '<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
    news: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/>'
  };
  function icon(name, cls) {
    return '<svg class="ic ' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[name] + "</svg>";
  }

  // Tautan eksternal: jika URL belum diisi, tampilkan sebagai nonaktif.
  function extLink(url, inner, cls) {
    if (url) {
      return '<a class="' + cls + '" href="' + esc(url) + '" target="_blank" rel="noopener">' + inner + "</a>";
    }
    return '<a class="' + cls + ' is-disabled" aria-disabled="true" title="Tautan belum diatur">' + inner + "</a>";
  }

  /* ---------- Header ---------- */
  var T = S.tautan;
  var NAV = [
    { id: "beranda", label: "Beranda", href: "index.html" },
    { id: "profil", label: "Profil", href: "profil.html" },
    { id: "literasi", label: "Literasi Digital", href: T.literasi },
    { id: "album", label: "Album", href: T.album },
    { id: "aplikasi", label: "Aplikasi SIMANTAP", href: T.aplikasi },
    { id: "bk", label: "Bimbingan Konseling", href: T.bk }
  ];
  // Tautan ke situs lain dibuka di tab baru
  function navLink(n, cls) {
    var ext = /^https?:/.test(n.href) ? ' target="_blank" rel="noopener"' : "";
    return '<a href="' + esc(n.href) + '"' + ext + (cls || "") + ">" + n.label + "</a>";
  }

  function aktif(id) {
    if (page === "berita" || page === "artikel") return id === "beranda";
    return id === page;
  }

  function renderHeader() {
    var links = NAV.map(function (n) {
      return navLink(n, aktif(n.id) ? ' class="active" aria-current="page"' : "");
    }).join("");

    $("#site-header").innerHTML =
      '<div class="container header-inner">' +
        '<a class="brand" href="index.html">' +
          '<img src="' + esc(S.sekolah.logo) + '" alt="Logo ' + esc(S.sekolah.nama) + '" width="40" height="39">' +
          '<span><strong>' + esc(S.sekolah.namaPendek) + '</strong><small>' + esc(S.sekolah.slogan) + "</small></span>" +
        "</a>" +
        '<button class="nav-toggle" aria-label="Buka menu" aria-expanded="false" aria-controls="main-nav">' + icon("menu") + "</button>" +
        '<nav id="main-nav" class="main-nav" aria-label="Menu utama">' + links +
          extLink(S.tautan.simantap, icon("app") + "SIMANTAP 65", "btn btn-primary btn-sm nav-cta") +
        "</nav>" +
      "</div>";

    var btn = $(".nav-toggle"), nav = $("#main-nav");
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
      btn.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
      btn.innerHTML = icon(open ? "close" : "menu");
    });
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    var k = S.kontak, rows = "";
    if (k.alamat) rows += "<li>" + icon("pin") + "<span>" + esc(k.alamat) + "</span></li>";
    if (k.telepon) rows += "<li>" + icon("phone") + '<a href="tel:' + esc(k.telepon.replace(/\s/g, "")) + '">' + esc(k.telepon) + "</a></li>";
    if (k.email) rows += "<li>" + icon("mail") + '<a href="mailto:' + esc(k.email) + '">' + esc(k.email) + "</a></li>";
    ["instagram", "youtube", "facebook"].forEach(function (s) {
      if (k[s]) rows += "<li>" + icon("link") + '<a href="' + esc(k[s]) + '" target="_blank" rel="noopener">' + s.charAt(0).toUpperCase() + s.slice(1) + "</a></li>";
    });

    var L = S.lokasi || {};
    var lokasi = L.embed
      ? '<div class="footer-col footer-map"><h3>' + esc(L.judul) + "</h3>" +
          '<iframe src="' + esc(L.embed) + '" title="Peta lokasi ' + esc(S.sekolah.nama) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>' +
          (L.tautan ? '<a class="map-link" href="' + esc(L.tautan) + '" target="_blank" rel="noopener">' + icon("pin") + "Buka di Google Maps</a>" : "") +
          (rows ? '<ul class="footer-list">' + rows + "</ul>" : "") +
        "</div>"
      : "";

    var penting = (S.linkPenting || []).length
      ? '<div class="footer-col"><h3>Link Penting Pendidikan</h3><ul class="footer-list footer-links">' +
          S.linkPenting.map(function (l) { return "<li>" + icon("arrow") + '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.nama) + "</a></li>"; }).join("") +
        "</ul></div>"
      : "";

    var km = S.kataMutiara;
    var mutiara = km && km.teks
      ? '<div class="footer-col"><h3>Kata-Kata Mutiara</h3><blockquote class="footer-quote"><p>' + esc(km.teks) + "</p>" +
          (km.sumber ? "<cite>" + esc(km.sumber) + "</cite>" : "") + "</blockquote></div>"
      : "";

    $("#site-footer").innerHTML =
      '<div class="container footer-grid">' +
        lokasi +
        '<div class="footer-col"><h3>Tautan</h3><ul class="footer-list footer-links">' +
          [NAV[1], { label: "Berita &amp; Pengumuman", href: "berita.html" }].concat(NAV.slice(2))
            .map(function (n) { return "<li>" + icon("arrow") + navLink(n) + "</li>"; }).join("") +
        "</ul></div>" +
        penting + mutiara +
      "</div>" +
      '<div class="container footer-bottom">' +
        '<span><img src="' + esc(S.sekolah.logo) + '" alt="" width="22" height="21">© ' + new Date().getFullYear() + " " + esc(S.sekolah.nama) + "</span>" +
        "<span>" + esc(S.sekolah.slogan) + "</span>" +
      "</div>";
  }

  /* ---------- Komponen ---------- */
  function thumb(b) {
    if (b.gambar) {
      return '<img src="' + esc(b.gambar) + '" alt="" loading="lazy">';
    }
    return '<div class="thumb-fallback">' + icon(b.kategori === "Literasi" ? "book" : "news") + "</div>";
  }

  function kartuBerita(b) {
    var meta = '<span class="tag">' + esc(b.kategori) + "</span>" +
      (b.tanggal ? '<time datetime="' + esc(b.tanggal) + '">' + formatTanggal(b.tanggal) + "</time>" : "");
    return '<article class="card news-card">' +
      '<a class="news-thumb" href="artikel.html?id=' + encodeURIComponent(b.id) + '" tabindex="-1" aria-hidden="true">' + thumb(b) + "</a>" +
      '<div class="news-body">' +
        '<div class="meta">' + meta + "</div>" +
        '<h3><a href="artikel.html?id=' + encodeURIComponent(b.id) + '">' + esc(b.judul) + "</a></h3>" +
        (b.ringkasan ? "<p>" + esc(b.ringkasan) + "</p>" : "") +
      "</div>" +
    "</article>";
  }

  function kosong(teks) {
    return '<p class="empty">' + esc(teks) + "</p>";
  }

  /* ---------- Halaman ---------- */
  var PAGES = {
    beranda: function () {
      // Akses cepat
      var quick = [
        { ic: "app", t: "SIMANTAP 65", d: "Aplikasi sekolah", url: T.simantap, ext: true },
        { ic: "book", t: "Literasi Digital", d: "Kegiatan & karya literasi", url: T.literasi, ext: true },
        { ic: "chat", t: "Bimbingan Konseling", d: "Sekolah Ramah Anak", url: T.bk, ext: true },
        { ic: "image", t: "Album", d: "Hasil karya & kegiatan", url: T.album, ext: true }
      ];
      $("#quick").innerHTML = quick.map(function (q) {
        var inner = '<span class="quick-ic">' + icon(q.ic) + "</span><span><strong>" + q.t + "</strong><small>" + q.d + "</small></span>";
        return q.ext ? extLink(q.url, inner, "quick-item") : '<a class="quick-item" href="' + q.url + '">' + inner + "</a>";
      }).join("");

      // Berita terbaru
      var list = urutBerita().slice(0, 3);
      $("#latest").innerHTML = list.length ? list.map(kartuBerita).join("") : kosong("Belum ada berita.");

      // Sambutan
      var ks = S.kepalaSekolah;
      $("#welcome").innerHTML =
        (ks.foto ? '<img class="welcome-photo" src="' + esc(ks.foto) + '" alt="Kepala ' + esc(S.sekolah.nama) + '" loading="lazy">' : "") +
        '<div class="welcome-text">' +
          '<p class="eyebrow">Sambutan Kepala Sekolah</p>' +
          "<blockquote>" + esc(ks.sambutan[0] || "") + "</blockquote>" +
          (ks.nama ? '<p class="welcome-name">' + esc(ks.nama) + "<span>Kepala " + esc(S.sekolah.nama) + "</span></p>" : "") +
          '<a class="link-arrow" href="profil.html#sambutan">Baca sambutan ' + icon("arrow") + "</a>" +
        "</div>";
    },

    profil: function () {
      var ks = S.kepalaSekolah;
      $("#sambutan-body").innerHTML =
        (ks.foto ? '<img class="welcome-photo" src="' + esc(ks.foto) + '" alt="Kepala ' + esc(S.sekolah.nama) + '">' : "") +
        '<div class="prose">' + ks.sambutan.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
          (ks.nama ? '<p class="welcome-name">' + esc(ks.nama) + "<span>Kepala " + esc(S.sekolah.nama) + "</span></p>" : "") +
        "</div>";

      var visi = S.visi ? '<p class="visi">' + esc(S.visi) + "</p>" : kosong("Visi sedang diperbarui.");
      var misi = S.misi.length
        ? '<ol class="misi">' + S.misi.map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("") + "</ol>"
        : kosong("Misi sedang diperbarui.");
      $("#visi-misi-body").innerHTML =
        '<div class="card pad"><h3>Visi</h3>' + visi + "</div>" +
        '<div class="card pad"><h3>Misi</h3>' + misi + "</div>";

      var rows = S.identitas.filter(function (r) { return r.nilai; });
      $("#identitas-body").innerHTML = rows.length
        ? '<dl class="id-list">' + rows.map(function (r) { return "<div><dt>" + esc(r.label) + "</dt><dd>" + esc(r.nilai) + "</dd></div>"; }).join("") + "</dl>"
        : kosong("Identitas sekolah sedang diperbarui.");
    },

    berita: function () {
      var semua = urutBerita();
      var kategori = ["Semua"].concat(semua.map(function (b) { return b.kategori; })
        .filter(function (k, i, a) { return k && a.indexOf(k) === i; }));
      var state = { kat: param("kategori") || "Semua", q: "" };
      if (kategori.indexOf(state.kat) < 0) state.kat = "Semua";

      if (state.kat === "Literasi") {
        $("#page-title").textContent = "Literasi Digital";
        $("#page-lead").textContent = "Kegiatan dan karya literasi warga SMPN 65 Batam.";
        document.title = "Literasi Digital — " + S.sekolah.namaPendek;
      }

      var chips = $("#chips");
      function drawChips() {
        chips.innerHTML = kategori.map(function (k) {
          return '<button type="button" class="chip' + (k === state.kat ? " active" : "") + '" aria-pressed="' + (k === state.kat) + '" data-k="' + esc(k) + '">' + esc(k) + "</button>";
        }).join("");
      }
      function drawList() {
        var q = state.q.toLowerCase();
        var hasil = semua.filter(function (b) {
          return (state.kat === "Semua" || b.kategori === state.kat) &&
            (!q || (b.judul + " " + b.ringkasan).toLowerCase().indexOf(q) > -1);
        });
        $("#news-list").innerHTML = hasil.length ? hasil.map(kartuBerita).join("") : kosong("Tidak ada berita yang cocok.");
      }
      chips.addEventListener("click", function (e) {
        var b = e.target.closest(".chip");
        if (!b) return;
        state.kat = b.getAttribute("data-k");
        var url = state.kat === "Semua" ? "berita.html" : "berita.html?kategori=" + encodeURIComponent(state.kat);
        history.replaceState(null, "", url);
        drawChips(); drawList();
      });
      $("#search").addEventListener("input", function (e) { state.q = e.target.value.trim(); drawList(); });
      drawChips(); drawList();
    },

    artikel: function () {
      var b = S.berita.filter(function (x) { return x.id === param("id"); })[0];
      var el = $("#article");
      if (!b) {
        el.innerHTML = '<h1>Berita tidak ditemukan</h1><p class="lead">Berita yang Anda cari mungkin sudah dipindahkan.</p>' +
          '<a class="btn btn-primary" href="berita.html">' + icon("back") + "Kembali ke berita</a>";
        return;
      }
      document.title = b.judul + " — " + S.sekolah.namaPendek;
      var isi = b.isi.length
        ? b.isi.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("")
        : (b.ringkasan ? "<p>" + esc(b.ringkasan) + "</p>" : "") + kosong("Isi lengkap berita ini belum ditambahkan.");
      el.innerHTML =
        '<a class="link-back" href="berita.html">' + icon("back") + "Semua berita</a>" +
        '<div class="meta"><span class="tag">' + esc(b.kategori) + "</span>" +
          (b.tanggal ? '<time datetime="' + esc(b.tanggal) + '">' + formatTanggal(b.tanggal) + "</time>" : "") + "</div>" +
        "<h1>" + esc(b.judul) + "</h1>" +
        (b.gambar ? '<img class="article-img" src="' + esc(b.gambar) + '" alt="">' : "") +
        '<div class="prose">' + isi + "</div>";
    }
  };

  renderHeader();
  renderFooter();
  if (PAGES[page]) PAGES[page]();
})();
