import { useEffect, useRef } from 'react';

const ConstellationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const config = {
      star: {
        color: 'rgba(189, 168, 52, 0.9)',
        width: 4,
      },
      line: {
        color: 'rgba(50, 139, 90, 0.8)',
        width: 0.2,
      },
      position: { x: 0, y: 0 },
      velocity: 0.1,
      length: 150,
      distance: 120,
      radius: 250,
      stars: [] as any[],
    };

    class Star {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = config.velocity - Math.random() * 0.5;
        this.vy = config.velocity - Math.random() * 0.5;
        this.radius = Math.random() * config.star.width;
      }

      create() {
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
      }

      animate() {
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const createStars = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      config.stars.forEach(star => {
        star.create();
        star.animate();
      });

      for (let i = 0; i < config.length; i++) {
        for (let j = 0; j < config.length; j++) {
          const a = config.stars[i];
          const b = config.stars[j];
          if (
            Math.abs(a.x - b.x) < config.distance &&
            Math.abs(a.y - b.y) < config.distance &&
            Math.abs(a.x - config.position.x) < config.radius &&
            Math.abs(a.y - config.position.y) < config.radius
          ) {
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
            context.closePath();
          }
        }
      }
    };

    const animate = () => {
      createStars();
      requestAnimationFrame(animate);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      config.stars = Array.from({ length: config.length }, () => new Star());
      context.fillStyle = config.star.color;
      context.strokeStyle = config.line.color;
      context.lineWidth = config.line.width;
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      config.position.x = e.clientX;
      config.position.y = e.clientY;
    });

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default ConstellationBackground;
