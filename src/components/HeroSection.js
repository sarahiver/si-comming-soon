// Hero Section - Passt sich dem jeweiligen Theme an
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { themes, isDarkTheme } from '../themes/themeDefinitions';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const HeroSection = ({ currentTheme }) => {
  const theme = themes[currentTheme];
  const isDark = isDarkTheme(currentTheme);

  return (
    <Section $theme={currentTheme} $bg={theme.colors.bgGradient}>
      <BackgroundDecor $theme={currentTheme} />
      <Container>
        <Badge $theme={currentTheme} $isDark={isDark}>Coming Soon</Badge>
        <Logo $theme={currentTheme}>S&I.</Logo>
        <Tagline $theme={currentTheme} $isDark={isDark}>
          Digitale Hochzeitseinladungen, 
          <br />
          <span>die so einzigartig sind wie eure Liebe</span>
        </Tagline>
        <ScrollHint $isDark={isDark}>
          <span>Scroll</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M10 16L5 11M10 16L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </ScrollHint>
      </Container>
    </Section>
  );
};

export default HeroSection;

// Styles
const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: ${p => p.$bg};
  padding: 100px 5%;
`;

const BackgroundDecor = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  
  ${p => p.$theme === 'neon' && css`
    background-image: 
      linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    
    &::before, &::after {
      content: '';
      position: absolute;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      filter: blur(120px);
      opacity: 0.12;
    }
    &::before { background: #00ffff; top: 10%; left: 10%; }
    &::after { background: #ff00ff; bottom: 10%; right: 10%; }
  `}
  
  ${p => (p.$theme === 'gold' || p.$theme === 'luxe') && css`
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 60%);
    }
  `}
  
  ${p => p.$theme === 'botanical' && css`
    &::before, &::after {
      content: '🌿';
      position: absolute;
      font-size: 12rem;
      opacity: 0.05;
    }
    &::before { top: 5%; left: -3%; transform: rotate(-30deg); }
    &::after { bottom: 5%; right: -3%; transform: rotate(30deg) scaleX(-1); }
  `}
`;

const Container = styled.div`
  max-width: 900px;
  text-align: center;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 1s ease-out;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 10px 24px;
  margin-bottom: 30px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  animation: ${float} 4s ease-in-out infinite;
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    border: 1px solid #E0E0E0;
    color: #666;
    background: #fff;
  `}
  
  ${p => p.$theme === 'gold' && css`
    font-family: 'Montserrat', sans-serif;
    border: 1px solid rgba(212, 175, 55, 0.4);
    color: #D4AF37;
    background: rgba(212, 175, 55, 0.05);
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    border: 1px solid rgba(139, 157, 131, 0.4);
    color: #8B9D83;
    background: rgba(139, 157, 131, 0.1);
    border-radius: 50px;
  `}
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    border: 2px solid #0D0D0D;
    color: #0D0D0D;
    background: #FFE66D;
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    border: 1px solid rgba(212, 175, 55, 0.3);
    color: #D4AF37;
    letter-spacing: 0.4em;
  `}
  
  ${p => p.$theme === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    border: 1px solid rgba(255, 0, 255, 0.4);
    color: #ff00ff;
    background: rgba(255, 0, 255, 0.05);
    text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
  `}
`;

const Logo = styled.h1`
  font-size: clamp(4rem, 15vw, 10rem);
  font-weight: 700;
  line-height: 1;
  margin-bottom: 30px;
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Instrument Serif', Georgia, serif;
    color: #1A1A1A;
  `}
  
  ${p => p.$theme === 'gold' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    background: linear-gradient(90deg, #B8960C, #D4AF37, #F5E6C8, #D4AF37, #B8960C);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shimmer} 4s linear infinite;
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    color: #2D3B2D;
  `}
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: #0D0D0D;
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 400;
    font-style: italic;
    background: linear-gradient(180deg, #FFFFFF, #D4AF37);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
  
  ${p => p.$theme === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: #00ffff;
    text-shadow: 0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3);
  `}
`;

const Tagline = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.35rem);
  line-height: 1.7;
  margin-bottom: 60px;
  color: ${p => p.$isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'};
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    span { font-style: italic; }
  `}
  
  ${p => p.$theme === 'gold' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    span { font-style: italic; color: #8B9D83; }
  `}
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    span { color: #FF6B6B; font-weight: 600; }
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  `}
  
  ${p => p.$theme === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    span { color: #ff00ff; }
  `}
`;

const ScrollHint = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: ${p => p.$isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'};
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  animation: ${float} 3s ease-in-out infinite;
`;
