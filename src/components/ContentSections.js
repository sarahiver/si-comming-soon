// Content Sections - Services, About, Waitlist
import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { themes, isDarkTheme } from '../themes/themeDefinitions';
import { addToWaitlist } from '../config/supabase';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ============================================
// SERVICES SECTION
// ============================================
const features = [
  { icon: '✨', title: 'Maßgeschneidert', text: 'Keine Templates. Jede Website wird individuell für euch gestaltet.' },
  { icon: '💎', title: 'Premium Design', text: 'Wir kreieren digitale Kunstwerke, die Gäste begeistern.' },
  { icon: '📱', title: 'Alle Geräte', text: 'Perfekt auf Smartphone, Tablet und Desktop.' },
  { icon: '🎯', title: 'Volle Funktionalität', text: 'RSVP, Gästebuch, Galerie, Tischplan – alles integriert.' },
  { icon: '🔒', title: 'DSGVO-Konform', text: 'Hosting in Deutschland. Volle Datenschutz-Compliance.' },
  { icon: '💝', title: 'Persönlicher Service', text: 'Wir begleiten euch von der Idee bis zum Launch.' },
];

export const ServicesSection = ({ currentTheme }) => {
  const theme = themes[currentTheme];
  const isDark = isDarkTheme(currentTheme);

  return (
    <ServiceContainer $theme={currentTheme} $isDark={isDark}>
      <SectionHeader>
        <Eyebrow $theme={currentTheme}>Was wir bieten</Eyebrow>
        <Title $theme={currentTheme}>
          Digital. Persönlich. <Highlight $theme={currentTheme}>Unvergesslich.</Highlight>
        </Title>
      </SectionHeader>
      
      <Grid>
        {features.map((f, i) => (
          <Card key={i} $theme={currentTheme} $isDark={isDark} $delay={i * 0.1}>
            <CardIcon>{f.icon}</CardIcon>
            <CardTitle $theme={currentTheme}>{f.title}</CardTitle>
            <CardText $isDark={isDark}>{f.text}</CardText>
          </Card>
        ))}
      </Grid>
    </ServiceContainer>
  );
};

// ============================================
// ABOUT SECTION
// ============================================
export const AboutSection = ({ currentTheme }) => {
  const theme = themes[currentTheme];
  const isDark = isDarkTheme(currentTheme);

  return (
    <AboutContainer $theme={currentTheme} $isDark={isDark}>
      <SectionHeader>
        <Eyebrow $theme={currentTheme}>Die Menschen hinter S&I.</Eyebrow>
        <Title $theme={currentTheme}>Lernt uns kennen</Title>
      </SectionHeader>
      
      <PersonGrid>
        <Person $theme={currentTheme} $isDark={isDark}>
          <Avatar $theme={currentTheme}>👩‍💼</Avatar>
          <PersonName $theme={currentTheme}>Sarah</PersonName>
          <PersonRole $theme={currentTheme}>Kreative Leitung</PersonRole>
          <PersonBio $isDark={isDark}>
            Mit einem Auge fürs Detail bringt Sarah eure Vision zum Leben.
          </PersonBio>
        </Person>
        
        <Person $theme={currentTheme} $isDark={isDark}>
          <Avatar $theme={currentTheme}>👨‍💻</Avatar>
          <PersonName $theme={currentTheme}>Iver</PersonName>
          <PersonRole $theme={currentTheme}>Technische Magie</PersonRole>
          <PersonBio $isDark={isDark}>
            Iver sorgt dafür, dass eure Website technisch brillant funktioniert.
          </PersonBio>
        </Person>
      </PersonGrid>
      
      <StoryBox $theme={currentTheme} $isDark={isDark}>
        <StoryTitle $theme={currentTheme}>Unsere Geschichte</StoryTitle>
        <StoryText $isDark={isDark}>
          Wir haben selbst erlebt, wie schwer es ist, eine Hochzeitswebsite zu finden, 
          die wirklich zu einem passt. Also haben wir <strong>S&I.</strong> gegründet – 
          um Paaren das zu geben, was wir uns selbst gewünscht hätten.
        </StoryText>
      </StoryBox>
    </AboutContainer>
  );
};

