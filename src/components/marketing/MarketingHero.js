// src/components/marketing/MarketingHero.js
// Based on Coming Soon design, adapted for Marketing page
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// MEDIA URLS
// ============================================
const VIDEO_URL = 'https://res.cloudinary.com/si-weddings/video/upload/v1769070616/si_comming_soon_video_hero_xga2ia.mp4';
const LUXE_BG_URL = 'https://res.cloudinary.com/si-weddings/image/upload/v1769072318/si_cooming_soon_luxe_hero_wowu9v.jpg';

// ============================================
// ANIMATIONS
// ============================================
const float1 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, -15px) rotate(5deg); }
  50% { transform: translate(-5px, -25px) rotate(-3deg); }
  75% { transform: translate(-15px, -10px) rotate(2deg); }
`;

const float2 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-20px, 15px) rotate(-8deg); }
  66% { transform: translate(15px, -10px) rotate(5deg); }
`;

const float3 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(10px, 20px) scale(1.1); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scrollBounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`;

const leafFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
`;

const glitch = keyframes`
  0%, 100% { 
    transform: translate(0);
    text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff;
  }
  20% { 
    transform: translate(-2px, 2px);
    text-shadow: 4px 0 #ff00ff, -4px 0 #00ffff;
  }
  40% { 
    transform: translate(-2px, -2px);
    text-shadow: 2px 0 #00ffff, -2px 0 #ff00ff;
  }
  60% { 
    transform: translate(2px, 2px);
    text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff;
  }
  80% { 
    transform: translate(2px, -2px);
    text-shadow: 4px 0 #00ffff, -4px 0 #ff00ff;
  }
`;

const geometricFloat = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, -30px) rotate(90deg); }
  50% { transform: translate(-10px, -50px) rotate(180deg); }
  75% { transform: translate(-30px, -20px) rotate(270deg); }
