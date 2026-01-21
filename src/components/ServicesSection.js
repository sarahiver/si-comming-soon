import React from 'react';
import styled, { keyframes } from 'styled-components';

const features = [
  {
    icon: '✨',
    title: 'Maßgeschneidert',
    text: 'Keine Templates, keine Kompromisse. Jede Website wird individuell für euch gestaltet – wie eure Hochzeit selbst.'
  },
  {
    icon: '💎',
    title: 'Premium Design',
    text: 'Wir kreieren digitale Kunstwerke. Designs, die Gäste begeistern und perfekt zu eurem Stil passen.'
  },
  {
    icon: '📱',
    title: 'Perfekt auf allen Geräten',
    text: 'Eure Website sieht auf Smartphone, Tablet und Desktop gleichermaßen atemberaubend aus.'
  },
  {
    icon: '🎯',
    title: 'Volle Funktionalität',
    text: 'RSVP-Management, Gästebuch, Fotogalerie, Tischplan – alles was ihr braucht, elegant integriert.'
  },
  {
    icon: '🔒',
    title: 'DSGVO-Konform',
    text: 'Eure Daten und die eurer Gäste sind bei uns sicher. Hosting in Deutschland, volle Datenschutz-Compliance.'
  },
  {
    icon: '💝',
    title: 'Persönlicher Service',
    text: 'Von der ersten Idee bis zum letzten Klick – wir begleiten euch persönlich durch den gesamten Prozess.'
  }
];

const ServicesSection = () => {
  return (
    <Container>
      <Header>
        <Eyebrow>Was wir bieten</Eyebrow>
        <Title>
          Digital. Persönlich. <Highlight>Unvergesslich.</Highlight>
        </Title>
        <Subtitle>
          Wir verbinden handwerkliche Design-Qualität mit modernster Technologie, 
          um Hochzeitswebsites zu schaffen, die wirklich begeistern.
        </Subtitle>
      </Header>
      
      <Grid>
        {features.map((feature, index) => (
          <Card key={index} $delay={index * 0.1}>
            <CardIcon>{feature.icon}</CardIcon>
            <CardTitle>{feature.title}</CardTitle>
            <CardText>{feature.text}</CardText>
          </Card>
        ))}
      </Grid>
      
      <HighlightBox>
        <HighlightTitle>
          Warum <Highlight>S&I.</Highlight>?
        </HighlightTitle>
        <HighlightText>
          Während andere Anbieter euch in Templates zwängen, erschaffen wir digitale Erlebnisse. 
          Jede Hochzeit ist einzigartig – eure Website sollte es auch sein. 
          Mit <strong>S&I.</strong> bekommt ihr keine Massenware, 
          sondern ein handgefertigtes Meisterwerk.
        </HighlightText>
      </HighlightBox>
    </Container>
  );
};

export default ServicesSection;

// Animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styles
const Container = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const Eyebrow = styled.span`
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: ${props => props.theme.colors.primary};
  display: block;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: ${props => ['luxury', 'magazine', 'opulent'].includes(props.theme.style) ? '400' : '600'};
  font-style: ${props => ['luxury', 'magazine'].includes(props.theme.style) ? 'italic' : 'normal'};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const Highlight = styled.span`
  font-weight: 700;
  font-style: normal;
  color: ${props => props.theme.colors.primary};
`;

const Subtitle = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: clamp(1rem, 2vw, 1.15rem);
  color: ${props => props.theme.colors.textMuted};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  padding: 2rem;
  background: ${props => props.theme.colors.cardBg};
  border: 1px solid ${props => props.theme.colors.primary}20;
  border-radius: ${props => props.theme.borderRadius};
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: ${props => props.$delay}s;
  opacity: 0;
  
  &:hover {
    transform: translateY(-4px);
    border-color: ${props => props.theme.colors.primary}60;
    box-shadow: ${props => props.theme.colors.glow !== 'none' ? props.theme.colors.glow : '0 8px 30px rgba(0,0,0,0.08)'};
  }
`;

const CardIcon = styled.span`
  display: block;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.75rem;
`;

const CardText = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.95rem;
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.6;
`;

const HighlightBox = styled.div`
  margin-top: 4rem;
  padding: 3rem 2rem;
  background: ${props => props.theme.colors.primary}10;
  border-radius: ${props => props.theme.borderRadius};
  text-align: center;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const HighlightTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const HighlightText = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: clamp(1rem, 2vw, 1.1rem);
  color: ${props => props.theme.colors.text};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
  
  strong {
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
  }
`;
