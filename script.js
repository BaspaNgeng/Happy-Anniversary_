const typedTextElement = document.getElementById("typedText");
const playMusicBtn = document.getElementById("playMusicBtn");
const bgMusic = document.getElementById("bgMusic");
const showLetterBtn = document.getElementById("showLetterBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const letterModal = document.getElementById("letterModal");
const loveCounter = document.getElementById("loveCounter");

const message =
  "Setiap hari bersamamu adalah hadiah. Terima kasih sudah hadir dan membuat hidupku lebih indah.";

let typingIndex = 0;

function typeWriter() {
  if (typingIndex < message.length) {
    typedTextElement.textContent += message.charAt(typingIndex);
    typingIndex += 1;
    setTimeout(typeWriter, 36);
  }
}

typeWriter();

async function startBackgroundMusic() {
  try {
    await bgMusic.play();
    playMusicBtn.textContent = "Pause Lagu";
  } catch (error) {
    playMusicBtn.textContent = "Klik ini terlebih dahulu yaa...";
  }
}

playMusicBtn.addEventListener("click", async () => {
  try {
    if (bgMusic.paused) {
      await bgMusic.play();
      playMusicBtn.textContent = "Pause Lagu";
    } else {
      bgMusic.pause();
      playMusicBtn.textContent = "Putar Lagu";
    }
  } catch (error) {
    playMusicBtn.textContent = "Klik lagi untuk putar";
  }
});

window.addEventListener("load", startBackgroundMusic, { once: true });

showLetterBtn.addEventListener("click", () => {
  letterModal.classList.add("is-open");
  letterModal.setAttribute("aria-hidden", "false");
});

closeModalBtn.addEventListener("click", () => {
  letterModal.classList.remove("is-open");
  letterModal.setAttribute("aria-hidden", "true");
});

letterModal.addEventListener("click", (event) => {
  if (event.target === letterModal) {
    letterModal.classList.remove("is-open");
    letterModal.setAttribute("aria-hidden", "true");
  }
});

const anniversaryDateText = "30 Mei 2025";

function updateCounter() {
  loveCounter.textContent = anniversaryDateText;
}

updateCounter();

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Floating hearts canvas animation.
const heartCanvas = document.getElementById("heartCanvas");
const ctx = heartCanvas.getContext("2d");
let hearts = [];

function resizeCanvas() {
  heartCanvas.width = window.innerWidth;
  heartCanvas.height = window.innerHeight;
}

function createHeart() {
  const size = Math.random() * 14 + 8;
  hearts.push({
    x: Math.random() * heartCanvas.width,
    y: heartCanvas.height + size,
    size,
    speedY: Math.random() * 0.9 + 0.4,
    speedX: (Math.random() - 0.5) * 0.7,
    alpha: Math.random() * 0.45 + 0.2,
  });
}

function drawHeartShape(x, y, size, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 18, size / 18);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -3, -5, -7, -10, -7);
  ctx.bezierCurveTo(-18, -7, -18, 4, -18, 4);
  ctx.bezierCurveTo(-18, 12, -10, 16, 0, 23);
  ctx.bezierCurveTo(10, 16, 18, 12, 18, 4);
  ctx.bezierCurveTo(18, 4, 18, -7, 10, -7);
  ctx.bezierCurveTo(5, -7, 0, -3, 0, 0);
  ctx.closePath();
  ctx.fillStyle = `rgba(255, 173, 202, ${alpha})`;
  ctx.fill();
  ctx.restore();
}

function animateHearts() {
  ctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);

  if (hearts.length < 40 && Math.random() > 0.7) {
    createHeart();
  }

  hearts.forEach((heart) => {
    heart.y -= heart.speedY;
    heart.x += heart.speedX;
    drawHeartShape(heart.x, heart.y, heart.size, heart.alpha);
  });

  hearts = hearts.filter((heart) => heart.y > -40);
  window.requestAnimationFrame(animateHearts);
}

resizeCanvas();
animateHearts();
window.addEventListener("resize", resizeCanvas);

// Light parallax based on scroll.
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const heroContent = document.querySelector(".hero-content");
  const blur1 = document.querySelector(".bg-blur-1");
  const blur2 = document.querySelector(".bg-blur-2");

  heroContent.style.transform = `translateY(${scrollY * 0.08}px)`;
  blur1.style.transform = `translateY(${scrollY * 0.04}px) scale(1.04)`;
  blur2.style.transform = `translateY(${-scrollY * 0.03}px) scale(1.05)`;
});
