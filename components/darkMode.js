import React, { createContext, useContext, useState } from 'react';

// create context
const DarkModeContext = createContext();

// create a provider component
export const DarkModeProvider = ({ children }) => {
  // set the state of the dark mode (true or flase)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // function to switch on and off the dark mode
  const switchDarkMode = () => {
    // switch btw the dark and light
    setIsDarkMode((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, switchDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// create a custom hook to access the dark mode context
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error('useDarkMode must be implemented inside the DarkModeProvider');
  }
  return context;
};
