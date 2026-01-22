// Footer mit Social Links - Multi-Theme
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Footer = () => {
  const { currentTheme } = useTheme();

  return (
    <FooterSection $theme={currentTheme}>
      <Container>
        <Logo $theme={currentTheme}>S&I.</Logo>
        
        <SocialLinks>
          <SocialLink 
            href="https://instagram.com/sarah.iver.wedding" 
            target="_blank" 
            rel="noopener noreferrer"
            $theme={currentTheme}
          >
            <InstagramIcon />
            <span>Instagram</span>
          </SocialLink>
          <SocialDivider $theme={currentTheme}>•</SocialDivider>
          <SocialLink 
            href="https://pinterest.com/sarahiverwedding" 
            target="_blank" 
            rel="noopener noreferrer"
            $theme={currentTheme}
          >
            <PinterestIcon />
            <span>Pinterest</span>
          </SocialLink>
        </SocialLinks>
        
        <Copyright $theme={currentTheme}>
          © 2025 S&I. wedding — Digitale Hochzeitserlebnisse
        </Copyright>
        
        <LegalLinks>
          <LegalLinkAnchor href="/impressum" $theme={currentTheme}>
            Impressum
          </LegalLinkAnchor>
          <LegalDivider $theme={currentTheme}>|</LegalDivider>
          <LegalLinkAnchor href="/datenschutz" $theme={currentTheme}>
            Datenschutz
          </LegalLinkAnchor>
        </LegalLinks>
      </Container>
    </FooterSection>
  );
};

export default Footer;

// Icons
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const PinterestIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4"/>
    <path d="M9 18l1.5-6"/>
  </svg>
);

