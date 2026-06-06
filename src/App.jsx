import React, { useState } from 'react';
// Gayab hue saare pagon ko wapas laane ke liye yahan import kiya
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FindUsPage from './pages/FindUsPage';
import Footer from './components/Footer';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: '"Segoe UI", Roboto, sans-serif', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. NAVBAR SECTION (Rocket Removed, Login Button, Mobile Friendly) */}
      <nav style={{ backgroundColor: '#0b1329', padding: '1rem 1.5rem', position: 'relative', zIndex: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Logo */}
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
            Digi <span style={{ color: '#0ea5e9' }}>Grow</span>
          </div>

          {/* Desktop Links (Laptop ke liye) */}
          <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <a href="#about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About</a>
            <a href="#services" style={{ color: '#94a3b8', textDecoration: 'none' }}>Services</a>
            <a href="#find-us" style={{ color: '#94a3b8', textDecoration: 'none' }}>Find Us</a>
            <a href="/admin" style={{ backgroundColor: '#0ea5e9', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '0.375rem', textDecoration: 'none', fontWeight: '600' }}>Login</a>
          </div>

          {/* Mobile Menu Button (☰) */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="mobile-burger-btn"
            style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '1.75rem', cursor: 'pointer', display: 'none' }}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: '#111b35', padding: '1.5rem', position: 'absolute', top: '100%', left: 0, right: 0, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)', zIndex: 101 }}>
            <a href="#about" onClick={() => setIsOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem' }}>About</a>
            <a href="#services" onClick={() => setIsOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem' }}>Services</a>
            <a href="#find-us" onClick={() => setIsOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem' }}>Find Us</a>
            <a href="/admin" onClick={() => setIsOpen(false)} style={{ backgroundColor: '#0ea5e9', color: '#fff', padding: '0.6rem', borderRadius: '0.375rem', textDecoration: 'none', fontWeight: '600', textAlign: 'center' }}>Login</a>
          </div>
        )}
      </nav>

      {/* 2. HERO / FRONT PAGE SECTION */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '120px 24px 80px 24px' }}>
        <h1 style={{ fontSize: '56px', fontWeight: '800', marginBottom: '20px', letterSpacing: '-1px', background: 'linear-gradient(to right, #fff, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Welcome to DigiGrow
        </h1>
        <p style={{ fontSize: '20px', color: '#94a3b8', maxWidth: '600px', lineHeight: '1.6' }}>
          Expert Digital Marketing Solutions for Your Business. Scale your digital footprint and dominate your market niche with our expert strategies.
        </p>
      </div>

      {/* 3. BAKI KE SARE SECTIONS WAPAS AA GAYE */}
      <div id="about">
        <AboutPage />
      </div>

      <div id="services">
        <ServicesPage />
      </div>

      <div id="find-us">
        <FindUsPage />
      </div>

      {/* Footer agar tumhare paas tha toh */}
      <Footer />

      {/* Responsive CSS Style */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-burger-btn {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;