import React, { useState } from 'react';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FindUsPage from './pages/FindUsPage';
import Admin from './pages/Admin';
import Footer from './components/Footer';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  if (showAdmin) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#fff', padding: '24px', fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
        <button 
          onClick={() => setShowAdmin(false)} 
          style={{ backgroundColor: '#ef4444', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600', marginBottom: '24px' }}
        >
          ← Back to Website (Logout)
        </button>
        <Admin />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: '"Segoe UI", Roboto, sans-serif', color: '#fff', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      
      {/* 1. NAVBAR SECTION */}
      <nav style={{ backgroundColor: '#0b1329', padding: '1.2rem 1.5rem', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '0.5px', color: '#fff' }}>
            Digi<span style={{ color: '#0ea5e9' }}>Grow</span>
          </div>

          <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <a href="#about" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500' }}>About</a>
            <a href="#services" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500' }}>Services</a>
            <a href="#find-us" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500' }}>Find Us</a>
            <button onClick={() => setShowAdmin(true)} style={{ backgroundColor: '#0ea5e9', color: '#fff', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
              Login
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="mobile-burger-btn" style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '1.6rem', cursor: 'pointer', display: 'none', padding: '4px' }}>
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {isOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', backgroundColor: '#0b1329', padding: '2rem 1.5rem', position: 'absolute', top: '100%', left: 0, right: 0, borderBottom: '2px solid #0ea5e9', zIndex: 101 }}>
            <a href="#about" onClick={() => setIsOpen(false)} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500' }}>About</a>
            <a href="#services" onClick={() => setIsOpen(false)} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500' }}>Services</a>
            <a href="#find-us" onClick={() => setIsOpen(false)} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500' }}>Find Us</a>
            <button onClick={() => { setIsOpen(false); setShowAdmin(true); }} style={{ backgroundColor: '#0ea5e9', color: '#fff', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '1.1rem' }}>
              Login
            </button>
          </div>
        )}
      </nav>

      {/* 2. MAIN CONTAINER WITH PERFECT SIDE GAP (Yahan se side corners control honge) */}
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
        
        {/* HERO / FRONT PAGE SECTION */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '80px 0 60px 0', background: 'radial-gradient(circle at top, rgba(14, 165, 233, 0.1) 0%, transparent 70%)' }}>
          <h1 className="hero-title" style={{ fontSize: '42px', fontWeight: '800', marginBottom: '16px', letterSpacing: '-1px', lineHeight: '1.2', background: 'linear-gradient(to bottom right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Welcome to <br />
            <span style={{ background: 'linear-gradient(to right, #38bdf8, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DigiGrow</span>
          </h1>
          <p className="hero-desc" style={{ fontSize: '16px', color: '#94a3b8', maxWidth: '540px', lineHeight: '1.6', margin: '0' }}>
            Expert Digital Marketing Solutions for Your Business. Scale your digital footprint and dominate your market niche with our expert strategies.
          </p>
        </div>

        {/* 3. BAKI KE SARE SECTIONS BHI IS CONTAINER KE ANDAR AA GAYE (Ab side se chipkenge nahi) */}
        <div id="about" style={{ marginBottom: '40px' }}>
          <AboutPage />
        </div>

        <div id="services" style={{ marginBottom: '40px' }}>
          <ServicesPage />
        </div>

        <div id="find-us" style={{ marginBottom: '40px' }}>
          <FindUsPage />
        </div>

      </div>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-burger-btn {
            display: block !important;
          }
          .hero-title {
            font-size: 34px !important;
          }
          .hero-desc {
            font-size: 15px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;