`;

const geometricFloat2 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-40px, 20px) rotate(-120deg); }
  66% { transform: translate(30px, -40px) rotate(120deg); }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

// ============================================
// MAIN COMPONENT
// ============================================
const MarketingHero = () => {
  const { currentTheme } = useTheme();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDesigns = () => {
    document.getElementById('designs')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (currentTheme === 'luxe') return <LuxeHero scrollToContact={scrollToContact} scrollToDesigns={scrollToDesigns} />;
  if (currentTheme === 'botanical') return <BotanicalHero scrollToContact={scrollToContact} scrollToDesigns={scrollToDesigns} />;
  if (currentTheme === 'video') return <VideoHero scrollToContact={scrollToContact} scrollToDesigns={scrollToDesigns} />;
  if (currentTheme === 'editorial') return <EditorialHero scrollToContact={scrollToContact} scrollToDesigns={scrollToDesigns} />;
  if (currentTheme === 'neon') return <NeonHero scrollToContact={scrollToContact} scrollToDesigns={scrollToDesigns} />;
  return <ContemporaryHero scrollToContact={scrollToContact} scrollToDesigns={scrollToDesigns} />;
};

// ============================================
// CONTEMPORARY HERO
// ============================================
const ContemporaryHero = ({ scrollToContact, scrollToDesigns }) => (
  <Section $theme="contemporary">
    <GeometricElements>
      <Circle $top="15%" $left="8%" $size="80px" $color="#FF6B6B" $delay="0s" />
      <Circle $top="25%" $right="15%" $size="120px" $color="linear-gradient(135deg, #FFE66D 0%, #FF6B6B 100%)" $delay="0.5s" />
      <Diamond $bottom="30%" $left="5%" $size="40px" $color="#4ECDC4" $delay="1s" />
      <Diamond $top="60%" $right="10%" $size="25px" $color="#FF6B6B" $delay="0.3s" />
      <Square $bottom="20%" $right="20%" $size="35px" $color="#FFE66D" $delay="0.7s" />
    </GeometricElements>

    <Container>
      <LeftContent>
        <ContemporaryBadge>PREMIUM WEBSITES</ContemporaryBadge>
        <ContemporaryLogo>S&I.</ContemporaryLogo>
        <ContemporaryTagline>
          Individuelle Hochzeitswebsites,
          <br />
          <span>die so einzigartig sind wie eure Liebe</span>
        </ContemporaryTagline>
        <ButtonGroup>
          <ContemporaryPrimaryBtn onClick={scrollToContact}>JETZT ANFRAGEN →</ContemporaryPrimaryBtn>
          <ContemporarySecondaryBtn onClick={scrollToDesigns}>DESIGNS ENTDECKEN</ContemporarySecondaryBtn>
        </ButtonGroup>
      </LeftContent>

      <RightContent>
        <ContemporaryDateBox>
          <ContemporaryDateText>6 EINZIGARTIGE DESIGNS</ContemporaryDateText>
        </ContemporaryDateBox>
      </RightContent>
    </Container>

    <ScrollIndicator onClick={scrollToDesigns} $theme="contemporary">
      <ScrollDot $theme="contemporary" />
      <ScrollText $theme="contemporary">SCROLL TO EXPLORE</ScrollText>
    </ScrollIndicator>
  </Section>
);

// ============================================
// EDITORIAL HERO
// ============================================
const EditorialHero = ({ scrollToContact, scrollToDesigns }) => (
  <Section $theme="editorial">
    <EditorialContainer>
      <EditorialEyebrow>PREMIUM WEDDING WEBSITES</EditorialEyebrow>
      
      <EditorialMainTagline>
        Individuelle Hochzeitswebsites
      </EditorialMainTagline>
      
      <EditorialTagline>
        <em>die so einzigartig sind wie eure Liebe</em>
      </EditorialTagline>
      
      <EditorialDivider />
      
      <EditorialDate>6 einzigartige Designs</EditorialDate>
      <EditorialLocation>SIWEDDING.DE</EditorialLocation>
      
      <EditorialButtonGroup>
        <EditorialPrimaryBtn onClick={scrollToContact}>Jetzt anfragen</EditorialPrimaryBtn>
        <EditorialSecondaryBtn onClick={scrollToDesigns}>Designs entdecken</EditorialSecondaryBtn>
      </EditorialButtonGroup>
    </EditorialContainer>

    <ScrollIndicator onClick={scrollToDesigns} $theme="editorial">
      <ScrollText $theme="editorial">SCROLL</ScrollText>
      <ScrollArrow>↓</ScrollArrow>
    </ScrollIndicator>
  </Section>
);

// ============================================
// VIDEO HERO
// ============================================
const VideoHero = ({ scrollToContact, scrollToDesigns }) => (
  <VideoSection>
    <VideoBackground>
      <video autoPlay muted loop playsInline>
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      <VideoOverlay />
    </VideoBackground>

    <VideoContent>
      <VideoEyebrow>PREMIUM WEDDING WEBSITES</VideoEyebrow>
      
      <VideoMainTagline>
        Individuelle Hochzeitswebsites
      </VideoMainTagline>
      
      <VideoTagline>
        <em>die so einzigartig sind wie eure Liebe</em>
      </VideoTagline>
      
      <VideoButtonGroup>
        <VideoPrimaryBtn onClick={scrollToContact}>Jetzt anfragen</VideoPrimaryBtn>
        <VideoSecondaryBtn onClick={scrollToDesigns}>Designs entdecken</VideoSecondaryBtn>
      </VideoButtonGroup>
    </VideoContent>

    <VideoScrollIndicator onClick={scrollToDesigns}>
      <span>ENTDECKEN</span>
      <VideoScrollArrow>∨</VideoScrollArrow>
    </VideoScrollIndicator>
  </VideoSection>
);

// ============================================
// BOTANICAL HERO
// ============================================
const BotanicalHero = ({ scrollToContact, scrollToDesigns }) => (
  <BotanicalSection>
    <LeafDecoration $position="top-left">🌿</LeafDecoration>
    <LeafDecoration $position="top-right">🍃</LeafDecoration>
    <LeafDecoration $position="bottom-left">🌱</LeafDecoration>
    <LeafDecoration $position="bottom-right">🌿</LeafDecoration>
    
    <BotanicalContent>
      <BotanicalEyebrow>PREMIUM WEDDING WEBSITES</BotanicalEyebrow>
      
      <BotanicalMainTagline>
        Individuelle Hochzeitswebsites
      </BotanicalMainTagline>
      
      <BotanicalTagline>
        die so einzigartig sind wie eure Liebe
      </BotanicalTagline>
      
      <BotanicalDivider>✦ ✦ ✦</BotanicalDivider>
      
      <BotanicalDate>6 einzigartige Designs</BotanicalDate>
      <BotanicalLocation>SIWEDDING.DE</BotanicalLocation>
      
      <BotanicalButtonGroup>
        <BotanicalPrimaryBtn onClick={scrollToContact}>Jetzt anfragen</BotanicalPrimaryBtn>
        <BotanicalSecondaryBtn onClick={scrollToDesigns}>Designs entdecken</BotanicalSecondaryBtn>
      </BotanicalButtonGroup>
    </BotanicalContent>

    <BotanicalScrollIndicator onClick={scrollToDesigns}>
      <span>ENTDECKEN</span>
      <BotanicalScrollArrow>↓</BotanicalScrollArrow>
    </BotanicalScrollIndicator>
  </BotanicalSection>
);

// ============================================
// LUXE HERO
// ============================================
const LuxeHero = ({ scrollToContact, scrollToDesigns }) => (
  <LuxeSection $hasBg={!!LUXE_BG_URL}>
    <LuxeBgImage style={{ backgroundImage: `url(${LUXE_BG_URL})` }} />
    <LuxeOverlay />
    
    <LuxeContent>
      <LuxeEyebrow>PREMIUM WEDDING WEBSITES</LuxeEyebrow>
      
      <LuxeMainTagline>
        Individuelle Hochzeitswebsites
      </LuxeMainTagline>
      
      <LuxeTagline>
        die so einzigartig sind wie eure Liebe
      </LuxeTagline>
      
      <LuxeButtonGroup>
        <LuxePrimaryBtn onClick={scrollToContact}>Jetzt anfragen</LuxePrimaryBtn>
        <LuxeSecondaryBtn onClick={scrollToDesigns}>Designs entdecken</LuxeSecondaryBtn>
      </LuxeButtonGroup>
    </LuxeContent>

    <LuxeScrollIndicator onClick={scrollToDesigns}>
      <span>ENTDECKEN</span>
      <LuxeScrollArrow>↓</LuxeScrollArrow>
    </LuxeScrollIndicator>
  </LuxeSection>
);

// ============================================
// NEON HERO
// ============================================
const NeonHero = ({ scrollToContact, scrollToDesigns }) => (
  <NeonHeroWrapper>
    <NeonScanline />
    <NeonGrid />
    
    <NeonGeometricElements>
      <NeonSquare style={{ top: '10%', left: '5%' }} $delay="0s" />
      <NeonSquare style={{ top: '20%', right: '10%' }} $delay="0.5s" $size="80px" />
      <NeonCircle style={{ bottom: '20%', left: '8%' }} $delay="1s" />
      <NeonCircle style={{ top: '15%', right: '5%' }} $delay="0.3s" $size="60px" />
      <NeonTriangle style={{ bottom: '30%', right: '15%' }} $delay="0.7s" />
      <NeonTriangle style={{ top: '40%', left: '3%' }} $delay="1.2s" $size="40px" />
    </NeonGeometricElements>
    
    <NeonHeroContent>
      <NeonComingSoonBadge>
        <span>//</span> PREMIUM WEBSITES <span>//</span>
      </NeonComingSoonBadge>
      
      <NeonTitleWrapper>
        <NeonTitle>S&I.</NeonTitle>
        <NeonTitleGlitch aria-hidden="true">S&I.</NeonTitleGlitch>
        <NeonTitleGlitch2 aria-hidden="true">S&I.</NeonTitleGlitch2>
      </NeonTitleWrapper>
      
      <NeonSubtitle>Individuelle Hochzeitswebsites</NeonSubtitle>
      <NeonSubtitleSmall>die so einzigartig sind wie eure Liebe</NeonSubtitleSmall>
      
      <NeonDateBadge>
        <NeonDateLine />
        <NeonDate>6 EINZIGARTIGE DESIGNS</NeonDate>
        <NeonDateLine />
      </NeonDateBadge>
      
      <NeonButtonGroup>
        <NeonCTA onClick={scrollToContact}>
          Jetzt anfragen
          <NeonCTAArrow>→</NeonCTAArrow>
        </NeonCTA>
      </NeonButtonGroup>
    </NeonHeroContent>
    
    <NeonScrollIndicator onClick={scrollToDesigns}>
      <span>SCROLL TO EXPLORE</span>
      <NeonScrollArrow>↓</NeonScrollArrow>
    </NeonScrollIndicator>
  </NeonHeroWrapper>
);

export default MarketingHero;

// ============================================
// SHARED STYLES
// ============================================
const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 100px 5% 60px;
  
  ${p => p.$theme === 'contemporary' && css`background: #FFFFFF;`}
  ${p => p.$theme === 'editorial' && css`background: #FFFFFF;`}
