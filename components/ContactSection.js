import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Moon, Sun, CheckCircle, AlertCircle, User } from 'lucide-react';

// Particle Field for Background Effect
const ParticleField = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const createParticle = (x, y) => ({
      x, y,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
      life: 1,
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
        const distance = Math.sqrt(dx ** 2 + dy ** 2);

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
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
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
  }, [mousePosition]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// 3D Animated Form Input
const FormInput = ({ icon: Icon, label, type, value, onChange, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, rotateY: 5 }}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur ${
          isFocused ? 'opacity-100' : 'opacity-0'
        }`}
        animate={{ scale: isFocused ? 1.02 : 1 }}
      />
      <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
        <div className="flex items-center px-4">
          <Icon className="w-5 h-5 text-gray-400" />
          <input
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={label}
            className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>
      {error && (
        <motion.p className="text-red-400 text-sm mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

// Animated Map Interaction with Pulsating Marker
const MapPlaceholder = () => (
  <motion.div
    className="relative h-64 rounded-lg overflow-hidden"
    whileHover={{ scale: 1.05 }}
  >
    <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm border border-gray-700" />
    <img src="/api/placeholder/800/400" alt="Map" className="w-full h-full object-cover opacity-50" />
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="w-8 h-8 bg-blue-500 rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  </motion.div>
);

// Contact Section
const ContactSection = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4 relative">
      <ParticleField />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              icon={User}
              label="Your Name"
              type="text"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            />
            <FormInput
              icon={Mail}
              label="Email Address"
              type="email"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            />
            <textarea
              placeholder="Your Message"
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              className="w-full h-32 bg-gray-800/50 rounded-lg text-white p-4"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 py-3 rounded-lg text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          <MapPlaceholder />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
