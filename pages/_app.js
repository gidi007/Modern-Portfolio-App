//pages/_app.js
import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import SkillsSection from '../components/SkillsSection';
import ContactSection from '../components/ContactSection';
import ParticleField from '../components/ParticleField';
import ScrollProgress from '../components/ScrollProgress';
import ThemeSwitcher from '../components/ThemeSwitcher';
import ProjectSection from '../components/ProjectSection';
import './styles/globals.css'; // Importing global styles


const App = ({Component, pageProps}) => {
  const [theme, setTheme] = useState('light'); // Theme state management

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <ScrollProgress />
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
      <ParticleField />
      <HeroSection />
      <SkillsSection />
      <ProjectSection/>
      <ContactSection />
      <Component {...pageProps} /> {/* Render the current page */}
    </div>
  );
};

export default App;