`;

// Contemporary Styles
const GeometricElements = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
`;

const Circle = styled.div`
  position: absolute;
  width: ${p => p.$size};
  height: ${p => p.$size};
  border-radius: 50%;
  background: ${p => p.$color};
  top: ${p => p.$top || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
  animation: ${float1} 8s ease-in-out infinite;
  animation-delay: ${p => p.$delay};
  opacity: 0.9;
`;

const Diamond = styled.div`
  position: absolute;
  width: ${p => p.$size};
  height: ${p => p.$size};
  background: ${p => p.$color};
  top: ${p => p.$top || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
  transform: rotate(45deg);
  animation: ${float2} 10s ease-in-out infinite;
  animation-delay: ${p => p.$delay};
`;

const Square = styled.div`
  position: absolute;
  width: ${p => p.$size};
  height: ${p => p.$size};
  background: ${p => p.$color};
  top: ${p => p.$top || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
  animation: ${float3} 6s ease-in-out infinite;
  animation-delay: ${p => p.$delay};
`;

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const LeftContent = styled.div`
  animation: ${fadeInUp} 1s ease-out;
`;

const RightContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  animation: ${fadeInUp} 1s ease-out 0.3s both;
  
  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  
  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const ContemporaryBadge = styled.div`
  display: inline-block;
  background: #FF6B6B;
  color: #FFFFFF;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  padding: 10px 20px;
  margin-bottom: 30px;
`;

