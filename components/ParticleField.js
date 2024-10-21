import React, { useState, useEffect, useRef } from 'react';

const ParticleField = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const createParticle = (x, y) => ({
      x, y, size: Math.random() * 3 + 1, speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1, life: 1,
    });

    const initParticles = () => {
      for (let i = 0; i < 50; i++) {
        particles.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, index) => {
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          particle.speedX += dx * 0.001;
          particle.speedY += dy * 0.001;
        }
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life -= 0.01;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.life})`;
        ctx.fill();
        if (particle.life <= 0) {
          particles[index] = createParticle(Math.random() * canvas.width, Math.random() * canvas.height);
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    handleResize();
    initParticles();
    animate();

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default ParticleField;
