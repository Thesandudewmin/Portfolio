/* ============================================
   DOM ELEMENTS
   ============================================ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const reveals = document.querySelectorAll('.reveal');

/* ============================================
   MOBILE NAVIGATION
   ============================================ */
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ============================================
   ACTIVE NAV LINK ON SCROLL
   ============================================ */
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

/* ============================================
   SCROLL REVEAL ANIMATION
   ============================================ */
function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
window.addEventListener('load', revealOnScroll);

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ============================================
   TYPING EFFECT
   ============================================ */
const typingText = document.querySelector('.typing-text');
const roles = ['Web Developer', 'UI Designer', 'Problem Solver', 'Creative Thinker'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', typeEffect);

/* ============================================
   CONTACT FORM VALIDATION
   ============================================ */
const formInputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    message: document.getElementById('message')
};

const formErrors = {
    name: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    message: document.getElementById('messageError')
};

const formSuccess = document.getElementById('formSuccess');

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

function showError(input, errorElement, show) {
    if (show) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.classList.add('show');
    } else {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.classList.remove('show');
    }
}

function clearValidation() {
    Object.values(formInputs).forEach(input => {
        input.classList.remove('error', 'success');
    });
    Object.values(formErrors).forEach(error => {
        error.classList.remove('show');
    });
    formSuccess.classList.remove('show');
}

// Real-time validation
formInputs.name.addEventListener('blur', () => {
    const isValid = validateName(formInputs.name.value);
    showError(formInputs.name, formErrors.name, !isValid);
});

formInputs.email.addEventListener('blur', () => {
    const isValid = validateEmail(formInputs.email.value);
    showError(formInputs.email, formErrors.email, !isValid);
});

formInputs.message.addEventListener('blur', () => {
    const isValid = validateMessage(formInputs.message.value);
    showError(formInputs.message, formErrors.message, !isValid);
});

// Clear error on input
Object.values(formInputs).forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('error');
        const errorId = input.id + 'Error';
        document.getElementById(errorId).classList.remove('show');
    });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = formInputs.name.value.trim();
    const email = formInputs.email.value.trim();
    const message = formInputs.message.value.trim();
    
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isMessageValid = validateMessage(message);
    
    showError(formInputs.name, formErrors.name, !isNameValid);
    showError(formInputs.email, formErrors.email, !isEmailValid);
    showError(formInputs.message, formErrors.message, !isMessageValid);
    
    if (isNameValid && isEmailValid && isMessageValid) {
        // Show success message
        formSuccess.classList.add('show');
        
        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            clearValidation();
        }, 3000);
    }
});

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ============================================
   PARALLAX EFFECT FOR HERO
   ============================================ */
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
});

/* ============================================
   COUNTER ANIMATION FOR STATS
   ============================================ */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Trigger counter animation when about section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

/* ============================================
   KEYBOARD NAVIGATION SUPPORT
   ============================================ */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});