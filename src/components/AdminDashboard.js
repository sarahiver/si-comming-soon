// Admin Dashboard für Waitlist Management
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { getWaitlist, updateWaitlistEntry, deleteWaitlistEntry, supabase } from '../config/supabase';

// Admin Credentials (in Production besser als Environment Variables)
const ADMIN_EMAIL = 'wedding@sarahiv.de';
const ADMIN_PASSWORD = 'LkwWalter#1985!';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, contacted: 0, today: 0, open: 0 });
  const [activeFilter, setActiveFilter] = useState('total'); // 'total', 'today', 'contacted', 'open'

  // Check if already logged in
  useEffect(() => {
    const auth = sessionStorage.getItem('si_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load waitlist when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadWaitlist();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('si_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Ungültige Anmeldedaten');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('si_admin_auth');
  };

  const loadWaitlist = async () => {
    setLoading(true);
    const result = await getWaitlist();
    if (result.success) {
      setWaitlist(result.data);
      
      // Calculate stats
      const today = new Date().toDateString();
      const todayCount = result.data.filter(
        entry => new Date(entry.created_at).toDateString() === today
      ).length;
      const contactedCount = result.data.filter(entry => entry.contacted).length;
      
      setStats({
        total: result.data.length,
        contacted: contactedCount,
        today: todayCount,
        open: result.data.length - contactedCount,
      });
    }
    setLoading(false);
  };

  // Filter die Waitlist basierend auf aktivem Filter
  const getFilteredWaitlist = () => {
    const today = new Date().toDateString();
    
    switch (activeFilter) {
      case 'today':
        return waitlist.filter(entry => 
          new Date(entry.created_at).toDateString() === today
        );
      case 'contacted':
        return waitlist.filter(entry => entry.contacted);
      case 'open':
        return waitlist.filter(entry => !entry.contacted);
      default:
        return waitlist;
    }
  };

  const filteredWaitlist = getFilteredWaitlist();

  const toggleContacted = async (id, currentStatus) => {
    const result = await updateWaitlistEntry(id, { contacted: !currentStatus });
    if (result.success) {
      loadWaitlist();
    }
  };

  const handleDelete = async (id, emailAddr) => {
    if (window.confirm(`Wirklich "${emailAddr}" von der Liste entfernen?`)) {
      const result = await deleteWaitlistEntry(id);
      if (result.success) {
        loadWaitlist();
      }
    }
  };

  const exportCSV = () => {
    const headers = ['Email', 'Theme', 'Quelle', 'Datum', 'Kontaktiert'];
    const rows = waitlist.map(entry => [
      entry.email,
      entry.theme_preference,
      entry.source,
      new Date(entry.created_at).toLocaleDateString('de-DE'),
      entry.contacted ? 'Ja' : 'Nein'
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `si-wedding-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <LoginContainer>
        <LoginBox>
          <Logo>S&I.</Logo>
          <LoginTitle>Admin Dashboard</LoginTitle>
          
          <LoginForm onSubmit={handleLogin}>
            <InputGroup>
              <Label>E-Mail</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.de"
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Passwort</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </InputGroup>
            
            {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
            
            <LoginButton type="submit">Anmelden</LoginButton>
          </LoginForm>
          
          <BackLink href="/">← Zurück zur Startseite</BackLink>
        </LoginBox>
      </LoginContainer>
    );
  }

  // Dashboard
  return (
    <DashboardContainer>
      <Header>
        <HeaderLeft>
          <Logo>S&I.</Logo>
          <HeaderTitle>Waitlist Dashboard</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <RefreshButton onClick={loadWaitlist} disabled={loading}>
            {loading ? '...' : '↻'} Aktualisieren
          </RefreshButton>
          <LogoutButton onClick={handleLogout}>Abmelden</LogoutButton>
        </HeaderRight>
      </Header>

      <StatsGrid>
        <StatCard 
          $active={activeFilter === 'total'}
          $color="default"
          onClick={() => setActiveFilter('total')}
        >
          <StatNumber>{stats.total}</StatNumber>
          <StatLabel>Gesamt</StatLabel>
          {activeFilter === 'total' && <ActiveIndicator />}
        </StatCard>
        <StatCard 
          $active={activeFilter === 'today'}
          $color="today"
          onClick={() => setActiveFilter('today')}
        >
          <StatNumber>{stats.today}</StatNumber>
          <StatLabel>Heute</StatLabel>
          {activeFilter === 'today' && <ActiveIndicator $color="#4ECDC4" />}
        </StatCard>
        <StatCard 
          $active={activeFilter === 'contacted'}
          $color="contacted"
          onClick={() => setActiveFilter('contacted')}
        >
          <StatNumber>{stats.contacted}</StatNumber>
          <StatLabel>Kontaktiert</StatLabel>
          {activeFilter === 'contacted' && <ActiveIndicator $color="#2E7D32" />}
        </StatCard>
        <StatCard 
          $active={activeFilter === 'open'}
          $color="open"
          onClick={() => setActiveFilter('open')}
        >
          <StatNumber>{stats.open}</StatNumber>
          <StatLabel>Offen</StatLabel>
          {activeFilter === 'open' && <ActiveIndicator $color="#F57C00" />}
        </StatCard>
      </StatsGrid>

      <TableSection>
        <TableHeader>
          <TableTitle>
            {activeFilter === 'total' && `Alle Anmeldungen (${filteredWaitlist.length})`}
            {activeFilter === 'today' && `Heute (${filteredWaitlist.length})`}
            {activeFilter === 'contacted' && `Kontaktiert (${filteredWaitlist.length})`}
            {activeFilter === 'open' && `Offen (${filteredWaitlist.length})`}
          </TableTitle>
          <ExportButton onClick={exportCSV}>
            ↓ CSV Export
          </ExportButton>
        </TableHeader>

        {!supabase ? (
          <NoDataMessage>
            <span>⚠️</span>
            <p>Supabase nicht konfiguriert.</p>
            <small>Bitte .env Datei mit REACT_APP_SUPABASE_URL und REACT_APP_SUPABASE_ANON_KEY anlegen.</small>
          </NoDataMessage>
        ) : filteredWaitlist.length === 0 ? (
          <NoDataMessage>
            <span>📭</span>
            <p>Keine Einträge in dieser Kategorie</p>
          </NoDataMessage>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>E-Mail</Th>
                <Th>Theme</Th>
                <Th>Datum</Th>
                <Th>Status</Th>
                <Th>Aktionen</Th>
              </tr>
            </thead>
            <tbody>
              {filteredWaitlist.map((entry) => (
                <Tr key={entry.id} $contacted={entry.contacted}>
                  <Td>
                    <EmailLink href={`mailto:${entry.email}`}>{entry.email}</EmailLink>
                  </Td>
                  <Td>
                    <ThemeBadge $theme={entry.theme_preference}>
                      {entry.theme_preference}
                    </ThemeBadge>
                  </Td>
                  <Td>
                    {new Date(entry.created_at).toLocaleDateString('de-DE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Td>
                  <Td>
                    <StatusBadge 
                      $contacted={entry.contacted}
                      onClick={() => toggleContacted(entry.id, entry.contacted)}
                    >
                      {entry.contacted ? '✓ Kontaktiert' : '○ Offen'}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <ActionButton 
                      onClick={() => handleDelete(entry.id, entry.email)}
                      title="Löschen"
                    >
                      🗑
                    </ActionButton>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableSection>

      <Footer>
        <FooterText>S&I. wedding Admin Dashboard</FooterText>
      </Footer>
    </DashboardContainer>
  );
};

export default AdminDashboard;

// Styles
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0D0D0D;
  padding: 20px;
`;

const LoginBox = styled.div`
  background: #FFFFFF;
  padding: 50px 40px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  animation: ${fadeIn} 0.5s ease;
`;

const Logo = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.06em;
  background: #000000;
  color: #FFFFFF;
  padding: 8px 16px;
  display: inline-block;
  margin-bottom: 30px;
`;

const LoginTitle = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 30px;
`;

const LoginForm = styled.form`
  text-align: left;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #666;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  border: 2px solid #E5E5E5;
  background: #FAFAFA;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #0D0D0D;
    background: #FFFFFF;
  }
`;

const ErrorMessage = styled.div`
  background: #FFE5E5;
  color: #D32F2F;
  padding: 12px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  margin-bottom: 20px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 16px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  background: #0D0D0D;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #333;
  }
`;

const BackLink = styled.a`
  display: block;
  margin-top: 30px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: #666;
  text-decoration: none;
  
  &:hover {
    color: #0D0D0D;
  }
`;

// Dashboard Styles
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #F5F5F5;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E5E5;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;
    padding: 15px 20px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const HeaderTitle = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #1A1A1A;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 10px;
`;

const RefreshButton = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  padding: 10px 20px;
  background: #F5F5F5;
  border: 1px solid #E5E5E5;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: #E5E5E5;
  }
  
  &:disabled {
    opacity: 0.5;
  }
`;

const LogoutButton = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  padding: 10px 20px;
  background: #0D0D0D;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #333;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 30px 40px;
  
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 500px) {
    padding: 20px;
    gap: 15px;
  }
`;

const StatCard = styled.div`
  position: relative;
  padding: 25px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${p => p.$active ? '#FFFFFF' : '#0D0D0D'};
  
  ${p => p.$color === 'default' && `
    background: ${p.$active ? '#0D0D0D' : '#FFFFFF'};
    border: 2px solid ${p.$active ? '#0D0D0D' : '#E5E5E5'};
    
    &:hover {
      border-color: #0D0D0D;
      background: ${p.$active ? '#0D0D0D' : '#F5F5F5'};
    }
  `}
  
  ${p => p.$color === 'today' && `
    background: ${p.$active ? '#4ECDC4' : '#FFFFFF'};
    border: 2px solid ${p.$active ? '#4ECDC4' : '#E5E5E5'};
    
    &:hover {
      border-color: #4ECDC4;
      background: ${p.$active ? '#4ECDC4' : '#E5FFFE'};
    }
  `}
  
  ${p => p.$color === 'contacted' && `
    background: ${p.$active ? '#2E7D32' : '#FFFFFF'};
    border: 2px solid ${p.$active ? '#2E7D32' : '#E5E5E5'};
    
    &:hover {
      border-color: #2E7D32;
      background: ${p.$active ? '#2E7D32' : '#E5FFE5'};
    }
  `}
  
  ${p => p.$color === 'open' && `
    background: ${p.$active ? '#F57C00' : '#FFFFFF'};
    border: 2px solid ${p.$active ? '#F57C00' : '#E5E5E5'};
    
    &:hover {
      border-color: #F57C00;
      background: ${p.$active ? '#F57C00' : '#FFF5E5'};
    }
  `}
`;

const StatNumber = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 8px;
  color: inherit;
`;

const StatLabel = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: inherit;
  opacity: 0.7;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: ${p => p.$color || '#0D0D0D'};
`;

const TableSection = styled.div`
  margin: 0 40px 40px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  
  @media (max-width: 500px) {
    margin: 0 20px 20px;
  }
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid #E5E5E5;
`;

const TableTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #1A1A1A;
`;

const ExportButton = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  padding: 8px 16px;
  background: #4ECDC4;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #3DB9B0;
  }
`;

const NoDataMessage = styled.div`
  padding: 60px 20px;
  text-align: center;
  
  span {
    font-size: 3rem;
    display: block;
    margin-bottom: 15px;
  }
  
  p {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 10px;
  }
  
  small {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    color: #999;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #888;
  text-align: left;
  padding: 15px 20px;
  border-bottom: 1px solid #E5E5E5;
  background: #FAFAFA;
`;

const Tr = styled.tr`
  background: ${p => p.$contacted ? '#F8FFF8' : '#FFFFFF'};
  transition: background 0.2s ease;
  
  &:hover {
    background: #FAFAFA;
  }
`;

const Td = styled.td`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: #1A1A1A;
  padding: 15px 20px;
  border-bottom: 1px solid #F0F0F0;
`;

const EmailLink = styled.a`
  color: #0D0D0D;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ThemeBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 3px;
  text-transform: capitalize;
  
  ${p => p.$theme === 'contemporary' && `
    background: #FFE5E5;
    color: #FF6B6B;
  `}
  
  ${p => p.$theme === 'editorial' && `
    background: #E5E5E5;
    color: #1A1A1A;
  `}
  
  ${p => p.$theme === 'video' && `
    background: #FFF5E5;
    color: #C9A962;
  `}
  
  ${p => p.$theme === 'botanical' && `
    background: #E5F5E8;
    color: #4A7C59;
  `}
  
  ${p => p.$theme === 'luxe' && `
    background: #FFF8E5;
    color: #B8960B;
  `}
`;

const StatusBadge = styled.button`
  display: inline-block;
  padding: 6px 12px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${p => p.$contacted ? `
    background: #E5FFE5;
    color: #2E7D32;
  ` : `
    background: #FFF5E5;
    color: #F57C00;
  `}
  
  &:hover {
    opacity: 0.8;
  }
`;

const ActionButton = styled.button`
  padding: 6px 10px;
  font-size: 1rem;
  background: none;
  border: 1px solid #E5E5E5;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #FFE5E5;
    border-color: #FF6B6B;
  }
`;

const Footer = styled.footer`
  padding: 30px 40px;
  text-align: center;
`;

const FooterText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: #888;
`;
