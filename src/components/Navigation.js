// Navigation mit Theme Switcher
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Navigation = () => {
  const { currentTheme, setCurrentTheme, theme, themeOrder, themes } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const isEditorial = currentTheme === 'editorial';

  return (
    <Nav $scrolled={scrolled} $theme={currentTheme}>
      <NavContainer>
        <LogoLink onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo $theme={currentTheme}>S&I</Logo>
        </LogoLink>
        
        <NavLinks>
          <NavLink onClick={() => scrollToSection('countdown')} $theme={currentTheme}>
            {isEditorial ? 'Countdown' : 'Countdown'}
          </NavLink>
          <NavLink onClick={() => scrollToSection('usps')} $theme={currentTheme}>
            {isEditorial ? 'Features' : 'Features'}
          </NavLink>
          <NavLink onClick={() => scrollToSection('about')} $theme={currentTheme}>
            {isEditorial ? 'Über uns' : 'About'}
          </NavLink>
          
          {/* Theme Switcher */}
          <ThemeSwitcher>
            <ThemeButton 
              onClick={() => setShowThemeMenu(!showThemeMenu)} 
              $theme={currentTheme}
            >
              <ThemeDot $color={theme.colors.accent} />
              <span>{themes[currentTheme].name}</span>
              <Arrow $open={showThemeMenu}>▾</Arrow>
            </ThemeButton>
            
            {showThemeMenu && (
              <>
                <ThemeDropdown $theme={currentTheme}>
                  <DropdownLabel $theme={currentTheme}>Design wählen</DropdownLabel>
                  {themeOrder.map((themeId) => (
                    <ThemeOption
                      key={themeId}
                      onClick={() => {
                        setCurrentTheme(themeId);
                        setShowThemeMenu(false);
                      }}
                      $active={currentTheme === themeId}
                      $theme={currentTheme}
                    >
                      <ThemeDot $color={themes[themeId].colors.accent} />
                      <span>{themes[themeId].name}</span>
                      {currentTheme === themeId && <Check>✓</Check>}
                    </ThemeOption>
                  ))}
                </ThemeDropdown>
                <Backdrop onClick={() => setShowThemeMenu(false)} />
              </>
            )}
          </ThemeSwitcher>
          
          <NavLinkCTA onClick={() => scrollToSection('waitlist')} $theme={currentTheme}>
            {isEditorial ? 'EINTRAGEN' : 'WAITLIST'}
          </NavLinkCTA>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;

// Styles
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 5%;
  background: ${p => p.$scrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent'};
  backdrop-filter: ${p => p.$scrolled ? 'blur(20px)' : 'none'};
  border-bottom: ${p => p.$scrolled ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease;
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoLink = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const Logo = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  background: #0D0D0D;
  color: #FFFFFF;
  padding: 6px 12px;
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
  `}
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    background: rgba(26, 24, 20, 0.9);
    letter-spacing: 0.05em;
  `}
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  
  @media (max-width: 800px) {
    gap: 15px;
  }
  
  @media (max-width: 600px) {
    gap: 10px;
  }
`;

const NavLink = styled.button`
  font-size: 0.85rem;
  font-weight: 500;
  color: #0D0D0D;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
  `}
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    color: #1A1814;
  `}
  
  &:hover {
    color: ${p => p.$theme === 'editorial' ? '#666' : p.$theme === 'video' ? '#8B7355' : '#FF6B6B'};
  }
  
  @media (max-width: 700px) {
    display: none;
  }
`;

const ThemeSwitcher = styled.div`
  position: relative;
`;

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  color: #0D0D0D;
  transition: all 0.2s ease;
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
  `}
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    color: #1A1814;
  `}
  
  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
  
  @media (max-width: 500px) {
    span { display: none; }
    padding: 8px;
  }
`;

const ThemeDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${p => p.$color};
`;

const Arrow = styled.span`
  font-size: 0.7rem;
  transition: transform 0.2s ease;
  transform: rotate(${p => p.$open ? '180deg' : '0'});
  
  @media (max-width: 500px) {
    display: none;
  }
`;

const ThemeDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 100;
`;

const DropdownLabel = styled.div`
  padding: 12px 15px 8px;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.4);
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
  `}
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
  `}
`;

const ThemeOption = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 15px;
  background: ${p => p.$active ? 'rgba(0, 0, 0, 0.05)' : 'transparent'};
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: ${p => p.$active ? '600' : '400'};
  color: #0D0D0D;
  text-align: left;
  transition: background 0.2s ease;
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
  `}
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
  `}
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Check = styled.span`
  margin-left: auto;
  color: #4ECDC4;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99;
`;

const NavLinkCTA = styled.button`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    background: #1A1A1A;
    color: #FFFFFF;
    border: none;
    
    &:hover {
      background: #333;
    }
  `}
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    background: #FF6B6B;
    color: #FFFFFF;
    border: none;
    
    &:hover {
      background: #0D0D0D;
      transform: translateY(-2px);
    }
  `}
`;
