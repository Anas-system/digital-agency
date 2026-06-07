function Navbar() {
  return (
    <nav style={{ 
      position: 'fixed', top: 0, width: '100%', zIndex: 100,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
      padding: '10px 5%', backgroundColor: '#09111e', borderBottom: '1px solid #1e2d4a',
      boxSizing: 'border-box', flexWrap: 'wrap', gap: '10px' // ✅ Flex-wrap aur gap add kiya
    }}>
      <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>DigiGrow</div>
      
      {/* Links aur Login ka wrapper */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
        <a href="#home" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Home</a>
        <a href="#about" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>About</a>
        <a href="#services" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Services</a>
        <a href="#findus" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Find Us</a>
        
        {/* Login Button yahan wapas aa jayega */}
        <a href="/admin" style={{ 
          backgroundColor: '#00a2ff', color: '#fff', padding: '5px 15px', 
          borderRadius: '5px', textDecoration: 'none', fontSize: '13px' 
        }}>Login</a>
      </div>
    </nav>
  );
}