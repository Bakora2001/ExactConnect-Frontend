import React, { createContext, useState, useEffect } from 'react';

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  // Check system preference for dark mode
  const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initialize darkMode state from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode !== null ? storedDarkMode === 'true' : isSystemDark;
  });

  // Apply dark mode class to the HTML element and update localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={`${darkMode ? 'dark' : ''} min-h-screen`}>
        {children}
      </div>
    </DarkModeContext.Provider>
  );
};