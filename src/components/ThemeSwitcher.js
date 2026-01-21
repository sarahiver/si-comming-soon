import React from 'react';
import styled from 'styled-components';
import { themes, themeOrder, getContrastColor } from '../themes/themeDefinitions';

const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
  return (
    <SwitcherWrapper>
      {themeOrder.map((themeKey) => {
        const theme = themes[themeKey];
        const isActive = currentTheme === themeKey;
        
        return (
          <ThemeButton
            key={themeKey}
            onClick={() => onThemeChange(themeKey)}
            $isActive={isActive}
            $color={theme.colors.primary}
            $textColor={getContrastColor(themeKey)}
            $font={theme.fonts.heading}
            $radius={theme.borderRadius}
          >
            {theme.name}
          </ThemeButton>
        );
      })}
    </SwitcherWrapper>
  );
};

export default ThemeSwitcher;

// Styles
const SwitcherWrapper = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    top: 1.5rem;
    right: 1.5rem;
  }
`;

const ThemeButton = styled.button`
  padding: 0.5rem 1rem;
  font-family: ${props => props.$isActive ? props.$font : "'DM Sans', sans-serif"};
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 2px solid ${props => props.$color};
  background: ${props => props.$isActive ? props.$color : 'transparent'};
  color: ${props => props.$isActive ? props.$textColor : props.$color};
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: ${props => props.$radius || '0'};
  
  &:hover {
    background: ${props => props.$color};
    color: ${props => props.$textColor};
    transform: translateY(-2px);
  }
  
  @media (min-width: 768px) {
    padding: 0.6rem 1.25rem;
    font-size: 0.75rem;
  }
`;
