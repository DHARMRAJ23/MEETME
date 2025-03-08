gsap.registerPlugin(ScrollTrigger);

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme based on system preference
document.documentElement.setAttribute('data-theme', prefersDarkScheme.matches ? 'dark' : 'light');

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Enhanced content entrance animation
gsap.from('.content', {
    opacity: 0,
    y: 100,
    duration: 1.5,
    ease: "power4.out"
});

gsap.to('.content', {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power4.out"
});

// Button entrance animations
gsap.from('.join-btn', {
    opacity: 0,
    x: -50,
    duration: 1,
    delay: 1,
    ease: "back.out(1.7)"
});

gsap.from('.create-btn', {
    opacity: 0,
    x: 50,
    duration: 1,
    delay: 1,
    ease: "back.out(1.7)"
});

// Enhanced circle animations with responsive values
const updateCircleAnimations = () => {
    const vw = window.innerWidth;
    const maxMove = Math.min(vw * 0.1, 150); // Responsive movement range

    gsap.to('.circle', {
        scale: 'random(0.7, 1.4)',
        x: `random(${-maxMove}, ${maxMove})`,
        y: `random(${-maxMove}, ${maxMove})`,
        rotation: 'random(-360, 360)',
        duration: 'random(15, 25)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
            amount: 5,
            from: 'random'
        }
    });
};

// Initial call and resize listener
updateCircleAnimations();
window.addEventListener('resize', updateCircleAnimations);

// Smoother parallax effect with responsive values
document.addEventListener('mousemove', (e) => {
    const vw = window.innerWidth;
    const sensitivity = vw > 768 ? 0.015 : 0.008; // Reduced sensitivity on mobile
    const mouseX = (e.clientX - window.innerWidth / 2) * sensitivity;
    const mouseY = (e.clientY - window.innerHeight / 2) * sensitivity;

    gsap.to('.circle', {
        x: mouseX,
        y: mouseY,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.15
    });
});

// Enhanced button interactions
document.getElementById('joinBtn').addEventListener('click', () => {
    const meetingId = prompt('Enter meeting ID:');
    if (meetingId) {
        console.log('Joining meeting:', meetingId);
    }
});

document.getElementById('createBtn').addEventListener('click', () => {
    const meetingId = Math.random().toString(36).substring(7);
    console.log('Created meeting:', meetingId);
    alert(`Your meeting ID is: ${meetingId}`);
});