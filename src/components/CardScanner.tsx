import { useEffect, useRef } from 'react';
import './CardScanner.css';

export const CardScanner = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardLineRef = useRef<HTMLDivElement>(null);
    const particleCanvasRef = useRef<HTMLCanvasElement>(null);
    const scannerCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!containerRef.current || !cardLineRef.current) return;

        // Card images from public directory
        const cardImages = [
            "/cards/689f20b55e654d1341fb06f8_4.1.png",
            "/cards/689f20b5a080a31ee7154b19_1.png",
            "/cards/689f20b5c1e4919fd69672b8_3.png",
            "/cards/689f20b5f6a5e232e7beb4be_2.png",
            "/cards/689f20b5bea2f1b07392d936_4.png",
        ];

        // Generate code for ASCII effect
        const generateCode = (width: number, height: number): string => {
            const codeLines = [
                "// compiled preview • scanner demo",
                "/* generated for visual effect – not executed */",
                "const SCAN_WIDTH = 8;",
                "const FADE_ZONE = 35;",
                "const MAX_PARTICLES = 2500;",
                "function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }",
                "function lerp(a, b, t) { return a + (b - a) * t; }",
                "const now = () => performance.now();",
                "class Particle { constructor(x, y, vx, vy) { this.x = x; this.y = y; } }",
                "const scanner = { x: Math.floor(window.innerWidth / 2), width: 8 };",
            ];

            let flow = codeLines.join(" ").repeat(10);
            const totalChars = width * height;
            while (flow.length < totalChars) {
                flow += " " + codeLines[Math.floor(Math.random() * codeLines.length)];
            }

            let out = "";
            let offset = 0;
            for (let row = 0; row < height; row++) {
                let line = flow.slice(offset, offset + width);
                if (line.length < width) line = line + " ".repeat(width - line.length);
                out += line + (row < height - 1 ? "\n" : "");
                offset += width;
            }
            return out;
        };

        // Create card wrapper
        const createCardWrapper = (index: number): HTMLDivElement => {
            const wrapper = document.createElement("div");
            wrapper.className = "card-wrapper";

            const normalCard = document.createElement("div");
            normalCard.className = "card card-normal";

            const cardImage = document.createElement("img");
            cardImage.className = "card-image";
            cardImage.src = cardImages[index % cardImages.length];
            cardImage.alt = "Card";

            normalCard.appendChild(cardImage);

            const asciiCard = document.createElement("div");
            asciiCard.className = "card card-ascii";

            const asciiContent = document.createElement("div");
            asciiContent.className = "ascii-content";
            asciiContent.textContent = generateCode(66, 19);

            asciiCard.appendChild(asciiContent);
            wrapper.appendChild(normalCard);
            wrapper.appendChild(asciiCard);

            return wrapper;
        };

        // Populate cards
        const cardLine = cardLineRef.current;
        cardLine.innerHTML = "";
        for (let i = 0; i < 20; i++) {
            cardLine.appendChild(createCardWrapper(i));
        }

        // Animation variables - duplicate cards for seamless loop
        for (let i = 0; i < 20; i++) {
            cardLine.appendChild(createCardWrapper(i));
        }

        // Start with cards filling from the left edge
        const initialCardLineWidth = cardLine.scrollWidth / 2;
        let position = -initialCardLineWidth;
        let velocity = 33;
        let lastTime = performance.now();

        // Update card clipping based on scanner position
        const updateCardClipping = () => {
            const scannerX = window.innerWidth / 2;
            const scannerWidth = 8;
            const scannerLeft = scannerX - scannerWidth / 2;
            const scannerRight = scannerX + scannerWidth / 2;

            document.querySelectorAll(".card-wrapper").forEach((wrapper) => {
                const rect = wrapper.getBoundingClientRect();
                const cardLeft = rect.left;
                const cardRight = rect.right;
                const cardWidth = rect.width;

                const normalCard = wrapper.querySelector(".card-normal") as HTMLElement;
                const asciiCard = wrapper.querySelector(".card-ascii") as HTMLElement;

                if (cardLeft < scannerRight && cardRight > scannerLeft) {
                    const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
                    const scannerIntersectRight = Math.min(scannerRight - cardLeft, cardWidth);

                    const normalClipRight = (scannerIntersectLeft / cardWidth) * 100;
                    const asciiClipLeft = (scannerIntersectRight / cardWidth) * 100;

                    normalCard.style.setProperty("--clip-right", `${normalClipRight}%`);
                    asciiCard.style.setProperty("--clip-left", `${asciiClipLeft}%`);
                } else {
                    if (cardRight < scannerLeft) {
                        normalCard.style.setProperty("--clip-right", "100%");
                        asciiCard.style.setProperty("--clip-left", "100%");
                    } else if (cardLeft > scannerRight) {
                        normalCard.style.setProperty("--clip-right", "0%");
                        asciiCard.style.setProperty("--clip-left", "0%");
                    }
                }
            });
        };

        // Animation loop
        const animate = () => {
            const currentTime = performance.now();
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            position += velocity * deltaTime; // Move right

            const cardLineWidth = cardLine.scrollWidth / 2; // Half because we duplicated cards

            // Seamless looping
            if (position >= cardLineWidth) {
                position -= cardLineWidth;
            }

            cardLine.style.transform = `translateX(${position}px)`;
            updateCardClipping();

            animationId = requestAnimationFrame(animate);
        };

        let animationId = requestAnimationFrame(animate);

        // Initial clipping update to show codes from start
        setTimeout(() => updateCardClipping(), 100);

        // Particle Scanner System
        const scannerCanvas = scannerCanvasRef.current;
        let scannerAnimationId: number;

        if (scannerCanvas) {
            const ctx = scannerCanvas.getContext('2d');
            if (ctx) {
                const w = window.innerWidth;
                const h = 300;
                scannerCanvas.width = w;
                scannerCanvas.height = h;

                const particles: any[] = [];
                let particleCount = 0;
                const maxParticles = 800;
                const lightBarX = w / 2;
                const lightBarWidth = 3;
                const fadeZone = 60;

                // Create gradient cache for particles
                const gradientCanvas = document.createElement('canvas');
                const gradientCtx = gradientCanvas.getContext('2d');
                gradientCanvas.width = 16;
                gradientCanvas.height = 16;

                if (gradientCtx) {
                    const half = gradientCanvas.width / 2;
                    const gradient = gradientCtx.createRadialGradient(half, half, 0, half, half, half);
                    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
                    gradient.addColorStop(0.3, 'rgba(196, 181, 253, 0.8)');
                    gradient.addColorStop(0.7, 'rgba(139, 92, 246, 0.4)');
                    gradient.addColorStop(1, 'transparent');
                    gradientCtx.fillStyle = gradient;
                    gradientCtx.beginPath();
                    gradientCtx.arc(half, half, half, 0, Math.PI * 2);
                    gradientCtx.fill();
                }

                const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

                const createParticle = () => ({
                    x: lightBarX + randomFloat(-lightBarWidth / 2, lightBarWidth / 2),
                    y: randomFloat(0, h),
                    vx: randomFloat(0.2, 1.0),
                    vy: randomFloat(-0.15, 0.15),
                    radius: randomFloat(0.4, 1),
                    alpha: randomFloat(0.6, 1),
                    decay: randomFloat(0.005, 0.025),
                    originalAlpha: 0,
                    life: 1.0,
                    time: 0,
                    twinkleSpeed: randomFloat(0.02, 0.08),
                    twinkleAmount: randomFloat(0.1, 0.25),
                });

                // Initialize particles
                for (let i = 0; i < maxParticles; i++) {
                    const particle = createParticle();
                    particle.originalAlpha = particle.alpha;
                    particleCount++;
                    particles[particleCount] = particle;
                }

                const updateParticle = (particle: any) => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.time++;
                    particle.alpha = particle.originalAlpha * particle.life +
                        Math.sin(particle.time * particle.twinkleSpeed) * particle.twinkleAmount;
                    particle.life -= particle.decay;

                    if (particle.x > w + 10 || particle.life <= 0) {
                        particle.x = lightBarX + randomFloat(-lightBarWidth / 2, lightBarWidth / 2);
                        particle.y = randomFloat(0, h);
                        particle.vx = randomFloat(0.2, 1.0);
                        particle.vy = randomFloat(-0.15, 0.15);
                        particle.alpha = randomFloat(0.6, 1);
                        particle.originalAlpha = particle.alpha;
                        particle.life = 1.0;
                        particle.time = 0;
                    }
                };

                const drawParticle = (particle: any) => {
                    if (particle.life <= 0) return;

                    let fadeAlpha = 1;
                    if (particle.y < fadeZone) {
                        fadeAlpha = particle.y / fadeZone;
                    } else if (particle.y > h - fadeZone) {
                        fadeAlpha = (h - particle.y) / fadeZone;
                    }
                    fadeAlpha = Math.max(0, Math.min(1, fadeAlpha));

                    ctx.globalAlpha = particle.alpha * fadeAlpha;
                    ctx.drawImage(
                        gradientCanvas,
                        particle.x - particle.radius,
                        particle.y - particle.radius,
                        particle.radius * 2,
                        particle.radius * 2
                    );
                };

                const drawLightBar = () => {
                    ctx.globalCompositeOperation = 'lighter';

                    const lineWidth = lightBarWidth;

                    // Core gradient
                    const coreGradient = ctx.createLinearGradient(
                        lightBarX - lineWidth / 2, 0,
                        lightBarX + lineWidth / 2, 0
                    );
                    coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                    coreGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.9)');
                    coreGradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
                    coreGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.9)');
                    coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                    ctx.globalAlpha = 1;
                    ctx.fillStyle = coreGradient;
                    ctx.fillRect(lightBarX - lineWidth / 2, 0, lineWidth, h);

                    // Glow layers
                    const drawGlow = (width: number, alpha: number, color: string) => {
                        const glowGradient = ctx.createLinearGradient(
                            lightBarX - width / 2, 0,
                            lightBarX + width / 2, 0
                        );
                        glowGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
                        glowGradient.addColorStop(0.5, color);
                        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                        ctx.globalAlpha = alpha;
                        ctx.fillStyle = glowGradient;
                        ctx.fillRect(lightBarX - width / 2, 0, width, h);
                    };

                    drawGlow(8, 0.8, 'rgba(196, 181, 253, 1)');
                    drawGlow(16, 0.6, 'rgba(139, 92, 246, 1)');
                    drawGlow(32, 0.4, 'rgba(109, 40, 217, 1)');

                    ctx.globalCompositeOperation = 'source-over';
                };

                const animateScanner = () => {
                    ctx.clearRect(0, 0, w, h);
                    ctx.globalCompositeOperation = 'lighter';

                    // Draw particles
                    for (let i = 1; i <= particleCount; i++) {
                        if (particles[i]) {
                            updateParticle(particles[i]);
                            drawParticle(particles[i]);
                        }
                    }

                    // Draw light bar
                    drawLightBar();

                    scannerAnimationId = requestAnimationFrame(animateScanner);
                };

                scannerAnimationId = requestAnimationFrame(animateScanner);
            }
        }

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            if (scannerAnimationId) {
                cancelAnimationFrame(scannerAnimationId);
            }
        };
    }, []);

    return (
        <section className="card-scanner-section">
            <div className="card-scanner-container" ref={containerRef}>
                <canvas id="particleCanvas" ref={particleCanvasRef}></canvas>
                <canvas id="scannerCanvas" ref={scannerCanvasRef}></canvas>

                <div className="scanner"></div>

                <div className="card-stream">
                    <div className="card-line" ref={cardLineRef}></div>
                </div>
            </div>
        </section>
    );
};
