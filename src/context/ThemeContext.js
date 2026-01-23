// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const themes = {
  video: {
    id: 'video',
    name: 'Video',
    description: 'Cineastisch & Dramatisch',
    fonts: {
      heading: "'Cormorant Garamond', Georgia, serif",
      body: "'Inter', -apple-system, sans-serif",
      import: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
    },
    colors: {
      background: '#FAF8F5',
      backgroundDark: '#0A0A0A',
      text: '#1A1A1A',
      textLight: 'rgba(26,26,26,0.6)',
      textOnDark: '#FFFFFF',
      textOnDarkMuted: 'rgba(255,255,255,0.6)',
      primary: '#B8976A',
      primaryHover: '#D4AF37',
      border: 'rgba(184,151,106,0.2)',
      borderHover: '#B8976A'
    },
    styles: {
      borderRadius: '0px',
      buttonStyle: 'solid'
    }
  },
  editorial: {
    id: 'editorial',
    name: 'Editorial',
    description: 'Minimalistisch & Modern',
    fonts: {
      heading: "'Instrument Serif', Georgia, serif",
      body: "'Inter', -apple-system, sans-serif",
      import: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap"
    },
    colors: {
      background: '#FFFFFF',
      backgroundDark: '#1A1A1A',
      backgroundAlt: '#FAFAFA',
      text: '#1A1A1A',
      textLight: '#666666',
      textOnDark: '#FFFFFF',
      textOnDarkMuted: 'rgba(255,255,255,0.7)',
      primary: '#000000',
      primaryHover: '#333333',
      border: '#E0E0E0',
      borderHover: '#1A1A1A'
    },
    styles: {
      borderRadius: '0px',
      buttonStyle: 'solid'
    }
  },
  botanical: {
    id: 'botanical',
    name: 'Botanical',
    description: 'Natürlich & Organisch',
    fonts: {
      heading: "'Playfair Display', Georgia, serif",
      body: "'Lato', -apple-system, sans-serif",
      import: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Lato:wght@300;400;500;600&display=swap"
    },
    colors: {
      background: '#F5F1EB',
      backgroundDark: '#2D3B2D',
      backgroundAlt: '#FFFFFF',
      text: '#2D3B2D',
      textLight: '#5A6B5A',
      textOnDark: '#F5F1EB',
      textOnDarkMuted: 'rgba(245,241,235,0.7)',
      primary: '#8B9D83',
      primaryHover: '#6B7D63',
      border: 'rgba(139,157,131,0.2)',
      borderHover: '#8B9D83'
    },
    styles: {
      borderRadius: '20px',
      buttonStyle: 'rounded'
    }
  },
  contemporary: {
    id: 'contemporary',
    name: 'Contemporary',
    description: 'Bold & Playful',
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Space Grotesk', -apple-system, sans-serif",
      import: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
    },
    colors: {
      background: '#FAFAFA',
      backgroundDark: '#0D0D0D',
      backgroundAlt: '#FFFFFF',
      text: '#0D0D0D',
      textLight: '#525252',
      textOnDark: '#FFFFFF',
      textOnDarkMuted: 'rgba(255,255,255,0.8)',
      primary: '#FF6B6B',
      primaryHover: '#E85555',
      secondary: '#4ECDC4',
      tertiary: '#FFE66D',
      border: '#0D0D0D',
      borderHover: '#FF6B6B'
    },
    styles: {
      borderRadius: '0px',
      buttonStyle: 'brutalist',
      boxShadow: '6px 6px 0 #0D0D0D'
    }
  },
  luxe: {
    id: 'luxe',
    name: 'Luxe',
    description: 'Opulent & Glamourös',
    fonts: {
      heading: "'Cormorant Garamond', Georgia, serif",
      body: "'Montserrat', -apple-system, sans-serif",
      import: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap"
    },
    colors: {
      background: '#FAF9F7',
      backgroundDark: '#0A0A0A',
      backgroundAlt: '#FFFFFF',
      text: '#2A2A2A',
      textLight: 'rgba(42,42,42,0.6)',
      textOnDark: '#FEFEFE',
      textOnDarkMuted: 'rgba(255,255,255,0.5)',
      primary: '#D4AF37',
      primaryHover: '#F4D03F',
      border: 'rgba(212,175,55,0.2)',
      borderHover: '#D4AF37'
    },
    styles: {
      borderRadius: '0px',
      buttonStyle: 'elegant',
      fontStyle: 'italic'
    }
  },
  neon: {
    id: 'neon',
    name: 'Neon',
    description: 'Futuristisch & Elektrisierend',
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Space Grotesk', -apple-system, sans-serif",
      import: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
    },
    colors: {
      background: '#0a0a0f',
      backgroundDark: '#0a0a0f',
      backgroundAlt: '#12121a',
      text: '#FFFFFF',
      textLight: 'rgba(255,255,255,0.6)',
      textOnDark: '#FFFFFF',
      textOnDarkMuted: 'rgba(255,255,255,0.6)',
      primary: '#00ffff',
      primaryHover: '#00d4ff',
      secondary: '#ff00ff',
      border: 'rgba(0,255,255,0.3)',
      borderHover: '#00ffff'
    },
    styles: {
      borderRadius: '0px',
      buttonStyle: 'glow',
      glowCyan: '0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(0,255,255,0.3)',
      glowPink: '0 0 20px rgba(255,0,255,0.5), 0 0 40px rgba(255,0,255,0.3)'
    }
  }
};

const STORAGE_KEY = 'si-wedding-theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && themes[saved]) return saved;
    }
    return 'video';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, currentTheme);
    }
  }, [currentTheme]);

  const switchTheme = (themeId) => {
    if (themes[themeId]) {
      setCurrentTheme(themeId);
    }
  };

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme, theme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { themes };
export default ThemeContext;
