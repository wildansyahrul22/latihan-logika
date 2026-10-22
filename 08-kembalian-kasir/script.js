// Tugas 8: Kembalian Kasir
// Batasan: pecahan disimpan di array dan diproses dengan perulangan

// ---------- Logika (tidak menyentuh HTML) ----------

// Pecahan rupiah, urut dari yang terbesar
const PECAHAN = [100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100];

// Algoritma greedy: ambil pecahan terbesar yang masih muat, ulangi sampai habis
function hitungRincian(kembalian) {
  const rincian = [];
  let sisa = kembalian;

  for (let i = 0; i < PECAHAN.length; i++) {
    const pecahan = PECAHAN[i];
    const jumlah = Math.floor(sisa / pecahan);

    if (jumlah > 0) {
      rincian.push({ pecahan: pecahan, jumlah: jumlah });
      sisa = sisa - jumlah * pecahan;
    }
  }

  return rincian;
}

function kelipatanSeratus(nominal) {
  return nominal % 100 === 0;
}

function formatRupiah(angka) {
  return 'Rp ' + angka.toLocaleString('id-ID');
}

// ---------- Tampilan ----------

const form = document.querySelector('#form-kasir');
const inputTotal = document.querySelector('#total');
const inputBayar = document.querySelector('#bayar');
const pesan = document.querySelector('#pesan');
const hasil = document.querySelector('#hasil');
const teksKembalian = document.querySelector('#kembalian');
const daftarRincian = document.querySelector('#rincian');

function tampilkanPesan(teks) {
  pesan.textContent = teks;
  pesan.hidden = false;
  hasil.hidden = true;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const total = Number(inputTotal.value);
  const bayar = Number(inputBayar.value);

  // Input kosong menjadi 0, jadi ikut tertolak di sini
  if (total <= 0 || bayar <= 0) {
    tampilkanPesan('Total dan uang dibayar harus lebih dari 0');
    return;
  }

  if (!kelipatanSeratus(total) || !kelipatanSeratus(bayar)) {
    tampilkanPesan('Nominal harus kelipatan Rp 100');
    return;
  }

  if (bayar < total) {
    tampilkanPesan('Uang kurang ' + formatRupiah(total - bayar));
    return;
  }

  daftarRincian.textContent = ''; // hapus rincian lama

  if (bayar === total) {
    teksKembalian.textContent = 'Uang pas, tidak ada kembalian';
  } else {
    const kembalian = bayar - total;
    teksKembalian.textContent = 'Kembalian ' + formatRupiah(kembalian);

    const rincian = hitungRincian(kembalian);
    for (let i = 0; i < rincian.length; i++) {
      const baris = document.createElement('li');
      baris.textContent = rincian[i].jumlah + ' × ' + formatRupiah(rincian[i].pecahan);
      daftarRincian.appendChild(baris);
    }
  }

  pesan.hidden = true;
  hasil.hidden = false;
});
