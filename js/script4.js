 // Create floating particles
 function createParticles() {
    const container = document.querySelector('.floating-particles');
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(0, 255, 245, 0.5)';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        gsap.to(particle, {
            y: -window.innerHeight,
            rotation: 360,
            opacity: 0,
            duration: Math.random() * 3 + 5,
            repeat: -1,
            delay: Math.random() * 5,
            ease: "none"
        });

        container.appendChild(particle);
    }
}

// GSAP Animations
function initAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.contact-container, h1, .form-group, button, .social-links, .social-link')
            .forEach(el => {
                el.style.opacity = 1;
                el.style.transform = 'none';
            });
        return;
    }

    gsap.to('.contact-container', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.to('h1', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "back.out(1.7)"
    });

    gsap.to('.form-group', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
    });

    gsap.to('button', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1.2,
        ease: "back.out(1.7)"
    });

    gsap.to('.social-links', {
        opacity: 1,
        duration: 0.8,
        delay: 1.4
    });

    gsap.to('.social-link', {
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        delay: 1.5,
        ease: "back.out(1.7)"
    });
}

// Form submission and chat box handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const button = this.querySelector('button');
    const successMessage = document.querySelector('.success-message');
    const chatBox = document.getElementById('chatBox');
    
    // Basic form validation
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    if (phone && !validatePhone(phone)) {
        alert('Please enter a valid phone number');
        return;
    }
    
    // Show chat box
    chatBox.style.display = 'block';
    
    // Clear form inputs
    this.reset();
    
    gsap.to(button, {
        scale: 0.95,
        duration: 0.2,
        onComplete: () => {
            button.textContent = 'Message Sent!';
            button.style.background = '#4CAF50';
            gsap.to(button, {
                scale: 1,
                duration: 0.2
            });
            gsap.to(successMessage, {
                display: 'block',
                opacity: 1,
                duration: 0.5,
                y: 0
            });
        }
    });
});

// Email validation
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Phone validation
function validatePhone(phone) {
    return /^\d{10}$/.test(phone.replace(/\D/g, ''));
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const container = document.querySelector('.floating-particles');
        container.innerHTML = '';
        createParticles();
    }, 250);
});

// Initialize animations and particles on load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initAnimations();
});