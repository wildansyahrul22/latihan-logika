// Tugas 1: Konversi Suhu

// ---------- Logika (tidak menyentuh HTML) ----------

function celsiusKeFahrenheit(celsius) {
  return celsius * 9 / 5 + 32;
}

function celsiusKeReamur(celsius) {
  return celsius * 4 / 5;
}

function celsiusKeKelvin(celsius) {
  return celsius + 273.15;
}

// ---------- Tampilan ----------

const form = document.querySelector('#form-suhu');
const inputCelsius = document.querySelector('#celsius');
const pesan = document.querySelector('#pesan');
const hasil = document.querySelector('#hasil');
const teksFahrenheit = document.querySelector('#fahrenheit');
const teksReamur = document.querySelector('#reamur');
const teksKelvin = document.querySelector('#kelvin');

function tampilkanPesan(teks) {
  pesan.textContent = teks;
  pesan.hidden = false;
  hasil.hidden = true;
}

// Event submit dipakai supaya tombol Enter juga berfungsi
form.addEventListener('submit', function (event) {
  event.preventDefault(); // jangan muat ulang halaman

  const teks = inputCelsius.value.trim();
  const celsius = Number(teks);

  // Number('') menghasilkan 0, jadi input kosong harus dicek tersendiri
  if (teks === '' || Number.isNaN(celsius)) {
    tampilkanPesan('Masukkan suhu dalam angka');
    return;
  }

  teksFahrenheit.textContent = celsiusKeFahrenheit(celsius).toFixed(2) + ' °F';
  teksReamur.textContent = celsiusKeReamur(celsius).toFixed(2) + ' °R';
  teksKelvin.textContent = celsiusKeKelvin(celsius).toFixed(2) + ' K';

  pesan.hidden = true;
  hasil.hidden = false;
});
