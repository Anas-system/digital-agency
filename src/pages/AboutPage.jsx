import React, { useState, useEffect } from 'react';

export default function AboutPage() {
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    const savedAbout = localStorage.getItem('website_about') || "Hum businesses ko online grow karne mein help karte hain through smart aur result-oriented digital marketing solutions.";
    setAboutText(savedAbout);
  }, []);

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 68px)', 
      background: 'linear-gradient(-45deg, #0f172a, #1e1b4b, #311042, #0f172a)',
      backgroundSize: '400% 400%',
      animation: 'gradientMove 15s ease infinite',
      padding: '80px 24px', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      fontFamily: '"Segoe UI", Roboto, sans-serif',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Injecting CSS Keyframes directly into HTML */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Animated Floating Circles for Premium Vibe */}
      <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'rgba(56, 189, 248, 0.15)', filter: 'blur(80px)', top: '10%', left: '10%', borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'rgba(99, 102, 241, 0.15)', filter: 'blur(100px)', bottom: '10%', right: '10%', borderRadius: '50%' }}></div>

      {/* Premium Glassmorphism Container */}
      <div style={{ 
        maxWidth: '900px', 
        width: '100%',
        background: 'rgba(15, 23, 42, 0.65)', 
        backdropFilter: 'blur(20px)', 
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px', 
        padding: '50px', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)', 
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxSizing: 'border-box',
        zIndex: 1
      }}>
        <div style={{ marginBottom: '40px' }}>
          <span style={{ background: 'linear-gradient(90deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>Who We Are</span>
          <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-1px' }}>1. About Us</h1>
        </div>
        <p style={{ color: '#cbd5e1', lineHeight: '1.8', fontSize: '18px', whiteSpace: 'pre-line', marginBottom: '48px' }}>{aboutText}</p>
        <div style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)', borderRadius: '16px', padding: '24px', borderLeft: '4px solid #38bdf8' }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#38bdf8', fontSize: '18px', fontWeight: '700' }}>⚡ Fast Scale Strategy</h3>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '15px', lineHeight: '1.6' }}>Hamara target sirf traffic lana nahi, balki aapke business ke liye real revenue aur exponential conversions generate karna hai.</p>
        </div>
      </div>
    </div>
  );
}