const intro = document.getElementById('intro');
const openBtn = document.getElementById('openBtn');
const timerDisplay = document.getElementById('timer');
const mainContent = document.getElementById('mainContent');
const bgMusic = document.getElementById('bgMusic');
const dingSound = document.getElementById('dingSound');
const timeRunning = document.querySelector('.timeRunning');
const particlesContainer = document.getElementById('particles');

let countdownTime = 10;
let timer;

// === Countdown ===
function startCountdown() {
  timer = setInterval(() => {
    countdownTime--;
    const seconds = countdownTime < 10 ? '0' + countdownTime : countdownTime;
    timerDisplay.textContent = `00:${seconds}`;

    if (countdownTime <= 0) {
      clearInterval(timer);
      timerDisplay.textContent = "00:00";
      openBtn.disabled = false;
      openBtn.classList.add('ready');

      // mainkan suara ding
      dingSound.currentTime = 0;
      dingSound.volume = 0.8;
      dingSound.play().catch(() => {});
    }
  }, 1000);
}
startCountdown();

// === Buka halaman utama ===
openBtn.addEventListener('click', () => {
  // efek suara ding lagi saat dibuka
  dingSound.currentTime = 0;
  dingSound.volume = 0.8;
  dingSound.play().catch(() => {});

  intro.classList.add('fade-out');
  setTimeout(() => {
    intro.style.display = 'none';
    mainContent.classList.add('show');
    bgMusic.play().catch(() => {});
    startParticles();
    startCarousel();
  }, 1500);
});

// === Carousel ===
const items = document.querySelectorAll('.item');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let active = 0;
let interval;
let isTransitioning = false;

function setActive(index) {
  items.forEach((item, i) => {
    item.classList.remove('active');
    if (i === index) item.classList.add('active');
  });
}

function startCarousel() {
  setActive(active);
  resetProgressAnimation();

  interval = setInterval(() => {
    nextSlide();
  }, 10000); // tiap 10 detik
}

function nextSlide() {
  if (isTransitioning) return;
  isTransitioning = true;

  active++;
  if (active >= items.length) active = 0;

  resetProgressAnimation();

  setTimeout(() => {
    setActive(active);
    isTransitioning = false;
  }, 300);
}

function prevSlide() {
  if (isTransitioning) return;
  isTransitioning = true;

  active--;
  if (active < 0) active = items.length - 1;

  resetProgressAnimation();

  setTimeout(() => {
    setActive(active);
    isTransitioning = false;
  }, 300);
}

next.addEventListener('click', () => {
  clearInterval(interval);
  nextSlide();
  restartCarousel();
});
prev.addEventListener('click', () => {
  clearInterval(interval);
  prevSlide();
  restartCarousel();
});

function restartCarousel() {
  interval = setInterval(() => {
    nextSlide();
  }, 10000);
}

function resetProgressAnimation() {
  timeRunning.style.animation = 'none';
  timeRunning.offsetHeight; // reflow
  setTimeout(() => {
    timeRunning.style.animation = 'progress 10s linear';
  }, 1000); // progress mulai setelah fade selesai
}

// === Efek Partikel Romantis ===
function startParticles() {
  setInterval(() => {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 10 + 6;
    const left = Math.random() * 100;
    const duration = Math.random() * 6 + 6;
    const color = Math.random() > 0.5
      ? 'rgba(255,182,193,0.8)'  // pink lembut
      : 'rgba(255,240,245,0.9)'; // putih lembut

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.background = color;
    particle.style.animationDuration = `${duration}s`;
    particle.style.opacity = 0.9;

    particlesContainer.appendChild(particle);
    setTimeout(() => particle.remove(), duration * 1000);
  }, 400);
}
