import React, { useState } from 'react';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle ke liye

  const SECRET_PASSWORD = "bhai123"; 

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      setIsLoggedIn(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
    setMenuOpen(false);
  };

  // 1. LOCK SCREEN (Mobile Responsive)
  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0d1527', padding: '15px' }}>
        <div style={{ background: '#111c32', border: '1px solid #1e293b', padding: '30px 20px', borderRadius: '12px', width: '100%', maxWidth: '380px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#ffffff', letterSpacing: '0.5px' }}>Digi Grow</h2>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '25px' }}>Admin Security Lock</p>
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '11px', color: '#38bdf8', marginBottom: '8px', fontWeight: '600', letterSpacing: '0.5px' }}>ENTER SECRET PASSWORD</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', background: '#0d1527', border: '1px solid #334155', borderRadius: '6px', color: 'white', fontSize: '15px', outline: 'none' }}
              />
            </div>
            
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#0284c7', color: 'white', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: '0.2s' }}>Unlock Panel</button>
          </form>
          
          {error && <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '15px', fontWeight: '500' }}>Galat Password Hai Bhai! ❌</div>}
        </div>
      </div>
    );
  }

  // 2. PROFESSIONAL ADMIN PANEL (Mobile + Desktop Friendly)
  return (
    <div style={{ backgroundColor: '#0d1527', minHeight: '100vh', color: '#ffffff', position: 'relative' }}>
      
      {/* Responsive Navbar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 5%', borderBottom: '1px solid #1e293b', backgroundColor: '#0d1527', position: 'relative', zIndex: 10 }}>
        <div style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff' }}>🚀 Digi<span style={{ color: '#38bdf8' }}>Grow</span></div>
        
        {/* Desktop Links (Badi screen par dikhenge, mobile par media query ya inline condition se handle) */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="nav-desktop">
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>About</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Services</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Find Us</a>
          <button onClick={handleLogout} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '13px' }}>Lock Panel</button>
        </nav>

        {/* Mobile Hamburger Button (Three Lines) */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', display: 'none' }}
          className="hamburger-btn"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Mobile Drawer Menu (Jab menuOpen true hoga tabhi slide down hoga) */}
      <div style={{
        display: menuOpen ? 'flex' : 'none',
        flexDirection: 'column',
        background: '#111c32',
        borderBottom: '1px solid #1e293b',
        padding: '20px',
        position: 'absolute',
        top: '60px',
        left: 0,
        width: '100%',
        zIndex: 9,
        gap: '15px'
      }}>
        <a href="#" onClick={() => setMenuOpen(false)} style={{ color: '#ffffff', textDecoration: 'none', fontSize: '16px', padding: '5px 0' }}>About</a>
        <a href="#" onClick={() => setMenuOpen(false)} style={{ color: '#ffffff', textDecoration: 'none', fontSize: '16px', padding: '5px 0' }}>Services</a>
        <a href="#" onClick={() => setMenuOpen(false)} style={{ color: '#ffffff', textDecoration: 'none', fontSize: '16px', padding: '5px 0' }}>Find Us</a>
        <button onClick={handleLogout} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', width: '100%', marginTop: '10px' }}>Lock Panel</button>
      </div>

      {/* Main Dashboard Wrapper */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '30px 15px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'calc(20px + 1.2vw)', marginBottom: '8px', fontWeight: '700' }}>Digi Grow - Admin Panel</h1>
        <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '25px', padding: '0 10px' }}>Select a specific section to customize your website content.</p>

        {/* Navigation Tabs (Mobile scrolling friendly) */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', mdJustifyContent: 'center', gap: '10px', marginBottom: '25px', overflowX: 'auto', paddingBottom: '10px', WebkitOverflowScrolling: 'touch' }} className="tabs-scroll">
          <button style={{ background: '#0284c7', color: 'white', border: '1px solid #38bdf8', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap' }}>📝 About Section</button>
          <button style={{ background: '#111c32', color: '#94a3b8', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap' }}>💼 Services Card</button>
          <button style={{ background: '#111c32', color: '#94a3b8', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap' }}>📍 Contact Details</button>
        </div>

        {/* Content Card */}
        <div style={{ background: '#111c32', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px', textAlign: 'left', maxWidth: '700px', margin: '0 auto 25px auto' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '6px', fontWeight: '600' }}>1. Customize About Us</h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '15px' }}>Modify your main branding text and mission lines statement.</p>
          
          <label style={{ display: 'block', fontSize: '11px', color: '#38bdf8', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px', letterSpacing: '0.5px' }}>Main About Us Description</label>
          <textarea 
            defaultValue="Hum businesses ko online grow karne mein help karte hain through smart aur result-oriented digital marketing solutions.&#10;&#10;Hamara goal brands, startups aur local businesses ko strong online presence dena hai, taaki woh zyada customers tak pahunch sakein aur apne business ko faster grow kar sakein."
            style={{ width: '100%', height: '140px', background: '#0d1527', border: '1px solid #1e293b', borderRadius: '8px', color: '#e2e8f0', padding: '12px', fontSize: '13px', lineHeight: '1.5', resize: 'none', outline: 'none' }}
          />
        </div>

        {/* Save Button */}
        <button onClick={() => alert("Settings successfully save ho gayi hain bhai! 👍")} style={{ display: 'block', width: '100%', maxWidth: '300px', margin: '0 auto', background: '#0091ff', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 145, 255, 0.3)' }}>Save Configuration Permanent</button>
      </div>
    </div>
  );
};

export default Admin;