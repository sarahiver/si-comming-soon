import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { themes, isDarkTheme } from './themes/themeDefinitions';
import ThemeSwitcher from './components/ThemeSwitcher';
import HeroSection from './components/HeroSection';
import { countdownComponents } from './components/Countdowns';
import { ServicesSection, AboutSection, WaitlistSection, Footer } from './components/ContentSections';

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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
`;

function App() {
  const [currentTheme, setCurrentTheme] = useState('gold');
  const CountdownComponent = countdownComponents[currentTheme];
  const isDark = isDarkTheme(currentTheme);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Lato:wght@300;400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppWrapper>
        <ThemeSwitcher 
          currentTheme={currentTheme} 
          onThemeChange={setCurrentTheme} 
        />
        
        <HeroSection currentTheme={currentTheme} />
        
        <CountdownComponent />
        
        <Divider $isDark={isDark} />
        
        <ServicesSection currentTheme={currentTheme} />
        
        <Divider $isDark={isDark} />
        
        <AboutSection currentTheme={currentTheme} />
        
        <WaitlistSection currentTheme={currentTheme} />
        
        <Footer currentTheme={currentTheme} />
      </AppWrapper>
    </>
  );
}

export default App;

const AppWrapper = styled.div`
  min-height: 100vh;
`;

const Divider = styled.div`
  height: 1px;
  max-width: 200px;
  margin: 0 auto;
  background: ${p => p.$isDark 
    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
    : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)'
  };
`;
