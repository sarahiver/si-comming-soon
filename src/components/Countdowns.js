import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useCountdown, formatNumber } from '../hooks/useCountdown';

const TARGET_DATE = '2026-01-01T00:00:00';

// ============================================
// NEON COUNTDOWN - Cyberpunk Style
// ============================================
const flicker = keyframes`
  0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
    opacity: 1;
  }
  20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
    opacity: 0.4;
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const NeonCountdown = () => {
  const timeLeft = useCountdown(TARGET_DATE);
  
  return (
    <NeonContainer>
      <NeonTitle>System Launch In</NeonTitle>
      <NeonWrapper>
        {[
          { val: timeLeft.days, label: 'Days' },
          { val: timeLeft.hours, label: 'Hours' },
          { val: timeLeft.minutes, label: 'Minutes' },
          { val: timeLeft.seconds, label: 'Seconds' }
        ].map((item, i) => (
          <React.Fragment key={i}>
            <NeonUnit>
              <NeonNumber>{formatNumber(item.val)}</NeonNumber>
              <NeonLabel>{item.label}</NeonLabel>
            </NeonUnit>
            {i < 3 && <NeonSeparator>:</NeonSeparator>}
          </React.Fragment>
        ))}
      </NeonWrapper>
    </NeonContainer>
  );
};

const NeonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 3rem 2rem;
`;

const NeonTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(1rem, 3vw, 1.5rem);
  text-transform: uppercase;
  letter-spacing: 0.5em;
  color: #00FFFF;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const NeonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  
  @media (min-width: 768px) {
    gap: 2rem;
  }