// ============================================
// WAITLIST SECTION
// ============================================
export const WaitlistSection = ({ currentTheme }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const isDark = isDarkTheme(currentTheme);

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
        setStatus({ type: 'success', message: 'Perfekt! Du bist auf der Warteliste. Wir melden uns bald!' });
        setEmail('');
      } else {
        setStatus({ type: 'error', message: result.error || 'Etwas ist schiefgelaufen.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Etwas ist schiefgelaufen.' });
    }
    setLoading(false);
  };

  return (
    <WaitlistContainer $theme={currentTheme} $isDark={isDark}>
      <WaitlistTitle $theme={currentTheme}>Sei dabei von Anfang an</WaitlistTitle>
      <WaitlistSubtitle $isDark={isDark}>
        Trag dich auf unsere Warteliste ein und erhalte exklusiven Zugang zum Launch.
      </WaitlistSubtitle>
      
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="deine@email.de"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          $theme={currentTheme}
          $isDark={isDark}
        />
        <Button type="submit" disabled={loading} $theme={currentTheme}>
          {loading ? 'Wird eingetragen...' : 'Eintragen'}
        </Button>
      </Form>
      
      {status.message && (
        <Message $success={status.type === 'success'}>{status.message}</Message>
      )}
      
      <Privacy $isDark={isDark}>Deine Daten sind bei uns sicher. Kein Spam.</Privacy>
    </WaitlistContainer>
  );
};

// ============================================
// FOOTER
// ============================================
export const Footer = ({ currentTheme }) => {
  const isDark = isDarkTheme(currentTheme);
  
  return (
    <FooterContainer $theme={currentTheme} $isDark={isDark}>
      <FooterLogo $theme={currentTheme}>S&I.</FooterLogo>
      <FooterText $isDark={isDark}>© 2026 S&I. Weddings — Digitale Hochzeitserlebnisse</FooterText>
    </FooterContainer>
  );
};

