// -------------------- Reveal on scroll --------------------
const revealEls = document.querySelectorAll(".reveal");

const revealIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) e.target.classList.add("in-view");
    }
  },
  { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
);

revealEls.forEach((el) => revealIO.observe(el));

// Footer year
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// -------------------- Fireworks (WELCOME ONLY) --------------------
(() => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) return;

  const hero = document.getElementById("welcome");
  const canvas = document.getElementById("heroFx");
  if (!hero || !canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });

  // Soft wedding palette
  const COLORS = [
    "#F2A7B5",
    "#FFD7E0",
    "#B9DCFF",
    "#DDE9D7",
    "#E9D7FF",
    "#F3DEC3",
  ];

  // Mobile tuning
  const isMobile =
    window.matchMedia("(max-width: 720px)").matches || "ontouchstart" in window;

  // Global tuning (slower + calmer)
  const SETTINGS = {
    burstEveryMs: isMobile ? 2200 : 1800, // slower on phones
    countMin: isMobile ? 35 : 55, // fewer particles on phones
    countMax: isMobile ? 60 : 90,
    speedMin: isMobile ? 40 : 55, // pixels/second (time-based)
    speedMax: isMobile ? 95 : 140,
    lifeMin: isMobile ? 1.8 : 2.2, // seconds
    lifeMax: isMobile ? 3.0 : 3.6,
    coreRMin: isMobile ? 1.6 : 2.0,
    coreRMax: isMobile ? 3.2 : 4.0,
    gravityMin: isMobile ? 18 : 22, // px/s^2
    gravityMax: isMobile ? 38 : 46,
    dragMin: 0.985,
    dragMax: 0.993,
    glowMul: isMobile ? 6.2 : 7.8, // glow radius multiplier
    fadeAlpha: isMobile ? 0.12 : 0.1, // higher = shorter trails
  };

  let running = false;
  let rafId = 0;
  let lastBurstAt = 0;
  let lastFrameAt = 0;

  const particles = [];
  const MAX_PARTICLES = isMobile ? 520 : 950;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  function pick(arr) {
    return arr[(Math.random() * arr.length) | 0];
  }

  function resizeToHero() {
    const r = hero.getBoundingClientRect();
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.floor(r.width * dpr);
    canvas.height = Math.floor(r.height * dpr);
    canvas.style.width = r.width + "px";
    canvas.style.height = r.height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener("resize", resizeToHero);
  resizeToHero();

  function hexToRgba(hex, a) {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a))})`;
  }

  function drawGlow(x, y, coreR, color, alpha) {
    const glowR = coreR * SETTINGS.glowMul;
    const g = ctx.createRadialGradient(x, y, 0, x, y, glowR);
    g.addColorStop(0, hexToRgba(color, alpha * 0.22));
    g.addColorStop(0.22, hexToRgba(color, alpha * 0.07));

    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, glowR, 0, Math.PI * 2);
    ctx.fill();
  }

  function burst(cx, cy) {
    const count = rand(SETTINGS.countMin, SETTINGS.countMax) | 0;
    const baseColor = pick(COLORS);

    for (let i = 0; i < count; i++) {
      const a = rand(0, Math.PI * 2);
      const speed = rand(SETTINGS.speedMin, SETTINGS.speedMax); // px/s
      const coreR = rand(SETTINGS.coreRMin, SETTINGS.coreRMax);
      const life = rand(SETTINGS.lifeMin, SETTINGS.lifeMax); // seconds

      const color = Math.random() < 0.22 ? pick(COLORS) : baseColor;

      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed,
        drag: rand(SETTINGS.dragMin, SETTINGS.dragMax),
        g: rand(SETTINGS.gravityMin, SETTINGS.gravityMax),
        r: coreR,
        life,
        maxLife: life,
        color,
      });
    }

    if (particles.length > MAX_PARTICLES) {
      particles.splice(0, particles.length - MAX_PARTICLES);
    }
  }

  function step(now) {
    if (!running) return;

    const w = hero.clientWidth;
    const h = hero.clientHeight;

    // dt in seconds, clamped (prevents tab-switch jump)
    const dt = Math.min(
      0.033,
      Math.max(0.01, (now - (lastFrameAt || now)) / 1000)
    );
    lastFrameAt = now;

    // Smooth trails (instead of hard clear)
    // Smooth trails WITHOUT turning the canvas white:
    // erase a little of the previous frame each tick
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = `rgba(0,0,0,${SETTINGS.fadeAlpha})`;
    ctx.fillRect(0, 0, w, h);

    // back to normal drawing
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;

    // slower bursts, with slight randomness so it feels organic
    if (now - lastBurstAt > SETTINGS.burstEveryMs + rand(-250, 250)) {
      lastBurstAt = now;

      // keep them mostly behind names (center-top), not corners
      const x = rand(w * 0.22, w * 0.78);
      const y = rand(h * 0.12, h * 0.52);
      burst(x, y);
    }

    // Additive glow for fireworks
    ctx.globalCompositeOperation = "lighter";

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      // time-based physics
      p.vx *= Math.pow(p.drag, dt * 60);
      p.vy *= Math.pow(p.drag, dt * 60);
      p.vy += p.g * dt;

      p.x += p.vx * dt;
      p.y += p.vy * dt;

      p.life -= dt;

      const a = Math.max(0, p.life / p.maxLife);

      drawGlow(p.x, p.y, p.r, p.color, a);
      ctx.globalAlpha = a * 0.45;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      if (
        p.life <= 0 ||
        p.x < -180 ||
        p.x > w + 180 ||
        p.y < -180 ||
        p.y > h + 180
      ) {
        particles.splice(i, 1);
      }
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";

    rafId = requestAnimationFrame(step);
  }

  function start() {
    if (running) return;
    running = true;
    resizeToHero();
    lastBurstAt = performance.now() - 600; // start soon, but not instantly
    lastFrameAt = 0;

    // clear once
    ctx.clearRect(0, 0, hero.clientWidth, hero.clientHeight);

    rafId = requestAnimationFrame(step);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(rafId);
    particles.length = 0;
    ctx.clearRect(0, 0, hero.clientWidth, hero.clientHeight);
  }

  // Pause when hidden (mobile battery + prevents jump)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else {
      // only restart if hero is visible
      // (IntersectionObserver will handle it anyway)
    }
  });

  // Run only while hero is visible
  const heroIO = new IntersectionObserver(
    (entries) => {
      const on = entries.some((e) => e.isIntersecting);
      if (on) start();
      else stop();
    },
    { threshold: isMobile ? 0.25 : 0.35 }
  );

  heroIO.observe(hero);
})();
