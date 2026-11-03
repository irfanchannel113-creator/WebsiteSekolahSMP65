(function () {
  "use strict";
  // Menu ponsel
  var btn = document.querySelector(".nav-toggle"), nav = document.getElementById("main-nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
      btn.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    });
  }

  // Sub-menu: item menu yang namanya diawali "_" (mis. "_Visi Misi") masuk ke
  // dropdown item di atasnya. Diatur lewat Tata Letak → widget Menu.
  var navLinks = document.querySelector(".nav-links");
  if (navLinks) {
    var parent = null;
    [].slice.call(navLinks.children).forEach(function (a) {
      if (a.tagName !== "A") return;
      var text = a.textContent.trim();
      if (text.charAt(0) === "_" && parent) {
        a.textContent = text.replace(/^_+\s*/, "");
        if (!parent.sub) {
          parent.sub = document.createElement("div");
          parent.sub.className = "submenu";
          parent.item.classList.add("has-sub");
          parent.item.appendChild(parent.sub);
        }
        parent.sub.appendChild(a);
      } else {
        var item = document.createElement("div");
        item.className = "nav-item";
        navLinks.insertBefore(item, a);
        item.appendChild(a);
        parent = { item: item, sub: null };
      }
    });
  }

  // Tautan ke situs lain dibuka di tab baru
  [].slice.call(document.querySelectorAll("a[href]")).forEach(function (a) {
    if (/^https?:$/.test(a.protocol) && a.host !== location.host) {
      a.target = "_blank";
      a.rel = "noopener";
    }
  });

  // Penanda menu aktif
  function clean(path) {
    try { path = decodeURIComponent(path); } catch (e) {}
    return path.replace(/\/+$/, "") || "/";
  }
  var here = clean(location.pathname);
  var links = [].slice.call(document.querySelectorAll(".nav-links a"));
  var match = null;
  links = links.filter(function (a) { return a.getAttribute("href").charAt(0) !== "#"; });
  links.forEach(function (a) {
    var u = new URL(a.getAttribute("href"), location.href);
    if (u.host === location.host && clean(u.pathname) === here) match = a;
  });
  // Berita (postingan, pencarian, label) termasuk menu Beranda
  if (!match && (/^\/\d{4}\/\d{2}\//.test(here) || here.indexOf("/search") === 0)) {
    links.forEach(function (a) {
      var u = new URL(a.getAttribute("href"), location.href);
      if (!match && u.host === location.host && clean(u.pathname) === "/") match = a;
    });
  }
  if (match) {
    match.classList.add("active");
    match.setAttribute("aria-current", "page");
    var top = match.closest(".nav-item");
    if (top && top.firstElementChild !== match) top.firstElementChild.classList.add("active");
  }

  // Penanda kategori aktif
  var q = new URLSearchParams(location.search).get("q");
  [].slice.call(document.querySelectorAll(".chips a")).forEach(function (a) {
    var u = new URL(a.getAttribute("href"), location.href);
    if (clean(u.pathname) === here && !(here === "/search" && q)) a.classList.add("active");
  });

  // Dropdown: di ponsel sub-menu tertutup dan dibuka/ditutup dengan mengetuk induknya;
  // di desktop terbuka saat kursor diarahkan, atau saat induk bertautan "#" diklik.
  var mobileNav = window.matchMedia("(max-width: 1100px)");
  [].slice.call(document.querySelectorAll(".has-sub > a")).forEach(function (a) {
    var item = a.parentNode;
    a.setAttribute("aria-haspopup", "true");
    a.setAttribute("aria-expanded", "false");
    a.addEventListener("click", function (e) {
      if (a.getAttribute("href") !== "#" && !mobileNav.matches) return;
      e.preventDefault();
      a.setAttribute("aria-expanded", item.classList.toggle("open"));
    });
    // Sedang di salah satu halaman sub-menu: di ponsel langsung terbuka
    if (mobileNav.matches && item.querySelector(".submenu a.active")) {
      item.classList.add("open");
      a.setAttribute("aria-expanded", "true");
    }
  });
  document.addEventListener("click", function (e) {
    if (mobileNav.matches) return;
    [].slice.call(document.querySelectorAll(".has-sub.open")).forEach(function (el) {
      if (!el.contains(e.target)) {
        el.classList.remove("open");
        el.firstElementChild.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Tombol eksternal yang belum diisi (#) tampil nonaktif
  [].slice.call(document.querySelectorAll('a[href="#"]')).filter(function (a) {
    return !a.parentNode.classList.contains("has-sub");
  }).forEach(function (a) {
    a.classList.add("is-disabled");
    a.setAttribute("aria-disabled", "true");
    a.setAttribute("title", "Tautan belum diatur");
    a.removeAttribute("target");
    a.addEventListener("click", function (e) { e.preventDefault(); });
  });

  // Tahun di footer
  [].slice.call(document.querySelectorAll("[data-year]")).forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Album: klik foto untuk memperbesar
  var dlg = document.getElementById("lightbox");
  document.addEventListener("click", function (e) {
    var it = e.target.closest && e.target.closest(".gallery a.gallery-item");
    if (!it || !dlg || !dlg.showModal) return;
    e.preventDefault();
    var img = it.querySelector("img");
    dlg.querySelector("img").src = it.getAttribute("href");
    dlg.querySelector("img").alt = img ? img.alt : "";
    dlg.querySelector("p").textContent = img ? img.alt : "";
    dlg.showModal();
  });
  if (dlg) dlg.addEventListener("click", function () { dlg.close(); });
})();
