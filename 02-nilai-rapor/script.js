// Tugas 2: Nilai Rapor

// ---------- Logika (tidak menyentuh HTML) ----------

function nilaiValid(nilai) {
  return nilai >= 0 && nilai <= 100;
}

function nilaiKeHuruf(nilai) {
  // Dicek dari batas terbesar, jadi batas atasnya tidak perlu ditulis
  if (nilai >= 85) {
    return 'A';
  } else if (nilai >= 70) {
    return 'B';
  } else if (nilai >= 60) {
    return 'C';
  } else if (nilai >= 50) {
    return 'D';
  } else {
    return 'E';
  }
}

function lulus(nilai) {
  return nilai >= 60;
}

// ---------- Tampilan ----------

const form = document.querySelector('#form-nilai');
const inputNilai = document.querySelector('#nilai');
const pesan = document.querySelector('#pesan');
const hasil = document.querySelector('#hasil');
const teksHuruf = document.querySelector('#huruf');
const teksKeterangan = document.querySelector('#keterangan');

function tampilkanPesan(teks) {
  pesan.textContent = teks;
  pesan.hidden = false;
  hasil.hidden = true;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const teks = inputNilai.value.trim();
  const nilai = Number(teks);

  if (teks === '' || Number.isNaN(nilai) || !nilaiValid(nilai)) {
    tampilkanPesan('Nilai harus 0–100');
    return;
  }

  teksHuruf.textContent = nilaiKeHuruf(nilai);

  // Warna kotak hasil diatur lewat class CSS
  if (lulus(nilai)) {
    teksKeterangan.textContent = 'Lulus';
    hasil.classList.add('lulus');
    hasil.classList.remove('gagal');
  } else {
    teksKeterangan.textContent = 'Tidak lulus';
    hasil.classList.add('gagal');
    hasil.classList.remove('lulus');
  }

  pesan.hidden = true;
  hasil.hidden = false;
});