const ContemporaryLogo = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: clamp(5rem, 15vw, 9rem);
  font-weight: 700;
  letter-spacing: -0.06em;
  line-height: 0.9;
  display: inline-block;
  background: #000000;
  color: #FFFFFF;
  padding: 10px 25px;
  margin-bottom: 25px;
  
  @media (max-width: 600px) {
    font-size: 4rem;
    padding: 8px 18px;
  }
`;

const ContemporaryTagline = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  font-weight: 500;
  color: #0D0D0D;
  line-height: 1.6;
  margin-bottom: 40px;
  
  span { color: #FF6B6B; }
`;

const ContemporaryPrimaryBtn = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 16px 32px;
  background: #0D0D0D;
  color: #FFFFFF;
  border: 2px solid #0D0D0D;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #FF6B6B;
    border-color: #FF6B6B;
    transform: translateY(-3px);
  }
`;

const ContemporarySecondaryBtn = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 16px 32px;
  background: transparent;
  color: #0D0D0D;
  border: 2px solid #0D0D0D;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #0D0D0D;
    color: #FFFFFF;
  }
`;

const ContemporaryDateBox = styled.div`
  background: linear-gradient(135deg, #FFE66D 0%, #FF6B6B 50%, #4ECDC4 100%);
  padding: 4px;
`;

