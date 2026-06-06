import React from 'react';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 24px', backgroundColor: '#0f172a', color: '#ffffff', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontSize: '56px', fontWeight: '800', marginBottom: '20px', letterSpacing: '-1px', background: 'linear-gradient(to right, #ffffff, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Welcome to DigiGrow
      </h1>
      <p style={{ fontSize: '20px', color: '#94a3b8', maxWidth: '600px', lineHeight: '1.6', marginBottom: '40px' }}>
        Expert Digital Marketing Solutions for Your Business. Scale your digital footprint and dominate your market niche with our expert strategies.
      </p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <button style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px rgba(37,99,235,0.2)' }}>Get Started</button>
        <button style={{ backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid #334155', padding: '14px 28px', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>Learn More</button>
      </div>
    </div>
  );
}