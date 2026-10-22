// Tugas 4: Tarif Parkir

// ---------- Logika (tidak menyentuh HTML) ----------

const MASA_TENGGANG = 15; // menit pertama yang gratis

// Aturan tiap kendaraan disimpan di objek, jadi rumusnya cukup ditulis sekali
const ATURAN_TARIF = {
  motor: { pertama: 2000, berikutnya: 1000, maksimal: 10000 },
  mobil: { pertama: 5000, berikutnya: 3000, maksimal: 25000 },
};

function lamaValid(menit) {
  return Number.isInteger(menit) && menit >= 1;
}

function hitungTarif(jenis, menit) {
  const aturan = ATURAN_TARIF[jenis];
  const jam = Math.ceil(menit / 60); // 61 menit dihitung 2 jam
  const tarifNormal = aturan.pertama + (jam - 1) * aturan.berikutnya;

  if (tarifNormal > aturan.maksimal) {
    return { jam: jam, tarif: aturan.maksimal, kenaBatas: true };
  }
  return { jam: jam, tarif: tarifNormal, kenaBatas: false };
}

function formatRupiah(angka) {
  return 'Rp ' + angka.toLocaleString('id-ID');
}

// ---------- Tampilan ----------

const form = document.querySelector('#form-parkir');
const inputMenit = document.querySelector('#menit');
const pesan = document.querySelector('#pesan');
const hasil = document.querySelector('#hasil');
const teksLama = document.querySelector('#lama');
const teksTarif = document.querySelector('#tarif');

function tampilkanPesan(teks) {
  pesan.textContent = teks;
  pesan.hidden = false;
  hasil.hidden = true;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const jenis = document.querySelector('input[name="kendaraan"]:checked').value;
  const menit = Number(inputMenit.value);

  // Input kosong menjadi 0, jadi ikut tertolak di sini
  if (!lamaValid(menit)) {
    tampilkanPesan('Lama parkir tidak valid');
    return;
  }

  if (menit <= MASA_TENGGANG) {
    teksLama.textContent = menit + ' menit';
    teksTarif.textContent = 'Gratis (masa tenggang)';
  } else {
    const hitungan = hitungTarif(jenis, menit);
    let tarif = formatRupiah(hitungan.tarif);
    if (hitungan.kenaBatas) {
      tarif += ' (kena batas maksimal)';
    }
    teksLama.textContent = hitungan.jam + ' jam';
    teksTarif.textContent = tarif;
  }

  pesan.hidden = true;
  hasil.hidden = false;
});