const ContemporaryDateText = styled.div`
  background: #FFFFFF;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #0D0D0D;
  padding: 20px 35px;
`;

// Editorial Styles
const EditorialContainer = styled.div`
  text-align: center;
  animation: ${fadeInUp} 1s ease-out;
`;

const EditorialEyebrow = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #999;
  margin-bottom: 80px;
`;

const EditorialMainTagline = styled.h1`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 400;
  font-style: italic;
  color: #1A1A1A;
  line-height: 1.1;
  margin-bottom: 20px;
`;

const EditorialTagline = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 400;
  color: #666;
  line-height: 1.8;
  margin-bottom: 40px;
  
  em {
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
    color: #1A1A1A;
  }
`;

const EditorialDivider = styled.div`
  width: 40px;
  height: 1px;
  background: #1A1A1A;
  margin: 0 auto 25px;
`;

const EditorialDate = styled.div`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-style: italic;
  color: #1A1A1A;
  margin-bottom: 8px;
`;

const EditorialLocation = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: #999;
  margin-bottom: 60px;
`;

const EditorialButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const EditorialPrimaryBtn = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 18px 40px;
  background: #1A1A1A;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333;
  }
`;

const EditorialSecondaryBtn = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 18px 40px;
  background: transparent;
  color: #1A1A1A;
  border: 1px solid #1A1A1A;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #1A1A1A;
    color: #FFFFFF;
  }
`;

// Scroll Indicators
const ScrollIndicator = styled.button`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  
  ${p => p.$theme === 'contemporary' && css`
    left: 5%;
    transform: none;
    flex-direction: row;
    gap: 12px;
  `}
`;

const ScrollDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: ${scrollBounce} 1.5s ease-in-out infinite;
  
  ${p => p.$theme === 'contemporary' && css`background: #FF6B6B;`}
`;

const ScrollText = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: #0D0D0D;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    color: #999;
  `}
`;

const ScrollArrow = styled.span`
  font-size: 1rem;
  color: #999;
  animation: ${scrollBounce} 1.5s ease-in-out infinite;
`;

// ============================================
// VIDEO THEME STYLES
// ============================================
const VideoSection = styled.section`
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const VideoBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 40%,
    rgba(0, 0, 0, 0.1) 60%,
    rgba(0, 0, 0, 0.5) 100%
  );
`;

const VideoContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 20px;
  animation: ${fadeIn} 1.5s ease;
`;

const VideoEyebrow = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
`;

const VideoMainTagline = styled.h1`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 300;
  font-style: italic;
  color: #FFFFFF;
  line-height: 1.1;
  margin-bottom: 20px;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
`;

const VideoTagline = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  margin-bottom: 50px;
  
  em {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 1.1em;
    color: #C4A87C;
  }
`;

const VideoButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const VideoPrimaryBtn = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 18px 40px;
  background: rgba(139, 115, 85, 0.9);
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: #C4A87C;
  }
`;

const VideoSecondaryBtn = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 18px 40px;
  background: transparent;
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #FFFFFF;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const VideoScrollIndicator = styled.button`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.3em;
    color: rgba(255, 255, 255, 0.6);
  }
