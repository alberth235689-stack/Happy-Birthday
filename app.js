const items = document.querySelectorAll('.item');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const intro = document.getElementById('intro');
const openBtn = document.getElementById('openBtn');
const mainContent = document.getElementById('mainContent');
const music = document.getElementById('bgMusic');

let index = 0;
let interval;

// === Countdown sebelum buka ===
let timeLeft = 10; // detik
const timerEl = document.getElementById('timer');
const countdown = setInterval(() => {
  timeLeft--;
  timerEl.textContent = `00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;
  if (timeLeft <= 0) {
    clearInterval(countdown);
    openBtn.disabled = false;
    openBtn.textContent = "Buka Sekarang 💝";
  }
}, 1000);

// === Event klik tombol buka ===
openBtn.addEventListener('click', () => {
  intro.style.display = "none";
  mainContent.style.display = "block";
  music.play().catch(()=>{});
  startAuto();
});

// === Carousel ===
function showSlide(n) {
  items.forEach((item, i) => {
    item.classList.remove('active');
    if (i === n) item.classList.add('active');
  });
}

function nextSlide() {
  index = (index + 1) % items.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + items.length) % items.length;
  showSlide(index);
}

function startAuto() {
  clearInterval(interval);
  interval = setInterval(nextSlide, 10000);
}

next.addEventListener('click', () => {
  nextSlide();
  startAuto();
});

prev.addEventListener('click', () => {
  prevSlide();
  startAuto();
});
