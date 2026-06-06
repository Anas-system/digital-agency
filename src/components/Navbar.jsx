import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      background: '#0f172a', // Dark modern blue/slate background
      padding: '15px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      {/* Agency Logo */}
      <Link to="/" style={{ color: '#fff', fontWeight: 'bold', fontSize: '22px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>🚀</span> DigiGrow
      </Link>

      {/* Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <a href="#about" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '5px', transition: '0.3s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>About</a>
        <a href="#services" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '5px', transition: '0.3s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>Services</a>
        <a href="#contact" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '5px', transition: '0.3s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>Find Us</a>
        
        {/* Admin Panel Button */}
        <Link to="/admin" style={{ 
          color: '#fff', 
          textDecoration: 'none', 
          background: '#2563eb', // Royal Blue Button
          padding: '8px 16px', 
          borderRadius: '6px',
          fontWeight: 'bold',
          transition: '0.3s'
        }}
        onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
        onMouseOut={(e) => e.target.style.background = '#2563eb'}
        >
          Admin Panel ⚙️
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;