import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CountdownSection from './components/CountdownSection';
import USPsSection from './components/USPsSection';
import AboutSection from './components/AboutSection';
import WaitlistSection from './components/WaitlistSection';
import Footer from './components/Footer';

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
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    background: #FFFFFF;
  }
  
  ::selection {
    background: #FF6B6B;
    color: #FFFFFF;
  }
`;

function AppContent() {
  const { currentTheme } = useTheme();
  
  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lato:wght@300;400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Update page title
    document.title = 'S&I. Weddings — Coming Soon';
    
    return () => {
      if (link.parentNode) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppWrapper $theme={currentTheme}>
        <Navigation />
        <HeroSection />
        <CountdownSection />
        <USPsSection />
        <AboutSection />
        <WaitlistSection />
        <Footer />
      </AppWrapper>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

const AppWrapper = styled.div`
  min-height: 100vh;
`;
