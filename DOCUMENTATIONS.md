# BrewFlow POS & Coffee Shop System — Dokumentasi Penggunaan

Aplikasi web modern untuk operasional coffee shop terpadu yang mencakup pemesanan mandiri oleh pelanggan (Dine-in QR / Menu), manajemen pesanan kasir, antrean barista, tampilan pickup publik dengan Text-To-Speech (TTS), serta analitik & manajemen meja bagi pemilik kedai (Owner).

---

## Daftar Isi
1. [Arsitektur & Role Pengguna](#arsitektur--role-pengguna)
2. [Panduan Alur Pengguna (User Journey)](#panduan-alur-pengguna-user-journey)
   - [A. Pelanggan (Customer)](#a-pelanggan-customer)
   - [B. Kasir (Cashier)](#b-kasir-cashier)
   - [C. Barista](#c-barista)
   - [D. Layar Antrean Publik (Pickup Display)](#d-layar-antrean-publik-pickup-display)
   - [E. Pemilik Kedai (Owner Dashboard)](#e-pemilik-kedai-owner-dashboard)
3. [Fitur Utama & Spesifikasi Teknis](#fitur-utama--spesifikasi-teknis)
4. [Menjalankan Aplikasi & Testing](#menjalankan-aplikasi--testing)

---

## 1. Arsitektur & Role Pengguna

Aplikasi menyediakan navigasi role switcher di navbar atas:
- **Customer**: Akses Menu, Pemilihan Meja, Kustomisasi Minuman, Keranjang Belanja, Pembayaran QRIS/Tunai, dan Tracking Status Pesanan.
- **Cashier**: Konfirmasi pesanan masuk, penerimaan pembayaran kasir, pencetakan struk.
- **Barista**: Mengelola antrean pembuatan minuman (Mulai Memasak -> Siap Diambil).
- **Display**: Layar TV/monitor publik yang menampilkan antrean berjalan secara otomatis dengan Text-To-Speech audio.
- **Owner**: Pemantauan omzet harian/metrik, penambahan/penghapusan menu produk, serta generator nomor meja & QR code.

---

## 2. Panduan Alur Pengguna (User Journey)

### A. Pelanggan (Customer)

#### 1. Masuk Lewat QR Meja atau Langsung
- **Scan QR di Meja**:
  - Pelanggan memindai QR code fisik meja (misal URL: `/menu?table=A-01`).
  - Meja otomatis terkunci ke pesanan tanpa modal popup.
- **Buka Langsung Tanpa QR**:
  - Pelanggan membuka `/menu`.
  - Muncul modal **Pilih Meja** untuk memilih nomor meja yang tersedia.
  - Setelah memilih, meja terkunci dan menu kopi terbuka.

#### 2. Memilih & Mengkustomisasi Menu
1. Pilih kategori (All, Coffee, Non-Coffee, Pastry, dll.) atau gunakan kolom pencarian.
2. Klik kartu produk untuk membuka modal opsi:
   - Level Manis (Sugar Level: Normal 100%, Less 50%, None 0%).
   - Suhu (Ice / Hot).
   - Pilihan Susu: Memilih **Oat Milk (+5rb)** otomatis menambahkan biaya Rp 5.000 ke harga dasar produk.
3. Klik **Tambah ke Pesanan**.
4. Floating bar di bagian bawah layar akan menampilkan jumlah item dan total belanja. Klik **View Cart** untuk melihat ringkasan.

#### 3. Checkout & Pembayaran
1. Di halaman `/cart`, sesuaikan jumlah item atau hapus jika diperlukan.
2. Klik **Proceed to Order** untuk diarahkan ke halaman ringkasan checkout (`/order`).
3. Pilih metode pembayaran:
   - **QRIS**: Menampilkan kode QRIS dinamis untuk discan.
   - **Tunai / Cash**: Bayar langsung di kasir.
4. Klik **Konfirmasi & Bayar**. Struk digital akan muncul dan dapat diunduh dalam format gambar PNG.

#### 4. Melacak Status (Tracker)
- Pelanggan dialihkan ke `/tracker/:orderId` untuk melihat status real-time pesanan (Menunggu Konfirmasi -> Sedang Dibuat -> Siap Diambil -> Selesai).

---

### B. Kasir (Cashier)
1. Buka role **Cashier** di navbar atau akses URL `/cashier`.
2. Halaman menampilkan daftar pesanan berstatus *Pending*.
3. Kasir dapat:
   - Menerima pesanan dan memverifikasi pembayaran.
   - Mencetak kembali struk pesanan pelanggan.
   - Membatalkan atau menolak pesanan jika bahan habis.

---

### C. Barista
1. Buka role **Barista** di navbar atau akses URL `/barista`.
2. Antrean pesanan dibagi menjadi:
   - **Antrean Menunggu**: Klik tombol **Mulai Proses** saat mulai meracik kopi. Status berubah menjadi *Preparing*.
   - **Sedang Diproses**: Klik tombol **Siap Diambil** setelah minuman selesai dibuat. Status berubah menjadi *Ready*.

---

### D. Layar Antrean Publik (Pickup Display)
1. Akses halaman `/display`.
2. Layar dibagi menjadi dua kolom:
   - **Sedang Diproses**: Menampilkan nomor antrean yang sedang diracik barista.
   - **Siap Diambil**: Menampilkan nomor antrean yang siap diambil di counter.
3. **Text-To-Speech (TTS) Otomatis**:
   - Begitu barista menekan tombol *Siap Diambil*, sistem langsung membacakan pengumuman suara bahasa Indonesia tanpa tanda pagar:
     > *"Pesanan nomor 02, meja A-01 telah siap diambil."*
4. Tersedia tombol **Fullscreen** di pojok kanan atas untuk mode layar penuh di TV/monitor kedai.

---

### E. Pemilik Kedai (Owner Dashboard)
1. Akses halaman `/owner`.
2. **Statistik Bisnis**:
   - Total Pendapatan, Jumlah Pesanan Selesai, Rata-rata Nilai Pesanan (AOV), dan Jam Ramai.
   - Pie Chart distribusi kategori & tipe dine-in.
3. **Manajemen Produk**:
   - Klik **Add Product** untuk menambahkan menu baru (Nama, Kategori, Harga, URL Gambar).
   - Hapus produk langsung dari tabel produk melalui modal konfirmasi hapus.
4. **Manajemen Meja & Generator QR**:
   - Input jumlah meja yang ingin dibuat (misal: 20 meja) dan pilih zona (Indoor, Outdoor, VIP).
   - Klik **Generate Tables** untuk membuat nomor meja otomatis.
   - Klik ikon **QR** di setiap meja untuk melihat pratinjau dan mengunduh gambar QR code PNG siap cetak.

---

## 3. Fitur Utama & Spesifikasi Teknis

- **State Management**: Zustand terintegrasi dengan sinkronisasi multi-tab browser secara real-time via `localStorage` event listener.
- **Kalkulasi Add-On Cerdas**: Penambahan harga otomatis Rp 5.000 untuk varian susu premium (*Oat Milk*).
- **Navigasi Terkunci (Table Lock)**: Menghindari pelanggan memesan tanpa nomor meja; back button browser dicegah jika meja belum dipilih.
- **Text-to-Speech (TTS)**: Web Speech API lokal (`id-ID`) tanpa ketergantungan API pihak ketiga.
- **Export Struk & QR**: Dukungan download struk pesanan dan QR Code meja langsung ke perangkat (.png).

---

## 4. Menjalankan Aplikasi & Testing

### Menjalankan Server Pengembangan (Dev)
```bash
npm install
npm run dev
```
Akses di browser: `http://localhost:5173`

### Menjalankan Pengecekan Kode (Linting)
```bash
npm run lint:check
```

### Menjalankan Build Produksi
```bash
npm run build
```

### Menjalankan Testing Otomatis (Playwright E2E)
Jalankan pengujian skenario end-to-end (Pemesanan Pelanggan, Dashboard Owner, Layar Antrean):
```bash
npx playwright test
```
Untuk melihat hasil laporan interaktif:
```bash
npx playwright show-report
```
