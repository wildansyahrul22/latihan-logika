// Tugas 5: Kopi Susu (FizzBuzz versi warung)

// ---------- Logika (tidak menyentuh HTML) ----------

function kataUntuk(angka) {
  // Kelipatan 15 (kelipatan 3 dan 5 sekaligus) harus dicek paling awal
  if (angka % 15 === 0) {
    return 'Kopi Susu';
  } else if (angka % 3 === 0) {
    return 'Kopi';
  } else if (angka % 5 === 0) {
    return 'Susu';
  } else {
    return String(angka);
  }
}

function nValid(n) {
  return Number.isInteger(n) && n >= 1 && n <= 100;
}

// ---------- Tampilan ----------

const form = document.querySelector('#form-kopi');
const inputN = document.querySelector('#n');
const pesan = document.querySelector('#pesan');
const hasil = document.querySelector('#hasil');
const grid = document.querySelector('#grid');
const ringkasan = document.querySelector('#ringkasan');

function tampilkanPesan(teks) {
  pesan.textContent = teks;
  pesan.hidden = false;
  hasil.hidden = true;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const n = Number(inputN.value);

  // Input kosong menjadi 0, jadi ikut tertolak di sini
  if (!nValid(n)) {
    tampilkanPesan('N harus 1–100');
    return;
  }

  grid.textContent = ''; // hapus grid lama supaya tidak menumpuk

  let jumlahKopi = 0;
  let jumlahSusu = 0;
  let jumlahKopiSusu = 0;
  let jumlahAngka = 0;

  for (let i = 1; i <= n; i++) {
    const kata = kataUntuk(i);
    const kotak = document.createElement('li');
    kotak.textContent = kata;
    kotak.className = 'kotak';

    if (kata === 'Kopi Susu') {
      kotak.classList.add('kopi-susu');
      jumlahKopiSusu++;
    } else if (kata === 'Kopi') {
      kotak.classList.add('kopi');
      jumlahKopi++;
    } else if (kata === 'Susu') {
      kotak.classList.add('susu');
      jumlahSusu++;
    } else {
      jumlahAngka++;
    }

    grid.appendChild(kotak);
  }

  ringkasan.textContent = 'Kopi ' + jumlahKopi + ', Susu ' + jumlahSusu +
    ', Kopi Susu ' + jumlahKopiSusu + ', angka ' + jumlahAngka;

  pesan.hidden = true;
  hasil.hidden = false;
});
