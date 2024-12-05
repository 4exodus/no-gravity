const canvas = document.getElementById("gravityCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const mouse = {
    x: null,
    y: null,
    radius: 150, // Raggio d'interazione con le particelle
};

// Classe per le particelle
class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            const forceX = dx / distance;
            const forceY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceX * force * this.density;
            this.y -= forceY * force * this.density;
        } else {
            this.x += (this.baseX - this.x) * 0.05;
            this.y += (this.baseY - this.y) * 0.05;
        }

        this.draw();
    }
}

// Inizializza le particelle
function initParticles() {
    particles.length = 0;
    const numParticles = Math.floor((canvas.width * canvas.height) / 9000);

    for (let i = 0; i < numParticles; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = `rgba(255, 255, 255, ${Math.random() * 0.8})`;
        particles.push(new Particle(x, y, size, color));
    }
}

// Animazione
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.update();
    });

    requestAnimationFrame(animate);
}

// Eventi mouse
canvas.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

canvas.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
});

// Resize finestra
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Avvio
initParticles();
animate();
