import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { themes } from './themes/themeDefinitions';
import ThemeSwitcher from './components/ThemeSwitcher';
import HeroSection from './components/HeroSection';
import { countdownComponents } from './components/Countdowns';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import WaitlistForm from './components/WaitlistForm';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: ${props => props.theme.fonts.body};
    background: ${props => props.theme.colors.backgroundGradient};
    color: ${props => props.theme.colors.text};
    min-height: 100vh;
    transition: background 0.5s ease, color 0.3s ease;
    overflow-x: hidden;
  }
  
  ::selection {
    background: ${props => props.theme.colors.primary};
    color: ${props => 
      ['botanical', 'editorial', 'contemporary'].includes(props.theme.style) 
        ? '#ffffff' 
        : props.theme.colors.background
    };
  }
`;

function App() {
  const [currentTheme, setCurrentTheme] = useState('luxe');
  const theme = themes[currentTheme];
  
  const CountdownComponent = countdownComponents[currentTheme];

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Lora:ital,wght@0,400;0,600;1,400&family=Bodoni+Moda:ital,wght@0,400;0,600;1,400&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;600;700&family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppWrapper>
        <ThemeSwitcher 
          currentTheme={currentTheme} 
          onThemeChange={setCurrentTheme} 
        />
        
        <HeroSection />
        
        <CountdownComponent />
        
        <Divider />
        
        <ServicesSection />
        
        <Divider />
        
        <AboutSection />
        
        <Divider />
        
        <WaitlistForm currentTheme={currentTheme} />
        
        <Footer>
          <FooterLogo>S&I.</FooterLogo>
          <FooterText>
            © 2026 S&I. Weddings — Digitale Hochzeitserlebnisse
          </FooterText>
        </Footer>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;

// Styles
const AppWrapper = styled.div`
  min-height: 100vh;
  position: relative;
`;

const Divider = styled.div`
  width: 100%;
  max-width: 200px;
  height: 1px;
  margin: 0 auto;
  background: ${props => `linear-gradient(90deg, transparent, ${props.theme.colors.primary}40, transparent)`};
`;

const Footer = styled.footer`
  padding: 3rem 2rem;
  text-align: center;
  border-top: 1px solid ${props => props.theme.colors.primary}15;
`;

const FooterLogo = styled.span`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const FooterText = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textMuted};
  margin-top: 0.75rem;
`;
