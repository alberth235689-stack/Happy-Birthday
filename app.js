const items = document.querySelectorAll('.item');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const intro = document.getElementById('intro');
const openBtn = document.getElementById('openBtn');
const mainContent = document.getElementById('mainContent');
const music = document.getElementById('bgMusic');
const ding = document.getElementById('dingSound');
const timerEl = document.getElementById('timer');
const particlesContainer = document.getElementById('particles');
const timeBar = document.querySelector('.timeRunning');

let index = 0;
let autoInterval;
let timeBarInterval;
let progress = 0;

// === Countdown Intro ===
let timeLeft = 10;
const countdown = setInterval(() => {
  timeLeft--;
  timerEl.textContent = `00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;
  if (timeLeft <= 0) {
    clearInterval(countdown);
    openBtn.disabled = false;
    openBtn.textContent = "Buka Sekarang 💝";
  }
}, 1000);

// === Efek buka halaman utama ===
openBtn.addEventListener('click', () => {
  ding.play();
  intro.classList.add('fade-out');

  setTimeout(() => {
    intro.style.display = 'none';
    mainContent.classList.add('show');
    music.play().catch(() => {});
    startParticles();
    startSlideShow(); // mulai slideshow setelah transisi
  }, 1200);
});

// === Fungsi Slide Show ===
function showSlide(n) {
  items.forEach((item, i) => {
    item.classList.remove('active');
    if (i === n) item.classList.add('active');
  });
}

// next / prev
function nextSlide() {
  index = (index + 1) % items.length;
  showSlide(index);
  resetProgress();
}
function prevSlide() {
  index = (index - 1 + items.length) % items.length;
  showSlide(index);
  resetProgress();
}

next.addEventListener('click', () => {
  nextSlide();
});
prev.addEventListener('click', () => {
  prevSlide();
});

// === Progress bar sinkron ===
function startSlideShow() {
  showSlide(index);
  startProgress();
  autoInterval = setInterval(() => {
    nextSlide();
  }, 10000); // ganti tiap 10 detik
}

function startProgress() {
  progress = 0;
  timeBar.style.width = '0%';
  clearInterval(timeBarInterval);
  timeBarInterval = setInterval(() => {
    progress += 1; // 100 langkah dalam 10 detik (100ms per langkah)
    timeBar.style.width = `${progress}%`;
    if (progress >= 100) {
      progress = 0;
      timeBar.style.width = '0%';
    }
  }, 100);
}

function resetProgress() {
  clearInterval(autoInterval);
  clearInterval(timeBarInterval);
  timeBar.style.width = '0%';
  startProgress();
  autoInterval = setInterval(nextSlide, 10000);
}

// === Partikel romantis ===
function startParticles() {
  setInterval(() => {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 12 + 8;
    const left = Math.random() * 100;
    const duration = Math.random() * 8 + 6;
    const color = Math.random() > 0.5 ? 'rgba(255,182,193,0.8)' :
                  Math.random() > 0.5 ? 'rgba(255,240,245,0.9)' :
                  'rgba(255,105,180,0.6)';
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.background = color;
    particle.style.animationDuration = `${duration}s`;
    particlesContainer.appendChild(particle);
    
    setTimeout(() => particle.remove(), duration * 1000);
  }, 350);
}
