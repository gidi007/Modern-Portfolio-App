// Portfolio Hero Section
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

// Abstract Profile Component
const AbstractProfile = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0">
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#34D399" />
      </linearGradient>
      <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#818CF8" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    {/* Abstract geometric shapes */}
    <circle cx="100" cy="100" r="80" fill="url(#gradient1)" opacity="0.3">
      <animate attributeName="r" values="80;85;80" dur="3s" repeatCount="indefinite" />
    </circle>
    <path
      d="M100,30 C150,30 150,170 100,170 C50,170 50,30 100,30"
      fill="url(#gradient2)"
      opacity="0.5"
    >
      <animate
        attributeName="d"
        values="M100,30 C150,30 150,170 100,170 C50,170 50,30 100,30;
                M100,40 C140,40 140,160 100,160 C60,160 60,40 100,40;
                M100,30 C150,30 150,170 100,170 C50,170 50,30 100,30"
        dur="5s"
        repeatCount="indefinite"
      />
    </path>
    <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="2" opacity="0.8">
      <animate attributeName="r" values="60;65;60" dur="4s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const ModernPortfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sections = useRef([]);
  const observerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer setup for smooth section detection
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px',
        threshold: 0,
      }
    );

    // Observe all sections
    document.querySelectorAll('section').forEach((section) => {
      observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Fixed Navigation */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Portfolio
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id ? 'text-blue-500' : 'text-gray-300 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                      layoutId="underline"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-900"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                      activeSection === item.id ? 'text-blue-500 bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10" />
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.2)`,
                animation: `float ${Math.random() * 10 + 5}s linear infinite`,
              }}
            />
          ))}
        </div>

        <motion.div
          className="text-center z-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Picture Container */}
          <motion.div
            className="relative w-48 h-48 mx-auto mb-8"
            whileHover={{ scale: 1.1 }}
          >
            {/* Abstract background */}
            <AbstractProfile />

            {/* Profile border */}
            <div className="absolute inset-2 rounded-full border-2 border-white/30 backdrop-blur-sm" />

            {/* Actual profile picture */}
            <motion.div
              className="absolute inset-4 rounded-full bg-white/10 overflow-hidden border-4 border-white"
              whileHover={{ scale: 1.05 }}
            >
              <img src="/path-to-your-image.jpg" alt="Your Name" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Your Name</h1>
          <p className="mt-4 text-lg md:text-xl">A brief description about yourself.</p>

          {/* Social Icons */}
          <div className="mt-6 flex justify-center space-x-4">
            <motion.a
              href="https://github.com/your-github"
              target="_blank"
              className="p-2 rounded-md hover:bg-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              className="p-2 rounded-md hover:bg-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin />
            </motion.a>
            <motion.a
              href="mailto:your-email@example.com"
              className="p-2 rounded-md hover:bg-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail />
            </motion.a>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
            <motion.a
              href="#about"
              className="p-2 rounded-full bg-gray-700 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ModernPortfolio;
