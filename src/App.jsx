import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FindUsPage from './pages/FindUsPage';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: '"Segoe UI", Roboto, sans-serif', margin: 0, padding: 0 }}>
        {/* Professional Navigation Bar */}
        <nav style={{ backgroundColor: '#0f172a', color: '#f8fafc', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '24px', fontWeight: '8xl', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.5px' }}>
            🚀 <span style={{ color: '#ffffff', fontWeight: '700' }}>Digi</span><span style={{ color: '#38bdf8', fontWeight: '800' }}>Grow</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link to="/about" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '15px', fontWeight: '500', transition: '0.2s' }}>About</Link>
            <Link to="/services" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '15px', fontWeight: '500', transition: '0.2s' }}>Services</Link>
            <Link to="/find-us" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '15px', fontWeight: '500', transition: '0.2s' }}>Find Us</Link>
            <Link to="/admin" style={{ backgroundColor: '#2563eb', color: '#ffffff', textDecoration: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: '600', fontSize: '14px', boxShadow: '0 2px 4px rgba(37,99,235,0.2)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Admin Panel ⚙️
            </Link>
          </div>
        </nav>

        {/* Core Content View */}
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/find-us" element={<FindUsPage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;