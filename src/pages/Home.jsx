import React from 'react';
import ThreeBg from '../components/ThreeBg';

function Home() {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '90vh', backgroundColor: '#0d1527', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box' }}>
      
      {/* 🌌 DYNAMIC NEXUS BACKGROUND */}
      <ThreeBg />

      {/* 🚀 FOREGROUND CONTENT CONTAINER */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 20px', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <h1 style={{ fontSize: 'calc(32px + 2vw)', marginBottom: '20px', fontWeight: '800', letterSpacing: '-0.5px', color: '#fff', lineHeight: '1.2' }}>
          Welcome to <span style={{ color: '#38bdf8', textShadow: '0 0 40px rgba(56,189,248,0.2)' }}>DigiGrow</span>
        </h1>
        
        <p style={{ color: '#94a3b8', marginBottom: '40px', maxWidth: '580px', fontSize: '18px', lineHeight: '1.6', fontWeight: '400' }}>
          Expert Digital Marketing Solutions for Your Business. Scale your digital footprint and dominate your market niche with our expert strategies.
        </p>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <button style={{ backgroundColor: '#0284c7', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '16px', boxShadow: '0 4px 15px rgba(2, 132, 199, 0.4)' }}>
            Get Started
          </button>
          <button style={{ backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid #1e293b', padding: '14px 32px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '16px' }}>
            Learn More
          </button>
        </div>

      </div>
    </div>
  );
}

export default Home;