// Theme Definitions - EXAKT wie in den Wedding Website Themes

export const themes = {
  editorial: {
    id: 'editorial',
    name: 'Editorial',
    description: 'Minimalistisch & Modern',
    fonts: {
      heading: "'Instrument Serif', Georgia, serif",
      body: "'Inter', sans-serif",
    },
    colors: {
      bg: '#FFFFFF',
      bgGradient: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)',
      text: '#1A1A1A',
      textMuted: '#666666',
      accent: '#1A1A1A',
      border: '#E0E0E0',
    },
  },

  gold: {
    id: 'gold',
    name: 'Gold',
    description: 'Luxuriös & Opulent',
    fonts: {
      heading: "'Cormorant Garamond', Georgia, serif",
      body: "'Montserrat', sans-serif",
    },
    colors: {
      bg: '#0A0A0A',
      bgGradient: 'linear-gradient(180deg, #0A0A0A 0%, #151510 100%)',
      text: '#FFFFFF',
      textMuted: 'rgba(255,255,255,0.5)',
      accent: '#D4AF37',
      border: 'rgba(212, 175, 55, 0.3)',
    },
  },

  botanical: {
    id: 'botanical',
    name: 'Botanical',
    description: 'Natürlich & Organisch',
    fonts: {
      heading: "'Playfair Display', Georgia, serif",
      body: "'Lato', sans-serif",
    },
    colors: {
      bg: '#F5F1EB',
      bgGradient: 'linear-gradient(180deg, #F5F1EB 0%, #EDE8E0 100%)',
      text: '#2D3B2D',
      textMuted: '#8B9D83',
      accent: '#8B9D83',
      border: 'rgba(139, 157, 131, 0.3)',
    },
  },

  contemporary: {
    id: 'contemporary',
    name: 'Contemporary',
    description: 'Bold & Playful',
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Space Grotesk', sans-serif",
    },
    colors: {
      bg: '#FFFFFF',
      bgGradient: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
      text: '#0D0D0D',
      textMuted: 'rgba(13,13,13,0.6)',
      accent: '#FF6B6B',
      accent2: '#4ECDC4',
      accent3: '#FFE66D',
      border: '#0D0D0D',
    },
  },

  luxe: {
    id: 'luxe',
    name: 'Luxe',
    description: 'Raffiniert & Zeitlos',
    fonts: {
      heading: "'Cormorant Garamond', Georgia, serif",
      body: "'Montserrat', sans-serif",
    },
    colors: {
      bg: '#0A0A0A',
      bgGradient: 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
      text: '#FFFFFF',
      textMuted: 'rgba(255,255,255,0.6)',
      accent: '#D4AF37',
      accent2: '#C9A96E',
      border: 'rgba(212, 175, 55, 0.2)',
    },
  },

  neon: {
    id: 'neon',
    name: 'Neon',
    description: 'Futuristisch & Elektrisierend',
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Space Grotesk', sans-serif",
    },
    colors: {
      bg: '#0a0a0f',
      bgGradient: 'linear-gradient(135deg, #0a0a0f 0%, #0f0a15 50%, #0a0a0f 100%)',
      text: '#FFFFFF',
      textMuted: 'rgba(255,255,255,0.6)',
      accent: '#00ffff',
      accent2: '#ff00ff',
      accent3: '#00ff88',
      border: 'rgba(0, 255, 255, 0.3)',
    },
  },
};

export const themeOrder = ['video', 'editorial', 'botanical', 'contemporary', 'luxe', 'neon'];
export const isDarkTheme = (id) => ['gold', 'luxe', 'neon'].includes(id);
