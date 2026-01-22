// Waitlist Section - Multi-Theme (Contemporary, Editorial & Video)
import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { addToWaitlist } from '../config/supabase';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const WaitlistSection = () => {
  const { currentTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: 'error', message: 'Bitte gib eine gültige E-Mail-Adresse ein.' });
      return;
    }
    
    setLoading(true);
    try {
      const result = await addToWaitlist(email, currentTheme);
      if (result.success) {
        setStatus({ type: 'success', message: '🎉 Perfekt! Du bist auf der Warteliste. Wir melden uns!' });
        setEmail('');
      } else {
        setStatus({ type: 'error', message: result.error || 'Etwas ist schiefgelaufen.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Etwas ist schiefgelaufen. Versuch es später noch einmal.' });
    }
    setLoading(false);
  };

  if (currentTheme === 'botanical') {
    return (
      <BotanicalWaitlist 
        email={email}
        setEmail={setEmail}
        status={status}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    );
  }

  if (currentTheme === 'video') {
    return (
      <VideoWaitlist 
        email={email}
        setEmail={setEmail}
        status={status}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    );
  }

  if (currentTheme === 'editorial') {
    return (
      <EditorialWaitlist 
        email={email}
        setEmail={setEmail}
        status={status}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    );
  }

  return (
    <ContemporaryWaitlist 
      email={email}
      setEmail={setEmail}
      status={status}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

// ============================================
// CONTEMPORARY WAITLIST
// ============================================
const ContemporaryWaitlist = ({ email, setEmail, status, loading, handleSubmit }) => (
  <Section id="waitlist" $theme="contemporary">
    <Container>
      <Badge $theme="contemporary">★ BE PART OF IT</Badge>
      
      <TitleGroup>
        <TitleLine $theme="contemporary">JOIN THE</TitleLine>
        <TitleAccent $theme="contemporary">WAITLIST</TitleAccent>
      </TitleGroup>
      
      <Subtitle $theme="contemporary">
        Sei einer der Ersten. Trag dich ein und erhalte exklusiven 
        Zugang zum Launch – plus Early-Bird Vorteile.
      </Subtitle>
      
      <FormWrapper $theme="contemporary">
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            $theme="contemporary"
          />
          <SubmitButton type="submit" disabled={loading} $theme="contemporary">
            {loading ? 'WIRD EINGETRAGEN...' : 'JETZT EINTRAGEN →'}
          </SubmitButton>
        </Form>
        
        {status.message && (
          <Message $success={status.type === 'success'} $theme="contemporary">
            {status.message}
          </Message>
        )}
        
        <Privacy $theme="contemporary">
          🔒 Deine Daten sind bei uns sicher. Kein Spam, versprochen.
        </Privacy>
      </FormWrapper>
      
      <BenefitsGrid>
        <Benefit $theme="contemporary">
          <BenefitIcon>🚀</BenefitIcon>
          <BenefitText $theme="contemporary">Early Access zum Launch</BenefitText>
        </Benefit>
        <Benefit $theme="contemporary">
          <BenefitIcon>💰</BenefitIcon>
          <BenefitText $theme="contemporary">Exklusive Launch-Rabatte</BenefitText>
        </Benefit>
        <Benefit $theme="contemporary">
          <BenefitIcon>✨</BenefitIcon>
          <BenefitText $theme="contemporary">Sneak Peeks & Updates</BenefitText>
        </Benefit>
      </BenefitsGrid>
    </Container>
  </Section>
);

// ============================================
// EDITORIAL WAITLIST
// ============================================
const EditorialWaitlist = ({ email, setEmail, status, loading, handleSubmit }) => (
  <Section id="waitlist" $theme="editorial">
    <Container>
      <EditorialTitle>Sei dabei von <em>Anfang an</em></EditorialTitle>
      
      <Subtitle $theme="editorial">
        Trag dich auf unsere Warteliste ein und erhalte exklusiven 
        Zugang zum Launch.
      </Subtitle>
      
      <FormWrapper $theme="editorial">
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            $theme="editorial"
          />
          <SubmitButton type="submit" disabled={loading} $theme="editorial">
            {loading ? 'Wird eingetragen...' : 'Eintragen'}
          </SubmitButton>
        </Form>
        
        {status.message && (
          <Message $success={status.type === 'success'} $theme="editorial">
            {status.message}
          </Message>
        )}
        
        <Privacy $theme="editorial">
          Deine Daten sind bei uns sicher. Kein Spam.
        </Privacy>
      </FormWrapper>
    </Container>
  </Section>
);

// ============================================
// VIDEO WAITLIST - Cinematic Dark Style
// ============================================
const VideoWaitlist = ({ email, setEmail, status, loading, handleSubmit }) => (
  <VideoSection id="waitlist">
    <VideoContainer>
      <VideoBadge>— SEI DABEI —</VideoBadge>
      
      <VideoTitle>
        Werde Teil unserer <em>Geschichte</em>
      </VideoTitle>
      
      <VideoSubtitle>
        Trag dich auf unsere Warteliste ein und erhalte exklusiven Zugang zum Launch.
      </VideoSubtitle>
      
      <VideoFormWrapper>
        <VideoForm onSubmit={handleSubmit}>
          <VideoInput
            type="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <VideoSubmitButton type="submit" disabled={loading}>
            {loading ? 'Wird eingetragen...' : 'Eintragen →'}
          </VideoSubmitButton>
        </VideoForm>
        
        {status.message && (
          <VideoMessage $success={status.type === 'success'}>
            {status.message}
          </VideoMessage>
        )}
        
        <VideoPrivacy>
          Deine Daten sind bei uns sicher. Kein Spam, versprochen.
        </VideoPrivacy>
      </VideoFormWrapper>
      
      <VideoBenefits>
        <VideoBenefit>
          <VideoBenefitIcon>✦</VideoBenefitIcon>
          <VideoBenefitText>Early Access</VideoBenefitText>
        </VideoBenefit>
        <VideoBenefitDivider>·</VideoBenefitDivider>
        <VideoBenefit>
          <VideoBenefitIcon>✦</VideoBenefitIcon>
          <VideoBenefitText>Launch-Rabatte</VideoBenefitText>
        </VideoBenefit>
        <VideoBenefitDivider>·</VideoBenefitDivider>
        <VideoBenefit>
          <VideoBenefitIcon>✦</VideoBenefitIcon>
          <VideoBenefitText>Sneak Peeks</VideoBenefitText>
        </VideoBenefit>
      </VideoBenefits>
    </VideoContainer>
  </VideoSection>
);

// ============================================
// BOTANICAL WAITLIST - Nature-inspired Form
// ============================================
const BotanicalWaitlist = ({ email, setEmail, status, loading, handleSubmit }) => (
  <BotanicalWaitlistSection id="waitlist">
    <BotanicalWaitlistContainer>
      <BotanicalWaitlistBadge>✦ SEI DABEI ✦</BotanicalWaitlistBadge>
      
      <BotanicalWaitlistTitle>
        Trag dich ein für <em>exklusiven Zugang</em>
      </BotanicalWaitlistTitle>
      
      <BotanicalWaitlistSubtitle>
        Werde Teil unserer Geschichte und erhalte als Erste/r Zugang zum Launch.
      </BotanicalWaitlistSubtitle>
      
      <BotanicalFormBox>
        <BotanicalForm onSubmit={handleSubmit}>
          <BotanicalInput
            type="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <BotanicalSubmitButton type="submit" disabled={loading}>
            {loading ? 'Wird eingetragen...' : 'Eintragen →'}
          </BotanicalSubmitButton>
        </BotanicalForm>
        
        {status.message && (
          <BotanicalFormMessage $success={status.type === 'success'}>
            {status.message}
          </BotanicalFormMessage>
        )}
        
        <BotanicalPrivacy>
          🌿 Deine Daten sind bei uns sicher. Kein Spam, versprochen.
        </BotanicalPrivacy>
      </BotanicalFormBox>
      
      <BotanicalBenefitsList>
        <BotanicalBenefitItem>🌱 Early Access zum Launch</BotanicalBenefitItem>
        <BotanicalBenefitItem>💚 Exklusive Rabatte</BotanicalBenefitItem>
        <BotanicalBenefitItem>✨ Sneak Peeks & Updates</BotanicalBenefitItem>
      </BotanicalBenefitsList>
    </BotanicalWaitlistContainer>
  </BotanicalWaitlistSection>
);

export default WaitlistSection;

// ============================================
// STYLES
// ============================================
const Section = styled.section`
  padding: 100px 5%;
  text-align: center;
  
  ${p => p.$theme === 'contemporary' && css`
    background: linear-gradient(135deg, #FF6B6B 0%, #FFE66D 50%, #4ECDC4 100%);
    padding: 120px 5%;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    background: #FAFAFA;
  `}
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Badge = styled.div`
  display: inline-block;
  margin-bottom: 30px;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #0D0D0D;
    color: #FFFFFF;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    padding: 8px 18px;
  `}
`;

const TitleGroup = styled.div`
  margin-bottom: 20px;
`;

const TitleLine = styled.h2`
  line-height: 1.1;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 700;
    color: #0D0D0D;
    letter-spacing: -0.02em;
  `}
`;

const TitleAccent = styled.span`
  display: block;
  line-height: 1;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(3rem, 10vw, 6rem);
    font-weight: 700;
    color: #0D0D0D;
    letter-spacing: -0.03em;
  `}
`;

const EditorialTitle = styled.h2`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 20px;
  
  em {
    font-style: italic;
  }
`;

const Subtitle = styled.p`
  max-width: 550px;
  margin: 0 auto 40px;
  line-height: 1.7;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.15rem;
    color: rgba(13, 13, 13, 0.8);
    margin-bottom: 50px;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    color: #666;
  `}
