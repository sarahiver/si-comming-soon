import React from 'react';
import styled, { keyframes } from 'styled-components';

const HeroSection = () => {
  return (
    <Container>
      <BackgroundDecoration />
      <Content>
        <Badge>Coming Soon</Badge>
        <Logo>S&I.</Logo>
        <Tagline>
          Digitale Hochzeitseinladungen, die so einzigartig sind wie eure Liebe
        </Tagline>
      </Content>
      <ScrollIndicator>
        Scroll
        <span>↓</span>
      </ScrollIndicator>
    </Container>
  );
};

export default HeroSection;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

// Styles
const Container = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6rem 2rem 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  
  ${props => {
    const style = props.theme.style;
    if (style === 'cyberpunk') {
      return `
        &::before {
          content: '';
          position: absolute;
          top: 20%;
          left: -10%;
          width: 50%;
          height: 60%;
          background: radial-gradient(ellipse, rgba(255,0,255,0.15) 0%, transparent 70%);
        }
        &::after {
          content: '';
          position: absolute;
          bottom: 10%;
          right: -10%;
          width: 50%;
          height: 60%;
          background: radial-gradient(ellipse, rgba(0,255,255,0.15) 0%, transparent 70%);
        }
      `;
    }
    if (style === 'luxury' || style === 'opulent') {
      return `
        &::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(201,169,98,0.05) 0%, transparent 60%);
        }
      `;
    }
    if (style === 'organic') {
      return `
        &::before {
          content: '🌿';
          position: absolute;
          font-size: 15rem;
          opacity: 0.05;
          top: 10%;
          left: -5%;
          transform: rotate(-30deg);
        }
        &::after {
          content: '🌿';
          position: absolute;
          font-size: 12rem;
          opacity: 0.05;
          bottom: 10%;
          right: -5%;
          transform: rotate(30deg) scaleX(-1);
        }
      `;
    }
    return '';
  }}
`;

const Content = styled.div`
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  z-index: 1;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border: 1px solid ${props => props.theme.colors.primary}60;
  border-radius: ${props => props.theme.style === 'modern' ? '100px' : props.theme.borderRadius};
  color: ${props => props.theme.colors.primary};
  background: ${props => props.theme.colors.primary}10;
  animation: ${float} 3s ease-in-out infinite;
`;

const Logo = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: clamp(3rem, 12vw, 8rem);
  font-weight: 700;
  font-style: normal;
  letter-spacing: -0.02em;
  line-height: 1;
  color: ${props => props.theme.colors.primary};
  text-shadow: ${props => props.theme.colors.glow};
  
  ${props => props.theme.style === 'cyberpunk' && `
    background: linear-gradient(180deg, #FF00FF 0%, #00FFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 30px rgba(255,0,255,0.5));
  `}
  
  ${props => (props.theme.style === 'luxury' || props.theme.style === 'opulent') && `
    background: linear-gradient(90deg, #8B7355 0%, #C9A962 25%, #F5E6C8 50%, #C9A962 75%, #8B7355 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
`;

const Tagline = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-style: ${props => ['luxury', 'magazine', 'organic'].includes(props.theme.style) ? 'italic' : 'normal'};
  color: ${props => props.theme.colors.textMuted};
  max-width: 600px;
  line-height: 1.6;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textMuted};
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  animation: ${float} 2s ease-in-out infinite;
  
  span {
    font-size: 1.25rem;
  }
`;
