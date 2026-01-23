// src/components/marketing/ComponentsShowcase.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const Section = styled.section`
  padding: 140px 5%;
  
  ${p => p.$themeId === 'video' && css`background: #FAF8F5;`}
  ${p => p.$themeId === 'editorial' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'botanical' && css`background: #F5F1EB;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'luxe' && css`background: #FAF9F7;`}
  ${p => p.$themeId === 'neon' && css`background: #0a0a0f;`}
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;

const Eyebrow = styled.span`
  display: block;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 20px;
  
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  margin-bottom: 20px;
  
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #2A2A2A; font-style: italic;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff; font-weight: 700;`}
`;

const Subtitle = styled.p`
  font-size: 1rem;
  max-width: 550px;
  margin: 0 auto;
  line-height: 1.8;
  
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(26,26,26,0.6);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #666;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #5A6B5A;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #525252;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.6);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.6);`}
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  padding: 30px 20px;
  text-align: center;
  transition: all 0.4s ease;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition-delay: ${p => p.$delay}s;
  
  ${p => p.$themeId === 'video' && css`
    background: #FFFFFF;
    border: 1px solid rgba(184,151,106,0.15);
    &:hover { border-color: #B8976A; box-shadow: 0 10px 40px rgba(184,151,106,0.1); }
  `}
  ${p => p.$themeId === 'editorial' && css`
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    &:hover { border-color: #1A1A1A; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    background: #FFFFFF;
    border: 1px solid rgba(139,157,131,0.2);
    border-radius: 16px;
    &:hover { border-color: #8B9D83; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    background: #FFFFFF;
    border: 3px solid #0D0D0D;
    &:hover { box-shadow: 4px 4px 0 #FF6B6B; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    background: #FFFFFF;
    border: 1px solid rgba(212,175,55,0.1);
    &:hover { border-color: rgba(212,175,55,0.3); }
  `}
  ${p => p.$themeId === 'neon' && css`
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(0,255,255,0.2);
    &:hover { border-color: #00ffff; box-shadow: 0 0 20px rgba(0,255,255,0.15); }
  `}
`;

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
`;

const IncludedBadge = styled.span`
  display: inline-block;
  font-size: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 4px 8px;
  margin-bottom: 10px;
  
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #B8976A; background: rgba(184,151,106,0.1);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #1A1A1A; background: #F0F0F0;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83; background: rgba(139,157,131,0.1); border-radius: 10px;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FF6B6B; background: rgba(255,107,107,0.1);`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #D4AF37; background: rgba(212,175,55,0.1);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff; background: rgba(0,255,255,0.1);`}
`;

const Name = styled.h3`
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 5px;
  
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 600;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #2A2A2A;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff;`}
`;

const Desc = styled.p`
  font-size: 0.75rem;
  line-height: 1.5;
  margin: 0;
  
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(26,26,26,0.5);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #7D9D7C;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #999;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.5);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.4);`}
`;

const components = [
  { icon: '🏠', name: 'Hero', desc: 'Der erste Eindruck', included: true },
  { icon: '💕', name: 'Love Story', desc: 'Eure Geschichte', included: true },
  { icon: '💌', name: 'RSVP', desc: 'Digitale Zusagen', included: true },
  { icon: '🔔', name: 'Countdown', desc: 'Tage bis zum Ja', included: true },
  { icon: '📅', name: 'Ablauf', desc: 'Der Tagesplan', included: false },
  { icon: '⏰', name: 'Timeline', desc: 'Zeitlicher Ablauf', included: false },
  { icon: '📍', name: 'Location', desc: 'Mit Karte & Infos', included: false },
  { icon: '🧭', name: 'Anfahrt', desc: 'Navigation & Tipps', included: false },
  { icon: '✏️', name: 'Gästebuch', desc: 'Wünsche sammeln', included: false },
  { icon: '🏨', name: 'Unterkünfte', desc: 'Hotels & Tipps', included: false },
  { icon: '👗', name: 'Dresscode', desc: 'Was anziehen?', included: false },
  { icon: '🎁', name: 'Wunschliste', desc: 'Geschenkideen', included: false },
  { icon: '🎵', name: 'Musikwünsche', desc: 'Playlist gestalten', included: false },
  { icon: '❓', name: 'FAQ', desc: 'Häufige Fragen', included: false },
  { icon: '🖼️', name: 'Galerie', desc: 'Eure Bilder', included: false },
  { icon: '📸', name: 'Foto Upload', desc: 'Gäste-Fotos', included: false },
  { icon: '📞', name: 'Kontakt', desc: 'Trauzeugen etc.', included: false },
  { icon: '📖', name: 'Wedding ABC', desc: 'Von A bis Z', included: false },
];

function ComponentsShowcase() {
  const { currentTheme } = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id="features">
      <Container>
        <Header $visible={isVisible}>
          <Eyebrow $themeId={currentTheme}>— 18 Komponenten —</Eyebrow>
          <Title $themeId={currentTheme}>Alles was ihr braucht</Title>
          <Subtitle $themeId={currentTheme}>
            Wählt aus 18 liebevoll gestalteten Komponenten – 4 davon immer inklusive.
          </Subtitle>
        </Header>
        
        <Grid>
          {components.map((comp, i) => (
            <Card 
              key={comp.name}
              $themeId={currentTheme}
              $visible={isVisible}
              $delay={0.03 * i}
            >
              <Icon>{comp.icon}</Icon>
              {comp.included && <IncludedBadge $themeId={currentTheme}>Inklusive</IncludedBadge>}
              <Name $themeId={currentTheme}>{comp.name}</Name>
              <Desc $themeId={currentTheme}>{comp.desc}</Desc>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default ComponentsShowcase;
