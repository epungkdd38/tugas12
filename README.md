# E-Katalog - Website Pencarian Produk

Website PHP untuk mencari data e-katalog dengan penyimpanan data menggunakan JSON.

## Fitur

- **Pencarian Produk**: Cari produk berdasarkan nama, merek, atau deskripsi
- **Filter Kategori**: Filter produk berdasarkan kategori (Electronics, Fashion, Books)
- **Penyimpanan JSON**: Data produk disimpan dalam format JSON yang mudah dikelola
- **Interface Responsif**: Desain yang responsif dan user-friendly
- **Validasi Input**: Keamanan dengan sanitasi input data

## Struktur File

```
tugas12/
├── index.php          # Halaman utama website
├── functions.php      # Fungsi-fungsi untuk mengelola data
├── data.json         # Database produk dalam format JSON
├── style.css         # Styling CSS untuk tampilan
├── test.php          # File test untuk validasi fungsi
└── README.md         # Dokumentasi
```

## Cara Menjalankan

1. **Persyaratan**:
   - PHP 7.4 atau lebih baru
   - Web server (Apache/Nginx) atau PHP built-in server

2. **Menjalankan dengan PHP Built-in Server**:
   ```bash
   php -S localhost:8000
   ```

3. **Akses Website**:
   Buka browser dan akses `http://localhost:8000`

## Cara Menggunakan

1. **Pencarian Semua Produk**: 
   - Buka halaman utama untuk melihat semua produk

2. **Pencarian dengan Kata Kunci**:
   - Masukkan kata kunci di kolom "Cari Produk"
   - Klik tombol "Cari Produk"

3. **Filter berdasarkan Kategori**:
   - Pilih kategori dari dropdown "Kategori"
   - Klik tombol "Cari Produk"

4. **Pencarian Kombinasi**:
   - Masukkan kata kunci DAN pilih kategori
   - Klik tombol "Cari Produk"

## Format Data JSON

Data produk disimpan dalam file `data.json` dengan struktur:

```json
[
  {
    "id": 1,
    "name": "Nama Produk",
    "category": "Kategori",
    "price": 1000000,
    "description": "Deskripsi produk",
    "brand": "Merek",
    "stock": 10
  }
]
```

## Menambah Data Produk

1. Edit file `data.json`
2. Tambahkan objek produk baru dengan struktur yang sama
3. Pastikan ID unik untuk setiap produk
4. Simpan file dan refresh halaman website

## Testing

Jalankan test untuk memvalidasi fungsi:

```bash
php test.php
```

## Fitur yang Tersedia

- ✅ Pencarian berdasarkan nama produk
- ✅ Pencarian berdasarkan merek
- ✅ Pencarian berdasarkan deskripsi
- ✅ Filter berdasarkan kategori
- ✅ Kombinasi pencarian dan filter
- ✅ Format harga dalam Rupiah
- ✅ Validasi dan sanitasi input
- ✅ Interface responsif
- ✅ Penanganan hasil kosong

## Teknologi yang Digunakan

- **Backend**: PHP 8.3
- **Frontend**: HTML5, CSS3
- **Data Storage**: JSON
- **Styling**: Custom CSS dengan gradien dan efek hover