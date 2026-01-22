// Hero Section - Multi-Theme (Contemporary, Editorial & Video)
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

// ============================================
// VIDEO BACKGROUND URL - HIER CLOUDINARY URL EINTRAGEN
// ============================================
const VIDEO_URL = ''; // z.B. 'https://res.cloudinary.com/demo/video/upload/v1234/wedding-video.mp4'
const VIDEO_POSTER = ''; // Fallback-Bild wenn Video nicht lädt

// Animations
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

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const HeroSection = () => {
  const { currentTheme } = useTheme();

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCountdown = () => {
    document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (currentTheme === 'video') {
    return <VideoHero scrollToWaitlist={scrollToWaitlist} scrollToCountdown={scrollToCountdown} />;
  }

  if (currentTheme === 'editorial') {
    return <EditorialHero scrollToWaitlist={scrollToWaitlist} scrollToCountdown={scrollToCountdown} />;
  }

  return <ContemporaryHero scrollToWaitlist={scrollToWaitlist} scrollToCountdown={scrollToCountdown} />;
};

// ============================================
// CONTEMPORARY HERO
// ============================================
const ContemporaryHero = ({ scrollToWaitlist, scrollToCountdown }) => (
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
        <ContemporaryBadge>COMING SOON</ContemporaryBadge>
        <ContemporaryLogo>S&I</ContemporaryLogo>
        <ContemporaryTagline>
          Individuelle Hochzeitswebsites,
          <br />
          <span>die so einzigartig sind wie eure Liebe</span>
        </ContemporaryTagline>
        <ButtonGroup>
          <ContemporaryPrimaryBtn onClick={scrollToWaitlist}>JETZT EINTRAGEN</ContemporaryPrimaryBtn>
          <ContemporarySecondaryBtn onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            UNSERE STORY
          </ContemporarySecondaryBtn>
        </ButtonGroup>
      </LeftContent>

      <RightContent>
        <ContemporaryDateBox>
          <ContemporaryDateText>01. OKTOBER 2026</ContemporaryDateText>
        </ContemporaryDateBox>
      </RightContent>
    </Container>

    <ScrollIndicator onClick={scrollToCountdown} $theme="contemporary">
      <ScrollDot $theme="contemporary" />
      <ScrollText $theme="contemporary">SCROLL TO EXPLORE</ScrollText>
    </ScrollIndicator>
  </Section>
);

// ============================================
// EDITORIAL HERO
// ============================================
const EditorialHero = ({ scrollToWaitlist, scrollToCountdown }) => (
  <Section $theme="editorial">
    <EditorialContainer>
      <EditorialEyebrow>COMING SOON</EditorialEyebrow>
      
      <EditorialDivider />
      
      <EditorialDate>1. Oktober 2026</EditorialDate>
      <EditorialLocation>SIWEDDING.DE</EditorialLocation>
      
      <EditorialLogo>S&I</EditorialLogo>
      
      <EditorialTagline>
        Individuelle Hochzeitswebsites,<br />
        <em>die so einzigartig sind wie eure Liebe</em>
      </EditorialTagline>
    </EditorialContainer>

    <ScrollIndicator onClick={scrollToCountdown} $theme="editorial">
      <ScrollText $theme="editorial">SCROLL</ScrollText>
      <ScrollArrow>↓</ScrollArrow>
    </ScrollIndicator>
  </Section>
);

// ============================================
// VIDEO HERO - Cinematic Fullscreen
// ============================================
const VideoHero = ({ scrollToWaitlist, scrollToCountdown }) => (
  <VideoSection>
    {/* Video Background */}
    <VideoBackground>
      {VIDEO_URL ? (
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          poster={VIDEO_POSTER}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      ) : (
        <VideoPlaceholder>
          <PlaceholderText>VIDEO</PlaceholderText>
          <PlaceholderSubtext>Cloudinary URL hier eintragen</PlaceholderSubtext>
        </VideoPlaceholder>
      )}
      <VideoOverlay />
    </VideoBackground>

    {/* Content */}
    <VideoContent>
      <VideoEyebrow>COMING SOON</VideoEyebrow>
      
      <VideoLogo>S&I</VideoLogo>
      
      <VideoTagline>
        Individuelle Hochzeitswebsites,<br />
        <em>die so einzigartig sind wie eure Liebe</em>
      </VideoTagline>
      
      <VideoDateBadge>
        <span>SAVE THE DATE</span>
        <span className="divider">·</span>
        <span>01. OKTOBER 2026</span>
      </VideoDateBadge>
    </VideoContent>

    {/* Scroll Indicator */}
    <VideoScrollIndicator onClick={scrollToCountdown}>
      <span>ENTDECKEN</span>
      <VideoScrollArrow>∨</VideoScrollArrow>
    </VideoScrollIndicator>
  </VideoSection>
);

export default HeroSection;

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
  
  ${p => p.$theme === 'contemporary' && css`
    background: #FFFFFF;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    background: #FFFFFF;
  `}
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
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(5rem, 15vw, 9rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 0.9;
  display: inline-block;
  background: #0D0D0D;
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

const EditorialLogo = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 0.9;
  display: inline-block;
  background: #1A1A1A;
  color: #FFFFFF;
  padding: 15px 35px;
  margin-bottom: 40px;
  
  @media (max-width: 600px) {
    font-size: 3.5rem;
    padding: 10px 25px;
  }
`;

const EditorialTagline = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 400;
  color: #666;
  line-height: 1.8;
  
  em {
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
    color: #1A1A1A;
  }
`;

// Scroll Indicator
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
  
  ${p => p.$theme === 'contemporary' && css`
    background: #FF6B6B;
  `}
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

const VideoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const PlaceholderText = styled.span`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 4rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.1);
  letter-spacing: 0.5em;
`;

const PlaceholderSubtext = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.3);
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

const VideoLogo = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(5rem, 18vw, 12rem);
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: -0.02em;
  line-height: 0.85;
  margin-bottom: 30px;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  display: inline-block;
  background: rgba(0, 0, 0, 0.4);
  padding: 15px 40px;
  backdrop-filter: blur(10px);
  
  @media (max-width: 600px) {
    font-size: 4rem;
    padding: 10px 25px;
  }
`;

const VideoTagline = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  margin-bottom: 40px;
  
  em {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 1.1em;
    color: #C4A87C;
  }
`;

const VideoDateBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 15px;
  background: rgba(139, 115, 85, 0.9);
  padding: 15px 30px;
  backdrop-filter: blur(10px);
  
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    color: #FFFFFF;
  }
  
  .divider {
    color: rgba(255, 255, 255, 0.5);
  }
  
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 8px;
    
    .divider { display: none; }
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
