// Countdown Section - Multi-Theme (Contemporary, Editorial & Video)
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { useCountdown, formatNumber } from '../hooks/useCountdown';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.06; }
`;

const CountdownSection = () => {
  const { currentTheme } = useTheme();
  const timeLeft = useCountdown();

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (currentTheme === 'botanical') {
    return <BotanicalCountdown timeLeft={timeLeft} scrollToWaitlist={scrollToWaitlist} />;
  }

  if (currentTheme === 'video') {
    return <VideoCountdown timeLeft={timeLeft} scrollToWaitlist={scrollToWaitlist} />;
  }

  if (currentTheme === 'editorial') {
    return <EditorialCountdown timeLeft={timeLeft} scrollToWaitlist={scrollToWaitlist} />;
  }

  return <ContemporaryCountdown timeLeft={timeLeft} scrollToWaitlist={scrollToWaitlist} />;
};

// ============================================
// CONTEMPORARY COUNTDOWN
// ============================================
const ContemporaryCountdown = ({ timeLeft, scrollToWaitlist }) => {
  const units = [
    { value: timeLeft.days, label: 'TAGE' },
    { value: timeLeft.hours, label: 'STUNDEN' },
    { value: timeLeft.minutes, label: 'MINUTEN' },
    { value: timeLeft.seconds, label: 'SEKUNDEN' },
  ];

  return (
    <Section id="countdown" $theme="contemporary">
      <BackgroundNumber>00</BackgroundNumber>
      
      <Container>
        <Badge $theme="contemporary">★ COUNTDOWN</Badge>
        <Title $theme="contemporary">TIME IS TICKING</Title>
        
        <ContemporaryGrid>
          {units.map((unit, index) => (
            <ContemporaryRow key={unit.label} $delay={index * 0.1}>
              <ContemporaryLabel>{unit.label}</ContemporaryLabel>
              <ContemporaryDivider />
              <ContemporaryNumber>{formatNumber(unit.value)}</ContemporaryNumber>
            </ContemporaryRow>
          ))}
        </ContemporaryGrid>
        
        <CTAButton onClick={scrollToWaitlist} $theme="contemporary">
          LET'S MAKE IT EPIC →
        </CTAButton>
      </Container>
      
      <ScrollHint $theme="contemporary">
        <ScrollDot />
        <span>UNSERE BENEFITS</span>
      </ScrollHint>
    </Section>
  );
};

// ============================================
// EDITORIAL COUNTDOWN
// ============================================
const EditorialCountdown = ({ timeLeft, scrollToWaitlist }) => {
  const units = [
    { value: timeLeft.days, label: 'TAGE' },
    { value: timeLeft.hours, label: 'STUNDEN' },
    { value: timeLeft.minutes, label: 'MINUTEN' },
    { value: timeLeft.seconds, label: 'SEKUNDEN' },
  ];

  return (
    <Section id="countdown" $theme="editorial">
      <Container>
        <Badge $theme="editorial">COUNTDOWN</Badge>
        <EditorialTitle>
          Noch <em>so lange</em>
        </EditorialTitle>
        
        <EditorialGrid>
          {units.map((unit, index) => (
            <EditorialUnit key={unit.label} $delay={index * 0.1}>
              <EditorialNumber>{formatNumber(unit.value)}</EditorialNumber>
              <EditorialLabel>{unit.label}</EditorialLabel>
            </EditorialUnit>
          ))}
        </EditorialGrid>
        
        <EditorialDivider />
        
        <EditorialMessage>
          Wir können es kaum erwarten, diesen besonderen Tag mit euch zu teilen.
        </EditorialMessage>
        
        <CTAButton onClick={scrollToWaitlist} $theme="editorial">
          Jetzt eintragen →
        </CTAButton>
      </Container>
    </Section>
  );
};

// ============================================
// VIDEO COUNTDOWN - Elegant Gold Style
// ============================================
const VideoCountdown = ({ timeLeft, scrollToWaitlist }) => {
  const units = [
    { value: timeLeft.days, label: 'TAGE' },
    { value: timeLeft.hours, label: 'STUNDEN' },
    { value: timeLeft.minutes, label: 'MINUTEN' },
    { value: timeLeft.seconds, label: 'SEKUNDEN' },
  ];

  return (
    <VideoSection id="countdown">
      {/* Background Date Text */}
      <VideoBackgroundText>01.10.26</VideoBackgroundText>
      
      <VideoContainer>
        <VideoBadge>— COUNTDOWN —</VideoBadge>
        
        <VideoTitle>
          Der große <em>Moment</em>
        </VideoTitle>
        
        <VideoSubtitle>
          Donnerstag, 1. Oktober 2026 · siwedding.de
        </VideoSubtitle>
        
        <VideoGrid>
          {units.map((unit, index) => (
            <VideoUnit key={unit.label} $delay={index * 0.1}>
              <VideoNumber>{formatNumber(unit.value)}</VideoNumber>
              <VideoLabel>{unit.label}</VideoLabel>
            </VideoUnit>
          ))}
        </VideoGrid>
        
        <VideoCTA onClick={scrollToWaitlist}>
          Jetzt eintragen →
        </VideoCTA>
      </VideoContainer>
    </VideoSection>
  );
};

// ============================================
// BOTANICAL COUNTDOWN - Organic Nature Style
// ============================================
const BotanicalCountdown = ({ timeLeft, scrollToWaitlist }) => {
  const units = [
    { value: timeLeft.days, label: 'Tage' },
    { value: timeLeft.hours, label: 'Stunden' },
    { value: timeLeft.minutes, label: 'Minuten' },
    { value: timeLeft.seconds, label: 'Sekunden' },
  ];

  return (
    <BotanicalSection id="countdown">
      <BotanicalContainer>
        <BotanicalBadge>✦ COUNTDOWN ✦</BotanicalBadge>
        
        <BotanicalTitle>
          Es wird <em>Zeit</em>
        </BotanicalTitle>
        
        <BotanicalSubtitle>
          Jeder Moment bringt uns unserem großen Tag näher
        </BotanicalSubtitle>
        
        <BotanicalGrid>
          {units.map((unit, index) => (
            <BotanicalUnit key={unit.label} $delay={index * 0.1}>
              <BotanicalNumber>{formatNumber(unit.value)}</BotanicalNumber>
              <BotanicalLabel>{unit.label}</BotanicalLabel>
            </BotanicalUnit>
          ))}
        </BotanicalGrid>
        
        <BotanicalMessage>
          🌸 Bald beginnt unser gemeinsames Abenteuer – und wir können es kaum erwarten, es mit euch zu teilen. 🌿
        </BotanicalMessage>
        
        <BotanicalCTA onClick={scrollToWaitlist}>
          Jetzt eintragen →
        </BotanicalCTA>
      </BotanicalContainer>
    </BotanicalSection>
  );
};

export default CountdownSection;

// ============================================
// SHARED STYLES
// ============================================
const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 100px 5%;
  overflow: hidden;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #0D0D0D;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    background: #FAFAFA;
  `}
