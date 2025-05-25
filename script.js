// Scroll suave para navegación
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animaciones al hacer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Efectos del header al hacer scroll
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const header = document.querySelector(".header");

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }
  lastScrollTop = scrollTop;
});

// Partículas flotantes adicionales
function createFloatingElements() {
  const symbols = ["🎈", "🎪", "🎠", "🎡", "⭐", "🎊"];

  setInterval(() => {
    const element = document.createElement("div");
    element.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    element.style.position = "fixed";
    element.style.left = Math.random() * window.innerWidth + "px";
    element.style.top = window.innerHeight + "px";
    element.style.fontSize = "2rem";
    element.style.zIndex = "1";
    element.style.pointerEvents = "none";
    element.style.animation = "floatUp 8s linear forwards";

    document.body.appendChild(element);

    setTimeout(() => {
      element.remove();
    }, 8000);
  }, 3000);
}

// CSS para la animación de elementos flotantes
const style = document.createElement("style");
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-${
              window.innerHeight + 100
            }px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Iniciar efectos
createFloatingElements();
