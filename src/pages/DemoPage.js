// src/pages/DemoPage.js
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const THEMES = {
  editorial: {
    name: 'Editorial',
    url: 'https://editorial-example.vercel.app/',
    vibe: 'Zeitlose Magazin-Ästhetik',
    color: '#1a1a1a'
  },
  contemporary: {
    name: 'Contemporary',
    url: 'https://contemporary-example.vercel.app/',
    vibe: 'Modern & minimalistisch',
    color: '#2d3436'
  },
  botanical: {
    name: 'Botanical',
    url: 'https://botanical-example.vercel.app/',
    vibe: 'Organisch & natürlich',
    color: '#4a5c4e'
  },
  neon: {
    name: 'Neon',
    url: 'https://neon-example.vercel.app/',
    vibe: 'Bold & leuchtend',
    color: '#0a0a0f'
  },
  luxe: {
    name: 'Luxe',
    url: 'https://si-luxe.vercel.app/',
    vibe: 'Opulent & glamourös',
    color: '#1a1a2e'
  },
  video: {
    name: 'Video',
    url: 'https://video-example-one.vercel.app/',
    vibe: 'Cineastisch & dramatisch',
    color: '#0d0d0d'
  }
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: #000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.a`
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: -0.02em;
  color: #fff;
  text-decoration: none;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ThemeNav = styled.nav`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    
    &::-webkit-scrollbar {
      height: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.2);
    }
  }
`;

const ThemeButton = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.6rem 1rem;
  border: 1px solid ${props => props.$active ? '#fff' : 'rgba(255,255,255,0.2)'};
  background: ${props => props.$active ? '#fff' : 'transparent'};
  color: ${props => props.$active ? '#000' : 'rgba(255,255,255,0.7)'};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;

  &:hover {
    border-color: #fff;
    color: ${props => props.$active ? '#000' : '#fff'};
  }
`;

const BackButton = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #fff;
  }
`;

const IframeWrapper = styled.div`
  flex: 1;
  position: relative;
  background: ${props => props.$bgColor || '#1a1a1a'};
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
`;

const ThemeInfo = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 1rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
  
  @media (max-width: 768px) {
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
  }
`;

const ThemeName = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  margin: 0 0 0.25rem 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ThemeVibe = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
`;

const NoThemeWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const NoThemeTitle = styled.h1`
  font-family: 'Instrument Serif', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 400;
  color: #fff;
  margin: 0 0 1rem 0;
  
  span {
    font-style: italic;
  }
`;

const NoThemeText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 500px;
  line-height: 1.6;
  margin: 0 0 3rem 0;
`;

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 900px;
  width: 100%;
`;

const ThemeCard = styled.button`
  background: ${props => props.$color};
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-4px);
  }
`;

const CardName = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  margin: 0 0 0.5rem 0;
`;

const CardVibe = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
`;

function DemoPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const themeParam = searchParams.get('theme')?.toLowerCase();
  const currentTheme = THEMES[themeParam];

  const handleThemeChange = (themeKey) => {
    navigate(`/demo?theme=${themeKey}`);
  };

  return (
    <PageWrapper>
      <Header>
        <Logo href="/">S&I</Logo>
        
        <ThemeNav>
          {Object.entries(THEMES).map(([key, theme]) => (
            <ThemeButton
              key={key}
              $active={themeParam === key}
              onClick={() => handleThemeChange(key)}
            >
              {theme.name}
            </ThemeButton>
          ))}
        </ThemeNav>
        
        <BackButton href="/">
          ← Zurück
        </BackButton>
      </Header>

      {currentTheme ? (
        <IframeWrapper $bgColor={currentTheme.color}>
          <StyledIframe 
            src={currentTheme.url} 
            title={`${currentTheme.name} Demo`}
            loading="lazy"
          />
          <ThemeInfo>
            <ThemeName>
              {currentTheme.name}
            </ThemeName>
            <ThemeVibe>{currentTheme.vibe}</ThemeVibe>
          </ThemeInfo>
        </IframeWrapper>
      ) : (
        <NoThemeWrapper>
          <NoThemeTitle>
            Unsere <span>Design-Welten</span>
          </NoThemeTitle>
          <NoThemeText>
            Entdeckt unsere 6 einzigartigen Hochzeits-Themes. 
            Jedes Design ist eine komplett eigenständige Welt 
            mit eigener Ästhetik, Typografie und Atmosphäre.
          </NoThemeText>
          <ThemeGrid>
            {Object.entries(THEMES).map(([key, theme]) => (
              <ThemeCard
                key={key}
                $color={theme.color}
                onClick={() => handleThemeChange(key)}
              >
                <CardName>{theme.name}</CardName>
                <CardVibe>{theme.vibe}</CardVibe>
              </ThemeCard>
            ))}
          </ThemeGrid>
        </NoThemeWrapper>
      )}
    </PageWrapper>
  );
}

export default DemoPage;