`;

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const Badge = styled.div`
  display: inline-block;
  margin-bottom: 25px;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #FF6B6B;
    color: #FFFFFF;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    padding: 8px 18px;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.3em;
    color: #999;
  `}
`;

const Title = styled.h2`
  margin-bottom: 60px;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2.5rem, 7vw, 4.5rem);
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: -0.02em;
  `}
`;

const CTAButton = styled.button`
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    padding: 18px 40px;
    background: transparent;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
    
    &:hover {
      background: #FF6B6B;
      border-color: #FF6B6B;
      transform: translateY(-3px);
    }
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 16px 35px;
    background: #1A1A1A;
    color: #FFFFFF;
    border: none;
    
    &:hover {
      background: #333;
      transform: translateY(-2px);
    }
  `}
`;

// Contemporary Styles
const BackgroundNumber = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(20rem, 50vw, 50rem);
  font-weight: 700;
  color: #FFFFFF;
  opacity: 0.03;
  animation: ${pulse} 4s ease-in-out infinite;
  pointer-events: none;
  user-select: none;
  z-index: 1;
`;

const ContemporaryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 50px;
`;

const ContemporaryRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto;
  align-items: center;
  padding: 25px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
  
  &:first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 500px) {
    grid-template-columns: 80px 1fr auto;
    padding: 20px 0;
  }
`;

const ContemporaryLabel = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.5);
  text-align: left;
  
  @media (max-width: 500px) {
    font-size: 0.7rem;
  }
`;

const ContemporaryDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 30px;
  
  @media (max-width: 500px) {
    margin: 0 15px;
  }
`;

const ContemporaryNumber = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 700;
  color: #FF6B6B;
  line-height: 1;
  min-width: 100px;
  text-align: right;
  
  @media (max-width: 500px) {
    min-width: 70px;
  }
`;

const ScrollHint = styled.div`
  position: absolute;
  bottom: 40px;
  left: 5%;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 10;
  
  span {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const ScrollDot = styled.div`
  width: 8px;
  height: 8px;
  background: #FF6B6B;
  border-radius: 50%;
