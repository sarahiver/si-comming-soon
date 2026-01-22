import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CountdownSection from './components/CountdownSection';
import USPsSection from './components/USPsSection';
import AboutSection from './components/AboutSection';
import WaitlistSection from './components/WaitlistSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

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

function MainPage() {
  const { currentTheme, isLoading, theme } = useTheme();
  
  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@700&family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lato:wght@300;400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Update page title
    document.title = 'S&I. wedding — Coming Soon';
    
    return () => {
      if (link.parentNode) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <AppWrapper $theme={currentTheme}>
      {/* Loading Overlay */}
      <LoadingOverlay $show={isLoading} $theme={currentTheme} $colors={theme.colors}>
        <LoadingLogo>S&I.</LoadingLogo>
        <LoadingText $theme={currentTheme}>Design wird geladen...</LoadingText>
      </LoadingOverlay>
      
      <Navigation />
      <HeroSection />
      <CountdownSection />
      <USPsSection />
      <AboutSection />
      <WaitlistSection />
      <Footer />
    </AppWrapper>
  );
}

function AdminPage() {
  useEffect(() => {
    // Load fonts for admin
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@700&family=Space+Grotesk:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    document.title = 'S&I. wedding — Admin Dashboard';
    
    return () => {
      if (link.parentNode) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return <AdminDashboard />;
}

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        } />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;

const AppWrapper = styled.div`
  min-height: 100vh;
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${p => p.$show ? 1 : 0};
  visibility: ${p => p.$show ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  
  ${p => p.$theme === 'video' && css`
    background: #1A1814;
  `}
  
  ${p => p.$theme === 'contemporary' && css`
    background: #0D0D0D;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    background: #FFFFFF;
  `}
  
  ${p => p.$theme === 'botanical' && css`
    background: #F5F7F2;
  `}
  
  ${p => p.$theme === 'luxe' && css`
    background: #1A1A1A;
  `}
`;

const LoadingLogo = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.06em;
  background: #000000;
  color: #FFFFFF;
  padding: 12px 24px;
  margin-bottom: 30px;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const LoadingText = styled.p`
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  animation: ${pulse} 1.5s ease-in-out infinite;
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(255, 255, 255, 0.6);
  `}
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(255, 255, 255, 0.6);
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    color: rgba(0, 0, 0, 0.5);
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    color: #4A7C59;
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(255, 255, 255, 0.6);
  `}
`;
