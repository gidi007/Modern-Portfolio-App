import React, { useState, useRef, useEffect } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Filter, Tags, Search } from 'lucide-react';

// Custom cursor component
const CustomCursor = ({ children }) => {
  const cursorRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-full h-full bg-white rounded-full"
          animate={{
            scale: cursorText ? 2.5 : 1,
          }}
        >
          {cursorText && (
            <span className="absolute inset-0 flex items-center justify-center text-black text-xs font-medium">
              {cursorText}
            </span>
          )}
        </motion.div>
      </motion.div>
      {React.Children.map(children, child =>
        React.cloneElement(child, { setCursorText })
      )}
    </>
  );
};

// 3D Project Card
const ProjectCard = ({ project, index, active, setActive, setCursorText }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const cardVariants = {
    active: {
      rotateY: 0,
      scale: 1.1,
      zIndex: 10,
      transition: { duration: 0.5 }
    },
    inactive: (index) => ({
      rotateY: index % 2 === 0 ? -30 : 30,
      scale: 0.8,
      zIndex: 0,
      filter: 'brightness(0.6)',
      transition: { duration: 0.5 }
    })
  };

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto perspective-1000"
      variants={cardVariants}
      animate={active === index ? 'active' : 'inactive'}
      custom={index}
      onClick={() => setActive(index)}
      onMouseEnter={() => {
        setIsHovered(true);
        setCursorText('View');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCursorText('');
      }}
    >
      <motion.div
        className="relative aspect-video rounded-xl overflow-hidden bg-gray-800 shadow-xl preserve-3d"
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? 5 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Project Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Content */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end"
          animate={{
            opacity: isHovered ? 1 : 0.8,
          }}
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-300 text-sm mb-4">{project.description}</p>
          
          {/* Links */}
          <div className="flex space-x-4">
            <motion.a
              href={project.github}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={project.live}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Filter System
const FilterSystem = ({ tags, activeFilters, setActiveFilters }) => {
  return (
    <motion.div
      className="flex flex-wrap gap-4 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {tags.map((tag) => (
        <motion.button
          key={tag}
          className={`px-4 py-2 rounded-full backdrop-blur-sm border ${
            activeFilters.includes(tag)
              ? 'bg-blue-500 border-blue-400 text-white'
              : 'bg-gray-800/50 border-gray-700 text-gray-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setActiveFilters(
              activeFilters.includes(tag)
                ? activeFilters.filter((t) => t !== tag)
                : [...activeFilters, tag]
            );
          }}
        >
          {tag}
        </motion.button>
      ))}
    </motion.div>
  );
};

// Projects Section
const ProjectsSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const projects = [
    {
      title: 'AI-Powered Analytics Platform',
      description: 'Real-time data analysis platform with machine learning capabilities.',
      image: '/api/placeholder/800/600',
      tags: ['React', 'Python', 'TensorFlow'],
      github: '#',
      live: '#'
    },
    {
      title: 'E-commerce Solution',
      description: 'Full-stack e-commerce platform with advanced features.',
      image: '/api/placeholder/800/600',
      tags: ['Next.js', 'Node.js', 'MongoDB'],
      github: '#',
      live: '#'
    },
    {
      title: 'Social Media Dashboard',
      description: 'Comprehensive social media management tool.',
      image: '/api/placeholder/800/600',
      tags: ['Vue.js', 'Firebase', 'TypeScript'],
      github: '#',
      live: '#'
    },
    // Add more projects as needed
  ];

  const allTags = [...new Set(projects.flatMap(project => project.tags))];

  const filteredProjects = projects.filter(project => {
    const matchesFilters = activeFilters.length === 0 || 
      activeFilters.every(filter => project.tags.includes(filter));
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilters && matchesSearch;
  });

  return (
    <section id="projects" className="min-h-screen py-20 px-4 relative bg-gray-900">
      <CustomCursor>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-8" />
          </motion.div>

          {/* Search and Filter Container */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <motion.div
                className="relative w-full md:w-96"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <input
                  type="text"
                  placeholder="Search Projects..."
                  className="w-full py-2 px-4 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </motion.div>
              {/* Filter Tags */}
              <FilterSystem tags={allTags} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
            </div>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index}
                  active={activeCard}
                  setActive={setActiveCard}
                  setCursorText={(text) => setCursorText(text)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </CustomCursor>
    </section>
  );
};

export default ProjectsSection;
