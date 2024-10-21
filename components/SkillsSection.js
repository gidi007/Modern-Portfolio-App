//skill and about section
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Coffee, User, Camera, Brain, Sparkles, Star } from 'lucide-react';

// Skill Card Component
const SkillCard = ({ icon: Icon, title, level, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative p-6 rounded-xl bg-gray-800/70 backdrop-blur-lg shadow-lg border border-gray-700 transition-transform"
      whileHover={{ scale: 1.08, rotateY: 10, z: 50 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <motion.div
            className="p-3 rounded-lg bg-blue-500/30"
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-6 h-6 text-blue-400" />
          </motion.div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="flex items-center space-x-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < level ? 'text-yellow-400' : 'text-gray-500'
                }`}
                fill={i < level ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 -z-10"
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// About Section
const AboutSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const stats = [
    { icon: Code, label: 'Projects Completed', value: '50+' },
    { icon: Coffee, label: 'Cups of Coffee', value: '1000+' },
    { icon: User, label: 'Happy Clients', value: '30+' },
    { icon: Camera, label: 'Design Awards', value: '5' },
  ];

  return (
    <section id="about" className="min-h-screen py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4">
              Crafting Digital Experiences
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              With over 5 years of experience in full-stack development, I specialize in
              creating innovative web solutions that combine cutting-edge technology
              with intuitive design. My passion lies in building scalable applications
              that make a real impact.
            </p>
            <motion.button
              className="px-6 py-3 bg-blue-500 rounded-lg font-medium hover:bg-blue-600 transition-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div className="grid grid-cols-2 gap-6" style={{ y }}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-gray-800/50 shadow-md border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                }}
              >
                <stat.icon className="w-8 h-8 text-blue-400 mb-4" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Skills Section
const SkillsSection = () => {
  const skills = [
    {
      icon: Code,
      title: 'Frontend Development',
      level: 5,
      description: 'Expert in React, Vue.js, and modern CSS frameworks',
    },
    {
      icon: Brain,
      title: 'Backend Development',
      level: 4,
      description: 'Node.js, Python, and database management',
    },
    {
      icon: Camera,
      title: 'UI/UX Design',
      level: 4,
      description: 'Figma, Adobe XD, and responsive design principles',
    },
    {
      icon: Sparkles,
      title: 'Cloud Services',
      level: 3,
      description: 'AWS, Google Cloud, and serverless architecture',
    },
  ];

  return (
    <section id="skills" className="min-h-screen py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SkillCard {...skill} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Add these sections to your ModernPortfolio component
const ModernPortfolio = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <AboutSection />
      <SkillsSection />
    </div>
  );
};

export default ModernPortfolio;
