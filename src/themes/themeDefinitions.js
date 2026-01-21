// Theme Definitions for S&I Weddings Coming Soon Page

export const themes = {
  neon: {
    name: 'Neon',
    colors: {
      primary: '#FF00FF',
      secondary: '#00FFFF',
      accent: '#FFFF00',
      background: '#0a0a0f',
      backgroundGradient: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0a0a0f 100%)',
      text: '#ffffff',
      textMuted: 'rgba(255,255,255,0.6)',
      glow: '0 0 30px rgba(255, 0, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3)',
      cardBg: 'rgba(255,255,255,0.03)',
    },
    fonts: {
      heading: "'Orbitron', sans-serif",
      body: "'Rajdhani', sans-serif",
    },
    borderRadius: '0px',
    style: 'cyberpunk',
  },
  
  luxe: {
    name: 'Luxe',
    colors: {
      primary: '#C9A962',
      secondary: '#8B7355',
      accent: '#F5E6C8',
      background: '#0D0D0D',
      backgroundGradient: 'linear-gradient(180deg, #0D0D0D 0%, #1A1A1A 50%, #0D0D0D 100%)',
      text: '#F5F5F5',
      textMuted: 'rgba(245,245,245,0.5)',
      glow: '0 0 40px rgba(201, 169, 98, 0.2)',
      cardBg: 'rgba(255,255,255,0.03)',
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Cormorant Garamond', serif",
    },
    borderRadius: '0px',
    style: 'luxury',
  },
  
  botanical: {
    name: 'Botanical',
    colors: {
      primary: '#2D5A3D',
      secondary: '#8FBC8F',
      accent: '#F4E9D8',
      background: '#FFFBF5',
      backgroundGradient: 'linear-gradient(180deg, #FFFBF5 0%, #F4E9D8 100%)',
      text: '#2D3B2D',
      textMuted: 'rgba(45,59,45,0.6)',
      glow: 'none',
      cardBg: 'rgba(0,0,0,0.02)',
    },
    fonts: {
      heading: "'Cormorant Garamond', serif",
      body: "'Lora', serif",
    },
    borderRadius: '8px',
    style: 'organic',
  },
  
  editorial: {
    name: 'Editorial',
    colors: {
      primary: '#1a1a1a',
      secondary: '#e63946',
      accent: '#f1faee',
      background: '#fefefe',
      backgroundGradient: 'linear-gradient(180deg, #fefefe 0%, #f8f8f8 100%)',
      text: '#1a1a1a',
      textMuted: 'rgba(26,26,26,0.5)',
      glow: 'none',
      cardBg: 'rgba(0,0,0,0.02)',
    },
    fonts: {
      heading: "'Bodoni Moda', serif",
      body: "'Source Serif 4', serif",
    },
    borderRadius: '0px',
    style: 'magazine',
  },
  
  contemporary: {
    name: 'Contemporary',
    colors: {
      primary: '#2d2d2d',
      secondary: '#E8E0D5',
      accent: '#A3B18A',
      background: '#F5F2EE',
      backgroundGradient: 'linear-gradient(135deg, #F5F2EE 0%, #E8E0D5 100%)',
      text: '#2d2d2d',
      textMuted: 'rgba(45,45,45,0.6)',
      glow: 'none',
      cardBg: 'rgba(0,0,0,0.02)',
    },
    fonts: {
      heading: "'DM Sans', sans-serif",
      body: "'DM Sans', sans-serif",
    },
    borderRadius: '16px',
    style: 'modern',
  },
  
  gold: {
    name: 'Gold',
    colors: {
      primary: '#D4AF37',
      secondary: '#B8860B',
      accent: '#FFF8DC',
      background: '#1C1C1C',
      backgroundGradient: 'radial-gradient(ellipse at center, #2a2a2a 0%, #1C1C1C 70%)',
      text: '#FFF8DC',
      textMuted: 'rgba(255,248,220,0.6)',
      glow: '0 0 50px rgba(212, 175, 55, 0.3)',
      cardBg: 'rgba(255,255,255,0.03)',
    },
    fonts: {
      heading: "'Cinzel Decorative', serif",
      body: "'Cinzel', serif",
    },
    borderRadius: '0px',
    style: 'opulent',
  },
};

export const themeOrder = ['neon', 'luxe', 'botanical', 'editorial', 'contemporary', 'gold'];

// Helper function to check if theme is dark
export const isDarkTheme = (themeKey) => {
  return ['neon', 'luxe', 'gold'].includes(themeKey);
};

// Helper function to get contrasting text color
export const getContrastColor = (themeKey) => {
  return isDarkTheme(themeKey) ? themes[themeKey].colors.background : '#ffffff';
};