`;

const VideoScrollArrow = styled.span`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  animation: ${scrollBounce} 1.5s ease-in-out infinite;
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
  overflow: hidden;
  padding: 100px 5% 60px;
  background: linear-gradient(180deg, #FAF9F6 0%, #F5F1EB 100%);
`;

const LeafDecoration = styled.div`
  position: absolute;
  font-size: 3rem;
  opacity: 0.3;
  animation: ${leafFloat} 4s ease-in-out infinite;
  
  ${p => p.$position === 'top-left' && css`top: 10%; left: 5%; animation-delay: 0s;`}
  ${p => p.$position === 'top-right' && css`top: 15%; right: 8%; animation-delay: 1s;`}
  ${p => p.$position === 'bottom-left' && css`bottom: 20%; left: 8%; animation-delay: 0.5s;`}
  ${p => p.$position === 'bottom-right' && css`bottom: 15%; right: 5%; animation-delay: 1.5s;`}
  
  @media (max-width: 600px) {
    font-size: 2rem;
    opacity: 0.2;
  }
`;

const BotanicalContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 2;
  animation: ${fadeInUp} 1s ease;
`;

const BotanicalEyebrow = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.4em;
  color: #4A7C59;
  margin-bottom: 30px;
`;

const BotanicalMainTagline = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.2rem, 7vw, 4rem);
  font-weight: 400;
  font-style: italic;
  color: #2C3E2D;
  line-height: 1.2;
  margin-bottom: 20px;
`;

const BotanicalTagline = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 300;
  color: #6B7B6C;
  line-height: 1.8;
  margin-bottom: 30px;
`;

const BotanicalDivider = styled.div`
  font-size: 0.8rem;
  color: #4A7C59;
  letter-spacing: 0.5em;
  margin-bottom: 25px;
`;

const BotanicalDate = styled.div`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  font-style: italic;
  color: #2C3E2D;
  margin-bottom: 8px;
`;

const BotanicalLocation = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: #4A7C59;
  margin-bottom: 40px;
`;

const BotanicalButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const BotanicalPrimaryBtn = styled.button`
  font-family: 'Lato', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 18px 40px;
  background: #4A7C59;
  color: #FFFFFF;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #3A6C49;
  }
`;

const BotanicalSecondaryBtn = styled.button`
  font-family: 'Lato', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 18px 40px;
  background: transparent;
  color: #2C3E2D;
  border: 1px solid #2C3E2D;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2C3E2D;
    color: #FFFFFF;
  }
`;

const BotanicalScrollIndicator = styled.button`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  
  span {
    font-family: 'Lato', sans-serif;
    font-size: 0.65rem;
    font-weight: 400;
    letter-spacing: 0.3em;
    color: #6B7B6C;
  }
`;

const BotanicalScrollArrow = styled.span`
  font-size: 1rem;
  color: #4A7C59;
  animation: ${scrollBounce} 1.5s ease-in-out infinite;
`;

// ============================================
// LUXE THEME STYLES
// ============================================
const LuxeSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: ${p => p.$hasBg ? '#000' : '#1A1A1A'};
`;

const LuxeBgImage = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: grayscale(100%);
`;

const LuxeOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const LuxeContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 2;
  animation: ${fadeInUp} 1s ease;
`;

const LuxeEyebrow = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.4em;
  color: #B8960B;
  margin-bottom: 30px;
`;

const LuxeMainTagline = styled.h1`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 300;
  font-style: italic;
  color: #FFFFFF;
  line-height: 1.1;
  margin-bottom: 20px;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
`;

const LuxeTagline = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  font-weight: 300;
  font-style: italic;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  margin-bottom: 50px;
`;

const LuxeButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const LuxePrimaryBtn = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 18px 40px;
  background: #B8960B;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #D4AF37;
  }
`;

const LuxeSecondaryBtn = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 18px 40px;
  background: transparent;
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #B8960B;
    color: #B8960B;
  }
`;

const LuxeScrollIndicator = styled.button`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.6rem;
    font-weight: 400;
    letter-spacing: 0.3em;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const LuxeScrollArrow = styled.span`
  font-size: 1rem;
  color: #B8960B;
  animation: ${scrollBounce} 1.5s ease-in-out infinite;
`;

