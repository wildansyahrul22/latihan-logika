// Tugas 7: Analisis Teks dan Palindrom
// Batasan: karakter diperiksa satu per satu dengan perulangan,
// tanpa .reverse(), .split(), atau regex

// ---------- Logika (tidak menyentuh HTML) ----------

function adalahHuruf(karakter) {
  return karakter >= 'a' && karakter <= 'z';
}

function adalahVokal(karakter) {
  return 'aiueo'.includes(karakter);
}

function adalahPemisah(karakter) {
  return karakter === ' ' || karakter === '\n';
}

// Dua penunjuk: bandingkan huruf paling kiri dan paling kanan, lalu geser ke tengah
function cekPalindrom(huruf) {
  if (huruf.length === 0) {
    return false;
  }

  let kiri = 0;
  let kanan = huruf.length - 1;

  while (kiri < kanan) {
    if (huruf[kiri] !== huruf[kanan]) {
      return false;
    }
    kiri++;
    kanan--;
  }
  return true;
}

function analisisTeks(teks) {
  const kecil = teks.toLowerCase();
  let jumlahKata = 0;
  let jumlahVokal = 0;
  let jumlahKonsonan = 0;
  let hurufSaja = ''; // huruf a–z saja, untuk cek palindrom

  for (let i = 0; i < kecil.length; i++) {
    const karakter = kecil[i];

    if (adalahHuruf(karakter)) {
      hurufSaja += karakter;
      if (adalahVokal(karakter)) {
        jumlahVokal++;
      } else {
        jumlahKonsonan++;
      }
    }

    // Kata baru dimulai saat karakter bukan pemisah berada
    // di awal teks atau tepat setelah pemisah
    const awalKata = !adalahPemisah(karakter) && (i === 0 || adalahPemisah(kecil[i - 1]));
    if (awalKata) {
      jumlahKata++;
    }
  }

  return {
    karakter: teks.length,
    kata: jumlahKata,
    vokal: jumlahVokal,
    konsonan: jumlahKonsonan,
    palindrom: cekPalindrom(hurufSaja),
  };
}

// ---------- Tampilan ----------

const form = document.querySelector('#form-teks');
const inputTeks = document.querySelector('#teks');
const pesan = document.querySelector('#pesan');
const hasil = document.querySelector('#hasil');

function tampilkanPesan(teks) {
  pesan.textContent = teks;
  pesan.hidden = false;
  hasil.hidden = true;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const teks = inputTeks.value;

  if (teks.trim() === '') {
    tampilkanPesan('Teks masih kosong');
    return;
  }

  const analisis = analisisTeks(teks);

  document.querySelector('#jumlah-karakter').textContent = analisis.karakter;
  document.querySelector('#jumlah-kata').textContent = analisis.kata;
  document.querySelector('#jumlah-vokal').textContent = analisis.vokal;
  document.querySelector('#jumlah-konsonan').textContent = analisis.konsonan;
  document.querySelector('#status-palindrom').textContent = analisis.palindrom ? 'Ya' : 'Tidak';

  pesan.hidden = true;
  hasil.hidden = false;
});
