// Theme Context - Globaler Theme State
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const themes = {
  contemporary: {
    id: 'contemporary',
    name: 'Contemporary',
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Space Grotesk', sans-serif",
    },
    colors: {
      bg: '#FFFFFF',
      bgAlt: '#0D0D0D',
      text: '#0D0D0D',
      textLight: 'rgba(13, 13, 13, 0.6)',
      textOnDark: '#FFFFFF',
      accent: '#FF6B6B',
      accent2: '#4ECDC4',
      accent3: '#FFE66D',
      accent4: '#A855F7',
      border: '#0D0D0D',
    },
  },
  editorial: {
    id: 'editorial',
    name: 'Editorial',
    fonts: {
      heading: "'Instrument Serif', Georgia, serif",
      body: "'Inter', sans-serif",
    },
    colors: {
      bg: '#FFFFFF',
      bgAlt: '#1A1A1A',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnDark: '#FFFFFF',
      accent: '#1A1A1A',
      border: '#E0E0E0',
    },
  },
  video: {
    id: 'video',
    name: 'Video',
    fonts: {
      heading: "'Cormorant Garamond', Georgia, serif",
      body: "'Montserrat', sans-serif",
      script: "'Cormorant Garamond', Georgia, serif",
    },
    colors: {
      bg: '#FAF8F5',
      bgDark: '#1A1814',
      bgAlt: '#F5F2ED',
      text: '#1A1814',
      textLight: '#8B8680',
      textOnDark: '#FFFFFF',
      accent: '#C9A962',
      accentLight: '#D4BC7C',
      border: '#E5E0D8',
    },
  },
  botanical: {
    id: 'botanical',
    name: 'Botanical',
    fonts: {
      heading: "'Playfair Display', Georgia, serif",
      body: "'Lato', sans-serif",
      script: "'Playfair Display', Georgia, serif",
    },
    colors: {
      bg: '#FAF9F6',
      bgAlt: '#F5F1EB',
      bgDark: '#2C3E2D',
      text: '#2C3E2D',
      textLight: '#6B7B6C',
      textOnDark: '#FAF9F6',
      accent: '#4A7C59',
      accentLight: '#7BA889',
      cream: '#EDE8DF',
      border: '#D4CFC4',
    },
  },
};

export const themeOrder = ['contemporary', 'editorial', 'video', 'botanical'];

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('contemporary');
  
  const theme = themes[currentTheme];
  
  const value = {
    currentTheme,
    setCurrentTheme,
    theme,
    themes,
    themeOrder,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
