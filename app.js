const slides = document.querySelectorAll('.item');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
let index = 0;
let autoSlide;

function showSlide(newIndex) {
  // Reset index jika keluar batas
  if (newIndex < 0) newIndex = slides.length - 1;
  if (newIndex >= slides.length) newIndex = 0;

  // Tambah class animasi keluar ke slide aktif
  slides[index].classList.remove('active');
  slides[index].classList.add('fade-out');

  // Hapus fade-out setelah selesai
  setTimeout(() => {
    slides[index].classList.remove('fade-out');
  }, 1000);

  // Ganti ke slide baru
  index = newIndex;
  slides[index].classList.add('active');
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - index) * 100}%)`;
  });

  resetTimer();
}

// Navigasi manual
nextBtn.addEventListener('click', () => showSlide(index + 1));
prevBtn.addEventListener('click', () => showSlide(index - 1));

// Timer otomatis
function resetTimer() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => showSlide(index + 1), 8000);
}
resetTimer();

// Inisialisasi awal posisi slide
slides.forEach((slide, i) => {
  slide.style.transform = `translateX(${(i - index) * 100}%)`;
});
slides[index].classList.add('active');
