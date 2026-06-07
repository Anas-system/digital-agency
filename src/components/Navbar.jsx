import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '0 5%', 
      height: '75px', 
      backgroundColor: '#090f1c', 
      borderBottom: '1px solid rgba(28, 39, 66, 0.6)', 
      color: '#fff',
      boxSizing: 'border-box'
    }}>
      {/* 🚀 FIXED LOGO: Dot completely removed */}
      <Link to="/" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        textDecoration: 'none',
        fontFamily: "'Inter', system-ui, sans-serif"
      }}>
        <span style={{ 
          fontSize: '24px', 
          fontWeight: '800', 
          color: '#ffffff', 
          letterSpacing: '-0.8px' 
        }}>
          Digi<span style={{ 
            background: 'linear-gradient(135deg, #00a2ff 0%, #00ffcc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '900'
          }}>Grow</span>
        </span>
      </Link>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        {[
          { path: '/about', label: 'About' },
          { path: '/services', label: 'Services' },
          { path: '/find-us', label: 'Find Us' }
        ].map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link 
              key={link.path} 
              to={link.path} 
              style={{ 
                color: isActive ? '#00a2ff' : '#94a3b8', 
                textDecoration: 'none', 
                fontSize: '15px',
                fontWeight: isActive ? '600' : '500',
                transition: 'color 0.2s ease'
              }}
            >
              {link.label}
            </Link>
          );
        })}
        <Link to="/admin" style={{ 
          backgroundColor: '#00a2ff', 
          padding: '9px 20px', 
          borderRadius: '10px', 
          color: '#fff', 
          textDecoration: 'none', 
          fontSize: '14px', 
          fontWeight: '600',
          boxShadow: '0 4px 15px rgba(0,162,255,0.25)'
        }}>
          Admin
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;