// Scroll reveal using IntersectionObserver (fast + clean)
const revealEls = document.querySelectorAll(".reveal");

const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in-view");
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => io.observe(el));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
