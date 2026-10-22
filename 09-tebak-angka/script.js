// Tugas 9: Tebak Angka

// ---------- Logika (tidak menyentuh HTML) ----------

const KESEMPATAN_AWAL = 7;

function angkaAcak(min, maks) {
  return Math.floor(Math.random() * (maks - min + 1)) + min;
}

function tebakanValid(tebakan) {
  return Number.isInteger(tebakan) && tebakan >= 1 && tebakan <= 100;
}

// Hasilnya 'besar', 'kecil', atau 'benar'
function bandingkan(tebakan, rahasia) {
  if (tebakan > rahasia) {
    return 'besar';
  } else if (tebakan < rahasia) {
    return 'kecil';
  } else {
    return 'benar';
  }
}

// ---------- State permainan ----------
// Disimpan di luar fungsi supaya nilainya bertahan di antara klik

let angkaRahasia;
let sisaKesempatan;
let riwayat;

// ---------- Tampilan ----------

const form = document.querySelector('#form-tebak');
const inputTebakan = document.querySelector('#tebakan');
const tombolTebak = document.querySelector('#tombol-tebak');
const tombolMainLagi = document.querySelector('#tombol-main-lagi');
const respons = document.querySelector('#respons');
const teksSisa = document.querySelector('#sisa');
const daftarRiwayat = document.querySelector('#riwayat');

function tampilkanRespons(teks, jenis) {
  respons.textContent = teks;
  respons.className = 'respons ' + jenis;
}

function keteranganArah(arah) {
  if (arah === 'besar') {
    return 'terlalu besar';
  } else if (arah === 'kecil') {
    return 'terlalu kecil';
  } else {
    return 'benar';
  }
}

function perbaruiStatus() {
  teksSisa.textContent = sisaKesempatan;

  daftarRiwayat.textContent = ''; // gambar ulang riwayat dari awal
  for (let i = 0; i < riwayat.length; i++) {
    const item = document.createElement('li');
    item.textContent = riwayat[i] + ' (' + keteranganArah(bandingkan(riwayat[i], angkaRahasia)) + ')';
    daftarRiwayat.appendChild(item);
  }
}

function mulaiPermainan() {
  angkaRahasia = angkaAcak(1, 100);
  sisaKesempatan = KESEMPATAN_AWAL;
  riwayat = [];

  inputTebakan.value = '';
  inputTebakan.disabled = false;
  tombolTebak.disabled = false;
  tombolMainLagi.hidden = true;

  tampilkanRespons('', '');
  perbaruiStatus();
  inputTebakan.focus();
}

function selesaikanPermainan() {
  inputTebakan.disabled = true;
  tombolTebak.disabled = true;
  tombolMainLagi.hidden = false;
  tombolMainLagi.focus();
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const tebakan = Number(inputTebakan.value);

  // Tebakan tidak sah tidak mengurangi kesempatan.
  // Input kosong menjadi 0, jadi ikut tertolak di sini.
  if (!tebakanValid(tebakan)) {
    tampilkanRespons('Tebakan harus bilangan bulat 1–100', 'peringatan');
    return;
  }

  if (riwayat.includes(tebakan)) {
    tampilkanRespons('Angka ' + tebakan + ' sudah ditebak', 'peringatan');
    return;
  }

  riwayat.push(tebakan);
  sisaKesempatan--;
  const arah = bandingkan(tebakan, angkaRahasia);

  if (arah === 'benar') {
    tampilkanRespons('Benar! Kamu menebak dalam ' + riwayat.length + ' kali', 'menang');
    selesaikanPermainan();
  } else if (sisaKesempatan === 0) {
    tampilkanRespons('Kesempatan habis. Angkanya ' + angkaRahasia, 'kalah');
    selesaikanPermainan();
  } else if (arah === 'besar') {
    tampilkanRespons('Terlalu besar', 'petunjuk');
  } else {
    tampilkanRespons('Terlalu kecil', 'petunjuk');
  }

  perbaruiStatus();
  inputTebakan.value = '';
});

tombolMainLagi.addEventListener('click', mulaiPermainan);

mulaiPermainan();
