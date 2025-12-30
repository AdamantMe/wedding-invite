// Reveal on scroll (re-animates when leaving/entering)
const revealEls = document.querySelectorAll(".reveal");

const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) e.target.classList.add("in-view");
      else e.target.classList.remove("in-view");
    }
  },
  { threshold: 0.2, rootMargin: "-10% 0px -10% 0px" }
);

revealEls.forEach((el) => io.observe(el));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
// ---- Background fireworks (only in Colors section) ----
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const fxCanvas = document.getElementById("bgFx");
const fxCtx = fxCanvas?.getContext("2d");

const COLORS = [
  "#C06C84",
  "#F67280",
  "#F8B195",
  "#355C7D",
  "#6C5B7B",
  "#A3B18A",
  "#588157",
  "#5BC0BE",
  "#C9A227",
  "#CDB4DB",
];

let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
let W = 0,
  H = 0;

function resizeFx() {
  if (!fxCanvas) return;
  dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  W = Math.floor(window.innerWidth);
  H = Math.floor(window.innerHeight);
  fxCanvas.width = Math.floor(W * dpr);
  fxCanvas.height = Math.floor(H * dpr);
  fxCanvas.style.width = W + "px";
  fxCanvas.style.height = H + "px";
  fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resizeFx);
resizeFx();

let running = false;
let rafId = 0;
let lastBurst = 0;
const particles = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}
function pick(arr) {
  return arr[(Math.random() * arr.length) | 0];
}

function burst(x, y) {
  const count = (Math.random() * 18 + 22) | 0; // 22-40
  for (let i = 0; i < count; i++) {
    const a = rand(0, Math.PI * 2);
    const speed = rand(2.2, 6.0);
    particles.push({
      x,
      y,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed,
      g: rand(0.04, 0.09),
      drag: rand(0.985, 0.995),
      r: rand(1.5, 3.2),
      life: rand(40, 70),
      maxLife: 0,
      color: pick(COLORS),
    });
    particles[particles.length - 1].maxLife =
      particles[particles.length - 1].life;
  }
}

function stepFx(t) {
  if (!running) return;

  // Clear with slight trail (nice look, not heavy)
  fxCtx.clearRect(0, 0, W, H);

  // spawn bursts
  if (t - lastBurst > 520) {
    // about 2 per second
    lastBurst = t;
    burst(rand(W * 0.15, W * 0.85), rand(H * 0.18, H * 0.62));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.vx *= p.drag;
    p.vy *= p.drag;
    p.vy += p.g;

    p.x += p.vx;
    p.y += p.vy;

    p.life -= 1;

    const alpha = Math.max(0, p.life / p.maxLife);

    fxCtx.globalAlpha = alpha * 0.9;
    fxCtx.beginPath();
    fxCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    fxCtx.fillStyle = p.color;
    fxCtx.fill();

    // remove dead or offscreen
    if (p.life <= 0 || p.x < -50 || p.x > W + 50 || p.y < -50 || p.y > H + 50) {
      particles.splice(i, 1);
    }
  }

  fxCtx.globalAlpha = 1;
  rafId = requestAnimationFrame(stepFx);
}

function startFx() {
  if (prefersReduced || running || !fxCanvas) return;
  running = true;
  fxCanvas.classList.add("active");
  lastBurst = performance.now();
  rafId = requestAnimationFrame(stepFx);
}

function stopFx() {
  if (!fxCanvas) return;
  running = false;
  fxCanvas.classList.remove("active");
  cancelAnimationFrame(rafId);
  particles.length = 0;
  fxCtx?.clearRect(0, 0, W, H);
}

// Toggle FX when Colors section is in view
const colorsSection = document.getElementById("colors");
if (colorsSection && fxCanvas && !prefersReduced) {
  const fxObserver = new IntersectionObserver(
    (entries) => {
      const inView = entries.some((e) => e.isIntersecting);
      if (inView) startFx();
      else stopFx();
    },
    { threshold: 0.35 }
  );
  fxObserver.observe(colorsSection);
}
