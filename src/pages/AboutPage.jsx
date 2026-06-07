import React, { useState, useEffect } from 'react';

function AboutPage() {
  // Safe fallback description state
  const [aboutText, setAboutText] = useState(
    "Hum aapke business ko online scale karne aur brand value build karne mein madad karte hain through custom, data-driven aur result-oriented digital marketing strategies."
  );

  // Sync with Admin live storage updates
  useEffect(() => {
    const savedAbout = localStorage.getItem('admin_about_text');
    if (savedAbout) {
      setAboutText(savedAbout);
    }
  }, []);

  return (
    <div style={{ 
      padding: '40px 20px', 
      minHeight: '85vh', 
      backgroundColor: '#090f1c', 
      color: '#fff', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      boxSizing: 'border-box'
    }}>
      {/* Central Card container matching the original layout */}
      <div style={{ 
        backgroundColor: '#121a2e', 
        padding: '40px 30px', 
        borderRadius: '24px', 
        maxWidth: '850px', 
        width: '100%', 
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        textAlign: 'left'
      }}>
        {/* Main Header with Restored Original Weights */}
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          marginBottom: '20px', 
          letterSpacing: '-0.5px',
          color: '#ffffff'
        }}>
          Who We Are & <span style={{ color: '#00a2ff' }}>What We Do</span>
        </h2>

        {/* Dynamic description box with Restored Original Spacing */}
        <p style={{ 
          color: '#94a3b8', 
          fontSize: '15px', 
          lineHeight: '1.7', 
          marginBottom: '20px' 
        }}>
          {aboutText}
        </p>

        {/* Supporting static copy */}
        <p style={{ 
          color: '#94a3b8', 
          fontSize: '15px', 
          lineHeight: '1.7', 
          marginBottom: '30px' 
        }}>
          Hamara core mission startups, local brands aur established businesses ko ek strong digital foot-print dena hai, taaki aap sahi target audience tak pahunch sakein aur apne business ROI ko faster mode par grow grow sakein. Hum har ek client ki specific requirements ke mutabik tailored solutions design karte hain.
        </p>

        {/* Skills Division Header */}
        <h4 style={{ 
          color: '#00a2ff', 
          fontSize: '16px', 
          fontWeight: '600', 
          marginBottom: '15px' 
        }}>
          Hamari Core Expertise:
        </h4>

        {/* Grid for Checklists with Restored Baseline Fonts */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '12px 25px',
          color: '#e2e8f0',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          <div><span style={{ color: '#00a2ff', marginRight: '8px', fontWeight: 'bold' }}>✓</span> Social Media Management</div>
          <div><span style={{ color: '#00a2ff', marginRight: '8px', fontWeight: 'bold' }}>✓</span> Search Engine Optimization (SEO)</div>
          <div><span style={{ color: '#00a2ff', marginRight: '8px', fontWeight: 'bold' }}>✓</span> High-End Website Development</div>
          <div><span style={{ color: '#00a2ff', marginRight: '8px', fontWeight: 'bold' }}>✓</span> Targeted Google & Meta Ads</div>
          <div><span style={{ color: '#00a2ff', marginRight: '8px', fontWeight: 'bold' }}>✓</span> Content Strategy & Creation</div>
          <div><span style={{ color: '#00a2ff', marginRight: '8px', fontWeight: 'bold' }}>✓</span> Corporate Brand Building</div>
        </div>

      </div>
    </div>
  );
}

export default AboutPage;