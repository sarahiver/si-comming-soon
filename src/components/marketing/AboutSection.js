// src/components/marketing/AboutSection.js
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

const Container = styled.div`
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 60px; }
`;

const ImageWrapper = styled.div`
  position: relative;
  opacity: ${p => p.$visible ? 1 : 0}; transform: translateX(${p => p.$visible ? 0 : '-40px'}); transition: all 0.9s ease;
`;

const Image = styled.div`
  width: 100%; aspect-ratio: 4/5; background: url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=750&fit=crop') center/cover;
  ${p => p.$themeId === 'video' && css`box-shadow: 0 30px 60px rgba(0,0,0,0.4);`}
  ${p => p.$themeId === 'botanical' && css`border-radius: 20px;`}
  ${p => p.$themeId === 'contemporary' && css`border: 5px solid #FFFFFF;`}
  ${p => p.$themeId === 'neon' && css`box-shadow: 0 0 40px rgba(0,255,255,0.2);`}
`;

const Content = styled.div`
  opacity: ${p => p.$visible ? 1 : 0}; transform: translateX(${p => p.$visible ? 0 : '40px'}); transition: all 0.9s ease 0.2s;
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
  font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 300; margin-bottom: 30px; line-height: 1.2;
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #F5F1EB;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FFFFFF; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #FEFEFE; font-style: italic;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff; font-weight: 700;`}
`;

const Text = styled.p`
  font-size: 1rem; line-height: 1.9; margin-bottom: 20px;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.6);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.7);`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: rgba(245,241,235,0.7);`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.7);`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(255,255,255,0.5);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.6);`}
`;

const Signature = styled.div`
  margin-top: 40px; font-size: 1.5rem;
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; font-style: italic; color: #FFFFFF;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; font-style: italic; color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; font-weight: 600; color: #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff; text-shadow: 0 0 10px rgba(0,255,255,0.5);`}
`;

function AboutSection() {
  const { currentTheme } = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id="about">
      <Container>
        <ImageWrapper $visible={isVisible}>
          <Image $themeId={currentTheme} />
        </ImageWrapper>
        
        <Content $visible={isVisible}>
          <Eyebrow $themeId={currentTheme}>— Über uns —</Eyebrow>
          <Title $themeId={currentTheme}>Sarah & Iver</Title>
          <Text $themeId={currentTheme}>
            Hinter S&I stecken wir – Sarah und Iver. Wir haben 2024 selbst geheiratet und wissen genau, 
            wie viel Arbeit in der Planung einer Hochzeit steckt. Die Suche nach der perfekten 
            Hochzeitswebsite war frustrierend: Entweder langweilige Templates oder unbezahlbare Agenturen.
          </Text>
          <Text $themeId={currentTheme}>
            Also haben wir kurzerhand unsere eigene Website gebaut – und die Reaktionen unserer Gäste 
            waren überwältigend. Daraus entstand die Idee zu S&I Wedding: Premium-Hochzeitswebsites, 
            die so einzigartig sind wie eure Liebe, aber bezahlbar bleiben.
          </Text>
          <Text $themeId={currentTheme}>
            Jede Website wird von uns persönlich gestaltet. Keine Templates, keine Massenware – 
            nur eure Geschichte, eure Vision, euer Design.
          </Text>
          <Signature $themeId={currentTheme}>— Sarah & Iver</Signature>
        </Content>
      </Container>
    </Section>
  );
}

export default AboutSection;
