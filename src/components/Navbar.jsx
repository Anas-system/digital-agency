import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{ backgroundColor: '#0b1329', padding: '1rem 1.5rem', position: 'relative', zIndex: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Logo (Rocket Completely Removed) */}
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
          Digi <span style={{ color: '#0ea5e9' }}>Grow</span>
        </div>

        {/* Laptop/Desktop Menu */}
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

      {/* Mobile Dropdown */}
      {isOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: '#111b35', padding: '1.5rem', position: 'absolute', top: '100%', left: 0, right: 0, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)', zIndex: 101 }}>
          <a href="#about" onClick={() => setIsOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem' }}>About</a>
          <a href="#services" onClick={() => setIsOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem' }}>Services</a>
          <a href="#find-us" onClick={() => setIsOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem' }}>Find Us</a>
          <a href="/admin" onClick={() => setIsOpen(false)} style={{ backgroundColor: '#0ea5e9', color: '#fff', padding: '0.6rem', borderRadius: '0.375rem', textDecoration: 'none', fontWeight: '600', textAlign: 'center' }}>Login</a>
        </div>
      )}

      {/* Strict CSS for Responsive Mobile View */}
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
    </nav>
  );
};

export default Navbar;