`;

// Editorial Styles
const EditorialTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 60px;
  
  em {
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
  }
`;

const EditorialGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 50px;
  
  @media (max-width: 600px) {
    gap: 25px;
  }
  
  @media (max-width: 400px) {
    flex-wrap: wrap;
    gap: 30px 40px;
  }
`;

const EditorialUnit = styled.div`
  text-align: center;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
`;

const EditorialNumber = styled.div`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(3rem, 10vw, 5rem);
  font-weight: 400;
  color: #1A1A1A;
  line-height: 1;
  margin-bottom: 10px;
`;

const EditorialLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #999;
  text-transform: uppercase;
`;

const EditorialDivider = styled.div`
  width: 40px;
  height: 1px;
  background: #1A1A1A;
  margin: 0 auto 30px;
`;

const EditorialMessage = styled.p`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #666;
  max-width: 450px;
  margin: 0 auto 40px;
  line-height: 1.7;
`;

// ============================================
// VIDEO THEME STYLES
// ============================================
const VideoSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 100px 5%;
  overflow: hidden;
  background: #F8F6F3;
`;

const VideoBackgroundText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(15rem, 40vw, 35rem);
  font-weight: 300;
  color: rgba(139, 115, 85, 0.05);
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
`;

const VideoContainer = styled.div`
  max-width: 900px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const VideoBadge = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8B7355;
  margin-bottom: 25px;
`;

const VideoTitle = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 15px;
  
  em {
    font-style: italic;
  }
`;

const VideoSubtitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
  color: #8B7355;
  margin-bottom: 60px;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-bottom: 50px;
  background: #FFFFFF;
  border: 1px solid rgba(139, 115, 85, 0.2);
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const VideoUnit = styled.div`
  padding: 40px 20px;
  text-align: center;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
  border-right: 1px solid rgba(139, 115, 85, 0.15);
  
  &:last-child {
    border-right: none;
  }
  
  @media (max-width: 600px) {
    padding: 30px 15px;
    
    &:nth-child(2) {
      border-right: none;
    }
    
    &:nth-child(1), &:nth-child(2) {
      border-bottom: 1px solid rgba(139, 115, 85, 0.15);
    }
  }
`;

const VideoNumber = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 300;
  color: #1A1A1A;
  line-height: 1;
  margin-bottom: 12px;
`;

const VideoLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: #8B7355;
  text-transform: uppercase;
`;

const VideoCTA = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 18px 40px;
  background: #8B7355;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
  
  &:hover {
    background: #6B5A45;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 115, 85, 0.3);
  }
`;

// ============================================
// BOTANICAL THEME STYLES
// ============================================
const BotanicalSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 100px 5%;
  overflow: hidden;
  background: linear-gradient(180deg, #F5F1EB 0%, #EDE8DF 100%);
`;

const BotanicalContainer = styled.div`
  max-width: 900px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const BotanicalBadge = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: #4A7C59;
  margin-bottom: 25px;
`;

const BotanicalTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  color: #2C3E2D;
  margin-bottom: 15px;
  
  em {
    font-style: italic;
  }
`;

const BotanicalSubtitle = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  font-weight: 300;
  font-style: italic;
  color: #6B7B6C;
  margin-bottom: 50px;
`;

const BotanicalGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 600px) {
    gap: 10px;
    flex-wrap: wrap;
  }
`;

const BotanicalUnit = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid #D4CFC4;
  padding: 30px 25px;
  min-width: 100px;
  text-align: center;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
  transition: all 0.3s ease;
  
  &:hover {
    background: #FFFFFF;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(74, 124, 89, 0.1);
  }
  
  @media (max-width: 600px) {
    padding: 20px 15px;
    min-width: 70px;
  }
`;

const BotanicalNumber = styled.div`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: #2C3E2D;
  line-height: 1;
  margin-bottom: 8px;
`;

const BotanicalLabel = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  color: #6B7B6C;
  text-transform: uppercase;
`;

const BotanicalMessage = styled.p`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  color: #4A7C59;
  background: rgba(74, 124, 89, 0.1);
  padding: 20px 30px;
  border-radius: 30px;
  display: inline-block;
  margin-bottom: 40px;
  max-width: 500px;
`;

const BotanicalCTA = styled.button`
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  padding: 16px 35px;
  background: #4A7C59;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
  
  &:hover {
    background: #3A6249;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(74, 124, 89, 0.3);
  }
`;
