// Tugas 6: Pola Bintang
// Batasan: tanpa .repeat(); pola dibuat dengan perulangan bersarang

// ---------- Logika (tidak menyentuh HTML) ----------

// Satu baris: sejumlah spasi, lalu sejumlah bintang
function buatBaris(jumlahSpasi, jumlahBintang) {
  let baris = '';
  for (let i = 0; i < jumlahSpasi; i++) {
    baris += ' ';
  }
  for (let i = 0; i < jumlahBintang; i++) {
    baris += '*';
  }
  return baris;
}

// buatBaris dipanggil di dalam perulangan, jadi perulangannya bersarang

function segitigaSiku(tinggi) {
  let pola = '';
  for (let i = 1; i <= tinggi; i++) {
    pola += buatBaris(0, i) + '\n';
  }
  return pola;
}

function piramida(tinggi) {
  let pola = '';
  for (let i = 1; i <= tinggi; i++) {
    // Baris ke-i: (tinggi - i) spasi dan (2i - 1) bintang
    pola += buatBaris(tinggi - i, 2 * i - 1) + '\n';
  }
  return pola;
}

function belahKetupat(tinggi) {
  // Piramida setinggi N, lalu piramida terbalik setinggi N - 1
  let pola = piramida(tinggi);
  for (let i = tinggi - 1; i >= 1; i--) {
    pola += buatBaris(tinggi - i, 2 * i - 1) + '\n';
  }
  return pola;
}

function tinggiValid(tinggi) {
  return Number.isInteger(tinggi) && tinggi >= 1 && tinggi <= 20;
}

// ---------- Tampilan ----------

const form = document.querySelector('#form-pola');
const pilihanBentuk = document.querySelector('#bentuk');
const inputTinggi = document.querySelector('#tinggi');
const pesan = document.querySelector('#pesan');
const hasil = document.querySelector('#hasil');

function tampilkanPesan(teks) {
  pesan.textContent = teks;
  pesan.hidden = false;
  hasil.hidden = true;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const bentuk = pilihanBentuk.value;
  const tinggi = Number(inputTinggi.value);

  // Input kosong menjadi 0, jadi ikut tertolak di sini
  if (!tinggiValid(tinggi)) {
    tampilkanPesan('Tinggi harus 1–20');
    return;
  }

  if (bentuk === 'siku') {
    hasil.textContent = segitigaSiku(tinggi);
  } else if (bentuk === 'piramida') {
    hasil.textContent = piramida(tinggi);
  } else {
    hasil.textContent = belahKetupat(tinggi);
  }

  pesan.hidden = true;
  hasil.hidden = false;
});
