// Tugas 3: Jumlah Hari dalam Sebulan
// Batasan: tidak memakai objek Date

// ---------- Logika (tidak menyentuh HTML) ----------

function tahunKabisat(tahun) {
  // Habis dibagi 400, ATAU habis dibagi 4 tetapi tidak habis dibagi 100
  return tahun % 400 === 0 || (tahun % 4 === 0 && tahun % 100 !== 0);
}

function jumlahHari(bulan, tahun) {
  switch (bulan) {
    case 2:
      return tahunKabisat(tahun) ? 29 : 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      return 31;
  }
}

function tahunValid(tahun) {
  return Number.isInteger(tahun) && tahun >= 1 && tahun <= 9999;
}

// ---------- Tampilan ----------

const form = document.querySelector('#form-hari');
const pilihanBulan = document.querySelector('#bulan');
const inputTahun = document.querySelector('#tahun');
const pesan = document.querySelector('#pesan');
const hasil = document.querySelector('#hasil');
const kalimatHari = document.querySelector('#kalimat-hari');
const kalimatKabisat = document.querySelector('#kalimat-kabisat');

function tampilkanPesan(teks) {
  pesan.textContent = teks;
  pesan.hidden = false;
  hasil.hidden = true;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const bulan = Number(pilihanBulan.value);
  const namaBulan = pilihanBulan.options[pilihanBulan.selectedIndex].text;
  const tahun = Number(inputTahun.value);

  // Input kosong menjadi 0, jadi ikut tertolak di sini
  if (!tahunValid(tahun)) {
    tampilkanPesan('Tahun tidak valid');
    return;
  }

  kalimatHari.textContent = namaBulan + ' ' + tahun + ' punya ' + jumlahHari(bulan, tahun) + ' hari';

  if (tahunKabisat(tahun)) {
    kalimatKabisat.textContent = tahun + ' adalah tahun kabisat';
  } else {
    kalimatKabisat.textContent = tahun + ' bukan tahun kabisat';
  }

  pesan.hidden = true;
  hasil.hidden = false;
});
