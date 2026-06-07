import React from 'react';

// 1. NAVBAR (Fixed top)
function Navbar() {
  return (
    <nav style={{ 
      position: 'fixed', top: 0, width: '100%', zIndex: 100,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
      padding: '15px 5%', backgroundColor: '#09111e', borderBottom: '1px solid #1e2d4a',
      boxSizing: 'border-box'
    }}>
      <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff', fontFamily: "'serif', Georgia, Times" }}>DigiGrow</div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <a href="#home" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Home</a>
        <a href="#about" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>About</a>
        <a href="#services" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Services</a>
        <a href="#findus" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Find Us</a>
      </div>
    </nav>
  );
}

// 2. PAGES (Section components)
function Home() { return <div id="home" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', scrollSnapAlign: 'start', paddingTop: '60px' }}><h1>Home Section</h1></div>; }
function AboutPage() { return <div id="about" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', scrollSnapAlign: 'start', paddingTop: '60px' }}><h1>About Section</h1></div>; }
function ServicesPage() { return <div id="services" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', scrollSnapAlign: 'start', paddingTop: '60px' }}><h1>Services Section</h1></div>; }
function FindUsPage() { return <div id="findus" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', scrollSnapAlign: 'start', paddingTop: '60px' }}><h1>Find Us Section</h1></div>; }

// 3. MAIN APP (Scroll Container)
function App() {
  return (
    <div style={{ 
      backgroundColor: '#09111e', 
      height: '100vh', 
      overflowY: 'scroll', 
      scrollSnapType: 'y mandatory',
      scrollBehavior: 'smooth' 
    }}>
      <Navbar />
      <Home />
      <AboutPage />
      <ServicesPage />
      <FindUsPage />
    </div>
  );
}

export default App;