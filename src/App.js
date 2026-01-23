// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import GlobalStyles from './styles/GlobalStyles';
import HomePage from './pages/HomePage';
import DemoPage from './pages/DemoPage';
import AdminPage from './pages/admin/AdminPage';
import CustomerFormPage from './pages/form/CustomerFormPage';

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* Marketing */}
          <Route path="/" element={<HomePage />} />
          <Route path="/demo" element={<DemoPage />} />
          
          {/* Admin */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          
          {/* Customer Form */}
          <Route path="/form/:projectId" element={<CustomerFormPage />} />
          
          {/* Legal */}
          <Route path="/impressum" element={<div style={{padding: '120px 20px', maxWidth: '800px', margin: '0 auto'}}><h1>Impressum</h1><p>S&I Wedding</p><p>Sarah & Iver Johnsen</p><p>Hamburg, Deutschland</p></div>} />
          <Route path="/datenschutz" element={<div style={{padding: '120px 20px', maxWidth: '800px', margin: '0 auto'}}><h1>Datenschutz</h1><p>Informationen zum Datenschutz folgen...</p></div>} />
          <Route path="/agb" element={<div style={{padding: '120px 20px', maxWidth: '800px', margin: '0 auto'}}><h1>AGB</h1><p>Allgemeine Geschäftsbedingungen folgen...</p></div>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
