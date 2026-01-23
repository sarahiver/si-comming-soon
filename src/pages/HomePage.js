// src/pages/HomePage.js
import React from 'react';
import styled from 'styled-components';
import MarketingNav from '../components/marketing/MarketingNav';
import MarketingHero from '../components/marketing/MarketingHero';
import ComponentsShowcase from '../components/marketing/ComponentsShowcase';
import HowItWorks from '../components/marketing/HowItWorks';
import DesignShowcase from '../components/marketing/DesignShowcase';
import USPSection from '../components/marketing/USPSection';
import PricingSection from '../components/marketing/PricingSection';
import SaveTheDateSection from '../components/marketing/SaveTheDateSection';
import ContactSection from '../components/marketing/ContactSection';
import AboutSection from '../components/marketing/AboutSection';
import MarketingFooter from '../components/marketing/MarketingFooter';

const Page = styled.div`min-height: 100vh;`;

function HomePage() {
  return (
    <Page>
      <MarketingNav />
      <MarketingHero />
      <ComponentsShowcase />
      <HowItWorks />
      <DesignShowcase />
      <USPSection />
      <PricingSection />
      <SaveTheDateSection />
      <AboutSection />
      <ContactSection />
      <MarketingFooter />
    </Page>
  );
}

export default HomePage;
