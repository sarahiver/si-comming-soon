// src/components/marketing/DesignShowcase.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const Section = styled.section`
  padding: 140px 5%;
  ${p => p.$themeId === 'video' && css`background: #FAF8F5;`}
  ${p => p.$themeId === 'editorial' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'botanical' && css`background: #F5F1EB;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'luxe' && css`background: #FAF9F7;`}
  ${p => p.$themeId === 'neon' && css`background: #0a0a0f;`}
`;

const Container = styled.div`max-width: 1200px; margin: 0 auto;`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;

const Eyebrow = styled.span`
  display: block; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 20px;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; margin-bottom: 20px;
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #2A2A2A; font-style: italic;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff; font-weight: 700;`}
`;

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const Card = styled.a`
  display: block; text-decoration: none; position: relative; overflow: hidden;
  opacity: ${p => p.$visible ? 1 : 0}; transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.6s ease; transition-delay: ${p => p.$delay}s;
  &:hover { transform: translateY(-5px); }
`;

const Preview = styled.div`
  height: 280px; display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
  background: ${p => p.$bg};
  ${p => p.$border && css`border: 3px solid #0D0D0D;`}
`;

const PreviewText = styled.div`
  text-align: center; z-index: 1;
  h3 { font-size: 2rem; margin-bottom: 5px; }
  span { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; }
`;

const CardInfo = styled.div`
  padding: 25px 20px;
  ${p => p.$themeId === 'video' && css`background: #FFFFFF; border: 1px solid rgba(184,151,106,0.15); border-top: none;`}
  ${p => p.$themeId === 'editorial' && css`background: #FFFFFF; border: 1px solid #E0E0E0; border-top: none;`}
  ${p => p.$themeId === 'botanical' && css`background: #FFFFFF; border: 1px solid rgba(139,157,131,0.2); border-top: none; border-radius: 0 0 16px 16px;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FFFFFF; border: 3px solid #0D0D0D; border-top: none;`}
  ${p => p.$themeId === 'luxe' && css`background: #FFFFFF; border: 1px solid rgba(212,175,55,0.1); border-top: none;`}
  ${p => p.$themeId === 'neon' && css`background: rgba(255,255,255,0.02); border: 1px solid rgba(0,255,255,0.2); border-top: none;`}
`;

const CardName = styled.h4`
  font-size: 1.1rem; margin-bottom: 5px;
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 600;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #2A2A2A;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff;`}
`;

const CardDesc = styled.p`
  font-size: 0.85rem; margin: 0;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(26,26,26,0.5);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #7D9D7C;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #999;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.5);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.4);`}
`;

const DemoLink = styled.span`
  display: inline-flex; align-items: center; gap: 5px; font-size: 0.75rem; font-weight: 500; margin-top: 10px;
  ${p => p.$themeId === 'video' && css`color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`color: #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`color: #00ffff;`}
`;

const designs = [
  { id: 'video', name: 'Video', desc: 'Cineastisch & Dramatisch', bg: '#0A0A0A', textColor: '#FFFFFF', accent: '#B8976A', font: "'Cormorant Garamond', serif", demoUrl: '/demo?theme=video' },
  { id: 'editorial', name: 'Editorial', desc: 'Minimalistisch & Modern', bg: '#FFFFFF', textColor: '#1A1A1A', accent: '#000000', font: "'Instrument Serif', serif", border: true, demoUrl: '/demo?theme=editorial' },
  { id: 'botanical', name: 'Botanical', desc: 'Natürlich & Organisch', bg: '#F5F1EB', textColor: '#2D3B2D', accent: '#8B9D83', font: "'Playfair Display', serif", demoUrl: '/demo?theme=botanical' },
  { id: 'contemporary', name: 'Contemporary', desc: 'Bold & Playful', bg: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)', textColor: '#FFFFFF', accent: '#FFFFFF', font: "'Space Grotesk', sans-serif", demoUrl: '/demo?theme=contemporary' },
  { id: 'luxe', name: 'Luxe', desc: 'Opulent & Glamourös', bg: '#0A0A0A', textColor: '#D4AF37', accent: '#D4AF37', font: "'Cormorant Garamond', serif", demoUrl: '/demo?theme=luxe' },
  { id: 'neon', name: 'Neon', desc: 'Futuristisch & Elektrisierend', bg: '#0a0a0f', textColor: '#00ffff', accent: '#ff00ff', font: "'Space Grotesk', sans-serif", demoUrl: '/demo?theme=neon' }
];

function DesignShowcase() {
  const { currentTheme } = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id="designs">
      <Container>
        <Header $visible={isVisible}>
          <Eyebrow $themeId={currentTheme}>— 6 einzigartige Designs —</Eyebrow>
          <Title $themeId={currentTheme}>Unsere Design Welten</Title>
        </Header>
        
        <Grid>
          {designs.map((d, i) => (
            <Card key={d.id} href={d.demoUrl} $visible={isVisible} $delay={0.1 * i}>
              <Preview $bg={d.bg} $border={d.border}>
                <PreviewText style={{ color: d.textColor, fontFamily: d.font }}>
                  <h3 style={{ fontFamily: d.font }}>Sarah & Max</h3>
                  <span style={{ color: d.accent }}>21. Juni 2025</span>
                </PreviewText>
              </Preview>
              <CardInfo $themeId={currentTheme}>
                <CardName $themeId={currentTheme}>{d.name}</CardName>
                <CardDesc $themeId={currentTheme}>{d.desc}</CardDesc>
                <DemoLink $themeId={currentTheme}>Demo ansehen →</DemoLink>
              </CardInfo>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default DesignShowcase;
