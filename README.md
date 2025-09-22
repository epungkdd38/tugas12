# 🎓 Project Kelas 12 - Sistem Manajemen Siswa

Selamat datang di Project Kelas 12! Ini adalah aplikasi web sederhana untuk mengelola data siswa yang dibuat menggunakan HTML, CSS, dan JavaScript. Project ini mendemonstrasikan konsep-konsep pemrograman dasar yang dipelajari di kelas 12.

## 📋 Deskripsi Project

Sistem Manajemen Siswa adalah aplikasi berbasis web yang memungkinkan pengguna untuk:
- ✅ Menambah data siswa baru
- 📝 Mengedit data siswa yang sudah ada
- 🗑️ Menghapus data siswa
- 🔍 Mencari siswa berdasarkan nama, kelas, atau NISN
- 💾 Menyimpan data secara lokal di browser
- 📊 Melihat statistik jumlah siswa
- 📄 Mengekspor data ke file JSON

## 🎯 Konsep Pemrograman yang Diimplementasikan

### 1. **Struktur Data**
- **Array**: Menyimpan koleksi data siswa
- **Object**: Merepresentasikan data siswa individual
- **JSON**: Format penyimpanan dan pertukaran data

### 2. **Pemrograman Berorientasi Objek**
- **Class Student**: Mendefinisikan blueprint untuk objek siswa
- **Constructor**: Inisialisasi objek siswa baru
- **Method**: Fungsi dalam class untuk validasi dan generate ID

### 3. **Algoritma dan Logika**
- **Searching Algorithm**: Pencarian data siswa
- **Validation**: Validasi input data
- **CRUD Operations**: Create, Read, Update, Delete

### 4. **Manipulasi DOM**
- **Event Handling**: Menangani interaksi pengguna
- **Dynamic Content**: Mengubah konten HTML secara dinamis
- **Form Processing**: Memproses input form

### 5. **Local Storage**
- **Data Persistence**: Menyimpan data di browser
- **JSON Serialization**: Mengkonversi object ke string dan sebaliknya

## 🚀 Cara Menjalankan Project

### Metode 1: Buka Langsung di Browser
1. Download atau clone repository ini
2. Buka file `index.html` di browser web (Chrome, Firefox, Safari, dll.)
3. Aplikasi siap digunakan!

### Metode 2: Menggunakan Live Server (Opsional)
```bash
# Jika menggunakan VS Code dengan Live Server extension
1. Buka folder project di VS Code
2. Klik kanan pada index.html
3. Pilih "Open with Live Server"
```

## 📖 Cara Menggunakan Aplikasi

### Menambah Siswa Baru
1. Isi form "Tambah Data Siswa" dengan informasi lengkap
2. Klik tombol "Tambah Siswa"
3. Data akan otomatis tersimpan dan muncul di daftar siswa

### Mencari Siswa
1. Gunakan kotak pencarian untuk mencari berdasarkan nama, kelas, atau NISN
2. Hasil pencarian akan muncul secara real-time

### Mengedit Data Siswa
1. Klik tombol "Edit" pada kartu siswa yang ingin diedit
2. Form akan terisi dengan data siswa
3. Ubah data yang diinginkan
4. Klik "Update Siswa"

### Menghapus Data Siswa
1. Klik tombol "Hapus" pada kartu siswa
2. Konfirmasi penghapusan
3. Data akan dihapus permanen

### Export Data
1. Klik tombol "Export Data"
2. File JSON akan didownload berisi semua data siswa

## 🗂️ Struktur File

```
tugas12/
├── index.html          # File HTML utama
├── style.css           # File CSS untuk styling
├── script.js           # File JavaScript untuk logika
├── README.md           # Dokumentasi project
└── docs/              # Folder dokumentasi tambahan
    ├── konsep-pemrograman.md
    └── panduan-pengembangan.md
```

## 💡 Fitur-Fitur Utama

### 🔐 Validasi Data
- **Nama**: Minimal 2 karakter
- **NISN**: Harus 10 digit angka dan unik
- **Email**: Format email yang valid
- **Telepon**: Minimal 10 karakter
- **Kelas**: Harus dipilih dari dropdown

### 📱 Responsive Design
- Tampilan optimal di desktop, tablet, dan mobile
- Layout yang fleksibel dan user-friendly

### 💾 Penyimpanan Lokal
- Data tersimpan di localStorage browser
- Data tetap ada meskipun browser ditutup
- Tidak memerlukan database server

### 🎨 User Interface
- Design modern dan menarik
- Animasi dan transisi yang smooth
- Feedback visual untuk interaksi pengguna

## 🧪 Testing dan Debugging

### Manual Testing
1. **Test Input Validation**
   - Coba input data kosong
   - Coba NISN dengan format salah
   - Coba email dengan format salah

2. **Test CRUD Operations**
   - Tambah beberapa siswa
   - Edit data siswa
   - Hapus siswa
   - Cari siswa

3. **Test Data Persistence**
   - Refresh halaman
   - Tutup dan buka browser
   - Pastikan data tetap ada

### Browser Console
```javascript
// Untuk debugging, buka Developer Tools (F12) dan gunakan console
console.log(students); // Lihat data siswa
console.log(Storage.load()); // Lihat data di localStorage
```

## 📚 Pembelajaran dan Pengembangan

### Konsep yang Dipelajari
1. **HTML**: Struktur dan semantik web
2. **CSS**: Styling, layout, dan responsive design
3. **JavaScript**: Logika pemrograman, DOM manipulation
4. **Data Structures**: Array, Object, JSON
5. **Algorithms**: Search, validation, sorting
6. **Local Storage**: Client-side data persistence

### Ide Pengembangan Lebih Lanjut
- 📊 Tambahkan grafik statistik siswa per kelas
- 📧 Fitur kirim email ke siswa
- 🖼️ Upload foto siswa
- 📋 Export ke format Excel/PDF
- 🔐 Sistem login dan autentikasi
- 🌐 Koneksi ke database server
- 📱 Progressive Web App (PWA)

## 🤝 Kontribusi

Project ini dibuat untuk keperluan pembelajaran. Anda dapat:
- Fork repository ini
- Menambah fitur baru
- Memperbaiki bug
- Meningkatkan dokumentasi

## 📄 Lisensi

Project ini dibuat untuk keperluan edukasi dan dapat digunakan secara bebas untuk pembelajaran.

## 👨‍💻 Pembuat

Project Kelas 12 - Sistem Manajemen Siswa
Dibuat dengan ❤️ menggunakan HTML, CSS, dan JavaScript

---

**Selamat belajar dan semoga project ini bermanfaat! 🚀**