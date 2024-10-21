import React, { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light');

  // Effect to apply the theme to the body
  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-lg bg-gray-800 text-white transition duration-200 hover:bg-gray-700"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? '🌙' : '🌞'}
    </button>
  );
};

export default ThemeSwitcher;
