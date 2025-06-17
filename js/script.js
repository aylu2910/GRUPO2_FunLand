// ==========================================
// EFECTO DE NIEVE NAVIDEÑA
// ==========================================
function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.innerHTML = "❄";
  snowflake.style.left = Math.random() * window.innerWidth + "px";
  snowflake.style.fontSize = Math.random() * 20 + 10 + "px";
  snowflake.style.animationDuration = Math.random() * 5 + 5 + "s";
  snowflake.style.opacity = Math.random();

  const snowContainer = document.getElementById("snow-container");
  if (snowContainer) {
    snowContainer.appendChild(snowflake);

    setTimeout(() => {
      snowflake.remove();
    }, 10000);
  }
}

// Crear copos de nieve cada 200ms
setInterval(createSnowflake, 200);

// ==========================================
// NAVEGACIÓN SUAVE
// ==========================================
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

// ==========================================
// ANIMACIONES AL HACER SCROLL
// ==========================================
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

// Observar elementos con la clase fade-in
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// ==========================================
// EFECTOS DEL HEADER AL HACER SCROLL
// ==========================================
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const header = document.querySelector(".header");

  if (header) {
    if (scrollTop > 100) {
      header.style.background = "rgba(0, 48, 24, 0.95)";
      header.style.backdropFilter = "blur(20px)";
    } else {
      header.style.background =
        "linear-gradient(135deg, var(--primary-green) 0%, var(--primary-red) 100%)";
    }
  }
});

// ==========================================
// MENU HAMBURGUESA
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      // Animar las líneas del hamburger
      const spans = hamburger.querySelectorAll("span");
      if (navLinks.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translateY(8px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translateY(-8px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener("click", function (event) {
      if (
        !hamburger.contains(event.target) &&
        !navLinks.contains(event.target)
      ) {
        navLinks.classList.remove("active");
        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  }
});

// ==========================================
// ELEMENTOS FLOTANTES NAVIDEÑOS
// ==========================================
function createFloatingElements() {
  const symbols = ["🎁", "⭐", "🎄", "🎅", "❄️", "🦌", "🎊", "✨"];

  setInterval(() => {
    const element = document.createElement("div");
    element.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    element.style.position = "fixed";
    element.style.left = Math.random() * window.innerWidth + "px";
    element.style.top = window.innerHeight + "px";
    element.style.fontSize = Math.random() * 1.5 + 1 + "rem";
    element.style.zIndex = "1";
    element.style.pointerEvents = "none";
    element.style.animation = "floatUp 8s linear forwards";
    element.style.color =
      Math.random() > 0.5 ? "var(--accent-gold)" : "var(--snow-white)";

    document.body.appendChild(element);

    setTimeout(() => {
      element.remove();
    }, 8000);
  }, 5000);
}

// Iniciar elementos flotantes
createFloatingElements();

// ==========================================
// EFECTOS ADICIONALES DE NAVIDAD
// ==========================================

// sparkles en elementos interactivos
function addJingleEffect() {
  const interactiveElements = document.querySelectorAll(
    ".member-card, .nav-links a, .logo"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      // Añadir efecto visual de brillos
      const sparkle = document.createElement("div");
      sparkle.style.position = "absolute";
      sparkle.style.pointerEvents = "none";
      sparkle.innerHTML = "✨";
      sparkle.style.fontSize = "1.5rem";
      sparkle.style.animation = "twinkle 1s ease-out";
      sparkle.style.zIndex = "1000";

      const rect = this.getBoundingClientRect();
      sparkle.style.left = rect.left + Math.random() * rect.width + "px";
      sparkle.style.top = rect.top + Math.random() * rect.height + "px";

      document.body.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), 1000);
    });
  });
}

addJingleEffect();

// ==========================================
// EFECTOS DE PARTÍCULAS AL MOVER EL MOUSE
// ==========================================
let mouseTimer;
document.addEventListener("mousemove", function (e) {
  clearTimeout(mouseTimer);

  mouseTimer = setTimeout(() => {
    if (Math.random() > 0.95) {
      // Solo 5% de probabilidad para no saturar
      const particle = document.createElement("div");
      particle.innerHTML = "✨";
      particle.style.position = "fixed";
      particle.style.left = e.clientX + "px";
      particle.style.top = e.clientY + "px";
      particle.style.pointerEvents = "none";
      particle.style.fontSize = "1rem";
      particle.style.color = "var(--accent-gold)";
      particle.style.animation = "twinkle 1s ease-out";
      particle.style.zIndex = "9999";

      document.body.appendChild(particle);

      setTimeout(() => particle.remove(), 1000);
    }
  }, 100);
});

// ==========================================
// OPTIMIZACIÓN DE RENDIMIENTO
// ==========================================
// Limitar el número de copos de nieve en pantalla
function limitSnowflakes() {
  const snowContainer = document.getElementById("snow-container");
  if (snowContainer) {
    const snowflakes = snowContainer.querySelectorAll(".snowflake");
    if (snowflakes.length > 50) {
      // Eliminar los copos más antiguos si hay demasiados
      for (let i = 0; i < snowflakes.length - 50; i++) {
        snowflakes[i].remove();
      }
    }
  }
}

// Verificar cada 5 segundos
setInterval(limitSnowflakes, 5000);

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }
});