// ============================================
// SHARED STYLES
// ============================================
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  animation: ${fadeInUp} 0.6s ease;
`;

const Eyebrow = styled.span`
  display: block;
  font-size: 0.8rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  margin-bottom: 15px;
  
  ${p => p.$theme === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$theme === 'gold' && css`font-family: 'Montserrat', sans-serif; color: #D4AF37;`}
  ${p => p.$theme === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83;`}
  ${p => p.$theme === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FF6B6B; font-weight: 700;`}
  ${p => p.$theme === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #D4AF37; letter-spacing: 0.4em;`}
  ${p => p.$theme === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ff00ff;`}
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  
  ${p => p.$theme === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A; font-weight: 400;`}
  ${p => p.$theme === 'gold' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #fff; font-weight: 300;`}
  ${p => p.$theme === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$theme === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$theme === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #fff; font-style: italic;`}
  ${p => p.$theme === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #fff; font-weight: 700;`}
`;

const Highlight = styled.span`
  ${p => p.$theme === 'editorial' && css`font-style: italic;`}
  ${p => p.$theme === 'gold' && css`color: #D4AF37;`}
  ${p => p.$theme === 'botanical' && css`color: #8B9D83; font-style: italic;`}
  ${p => p.$theme === 'contemporary' && css`color: #FF6B6B;`}
  ${p => p.$theme === 'luxe' && css`color: #D4AF37;`}
  ${p => p.$theme === 'neon' && css`color: #00ffff; text-shadow: 0 0 15px rgba(0,255,255,0.5);`}
`;

// Services Styles
const ServiceContainer = styled.section`
  padding: 100px 5%;
  background: ${p => p.$isDark ? '#0A0A0A' : '#FAFAFA'};
  ${p => p.$theme === 'botanical' && css`background: #F5F1EB;`}
  ${p => p.$theme === 'neon' && css`background: #0a0a0f;`}
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  padding: 35px 30px;
  background: ${p => p.$isDark ? 'rgba(255,255,255,0.02)' : '#fff'};
  border: 1px solid ${p => p.$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};
  border-radius: ${p => p.$theme === 'contemporary' ? '0' : p.$theme === 'botanical' ? '12px' : '4px'};
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
  opacity: 0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    ${p => p.$theme === 'neon' && css`border-color: rgba(0,255,255,0.3);`}
    ${p => p.$theme === 'gold' && css`border-color: rgba(212,175,55,0.4);`}
  }
  
  ${p => p.$theme === 'contemporary' && css`
    border: 2px solid #0D0D0D;
    box-shadow: 4px 4px 0 #0D0D0D;
  `}
`;

const CardIcon = styled.span`
  font-size: 2rem;
  display: block;
  margin-bottom: 15px;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  
  ${p => p.$theme === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$theme === 'gold' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #D4AF37;`}
  ${p => p.$theme === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$theme === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$theme === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #D4AF37;`}
  ${p => p.$theme === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
`;

const CardText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${p => p.$isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'};
`;

// About Styles
const AboutContainer = styled.section`
  padding: 100px 5%;
  background: ${p => p.$isDark ? '#0D0D0D' : '#fff'};
  ${p => p.$theme === 'botanical' && css`background: #FFFBF5;`}
  ${p => p.$theme === 'neon' && css`background: #0f0a15;`}
`;

const PersonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 50px;
  max-width: 800px;
  margin: 0 auto 60px;
`;

const Person = styled.div`
  text-align: center;
  animation: ${fadeInUp} 0.6s ease;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border-radius: ${p => p.$theme === 'contemporary' ? '20px' : '50%'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  
  ${p => p.$theme === 'editorial' && css`background: #F5F5F5; border: 1px solid #E0E0E0;`}
  ${p => p.$theme === 'gold' && css`background: rgba(212,175,55,0.1); border: 2px solid rgba(212,175,55,0.3);`}
  ${p => p.$theme === 'botanical' && css`background: rgba(139,157,131,0.15); border: 2px solid #8B9D83;`}
  ${p => p.$theme === 'contemporary' && css`background: #FFE66D; border: 3px solid #0D0D0D;`}
  ${p => p.$theme === 'luxe' && css`background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2);`}
  ${p => p.$theme === 'neon' && css`background: rgba(0,255,255,0.05); border: 1px solid rgba(0,255,255,0.3);`}
`;

const PersonName = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 5px;
  
  ${p => p.$theme === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$theme === 'gold' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #fff;`}
  ${p => p.$theme === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$theme === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$theme === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #fff;`}
  ${p => p.$theme === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #fff;`}
`;

const PersonRole = styled.span`
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 15px;
  
  ${p => p.$theme === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$theme === 'gold' && css`font-family: 'Montserrat', sans-serif; color: #D4AF37;`}
  ${p => p.$theme === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83;`}
  ${p => p.$theme === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FF6B6B;`}
  ${p => p.$theme === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #D4AF37;`}
  ${p => p.$theme === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ff00ff;`}
`;

const PersonBio = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${p => p.$isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'};
  max-width: 300px;
  margin: 0 auto;
`;

const StoryBox = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
  background: ${p => p.$isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'};
  border-radius: ${p => p.$theme === 'botanical' ? '16px' : '4px'};
  
  ${p => p.$theme === 'neon' && css`border: 1px solid rgba(0,255,255,0.15);`}
  ${p => p.$theme === 'gold' && css`border: 1px solid rgba(212,175,55,0.15);`}
`;

const StoryTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 20px;
  
  ${p => p.$theme === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$theme === 'gold' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #D4AF37;`}
  ${p => p.$theme === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$theme === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$theme === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #D4AF37;`}
  ${p => p.$theme === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
`;

const StoryText = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: ${p => p.$isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'};
  
  strong { font-weight: 700; }
`;

// Waitlist Styles
const WaitlistContainer = styled.section`
  padding: 80px 5%;
  text-align: center;
  background: ${p => p.$isDark ? '#0A0A0A' : '#F5F5F5'};
  ${p => p.$theme === 'botanical' && css`background: #EDE8E0;`}
  ${p => p.$theme === 'neon' && css`background: #0a0a0f;`}
`;

const WaitlistTitle = styled.h3`
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  margin-bottom: 15px;
  
  ${p => p.$theme === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$theme === 'gold' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #D4AF37;`}
  ${p => p.$theme === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$theme === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$theme === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #D4AF37;`}
  ${p => p.$theme === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
`;

const WaitlistSubtitle = styled.p`
  font-size: 1rem;
  color: ${p => p.$isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'};
  margin-bottom: 30px;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  margin: 0 auto 20px;
  
  @media (min-width: 500px) {
    flex-direction: row;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 14px 18px;
  font-size: 1rem;
  border-radius: ${p => p.$theme === 'botanical' ? '50px' : '4px'};
  background: ${p => p.$isDark ? 'rgba(255,255,255,0.05)' : '#fff'};
  border: 1px solid ${p => p.$isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'};
  color: ${p => p.$isDark ? '#fff' : '#000'};
  
  &:focus {
    outline: none;
    ${p => p.$theme === 'neon' && css`border-color: #00ffff;`}
    ${p => p.$theme === 'gold' && css`border-color: #D4AF37;`}
    ${p => p.$theme === 'botanical' && css`border-color: #8B9D83;`}
  }
  
  &::placeholder {
    color: ${p => p.$isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'};
  }
`;

const Button = styled.button`
  padding: 14px 28px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    background: #1A1A1A;
    color: #fff;
    border: none;
  `}
  ${p => p.$theme === 'gold' && css`
    font-family: 'Montserrat', sans-serif;
    background: #D4AF37;
    color: #0A0A0A;
    border: none;
  `}
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    background: #8B9D83;
    color: #fff;
    border: none;
    border-radius: 50px;
  `}
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    background: #FF6B6B;
    color: #fff;
    border: 2px solid #0D0D0D;
  `}
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    background: transparent;
    color: #D4AF37;
    border: 1px solid #D4AF37;
  `}
  ${p => p.$theme === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    background: transparent;
    color: #00ffff;
    border: 1px solid #00ffff;
    text-shadow: 0 0 10px rgba(0,255,255,0.5);
  `}
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  font-size: 0.9rem;
  padding: 12px 20px;
  border-radius: 4px;
  max-width: 400px;
  margin: 0 auto 15px;
  background: ${p => p.$success ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'};
  color: ${p => p.$success ? '#4CAF50' : '#f44336'};
  border: 1px solid ${p => p.$success ? '#4CAF50' : '#f44336'};
`;

const Privacy = styled.p`
  font-size: 0.75rem;
  color: ${p => p.$isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'};
`;

// Footer Styles
const FooterContainer = styled.footer`
  padding: 50px 5%;
  text-align: center;
  background: ${p => p.$isDark ? '#050505' : '#FAFAFA'};
  border-top: 1px solid ${p => p.$isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
`;

const FooterLogo = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  display: block;
  margin-bottom: 10px;
  
  ${p => p.$theme === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$theme === 'gold' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #D4AF37;`}
  ${p => p.$theme === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$theme === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D;`}
  ${p => p.$theme === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #D4AF37;`}
  ${p => p.$theme === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
`;

const FooterText = styled.p`
  font-size: 0.85rem;
  color: ${p => p.$isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)'};
`;
