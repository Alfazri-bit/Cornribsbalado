// Menghitung total waktu dalam milidetik (5 hari, 11 menit, 53 detik, 20 detik)
const countdownTime = (5 * 24 * 60 * 60) + (11 * 60) + 53 + 20; // total detik
let timer = countdownTime * 1000; // convert ke milidetik

// Simpan status countdown di localStorage
let storedTimer = localStorage.getItem('countdown');
if (storedTimer) {
  timer = parseInt(storedTimer);
}

const timerElement = document.getElementById("timer"); // Elemen HTML untuk menampilkan waktu

function updateTimer() {
  const days = Math.floor(timer / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timer % (1000 * 60)) / 1000);

  // Update tampilan timer
  timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  // Kurangi waktu
  timer -= 1000;

  // Simpan waktu yang tersisa ke localStorage
  localStorage.setItem('countdown', timer);

  // Jika waktu habis, tampilkan error
  if (timer <= 0) {
    clearInterval(timerInterval);
    localStorage.setItem('accessBlocked', true); // Set akses diblokir
    document.body.innerHTML = "<h1>Error: Waktu habis!</h1>"; // Tampilkan pesan error
  }
}

// Cek jika akses sudah diblokir sebelumnya
if (localStorage.getItem('accessBlocked')) {
  document.body.innerHTML = "<h1>Error: Akses dibatasi!</h1>";
} else {
  // Jalankan timer setiap detik
  const timerInterval = setInterval(updateTimer, 1000);
}