// Styles
const FooterSection = styled.footer`
  padding: 60px 5%;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #0D0D0D;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    background: #1A1A1A;
  `}
  
  ${p => p.$theme === 'video' && css`
    background: #0A0A08;
  `}
  
  ${p => p.$theme === 'botanical' && css`
    background: #1E2E1F;
  `}
  
  ${p => p.$theme === 'luxe' && css`
    background: #1A1A1A;
  `}
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Logo = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.06em;
  color: #FFFFFF;
  background: #000000;
  display: inline-block;
  padding: 8px 16px;
  margin-bottom: 25px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(255, 255, 255, 0.7);
    
    &:hover { color: #FF6B6B; }
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    color: rgba(255, 255, 255, 0.6);
    
    &:hover { color: #FFFFFF; }
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(255, 255, 255, 0.5);
    
    &:hover { color: #C4A87C; }
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    color: rgba(250, 249, 246, 0.6);
    
    &:hover { color: #7BA889; }
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(255, 255, 255, 0.5);
    
    &:hover { color: #B8960B; }
  `}
  
  span {
    @media (max-width: 400px) { display: none; }
  }
`;

const SocialDivider = styled.span`
  color: rgba(255, 255, 255, 0.3);
`;

const Copyright = styled.p`
  font-size: 0.85rem;
  margin-bottom: 20px;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(255, 255, 255, 0.5);
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    color: rgba(255, 255, 255, 0.4);
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(255, 255, 255, 0.4);
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    color: rgba(250, 249, 246, 0.5);
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(255, 255, 255, 0.4);
  `}
`;

const LegalLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const LegalLink = styled.button`
  font-size: 0.75rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(255, 255, 255, 0.4);
    
    &:hover { color: #FF6B6B; }
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    color: rgba(255, 255, 255, 0.3);
    
    &:hover { color: #FFFFFF; }
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(255, 255, 255, 0.3);
    
    &:hover { color: #C4A87C; }
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    color: rgba(250, 249, 246, 0.4);
    
    &:hover { color: #7BA889; }
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(255, 255, 255, 0.3);
    
    &:hover { color: #B8960B; }
  `}
`;

const LegalLinkAnchor = styled.a`
  font-size: 0.75rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(255, 255, 255, 0.4);
    
    &:hover { color: #FF6B6B; }
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    color: rgba(255, 255, 255, 0.3);
    
    &:hover { color: #FFFFFF; }
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(255, 255, 255, 0.3);
    
    &:hover { color: #C4A87C; }
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    color: rgba(250, 249, 246, 0.4);
    
    &:hover { color: #7BA889; }
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(255, 255, 255, 0.3);
    
    &:hover { color: #B8960B; }
  `}
`;

const LegalDivider = styled.span`
  color: rgba(255, 255, 255, 0.2);
  font-size: 0.75rem;
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  animation: ${fadeIn} 0.2s ease;
`;

const ModalContent = styled.div`
  background: #FFFFFF;
  max-width: 650px;
  max-height: 85vh;
  width: 100%;
  overflow-y: auto;
  animation: ${slideUp} 0.3s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  position: sticky;
  top: 0;
  background: #FFFFFF;
  z-index: 1;
  
  ${p => p.$theme === 'contemporary' && css`
    border-bottom: 2px solid #0D0D0D;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    border-bottom: 1px solid #E0E0E0;
  `}
  
  ${p => p.$theme === 'video' && css`
    border-bottom: 1px solid rgba(139, 115, 85, 0.3);
  `}
  
  ${p => p.$theme === 'botanical' && css`
    border-bottom: 1px solid #D4CFC4;
  `}
  
  ${p => p.$theme === 'luxe' && css`
    border-bottom: 1px solid #E5E5E5;
  `}
`;

const ModalTitle = styled.h2`
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #0D0D0D;
    letter-spacing: 0.05em;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 1.3rem;
    font-weight: 500;
    color: #1A1A1A;
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.5rem;
    font-weight: 500;
    color: #1A1814;
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.5rem;
    font-weight: 500;
    color: #2C3E2D;
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.5rem;
    font-weight: 400;
    font-style: italic;
    color: #1A1A1A;
  `}
`;

const CloseButton = styled.button`
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
  transition: color 0.3s ease;
  
  ${p => p.$theme === 'contemporary' && css`
    color: #0D0D0D;
    &:hover { color: #FF6B6B; }
  `}
  
  ${p => p.$theme === 'editorial' && css`
    color: #1A1A1A;
    &:hover { color: #666; }
  `}
  
  ${p => p.$theme === 'video' && css`
    color: #1A1814;
    &:hover { color: #8B7355; }
  `}
  
  ${p => p.$theme === 'botanical' && css`
    color: #2C3E2D;
    &:hover { color: #4A7C59; }
  `}
  
  ${p => p.$theme === 'luxe' && css`
    color: #1A1A1A;
    &:hover { color: #B8960B; }
  `}
`;

const ModalBody = styled.div`
  padding: 30px;
`;

const ModalSection = styled.div`
  margin-bottom: 30px;
  
  &:last-child { margin-bottom: 0; }
`;

const SectionTitle = styled.h3`
  margin-bottom: 12px;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    color: #FF6B6B;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: #999;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: #8B7355;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    color: #4A7C59;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    color: #B8960B;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  `}
`;

const SectionText = styled.p`
  line-height: 1.7;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.95rem;
    color: #0D0D0D;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: #1A1A1A;
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9rem;
    color: #1A1814;
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    color: #2C3E2D;
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.85rem;
    font-weight: 300;
    color: #1A1A1A;
  `}
  
  strong { font-weight: 700; }
`;

const Divider = styled.hr`
  border: none;
  margin: 30px 0;
  
  ${p => p.$theme === 'contemporary' && css`
    height: 2px;
    background: #F0F0F0;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    height: 1px;
    background: #E0E0E0;
  `}
  
  ${p => p.$theme === 'video' && css`
    height: 1px;
    background: rgba(139, 115, 85, 0.3);
  `}
  
  ${p => p.$theme === 'botanical' && css`
    height: 1px;
    background: #D4CFC4;
  `}
  
  ${p => p.$theme === 'luxe' && css`
    height: 1px;
    background: #E5E5E5;
  `}
`;
