# Latihan Logika

Contoh hasil jadi untuk 10 tugas di dokumen "Tugas Studi Kasus Logika Pemrograman — HTML, CSS & JS Dasar". Semuanya HTML, CSS, dan JavaScript murni: tanpa framework, tanpa `npm install`, dan tanpa proses build.

## Isi folder

```text
latihan-logika/
├── index.html               daftar tugas
├── assets/style.css         gaya dasar untuk semua halaman
├── 01-konversi-suhu/        index.html, style.css, script.js
├── 02-nilai-rapor/
├── 03-jumlah-hari/
├── 04-tarif-parkir/
├── 05-kopi-susu/
├── 06-pola-bintang/
├── 07-analisis-teks/
├── 08-kembalian-kasir/
├── 09-tebak-angka/
├── 10-urutkan-angka/
└── vercel.json              pengaturan Vercel
```

Setiap `script.js` memisahkan fungsi logika dari kode tampilan. Fungsi logikanya bisa dicoba langsung di Console browser, misalnya `celsiusKeFahrenheit(100)` di halaman Tugas 1.

## Menjalankan di komputer

Buka `index.html` langsung di browser. Bisa juga lewat server lokal:

```bash
npx serve .
```

## Deploy ke Vercel

### Lewat Vercel CLI

```bash
cd latihan-logika
npx vercel          # deploy preview, sekaligus menghubungkan folder ke proyek Vercel
npx vercel --prod   # deploy ke production
```

Saat ditanya pengaturan proyek, pakai bawaannya: tidak ada framework, tidak ada build command, dan output directory adalah folder ini.

### Lewat GitHub

1. Push folder ini ke sebuah repository GitHub.
2. Di dashboard Vercel, pilih **Add New → Project**, lalu impor repository itu.
3. Pilih Framework Preset **Other**. Build Command dan Output Directory dibiarkan kosong.
4. Klik **Deploy**.

`vercel.json` berisi `"trailingSlash": true`. Dengan pengaturan ini, alamat seperti `/01-konversi-suhu` dialihkan ke `/01-konversi-suhu/`, sehingga file CSS dan JS di folder tugas tetap ditemukan.

## Catatan

- Yang dibuat hanya tugas utama. Tantangan tambahan sengaja dibiarkan untuk latihan.
- Kode JavaScript bisa dilihat siapa saja lewat browser, jadi situs ini sekaligus kunci jawaban. Bagikan link-nya sesuai kebutuhan.