// ============================================
// NEON THEME STYLES
// ============================================
const NeonHeroWrapper = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0f;
  overflow: hidden;
`;

const NeonScanline = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent);
  animation: ${scanline} 8s linear infinite;
  z-index: 1;
  pointer-events: none;
`;

const NeonGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 0;
`;

const NeonGeometricElements = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
`;

const NeonSquare = styled.div`
  position: absolute;
  width: ${p => p.$size || '60px'};
  height: ${p => p.$size || '60px'};
  border: 2px solid #00ffff;
  opacity: 0.4;
  animation: ${geometricFloat} 15s ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
  
  &::after {
    content: '';
    position: absolute;
    inset: 4px;
    border: 1px solid rgba(255, 0, 255, 0.5);
  }
`;

const NeonCircle = styled.div`
  position: absolute;
  width: ${p => p.$size || '80px'};
  height: ${p => p.$size || '80px'};
  border: 2px solid #ff00ff;
  border-radius: 50%;
  opacity: 0.4;
  animation: ${geometricFloat2} 18s ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
`;

const NeonTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: ${p => p.$size ? `${parseInt(p.$size)/2}px` : '30px'} solid transparent;
  border-right: ${p => p.$size ? `${parseInt(p.$size)/2}px` : '30px'} solid transparent;
  border-bottom: ${p => p.$size || '60px'} solid transparent;
  border-bottom-color: rgba(0, 255, 136, 0.3);
  opacity: 0.5;
  animation: ${geometricFloat} 20s ease-in-out infinite reverse;
  animation-delay: ${p => p.$delay || '0s'};
`;

const NeonHeroContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 20px;
`;

const NeonComingSoonBadge = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  color: #00ffff;
  margin-bottom: 30px;
  animation: ${fadeIn} 1s ease;
  
  span { color: #ff00ff; }
`;

const NeonTitleWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 30px;
`;

const NeonTitle = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(4rem, 15vw, 10rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #FFFFFF;
  line-height: 1;
  position: relative;
  animation: ${fadeInUp} 1s ease;
  
  &::before {
    content: '';
    position: absolute;
    inset: -10px -20px;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent);
    z-index: -1;
  }
`;

const NeonTitleGlitch = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(4rem, 15vw, 10rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #00ffff;
  line-height: 1;
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  animation: ${glitch} 3s infinite;
  opacity: 0.8;
`;

const NeonTitleGlitch2 = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(4rem, 15vw, 10rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #ff00ff;
  line-height: 1;
  clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
  animation: ${glitch} 3s infinite reverse;
  animation-delay: 0.1s;
  opacity: 0.8;
`;

const NeonSubtitle = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #FFFFFF;
  margin-bottom: 8px;
  animation: ${fadeInUp} 1s ease 0.2s both;
`;

const NeonSubtitleSmall = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 40px;
  animation: ${fadeInUp} 1s ease 0.3s both;
`;

const NeonDateBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
  animation: ${fadeInUp} 1s ease 0.4s both;
`;

const NeonDateLine = styled.div`
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00ffff, transparent);
`;

const NeonDate = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #00ffff;
`;

const NeonButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const NeonCTA = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 40px;
  background: transparent;
  border: 2px solid #00ffff;
  color: #00ffff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 1s ease 0.5s both;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }
  
  &:hover {
    background: rgba(0, 255, 255, 0.1);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1);
    
    &::before {
      transform: translateX(100%);
    }
  }
`;

const NeonCTAArrow = styled.span`
  transition: transform 0.3s ease;
  
  ${NeonCTA}:hover & {
    transform: translateX(5px);
  }
`;

const NeonScrollIndicator = styled.button`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  
  span {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.3em;
    color: rgba(255, 255, 255, 0.4);
  }
`;

const NeonScrollArrow = styled.span`
  font-size: 1.2rem;
  color: #00ffff;
  animation: ${scrollBounce} 1.5s ease-in-out infinite;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
`;
