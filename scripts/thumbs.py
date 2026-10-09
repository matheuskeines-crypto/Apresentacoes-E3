"""Converte a capa (página 1) de cada material em um PNG 640x360 para os cards do hub."""
import os
import subprocess
import sys

import fitz
from PIL import Image

chrome, dist_root, out_dir, *slugs = sys.argv[1:]

for slug in slugs:
    src = os.path.join(dist_root, slug, "index.html")
    pdf = os.path.join("/tmp", f"_thumb_{slug}.pdf")
    subprocess.run(
        [chrome, "--headless", "--disable-gpu", f"--print-to-pdf={pdf}",
         "--no-pdf-header-footer", "--virtual-time-budget=5000", f"file://{src}"],
        capture_output=True, check=False,
    )
    doc = fitz.open(pdf)
    pix = doc[0].get_pixmap(matrix=fitz.Matrix(2, 2))
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    img.resize((640, 360), Image.LANCZOS).save(os.path.join(out_dir, f"{slug}.png"), optimize=True)
    doc.close()
    os.remove(pdf)
    print(f"  {slug}")
