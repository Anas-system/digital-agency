function Navbar() {
  return (
    <nav className="navbar-container" style={{ 
      position: 'fixed', top: 0, width: '100%', zIndex: 100,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
      padding: '10px 5%', backgroundColor: '#09111e', borderBottom: '1px solid #1e2d4a',
      boxSizing: 'border-box', flexWrap: 'wrap' // ✅ Wrap enable kiya
    }}>
      <style>{`
        @media (max-width: 600px) {
          .navbar-container { flex-direction: column; padding-bottom: 15px; }
          .nav-links { margin-top: 10px; width: 100%; justify-content: center; }
          .login-btn { margin-top: 10px; width: 100%; text-align: center; order: 3; }
        }
      `}</style>

      <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>DigiGrow</div>
      
      <div className="nav-links" style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
        <a href="#home" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Home</a>
        <a href="#about" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>About</a>
        <a href="#services" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Services</a>
        <a href="#findus" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Find Us</a>
        
        {/* Login Button */}
        <a href="/admin" className="login-btn" style={{ 
          backgroundColor: '#00a2ff', color: '#fff', padding: '5px 15px', 
          borderRadius: '5px', textDecoration: 'none', fontSize: '13px' 
        }}>Login</a>
      </div>
    </nav>
  );
}