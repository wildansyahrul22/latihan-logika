// Tugas 10: Urutkan Angka
// Batasan: tanpa .sort(), Math.min(), Math.max(), dan .reduce()

// ---------- Logika (tidak menyentuh HTML) ----------

// Mengubah teks "5, 3, 8" menjadi [5, 3, 8].
// Hasilnya { angka: [...] } jika berhasil, atau { pesan: '...' } jika ada yang salah.
function bacaDeretan(teks) {
  if (teks.trim() === '') {
    return { pesan: 'Masukkan deretan angka' };
  }

  const bagian = teks.split(',');
  const angka = [];

  for (let i = 0; i < bagian.length; i++) {
    const isian = bagian[i].trim();

    // Number('') bernilai 0, jadi isian kosong harus dicek lebih dulu
    if (isian === '') {
      return { pesan: 'Ada isian kosong di antara koma' };
    }

    const nilai = Number(isian);
    if (Number.isNaN(nilai)) {
      return { pesan: '"' + isian + '" bukan angka' };
    }

    angka.push(nilai);
  }

  return { angka: angka };
}

// Bubble sort: bandingkan dua angka bersebelahan, tukar jika yang kiri lebih besar.
// Setelah tiap putaran, angka terbesar yang tersisa pindah ke ujung kanan.
function bubbleSort(data) {
  const hasil = data.slice(); // salin dulu supaya array asli tidak berubah

  for (let putaran = 0; putaran < hasil.length - 1; putaran++) {
    for (let j = 0; j < hasil.length - 1 - putaran; j++) {
      if (hasil[j] > hasil[j + 1]) {
        const sementara = hasil[j];
        hasil[j] = hasil[j + 1];
        hasil[j + 1] = sementara;
      }
    }
  }

  return hasil;
}

function cariTerkecil(data) {
  let terkecil = data[0];
  for (let i = 1; i < data.length; i++) {
    if (data[i] < terkecil) {
      terkecil = data[i];
    }
  }
  return terkecil;
}

function cariTerbesar(data) {
  let terbesar = data[0];
  for (let i = 1; i < data.length; i++) {
    if (data[i] > terbesar) {
      terbesar = data[i];
    }
  }
  return terbesar;
}

function hitungJumlah(data) {
  let jumlah = 0;
  for (let i = 0; i < data.length; i++) {
    jumlah += data[i];
  }
  return jumlah;
}

// Median dihitung dari data yang sudah terurut
function hitungMedian(terurut) {
  const tengah = Math.floor(terurut.length / 2);
  if (terurut.length % 2 === 1) {
    return terurut[tengah];
  }
  return (terurut[tengah - 1] + terurut[tengah]) / 2;
}

// ---------- Tampilan ----------

const form = document.querySelector('#form-urut');
const inputDeretan = document.querySelector('#deretan');
const pesan = document.querySelector('#pesan');
const hasil = document.querySelector('#hasil');

function tampilkanPesan(teks) {
  pesan.textContent = teks;
  pesan.hidden = false;
  hasil.hidden = true;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const bacaan = bacaDeretan(inputDeretan.value);
  if (bacaan.pesan) {
    tampilkanPesan(bacaan.pesan);
    return;
  }

  const data = bacaan.angka;
  const terurut = bubbleSort(data);
  const jumlah = hitungJumlah(data);

  document.querySelector('#terurut').textContent = terurut.join(', ');
  document.querySelector('#terkecil').textContent = cariTerkecil(data);
  document.querySelector('#terbesar').textContent = cariTerbesar(data);
  document.querySelector('#jumlah').textContent = jumlah;
  document.querySelector('#rata-rata').textContent = (jumlah / data.length).toFixed(2);
  document.querySelector('#median').textContent = hitungMedian(terurut);

  pesan.hidden = true;
  hasil.hidden = false;
});
