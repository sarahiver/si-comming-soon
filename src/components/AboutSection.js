import React from 'react';
import styled, { keyframes } from 'styled-components';

const AboutSection = () => {
  return (
    <Container>
      <Header>
        <Eyebrow>Die Menschen hinter S&I.</Eyebrow>
        <Title>Lernt uns kennen</Title>
      </Header>
      
      <Content>
        <PersonCard $delay={0.1}>
          <Avatar>👩‍💼</Avatar>
          <PersonName>Sarah</PersonName>
          <Role>Kreative Leitung</Role>
          <Bio>
            Mit einem Auge fürs Detail und einer Leidenschaft für ästhetische Perfektion 
            bringt Sarah eure Vision zum Leben. Jedes Design erzählt eure Geschichte.
          </Bio>
        </PersonCard>
        
        <PersonCard $delay={0.2}>
          <Avatar>👨‍💻</Avatar>
          <PersonName>Iver</PersonName>
          <Role>Technische Magie</Role>
          <Bio>
            Als Tech-Enthusiast sorgt Iver dafür, dass eure Website nicht nur 
            wunderschön aussieht, sondern auch technisch brillant funktioniert.
          </Bio>
        </PersonCard>
      </Content>
      
      <StorySection>
        <StoryTitle>Unsere Geschichte</StoryTitle>
        <StoryText>
          Wir haben selbst erlebt, wie schwer es ist, eine Hochzeitswebsite zu finden, 
          die wirklich zu einem passt. Die Standardlösungen? Austauschbar. Die Agenturen? 
          Unpersönlich und teuer. Also haben wir <strong>S&I.</strong> gegründet – 
          um Paaren das zu geben, was wir uns selbst gewünscht hätten: 
          Handgefertigte, liebevoll gestaltete Websites, die so einzigartig sind wie die Liebe selbst. 
          Mit persönlicher Betreuung von Anfang bis Ende.
        </StoryText>
        <Values>
          <Value>💕 Mit Liebe gemacht</Value>
          <Value>🎨 Einzigartig</Value>
          <Value>🤝 Persönlich</Value>
        </Values>
      </StorySection>
    </Container>
  );
};

export default AboutSection;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styles
const Container = styled.section`
  padding: 6rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeIn} 0.6s ease-out;
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
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
`;

const PersonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${props => props.$delay}s;
  opacity: 0;
`;

const Avatar = styled.div`
  width: 140px;
  height: 140px;
  border-radius: ${props => props.theme.style === 'modern' ? '24px' : '50%'};
  background: ${props => props.theme.colors.primary}20;
  border: 3px solid ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${props => props.theme.colors.glow !== 'none' ? props.theme.colors.glow : '0 8px 30px rgba(0,0,0,0.15)'};
  }
`;

const PersonName = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const Role = styled.span`
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  display: block;
`;

const Bio = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.7;
  max-width: 350px;
`;

const StorySection = styled.div`
  margin-top: 4rem;
  padding: 3rem 2rem;
  background: ${props => props.theme.colors.cardBg};
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid ${props => props.theme.colors.primary}15;
  animation: ${fadeIn} 0.6s ease-out;
`;

const StoryTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const StoryText = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.05rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.8;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  
  strong {
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
  }
`;

const Values = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const Value = styled.span`
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textMuted};
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.primary}30;
  border-radius: ${props => props.theme.style === 'modern' ? '100px' : props.theme.borderRadius};
`;
