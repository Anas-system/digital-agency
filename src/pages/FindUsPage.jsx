import React from 'react';

function FindUsPage() {
  return (
    <div style={{ position: 'relative', padding: '100px 20px', minHeight: '88vh', backgroundColor: '#090f1c', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', boxSizing: 'border-box' }}>
      
      {/* Background Static Layer */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, backgroundColor: '#090f1c', zIndex: 0 }} />

      {/* iOS Style Widget Card */}
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        backgroundColor: '#121a2e', 
        padding: '60px 50px', 
        borderRadius: '32px', 
        maxWidth: '650px', 
        width: '100%', 
        boxSizing: 'border-box',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)' 
      }}>
        
        {/* ❌ NEELI ACCENT LINE KO YAHA SE BHI POORA HATA DIYA HAI */}
        
        {/* Left Aligned Clean Title */}
        <h2 style={{ 
          fontSize: 'calc(24px + 1vw)', 
          margin: '0 0 35px 0', 
          fontWeight: '700', 
          letterSpacing: '-0.5px',
          textAlign: 'left'
        }}>
          How to <span style={{ color: '#00a2ff' }}>Find Us</span>
        </h2>
        
        {/* Rows Stack Layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Location Row */}
          <div style={{ backgroundColor: '#090f1c', padding: '20px 24px', borderRadius: '16px', textAlign: 'left' }}>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block', fontWeight: '600', marginBottom: '6px', letterSpacing: '0.5px' }}>OUR LOCATION</span>
            <strong style={{ fontSize: '16px', color: '#fff', fontWeight: '600' }}>Roshan Bagh Prayagraj</strong>
          </div>

          {/* Email Row */}
          <div style={{ backgroundColor: '#090f1c', padding: '20px 24px', borderRadius: '16px', textAlign: 'left' }}>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block', fontWeight: '600', marginBottom: '6px', letterSpacing: '0.5px' }}>EMAIL SUPPORT</span>
            <strong style={{ fontSize: '16px', color: '#fff', fontWeight: '600' }}>anasknanprince1234@gmail.com</strong>
          </div>

          {/* Call Row */}
          <div style={{ backgroundColor: '#090f1c', padding: '20px 24px', borderRadius: '16px', textAlign: 'left' }}>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block', fontWeight: '600', marginBottom: '6px', letterSpacing: '0.5px' }}>CALL ANYTIME</span>
            <strong style={{ fontSize: '16px', color: '#fff', fontWeight: '600' }}>+91 7007684279</strong>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FindUsPage;