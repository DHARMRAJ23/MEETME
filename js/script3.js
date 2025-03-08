 // Create floating particles with 3D effect
 function createParticles() {
    const container = document.querySelector('.background-animation');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        const zDepth = Math.random() * 100 - 50;
        
        const animation = particle.animate([
            { 
                transform: `translate3d(0, 0, ${zDepth}px) rotate(0deg)`,
                opacity: Math.random() * 0.5 + 0.3
            },
            { 
                transform: `translate3d(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px, ${-zDepth}px) rotate(360deg)`,
                opacity: Math.random() * 0.5 + 0.3
            }
        ], {
            duration: Math.random() * 3000 + 5000,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
        });

        container.appendChild(particle);
    }
}

// Add 3D ripple effect to buttons
document.querySelectorAll('.control-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;

        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        // Add 3D transform to ripple
        ripple.style.transform = 'translateZ(20px)';

        setTimeout(() => ripple.remove(), 600);
        
        // Add click animation
        this.style.transform = 'scale(0.95) translateZ(-20px)';
        setTimeout(() => {
            this.style.transform = 'scale(1) translateZ(0)';
        }, 200);
    });
});

// New Feature Handlers
const chatBtn = document.getElementById('chatBtn');
const chatContainer = document.querySelector('.chat-container');
const reactionsBtn = document.getElementById('reactionsBtn');
const reactionsPanel = document.querySelector('.reactions-panel');
const recordBtn = document.getElementById('recordBtn');
const recordingIndicator = document.querySelector('.recording-indicator');

chatBtn.addEventListener('click', () => {
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'flex' : 'none';
});

reactionsBtn.addEventListener('click', () => {
    reactionsPanel.style.display = reactionsPanel.style.display === 'none' ? 'flex' : 'none';
});

let isRecording = false;
recordBtn.addEventListener('click', () => {
    isRecording = !isRecording;
    recordingIndicator.style.display = isRecording ? 'flex' : 'none';
    recordBtn.style.background = isRecording ? '#ff4444' : 'rgba(0, 255, 245, 0.1)';
});

// Animate video containers with 3D effect
function animateVideoContainer(container) {
    container.style.animation = 'none';
    container.offsetHeight; // Trigger reflow
    container.style.animation = 'container3DAppear 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    const localVideo = document.getElementById('localVideo');
    localVideo.style.transition = 'all 0.5s ease';
    
    // Add 3D hover effects to controls
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('mouseover', () => {
            btn.style.transform = 'scale(1.1) translateY(-5px) translateZ(20px)';
        });
        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'scale(1) translateZ(0)';
        });
    });

    // Initialize camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                localVideo.srcObject = stream;
            })
            .catch(err => {
                console.error("Error accessing camera:", err);
            });
    }
});