`;

const FormWrapper = styled.div`
  animation: ${fadeInUp} 0.6s ease;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #FFFFFF;
    padding: 50px 40px;
    margin-bottom: 50px;
    
    @media (max-width: 600px) {
      padding: 35px 25px;
    }
  `}
  
  ${p => p.$theme === 'editorial' && css`
    max-width: 500px;
    margin: 0 auto;
  `}
`;

const Form = styled.form`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  transition: all 0.3s ease;
  
  ${p => p.$theme === 'contemporary' && css`
    padding: 18px 20px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    background: #F5F5F5;
    border: 2px solid transparent;
    color: #0D0D0D;
    
    &:focus {
      outline: none;
      border-color: #0D0D0D;
      background: #FFFFFF;
    }
    
    &::placeholder {
      color: rgba(13, 13, 13, 0.4);
    }
  `}
  
  ${p => p.$theme === 'editorial' && css`
    padding: 16px 20px;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    color: #1A1A1A;
    
    &:focus {
      outline: none;
      border-color: #1A1A1A;
    }
    
    &::placeholder {
      color: #999;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 18px 35px;
    background: #0D0D0D;
    color: #FFFFFF;
    border: 2px solid #0D0D0D;
    
    &:hover:not(:disabled) {
      background: #FF6B6B;
      border-color: #FF6B6B;
      transform: translateY(-2px);
    }
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 16px 30px;
    background: #1A1A1A;
    color: #FFFFFF;
    border: none;
    
    &:hover:not(:disabled) {
      background: #333;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  padding: 15px 20px;
  margin-bottom: 15px;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    background: ${p.$success ? 'rgba(76, 205, 196, 0.1)' : 'rgba(255, 107, 107, 0.1)'};
    color: ${p.$success ? '#0D0D0D' : '#FF6B6B'};
    border: 2px solid ${p.$success ? '#4ECDC4' : '#FF6B6B'};
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    background: ${p.$success ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 0, 0, 0.05)'};
    color: ${p.$success ? '#1A1A1A' : '#D32F2F'};
    border: 1px solid ${p.$success ? '#E0E0E0' : '#D32F2F'};
  `}
`;

const Privacy = styled.p`
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    color: rgba(13, 13, 13, 0.5);
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    color: #999;
    margin-top: 20px;
  `}
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Benefit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.3s ease;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #FFFFFF;
    padding: 25px 20px;
    
    &:hover {
      transform: translateY(-5px);
    }
  `}
`;

const BenefitIcon = styled.span`
  font-size: 1.8rem;
`;

const BenefitText = styled.span`
  text-align: center;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: #0D0D0D;
  `}
