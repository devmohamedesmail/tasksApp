// ThemeContext.js
import React, { createContext, useContext } from 'react';
import { StyleSheet } from 'react-native';

// Create a context for the theme
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Define the global theme
  const theme = {
    text: {
      fontFamily: 'Inter-Black', // Use the font loaded in your App component
    },
    // Add other global styles if needed
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

