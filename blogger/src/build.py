"""Menyusun blogger/tema-smpn65batam.xml dari:
   - assets/css/style.css (desain dasar)
   - blogger/src/blogger.css (penyesuaian Blogger)
   - blogger/src/template.xml dan blogger/src/theme.js
Jalankan dari folder mana saja:  python3 blogger/src/build.py
"""
import pathlib, re

SRC = pathlib.Path(__file__).resolve().parent
ROOT = SRC.parent.parent
css = (ROOT / "assets/css/style.css").read_text() + "\n" + (SRC / "blogger.css").read_text()
js = (SRC / "theme.js").read_text()

# Gaya situs statis yang tidak dipakai di Blogger: menu sebagai anak langsung <nav>
css = css.replace(".main-nav > a:not(.btn)", ".main-nav .nav-links a").replace(".main-nav > a.active", ".main-nav .nav-links a.active")
css = re.sub(r"/\* ={10,}\n   SMPN 65 Batam.*?\*/\n", "", css, flags=re.S)
# Blogger otomatis memberi kelas "section" pada setiap <b:section>, jadi kelas
# desain .section / .section-alt / .section-head diganti menjadi .block / .block-alt / .block-head.
base, extra = css.split("/* ============================================================\n   Tambahan khusus Blogger", 1)
base = re.sub(r"\.section(?=[\s{,:-])", ".block", base)
css = base + "/* ============================================================\n   Tambahan khusus Blogger" + extra

for bad in ("]]>",):
    assert bad not in css and bad not in js, "CSS/JS tidak boleh berisi " + bad

out = (SRC / "template.xml").read_text().replace("%%CSS%%", css.strip()).replace("%%JS%%", js.strip())
dest = ROOT / "blogger" / "tema-smpn65batam.xml"
dest.write_text(out)
print("Tersimpan:", dest, f"({len(out)//1024} KB)")
