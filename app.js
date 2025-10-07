const slides = document.querySelectorAll('.item');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const carousel = document.querySelector('.carousel');
let index = 0;
let autoPlay;

// Ganti gambar sesuai device
function updateImagesForDevice() {
  const isMobile = window.innerWidth < 768;
  slides.forEach(slide => {
    const img = isMobile ? slide.dataset.mobile : slide.dataset.desktop;
    slide.style.backgroundImage = `url('${img}')`;
  });
}

function showSlide(i) {
  slides[index].classList.remove('active');
  slides[index].classList.add('fade-out');

  if (i < 0) index = slides.length - 1;
  else if (i >= slides.length) index = 0;
  else index = i;

  slides.forEach(s => s.classList.remove('active'));
  slides[index].classList.remove('fade-out');
  slides[index].classList.add('active');

  carousel.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener('click', () => showSlide(index + 1));
prevBtn.addEventListener('click', () => showSlide(index - 1));

function startAutoPlay() {
  autoPlay = setInterval(() => showSlide(index + 1), 6000);
}
function stopAutoPlay() {
  clearInterval(autoPlay);
}
carousel.addEventListener('mouseenter', stopAutoPlay);
carousel.addEventListener('mouseleave', startAutoPlay);

window.addEventListener('resize', updateImagesForDevice);
updateImagesForDevice();
startAutoPlay();
