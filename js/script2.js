// Create floating particles
const particlesContainer = document.querySelector('.floating-particles');
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 20}s`;
    particlesContainer.appendChild(particle);
}

// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: '#ffffff',
    transparent: true,
    opacity: 0.8,
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);
camera.position.z = 2;

// Animation
function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;
    renderer.render(scene, camera);
}
animate();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.to('h1', {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: 'power4.out'
});

gsap.to('.video-container', {
    scrollTrigger: {
        trigger: '.video-grid',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2
});

// Video Call Setup
let localStream;
const localVideo = document.getElementById('localVideo');

async function startVideoCall() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false // Start with audio off
        });
        
        const videoElement = document.createElement('video');
        videoElement.srcObject = localStream;
        videoElement.autoplay = true;
        videoElement.muted = true; // Mute local video to prevent feedback
        videoElement.playsInline = true;
        localVideo.appendChild(videoElement);
    } catch (error) {
        console.error('Error accessing media devices:', error);
    }
}

// Start video call when page loads
startVideoCall();

// Video Call Controls
const muteBtn = document.getElementById('muteBtn');
const videoBtn = document.getElementById('videoBtn');
const shareBtn = document.getElementById('shareBtn');
const endBtn = document.getElementById('endBtn');

let isMuted = true; // Start muted
let isVideoOn = true;

muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    muteBtn.textContent = isMuted ? '🔇' : '🎤';
    if (localStream) {
        localStream.getAudioTracks().forEach(track => {
            track.enabled = !isMuted;
        });
    }
});

videoBtn.addEventListener('click', () => {
    isVideoOn = !isVideoOn;
    videoBtn.textContent = isVideoOn ? '📹' : '❌';
    if (localStream) {
        localStream.getVideoTracks().forEach(track => {
            track.enabled = isVideoOn;
        });
    }
});

shareBtn.addEventListener('click', async () => {
    try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true
        });
        // Handle screen sharing stream
        console.log('Screen sharing started');
    } catch (error) {
        console.error('Error sharing screen:', error);
    }
});

endBtn.addEventListener('click', () => {
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }
    console.log('Call ended');
});

// Responsive handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});