`;

// ============================================
// VIDEO THEME STYLES
// ============================================
const VideoSection = styled.section`
  padding: 120px 5%;
  background: #1A1814;
  text-align: center;
`;

const VideoContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
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
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: #FFFFFF;
  margin-bottom: 20px;
  
  em {
    font-style: italic;
  }
`;

const VideoSubtitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin-bottom: 50px;
`;

const VideoFormWrapper = styled.div`
  margin-bottom: 50px;
`;

const VideoForm = styled.form`
  display: flex;
  gap: 0;
  margin-bottom: 20px;
  border: 1px solid rgba(139, 115, 85, 0.3);
  
  @media (max-width: 600px) {
    flex-direction: column;
    border: none;
  }
`;

const VideoInput = styled.input`
  flex: 1;
  padding: 20px 25px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: #FFFFFF;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.08);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
  }
  
  @media (max-width: 600px) {
    border: 1px solid rgba(139, 115, 85, 0.3);
    margin-bottom: 10px;
  }
`;

const VideoSubmitButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 20px 35px;
  background: #8B7355;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    background: #6B5A45;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const VideoMessage = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  padding: 15px 20px;
  margin-bottom: 15px;
  background: ${p => p.$success ? 'rgba(139, 115, 85, 0.2)' : 'rgba(255, 100, 100, 0.1)'};
  color: ${p => p.$success ? '#C4A87C' : '#FF6B6B'};
  border: 1px solid ${p => p.$success ? 'rgba(139, 115, 85, 0.3)' : 'rgba(255, 100, 100, 0.3)'};
`;

