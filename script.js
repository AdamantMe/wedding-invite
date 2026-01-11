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

// -------------------- i18n (EN / UK / RU) --------------------
const dict = {
  en: {
    "nav.welcome": "Welcome",
    "nav.colors": "Colors",
    "nav.plan": "Plan",
    "nav.story": "Our Story",

    "hero.subtitle": "Welcome to our wedding invitation.",
    "hero.date": "Date",
    "hero.city": "City",
    "hero.cityValue": "Praha",
    "hero.ctaPlan": "See the plan",
    "hero.ctaPalette": "Pick a palette",

    "colors.title": "Wedding Dark & Moody outfit palette",
    "colors.subtitle": "Click a palette to open references.",
    "palette.burgundy": "Deep Burgundy Choco",
    "palette.olive": "Sexy Olive",
    "palette.blue": "Dark Blue",
    "palette.classy": "Classy Colors",

    "plan.title": "The plan and timeline",
    "plan.subtitle": "Two days, two vibes. Join us for both if you want.",

    "day1.title": "Day 1 — Wedding Day",
    "day1.subtitle": "Ceremony, photos, and the main celebration.",
    "ceremony.title": "Ceremony place",
    "ceremony.subtitle": "Meeting and having a Ceremony",
    "free.title": "Free time",
    "free.subtitle": "Photos, walk, Champagne, rest.",
    "free.notes1":
      "While the young couple are making a wedding photo album, please have a walk in the park and have some fun!",
    "free.notes2":
      "You can go directly to the restaurant where some cold drinks and snacks will wait for you!",
    "party.title": "Party place",
    "party.subtitle": "Dinner, speeches, and dancing.",

    "day2.title": "Day 2 — Picnic (Optional)",
    "day2.subtitle":
      "For anyone who wants to join: a relaxed, humble Picnic to keep celebrating together.",
    "bbq.title": "Picnic location",
    "bbq.subtitle": "Come hungry. Come casual. Come for a good time.",
    "bbq.timeValue": "During noon/afternoon",
    "bbq.bringValue": "Good mood (and maybe something small to grill)",
    "bbq.dressValue": "Casual / comfy",

    "nav.gifts": "Gifts",
    "gifts.title": "Gifts & Flowers",
    "gifts.p1":
      "The most precious gift for us on this day is your presence and the joy you share with us 🤍",
    "gifts.p2":
      "If you’re thinking about a present, the best gift for us would be a contribution in an envelope — it will help us bring our shared plans and dreams to life.",
    "gifts.p3": "We kindly ask for no bouquets and no alcohol.",
    "gifts.p4": "We don’t drink alcohol, and flowers, sadly, fade quickly.",
    "gifts.p5":
      "If you still feel like coming with flowers, you can bring one single flower or a small branch from yourself — anything that reminds you of us. At the end of the day, we’ll gather them into one shared bouquet, and that will mean something truly special to us.",
    "gifts.p6": "Thank you for understanding 🤍",

    "labels.time": "Time",
    "labels.address": "Address",
    "labels.start": "Start",
    "labels.end": "End",
    "labels.notes": "Notes",
    "labels.bring": "What to bring",
    "labels.dress": "Dress code",

    "story.title": "Our story",
    "story.subtitle": "A bit about us",
    "story.howTitle": "How it started",
    "story.text":
      "It started with a Tinder match and a first date at Náplavka—easy laughs, river air, and zero awkwardness. Their first real conversation somehow turned into oatmeal dishes, and Daniel’s homemade oatmeal cookies stole the show. Oksana had already seen him baking them on Instagram… and that was the moment her crush turned into something real. And now, two years later, they’re celebrating their anniversary in the best way possible: by getting married. Two years full of challenges, fun, love, and adventures—plus an endless collection of oatmeal recipes along the way.",
  },

  uk: {
    "nav.welcome": "Ласкаво просимо",
    "nav.colors": "Кольори",
    "nav.plan": "План",
    "nav.story": "Наша історія",

    "hero.subtitle": "Ласкаво просимо на наше весільне запрошення.",
    "hero.date": "Дата",
    "hero.city": "Місто",
    "hero.cityValue": "Прага",
    "hero.ctaPlan": "Дивитися план",
    "hero.ctaPalette": "Обрати палітру",

    "colors.title": "Темна та атмосферна палітра образів",
    "colors.subtitle": "Натисніть на палітру, щоб відкрити посилання.",
    "palette.burgundy": "Глибокий бордо та шоколад",
    "palette.olive": "Спокуслива олива",
    "palette.blue": "Темно-синя ніч",
    "palette.classy": "Класичні відтінки",

    "plan.title": "План та розклад",
    "plan.subtitle":
      "Два дні — два настрої. Приєднуйтесь до обох, якщо хочете.",

    "day1.title": "День 1 — Весілля",
    "day1.subtitle": "Церемонія, фото та головне святкування.",
    "ceremony.title": "Місце церемонії",
    "ceremony.subtitle": "Зустріч і церемонія",
    "free.title": "Вільний час",
    "free.subtitle": "Фото, прогулянка, шампанське, відпочинок.",
    "free.notes1":
      "Поки молодята роблять весільні фото, будь ласка, прогуляйтеся парком і гарно проведіть час!",
    "free.notes2":
      "Можете одразу йти до ресторану — там на вас чекатимуть прохолодні напої та легкі закуски!",
    "party.title": "Місце святкування",
    "party.subtitle": "Вечеря, тости та танці.",

    "day2.title": "День 2 — Picnic (за бажанням)",
    "day2.subtitle":
      "Для всіх охочих: невимушене й скромне Picnic, щоб продовжити святкування разом.",
    "bbq.title": "Локація Picnic",
    "bbq.subtitle":
      "Приходьте голодні. Приходьте у зручному. Приходьте просто кайфувати.",
    "bbq.timeValue": "В обід / після обіду",
    "bbq.bringValue": "Гарний настрій (і, можливо, щось невелике для грилю)",
    "bbq.dressValue": "Повсякденно / зручно",

    "nav.gifts": "Подарунки",
    "gifts.title": "Подарунки та квіти",
    "gifts.p1":
      "Найцінніше для нас у цей день — ваша присутність і радість, яку ви розділяєте з нами 🤍",
    "gifts.p2":
      "Якщо ви плануєте подарунок, для нас найкращим буде внесок у конверті — він допоможе нам у реалізації наших спільних планів і мрій.",
    "gifts.p3": "Просимо не дарувати букети та алкоголь.",
    "gifts.p4": "Алкоголь ми не вживаємо, а квіти, на жаль, швидко в’януть.",
    "gifts.p5":
      "Якщо вам усе ж хочеться прийти з квітами, можна принести одну квітку або гілочку від себе — будь-яку, що у вас асоціюється з нами. Наприкінці дня ми зберемо з них один спільний букет, і це буде для нас особливо цінно.",
    "gifts.p6": "Дякуємо за розуміння 🤍",

    "labels.time": "Час",
    "labels.address": "Адреса",
    "labels.start": "Початок",
    "labels.end": "Кінець",
    "labels.notes": "Нотатки",
    "labels.bring": "Що взяти",
    "labels.dress": "Дрес-код",

    "story.title": "Наша історія",
    "story.subtitle": "Трішки про нас",
    "story.howTitle": "Як усе почалося",
    "story.text":
      "Все почалося з матчу в Tinder і першого побачення на Náplavka — легкі жарти, повітря біля річки і жодної незручності. Їхня перша справжня розмова раптом перейшла на вівсяні страви, а домашнє вівсяне печиво Даніеля стало хітом. Оксана вже бачила в Instagram, як він його пече… і саме тоді її симпатія перетворилася на щось справжнє. А тепер, через два роки, вони святкують річницю найкращим способом: одружуються. Два роки викликів, веселощів, любові й пригод — і нескінченної колекції вівсяних рецептів.",
  },

  ru: {
    "nav.welcome": "Добро пожаловать",
    "nav.colors": "Цвета",
    "nav.plan": "План",
    "nav.story": "Наша история",

    "hero.subtitle": "Добро пожаловать на наше свадебное приглашение.",
    "hero.date": "Дата",
    "hero.city": "Город",
    "hero.cityValue": "Прага",
    "hero.ctaPlan": "Смотреть план",
    "hero.ctaPalette": "Выбрать палитру",

    "colors.title": "Тёмная и атмосферная палитра образов",
    "colors.subtitle": "Нажмите на палитру, чтобы открыть ссылки.",
    "palette.burgundy": "Глубокий бордо и шоколад",
    "palette.olive": "Соблазнительная олива",
    "palette.blue": "Тёмно-синяя ночь",
    "palette.classy": "Классические оттенки",

    "plan.title": "План и таймлайн",
    "plan.subtitle":
      "Два дня — два настроения. Присоединяйтесь к обоим, если хотите.",

    "day1.title": "День 1 — Свадьба",
    "day1.subtitle": "Церемония, фото и главное празднование.",
    "ceremony.title": "Место церемонии",
    "ceremony.subtitle": "Встреча и церемония",
    "free.title": "Свободное время",
    "free.subtitle": "Фото, прогулка, шампанское, отдых.",
    "free.notes1":
      "Пока молодожёны делают свадебные фото, пожалуйста, прогуляйтесь по парку и хорошо проведите время!",
    "free.notes2":
      "Можно сразу идти в ресторан — там вас будут ждать прохладные напитки и лёгкие закуски!",
    "party.title": "Место празднования",
    "party.subtitle": "Ужин, тосты и танцы.",

    "day2.title": "День 2 — Picnic (по желанию)",
    "day2.subtitle":
      "Для всех желающих: спокойное и скромное Picnic, чтобы продолжить праздновать вместе.",
    "bbq.title": "Локация Picnic",
    "bbq.subtitle":
      "Приходите голодными. Приходите в удобном. Приходите просто отлично провести время.",
    "bbq.timeValue": "В обед / после обеда",
    "bbq.bringValue":
      "Хорошее настроение (и, возможно, что-то небольшое для гриля)",
    "bbq.dressValue": "Повседневно / удобно",

    "nav.gifts": "Подарки",
    "gifts.title": "Подарки и цветы",
    "gifts.p1":
      "Самое ценное для нас в этот день - ваше присутствие и разделённая с нами радость 🤍",
    "gifts.p2":
      "Если вы планируете подарок, для нас самым желанным будет вклад в конверте - он поможет нам в реализации наших общих планов и мечт .",
    "gifts.p3": "Просим не дарить букеты и алкоголь.",
    "gifts.p4":
      "Алкоголь мы не употребляем, а цветы, к сожалению, быстро вянут.",
    "gifts.p5":
      "Если вам все же хочется прийти с цветами, можно принести один цветок или веточку от себя — любой, который у вас ассоциируется с нами. В конце дня мы соберём из них один общий букет, и это будет для нас особенно ценно.",
    "gifts.p6": "Спасибо за понимание 🤍",

    "labels.time": "Время",
    "labels.address": "Адрес",
    "labels.start": "Начало",
    "labels.end": "Конец",
    "labels.notes": "Примечания",
    "labels.bring": "Что взять",
    "labels.dress": "Дресс-код",

    "story.title": "Наша история",
    "story.subtitle": "Немного о нас",
    "story.howTitle": "С чего всё началось",
    "story.text":
      "Всё началось с матча в Tinder и первого свидания на Náplavka — лёгкие шутки, воздух у реки и ноль неловкости. Их первый настоящий разговор внезапно превратился в обсуждение овсяных блюд, а домашнее овсяное печенье Даниэля стало главным хитом. Оксана уже видела в Instagram, как он его готовит… и именно тогда её симпатия превратилась во что-то настоящее. А теперь, два года спустя, они отмечают годовщину самым лучшим способом: женятся. Два года вызовов, веселья, любви и приключений — и бесконечной коллекции овсяных рецептов.",
  },
};

function detectLang() {
  const saved = localStorage.getItem("lang");
  if (saved && dict[saved]) return saved;

  const n = (navigator.language || "en").toLowerCase();
  if (n.startsWith("uk")) return "uk";
  if (n.startsWith("ru")) return "ru";
  return "en";
}

function applyLang(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value =
      (dict[lang] && dict[lang][key]) || (dict.en && dict.en[key]) || "";
    if (value) el.textContent = value;
  });

  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.classList.toggle("is-active", b.dataset.lang === lang);
  });

  localStorage.setItem("lang", lang);
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => applyLang(btn.dataset.lang));
});

applyLang(detectLang());

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

(() => {})();