`;

const NeonUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NeonNumber = styled.span`
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  background: linear-gradient(180deg, #FF00FF 0%, #00FFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px rgba(255, 0, 255, 0.8));
  animation: ${flicker} 4s linear infinite;
`;

const NeonLabel = styled.span`
  font-family: 'Rajdhani', sans-serif;
  font-size: clamp(0.7rem, 2vw, 1rem);
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: #00FFFF;
  margin-top: 0.5rem;
`;

const NeonSeparator = styled.span`
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(3rem, 8vw, 6rem);
  color: #FFFF00;
  animation: ${pulse} 1s ease-in-out infinite;
  align-self: flex-start;
`;

// ============================================
// LUXE COUNTDOWN - Elegant Gold Style
// ============================================
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

export const LuxeCountdown = () => {
  const timeLeft = useCountdown(TARGET_DATE);
  
  return (
    <LuxeContainer>
      <LuxeOrnament>✦</LuxeOrnament>
      <LuxeTitle>The Wait Begins</LuxeTitle>
      <LuxeWrapper>
        {[
          { val: timeLeft.days, label: 'Days' },
          { val: timeLeft.hours, label: 'Hours' },
          { val: timeLeft.minutes, label: 'Minutes' },
          { val: timeLeft.seconds, label: 'Seconds' }
        ].map((item, i) => (
          <LuxeUnit key={i} $index={i}>
            <LuxeNumber>{formatNumber(item.val)}</LuxeNumber>
            <LuxeLabel>{item.label}</LuxeLabel>
          </LuxeUnit>
        ))}
      </LuxeWrapper>
      <LuxeDate>January 1st, 2026</LuxeDate>
      <LuxeOrnament>✦</LuxeOrnament>
    </LuxeContainer>
  );
};

const LuxeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 4rem 2rem;
`;

const LuxeOrnament = styled.div`
  color: #C9A962;
  font-size: 1rem;
  letter-spacing: 1rem;
`;

const LuxeTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: rgba(245, 245, 245, 0.6);
`;

const LuxeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const LuxeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 clamp(1rem, 4vw, 3rem);
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 1px;
    background: linear-gradient(180deg, transparent, rgba(201, 169, 98, 0.3), transparent);
  }
`;

const LuxeNumber = styled.span`
  font-family: 'Playfair Display', serif;
  font-size: clamp(3.5rem, 10vw, 7rem);
  font-weight: 400;
  font-style: italic;
  background: linear-gradient(90deg, #8B7355 0%, #C9A962 25%, #F5E6C8 50%, #C9A962 75%, #8B7355 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 4s linear infinite;
  line-height: 1;
`;

const LuxeLabel = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(0.65rem, 1.5vw, 0.85rem);
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: rgba(201, 169, 98, 0.7);
  margin-top: 1rem;
`;

const LuxeDate = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-style: italic;
  color: rgba(245, 245, 245, 0.4);
`;

// ============================================
// BOTANICAL COUNTDOWN - Organic Style
// ============================================
export const BotanicalCountdown = () => {
  const timeLeft = useCountdown(TARGET_DATE);
  
  return (
    <BotanicalContainer>
      <BotanicalDecor>🌿 ✿ 🌿</BotanicalDecor>
      <BotanicalTitle>
        A new chapter blooms
        <span>Launching Soon</span>
      </BotanicalTitle>
      <BotanicalWrapper>
        {[
          { val: timeLeft.days, label: 'days' },
          { val: timeLeft.hours, label: 'hours' },
          { val: timeLeft.minutes, label: 'minutes' },
          { val: timeLeft.seconds, label: 'seconds' }
        ].map((item, i) => (
          <BotanicalUnit key={i}>
            <BotanicalCircle>
              <BotanicalNumber>{formatNumber(item.val)}</BotanicalNumber>
            </BotanicalCircle>
            <BotanicalLabel>{item.label}</BotanicalLabel>
          </BotanicalUnit>
        ))}
      </BotanicalWrapper>
      <BotanicalBanner>
        <span>🌱</span>
        <span>1. Januar 2026</span>
        <span>🌱</span>
      </BotanicalBanner>
    </BotanicalContainer>
  );
};

const BotanicalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding: 4rem 2rem;
`;

const BotanicalDecor = styled.div`
  font-size: 1.5rem;
  color: #2D5A3D;
`;

const BotanicalTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 400;
  font-style: italic;
  color: #2D5A3D;
  text-align: center;
  
  span {
    display: block;
    font-size: 0.7em;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    font-style: normal;
    color: #8FBC8F;
    margin-top: 0.5rem;
  }
`;

const BotanicalWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const BotanicalUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BotanicalCircle = styled.div`
  width: clamp(70px, 18vw, 120px);
  height: clamp(70px, 18vw, 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFBF5;
  border: 2px solid #8FBC8F;
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(45, 90, 61, 0.1);
`;

const BotanicalNumber = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 600;
  color: #2D5A3D;
`;

const BotanicalLabel = styled.span`
  font-family: 'Lora', serif;
  font-size: clamp(0.7rem, 1.8vw, 0.9rem);
  color: #8FBC8F;
  margin-top: 1rem;
  text-transform: lowercase;
  font-style: italic;
`;

const BotanicalBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: rgba(45, 90, 61, 0.05);
  border-radius: 100px;
  border: 1px solid rgba(143, 188, 143, 0.3);
  
  span {
    font-family: 'Cormorant Garamond', serif;
    color: #2D5A3D;
    letter-spacing: 0.1em;
  }
`;

// ============================================
// EDITORIAL COUNTDOWN - Magazine Style
// ============================================
export const EditorialCountdown = () => {
  const timeLeft = useCountdown(TARGET_DATE);
  
  return (
    <EditorialContainer>
      <EditorialHeader>
        <EditorialIssue>Issue No. 001</EditorialIssue>
        <EditorialTitle>Coming Soon</EditorialTitle>
        <EditorialSubtitle>The countdown has begun</EditorialSubtitle>
      </EditorialHeader>
      <EditorialGrid>
        {[
          { val: timeLeft.days, label: 'Days' },
          { val: timeLeft.hours, label: 'Hours' },
          { val: timeLeft.minutes, label: 'Mins' },
          { val: timeLeft.seconds, label: 'Secs' }
        ].map((item, i) => (
          <EditorialUnit key={i}>
            <EditorialNumber>{formatNumber(item.val)}</EditorialNumber>
            <EditorialLabel>{item.label}</EditorialLabel>
          </EditorialUnit>
        ))}
      </EditorialGrid>
      <EditorialDateLine>
        <span>1. Januar 2026</span>
      </EditorialDateLine>
    </EditorialContainer>
  );
};

const EditorialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 4rem 2rem;
`;

const EditorialHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const EditorialIssue = styled.span`
  font-family: 'Source Serif 4', serif;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: #e63946;
  border: 1px solid #e63946;
  padding: 0.25rem 1rem;
`;

const EditorialTitle = styled.h2`
  font-family: 'Bodoni Moda', serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 400;
  font-style: italic;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: -0.02em;
`;

const EditorialSubtitle = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: clamp(0.85rem, 2vw, 1rem);
  font-style: italic;
  color: rgba(26, 26, 26, 0.6);
`;

const EditorialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid #1a1a1a;
  background: #fefefe;
  max-width: 700px;
  width: 100%;
`;

const EditorialUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(1rem, 4vw, 2rem);
  border-right: 1px solid #1a1a1a;
  
  &:last-child {
    border-right: none;
  }
`;

const EditorialNumber = styled.span`
  font-family: 'Bodoni Moda', serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 400;
  color: #1a1a1a;
  line-height: 1;
`;

const EditorialLabel = styled.span`
  font-family: 'Source Serif 4', serif;
  font-size: clamp(0.6rem, 1.5vw, 0.75rem);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #e63946;
  margin-top: 0.75rem;
  font-weight: 600;
`;

const EditorialDateLine = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  &::before, &::after {
    content: '';
    width: 60px;
    height: 1px;
    background: #1a1a1a;
  }
  
  span {
    font-family: 'Bodoni Moda', serif;
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    font-style: italic;
    color: #1a1a1a;
  }
`;

// ============================================
// CONTEMPORARY COUNTDOWN - Modern Style
// ============================================
export const ContemporaryCountdown = () => {
  const timeLeft = useCountdown(TARGET_DATE);
  
  return (
    <ContemporaryContainer>
      <ContemporaryHeader>
        <ContemporaryEyebrow>Coming Soon</ContemporaryEyebrow>
        <ContemporaryTitle>Wir arbeiten daran</ContemporaryTitle>
      </ContemporaryHeader>
      <ContemporaryWrapper>
        {[
          { val: timeLeft.days, label: 'Tage' },
          { val: timeLeft.hours, label: 'Stunden' },
          { val: timeLeft.minutes, label: 'Minuten' },
          { val: timeLeft.seconds, label: 'Sekunden' }
        ].map((item, i) => (
          <ContemporaryUnit key={i}>
            <ContemporaryCard>
              <ContemporaryNumber>{formatNumber(item.val)}</ContemporaryNumber>
            </ContemporaryCard>
            <ContemporaryLabel>{item.label}</ContemporaryLabel>
          </ContemporaryUnit>
        ))}
      </ContemporaryWrapper>
      <ContemporaryPill>
        <span>🚀</span>
        <span>Launch: 01.01.2026</span>
      </ContemporaryPill>
    </ContemporaryContainer>
  );
};

const ContemporaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 4rem 2rem;
`;

const ContemporaryHeader = styled.div`
  text-align: center;
`;

const ContemporaryEyebrow = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: #A3B18A;
  display: block;
  margin-bottom: 0.75rem;
`;

const ContemporaryTitle = styled.h2`
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 500;
  color: #2d2d2d;
  letter-spacing: -0.02em;
`;

const ContemporaryWrapper = styled.div`
  display: flex;
  gap: clamp(0.75rem, 3vw, 1.5rem);
  flex-wrap: wrap;
  justify-content: center;
`;

const ContemporaryUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContemporaryCard = styled.div`
  width: clamp(70px, 18vw, 110px);
  height: clamp(70px, 18vw, 110px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #E8E0D5;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(45, 45, 45, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(45, 45, 45, 0.12);
  }
`;

const ContemporaryNumber = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.75rem, 5vw, 2.75rem);
  font-weight: 600;
  color: #2d2d2d;
`;

const ContemporaryLabel = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(0.65rem, 1.5vw, 0.8rem);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(45, 45, 45, 0.5);
  margin-top: 0.75rem;
`;

const ContemporaryPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #2d2d2d;
  border-radius: 100px;
  
  span {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    color: #F5F2EE;
    letter-spacing: 0.05em;
  }
`;

// ============================================
// GOLD COUNTDOWN - Opulent Style
// ============================================
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

export const GoldCountdown = () => {
  const timeLeft = useCountdown(TARGET_DATE);
  
  return (
    <GoldContainer>
      <GoldCrown>👑</GoldCrown>
      <GoldFlourish>❦ ❦ ❦</GoldFlourish>
      <GoldTitle>Der große Tag naht</GoldTitle>
      <GoldWrapper>
        {[
          { val: timeLeft.days, label: 'Tage' },
          { val: timeLeft.hours, label: 'Stunden' },
          { val: timeLeft.minutes, label: 'Minuten' },
          { val: timeLeft.seconds, label: 'Sekunden' }
        ].map((item, i) => (
          <GoldUnit key={i}>
            <GoldFrame>
              <GoldStar>✦</GoldStar>
              <GoldNumber>{formatNumber(item.val)}</GoldNumber>
            </GoldFrame>
            <GoldLabel>{item.label}</GoldLabel>
          </GoldUnit>
        ))}
      </GoldWrapper>
      <GoldBanner>
        <span>❧</span>
        <span>1. Januar 2026</span>
        <span>❧</span>
      </GoldBanner>
    </GoldContainer>
  );
};

const GoldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding: 4rem 2rem;
`;

const GoldCrown = styled.div`
  font-size: 2rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const GoldFlourish = styled.div`
  font-size: 1.5rem;
  color: #D4AF37;
`;

const GoldTitle = styled.h2`
  font-family: 'Cinzel Decorative', serif;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  background: linear-gradient(90deg, #B8860B 0%, #D4AF37 20%, #FFF8DC 40%, #D4AF37 60%, #B8860B 80%, #D4AF37 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 4s linear infinite;
  text-align: center;
`;

const GoldWrapper = styled.div`
  display: flex;
  gap: clamp(1rem, 3vw, 2rem);
  flex-wrap: wrap;
  justify-content: center;
`;

const GoldUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GoldFrame = styled.div`
  width: clamp(80px, 20vw, 130px);
  height: clamp(100px, 25vw, 160px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(180deg, rgba(212, 175, 55, 0.1) 0%, transparent 50%, rgba(212, 175, 55, 0.1) 100%);
  border: 2px solid #D4AF37;
  
  &::before {
    content: '';
    position: absolute;
    inset: 4px;
    border: 1px solid rgba(212, 175, 55, 0.4);
  }
`;

const GoldStar = styled.span`
  position: absolute;
  top: -8px;
  color: #D4AF37;
  font-size: 0.75rem;
  background: #1C1C1C;
  padding: 0 0.5rem;
`;

const GoldNumber = styled.span`
  font-family: 'Cinzel Decorative', serif;
  font-size: clamp(2.5rem, 7vw, 4rem);
  font-weight: 700;
  background: linear-gradient(180deg, #FFF8DC 0%, #D4AF37 50%, #B8860B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
`;

const GoldLabel = styled.span`
  font-family: 'Cinzel', serif;
  font-size: clamp(0.6rem, 1.5vw, 0.75rem);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(212, 175, 55, 0.7);
  margin-top: 0.5rem;
`;

const GoldBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 2.5rem;
  border: 1px solid rgba(212, 175, 55, 0.3);
  
  span {
    font-family: 'Cinzel', serif;
    color: #D4AF37;
    font-size: 1.25rem;
    
    &:nth-child(2) {
      font-size: clamp(0.9rem, 2vw, 1.1rem);
      color: #FFF8DC;
      letter-spacing: 0.15em;
    }
  }
`;

// Export map for dynamic rendering
export const countdownComponents = {
  neon: NeonCountdown,
  luxe: LuxeCountdown,
  botanical: BotanicalCountdown,
  editorial: EditorialCountdown,
  contemporary: ContemporaryCountdown,
  gold: GoldCountdown,
};
