import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '20px 5%', 
      backgroundColor: '#0d1117', 
      flexWrap: 'wrap', 
      gap: '15px' 
    }}>
      <div style={{ color: 'white', fontWeight: '800', fontSize: '20px' }}>DigiGrow</div>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
        <Link to="/services" style={{ color: 'white', textDecoration: 'none' }}>Services</Link>
        <Link to="/find-us" style={{ color: 'white', textDecoration: 'none' }}>Find Us</Link>
        <Link to="/admin" style={{ backgroundColor: '#00a2ff', padding: '6px 16px', borderRadius: '6px', color: '#fff', textDecoration: 'none' }}>Login</Link>
      </div>
    </nav>
  );
};
export default Navbar;