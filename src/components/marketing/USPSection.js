// src/components/marketing/USPSection.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const Section = styled.section`
  padding: 140px 5%;
  ${p => p.$themeId === 'video' && css`background: #0A0A0A;`}
  ${p => p.$themeId === 'editorial' && css`background: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`background: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`background: #0D0D0D;`}
  ${p => p.$themeId === 'luxe' && css`background: #0A0A0A;`}
  ${p => p.$themeId === 'neon' && css`background: #12121a;`}
`;

const Container = styled.div`max-width: 1100px; margin: 0 auto;`;

const Header = styled.div`
  text-align: center; margin-bottom: 80px;
  opacity: ${p => p.$visible ? 1 : 0}; transform: translateY(${p => p.$visible ? 0 : '30px'}); transition: all 0.8s ease;
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
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #F5F1EB;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FFFFFF; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #FEFEFE; font-style: italic;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff; font-weight: 700;`}
`;

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 50px;
  @media (max-width: 800px) { grid-template-columns: 1fr; gap: 40px; }
`;

const USP = styled.div`
  text-align: center;
  opacity: ${p => p.$visible ? 1 : 0}; transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.6s ease; transition-delay: ${p => p.$delay}s;
`;

const Icon = styled.div`font-size: 3rem; margin-bottom: 25px;`;

const USPTitle = styled.h3`
  font-size: 1.3rem; margin-bottom: 15px;
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #F5F1EB;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FFFFFF; font-weight: 600;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #FEFEFE;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff;`}
`;

const USPDesc = styled.p`
  font-size: 0.95rem; line-height: 1.8;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.5);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.6);`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: rgba(245,241,235,0.6);`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.6);`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(255,255,255,0.4);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.5);`}
`;

const usps = [
  { icon: '✨', title: 'Handgemacht mit Liebe', desc: 'Jede Website wird individuell für euch erstellt – keine Templates, nur einzigartiges Design.' },
  { icon: '📱', title: 'Perfekt auf allen Geräten', desc: 'Responsive Design, das auf Desktop, Tablet und Smartphone gleichermaßen beeindruckt.' },
  { icon: '🎨', title: '6 einzigartige Themes', desc: 'Von minimalistisch bis dramatisch – findet den Stil, der zu euch passt.' },
  { icon: '🔒', title: 'DSGVO-konform', desc: 'Sichere Datenverarbeitung, gehostet in Deutschland. Eure Daten sind geschützt.' },
  { icon: '💬', title: 'Persönlicher Support', desc: 'Direkter Kontakt zu uns – keine Callcenter, echte Menschen die helfen.' },
  { icon: '⚡', title: 'Schnell online', desc: 'In der Regel ist eure Website innerhalb von 5-7 Werktagen fertig und online.' }
];

function USPSection() {
  const { currentTheme } = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} $themeId={currentTheme}>
      <Container>
        <Header $visible={isVisible}>
          <Eyebrow $themeId={currentTheme}>— Warum S&I —</Eyebrow>
          <Title $themeId={currentTheme}>Was uns besonders macht</Title>
        </Header>
        <Grid>
          {usps.map((usp, i) => (
            <USP key={usp.title} $visible={isVisible} $delay={0.1 * i}>
              <Icon>{usp.icon}</Icon>
              <USPTitle $themeId={currentTheme}>{usp.title}</USPTitle>
              <USPDesc $themeId={currentTheme}>{usp.desc}</USPDesc>
            </USP>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default USPSection;
