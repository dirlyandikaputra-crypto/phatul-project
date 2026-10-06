import os
import urllib.request

# Buat direktori tujuan jika belum ada
output_dir = os.path.join("assets", "images")
os.makedirs(output_dir, exist_ok=True)

images = {
    "kemeja-linen.jpg": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80",
    "sneakers-streetwear.jpg": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
    "jaket-denim.jpg": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
    "sepatu-lari.jpg": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    "kaos-polo.jpg": "https://images.unsplash.com/photo-1625910513413-5fc281be4300?w=800&auto=format&fit=crop&q=80",
    "sepatu-loafers.jpg": "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=80",
    "hoodie-fleece.jpg": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    "sepatu-canvas.jpg": "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&auto=format&fit=crop&q=80"
}

print("Mulai mengunduh aset gambar...")
for filename, url in images.items():
    filepath = os.path.join(output_dir, filename)
    print(f"Mengunduh {filename}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
        out_file.write(response.read())

print("Semua aset gambar berhasil diunduh ke folder assets/images/")