const VideoPrivacy = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
`;

const VideoBenefits = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const VideoBenefit = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VideoBenefitIcon = styled.span`
  color: #8B7355;
  font-size: 0.8rem;
`;

const VideoBenefitText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
`;

const VideoBenefitDivider = styled.span`
  color: rgba(255, 255, 255, 0.2);
  
  @media (max-width: 500px) {
    display: none;
  }
`;

// ============================================
// BOTANICAL THEME STYLES
// ============================================
const BotanicalWaitlistSection = styled.section`
  padding: 120px 5%;
  background: #2C3E2D;
  text-align: center;
`;

const BotanicalWaitlistContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const BotanicalWaitlistBadge = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: #7BA889;
  margin-bottom: 25px;
`;

const BotanicalWaitlistTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 400;
  color: #FAF9F6;
  margin-bottom: 15px;
  
  em {
    font-style: italic;
    color: #7BA889;
  }
`;

const BotanicalWaitlistSubtitle = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(250, 249, 246, 0.7);
  line-height: 1.7;
  margin-bottom: 40px;
`;

const BotanicalFormBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 40px;
  border: 1px solid rgba(123, 168, 137, 0.3);
  border-radius: 20px;
  margin-bottom: 40px;
`;

const BotanicalForm = styled.form`
  display: flex;
  gap: 0;
  margin-bottom: 20px;
  
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const BotanicalInput = styled.input`
  flex: 1;
  padding: 18px 20px;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(123, 168, 137, 0.3);
  border-right: none;
  border-radius: 30px 0 0 30px;
  color: #FAF9F6;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #7BA889;
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(250, 249, 246, 0.5);
  }
  
  &:disabled {
    opacity: 0.6;
  }
  
  @media (max-width: 500px) {
    border-radius: 30px;
    border-right: 1px solid rgba(123, 168, 137, 0.3);
  }
`;

const BotanicalSubmitButton = styled.button`
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  padding: 18px 30px;
  background: #4A7C59;
  color: #FFFFFF;
  border: none;
  border-radius: 0 30px 30px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    background: #3A6249;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 500px) {
    border-radius: 30px;
    width: 100%;
  }
`;

const BotanicalFormMessage = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  padding: 15px 20px;
  margin-bottom: 15px;
  border-radius: 10px;
  background: ${p => p.$success ? 'rgba(123, 168, 137, 0.2)' : 'rgba(255, 100, 100, 0.1)'};
  color: ${p => p.$success ? '#7BA889' : '#FF6B6B'};
  border: 1px solid ${p => p.$success ? 'rgba(123, 168, 137, 0.4)' : 'rgba(255, 100, 100, 0.3)'};
`;

const BotanicalPrivacy = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  color: rgba(250, 249, 246, 0.5);
`;

const BotanicalBenefitsList = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const BotanicalBenefitItem = styled.span`
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: rgba(250, 249, 246, 0.8);
`;
