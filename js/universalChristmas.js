// Universal Christmas Park JavaScript
// Enhanced version with error handling and best practices

// Configuration constants
const CONFIG = {
    SNOWFLAKE_INTERVAL: 100,
    SNOWFLAKE_LIFETIME: 5000,
    SCROLL_THRESHOLD: 100,
    MAX_SNOWFLAKES: 50
};

// Global variables
let snowflakeCount = 0;
let snowInterval = null;

// Utility functions
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Snowfall Effect
function createSnowflake() {
    const snowContainer = safeQuerySelector('#snow-container');
    if (!snowContainer) {
        console.error('Snow container not found!');
        return;
    }

    // Limit number of snowflakes for performance
    if (snowflakeCount >= CONFIG.MAX_SNOWFLAKES) {
        return;
    }

    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';

    // Random positioning and sizing
    snowflake.style.cssText = `
    position: fixed;
    top: -10px;
    left: ${Math.random() * window.innerWidth}px;
    font-size: ${Math.random() * 10 + 10}px;
    animation-duration: ${Math.random() * 3 + 2}s;
    opacity: ${Math.random() * 0.8 + 0.2};
    pointer-events: none;
    color: white;
    z-index: 1000;
    animation-name: snowfall;
    animation-timing-function: linear;
    animation-iteration-count: 1;
  `;

    snowContainer.appendChild(snowflake);
    snowflakeCount++;

    // Remove snowflake after animation
    setTimeout(() => {
        if (snowflake.parentNode) {
            snowflake.remove();
            snowflakeCount--;
        }
    }, CONFIG.SNOWFLAKE_LIFETIME);
}

function initializeSnowfall() {
    // Clear any existing interval
    if (snowInterval) {
        clearInterval(snowInterval);
    }

    snowInterval = setInterval(createSnowflake, CONFIG.SNOWFLAKE_INTERVAL);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = safeQuerySelector('.nav-links');
    if (!navLinks) {
        console.error('Navigation links not found!');
        return;
    }

    navLinks.classList.toggle('active');

    // Update ARIA attributes for accessibility
    const isActive = navLinks.classList.contains('active');
    const menuButton = safeQuerySelector('.mobile-menu-toggle');
    if (menuButton) {
        menuButton.setAttribute('aria-expanded', isActive);
    }

}

// FAQ Toggle
function toggleFaq(element) {
    if (!element) {
        console.error('FAQ element not provided!');
        return;
    }

    const answer = element.nextElementSibling;
    const icon = element.querySelector('.faq-icon');

    if (!answer || !icon) {
        console.error('FAQ answer or icon not found!');
        return;
    }

    // Toggle active state
    answer.classList.toggle('active');
    icon.classList.toggle('active');

    // Update ARIA attributes
    const isExpanded = answer.classList.contains('active');
    element.setAttribute('aria-expanded', isExpanded);

}

// Form Submit Handler
function handleSubmit(event) {
    if (!event) {
        console.error('Event not provided to handleSubmit!');
        return;
    }

    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Basic form validation
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
    }

    // Show success message
    alert('¡Gracias por tu mensaje! Te contactaremos pronto. 🎄');

    // Reset form
    form.reset();

    console.log('Form submitted successfully', {
        name: name,
        email: email,
        hasMessage: !!message
    });
}

// Chat Widget
function openChat() {
    const chatWidget = safeQuerySelector('.chat-widget');
    if (chatWidget) {
        chatWidget.classList.add('active');
    }

    alert('¡Chat en vivo disponible pronto! 🎅');
}

// Fade In Animation on Scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const target = safeQuerySelector(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without triggering scroll
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

}

// Navbar scroll effect
const handleNavbarScroll = debounce(function () {
    const nav = safeQuerySelector('nav');
    if (!nav) return;

    if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
        nav.style.background = 'rgba(0, 131, 65, 0.95)';
        nav.style.backdropFilter = 'blur(20px)';
        nav.classList.add('scrolled');
    } else {
        nav.style.background = 'var(--primary-green)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.classList.remove('scrolled');
    }
}, 10);

// Initialize all functionality
function initializeApp() {

    try {
        // Initialize all features
        initializeSnowfall();
        initializeScrollAnimations();
        initializeSmoothScrolling();

        // Add scroll listener for navbar
        window.addEventListener('scroll', handleNavbarScroll);

        // Add resize listener to adjust snowfall
        window.addEventListener('resize', debounce(() => {
            console.log('Window resized, adjusting snowfall...');
        }, 250));


    } catch (error) {
        console.error('❌ Error initializing app:', error);
    }
}

// Error handling for window load
window.addEventListener('error', function (e) {
    console.error('JavaScript error:', e.error);
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM already loaded
    initializeApp();
}

// Expose functions globally for HTML onclick handlers
window.toggleMobileMenu = toggleMobileMenu;
window.toggleFaq = toggleFaq;
window.handleSubmit = handleSubmit;
window.openChat = openChat;

// Add CSS for snowfall animation if not present
function addSnowfallCSS() {
    const style = document.createElement('style');
    style.textContent = `
    @keyframes snowfall {
      0% {
        transform: translateY(-10px) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
    
    .snowflake {
      position: fixed;
      top: -10px;
      pointer-events: none;
      user-select: none;
      z-index: 1000;
    }
  `;
    document.head.appendChild(style);
}

// Add snowfall CSS when script loads
addSnowfallCSS();


document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("correo");
    const asuntoInput = document.getElementById("asunto");
    const mensajeInput = document.getElementById("mensaje");

    // Función para aplicar mensajes personalizados
    function aplicarValidaciones(input, mensaje) {
        input.addEventListener("invalid", function(event) {
            event.target.setCustomValidity(mensaje);
        });

        input.addEventListener("input", function(event) {
            event.target.setCustomValidity("");
        });
    }

    aplicarValidaciones(nombreInput, "Por favor, ingrese su nombre.");
    aplicarValidaciones(emailInput, "Por favor, ingrese un correo electrónico válido.");
    aplicarValidaciones(asuntoInput, "Por favor, ingrese el asunto del mensaje.");
    aplicarValidaciones(mensajeInput, "Por favor, escriba su mensaje.");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let nombre = nombreInput.value.trim();
        let email = emailInput.value.trim();
        let asunto = asuntoInput.value.trim();
        let mensaje = mensajeInput.value.trim();
        let errorMessage = "";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nombre) errorMessage += "El nombre es obligatorio.\n";
        if (!email || !emailRegex.test(email)) errorMessage += "Debe ingresar un email válido.\n";
        if (!asunto) errorMessage += "Debe ingresar un asunto.\n";
        if (!mensaje) errorMessage += "Debe ingresar un mensaje.\n";

        if (errorMessage) {
            alert("Error en el formulario:\n" + errorMessage);
        } else {
            alert(`Gracias por su contacto, ${nombre}. \nEn breve lo estaremos ayudando.`);
            form.reset();
        }
    });
});
