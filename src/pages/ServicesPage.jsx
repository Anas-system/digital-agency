import React, { useState, useEffect } from 'react';

export default function ServicesPage() {
  const [service1, setService1] = useState("");
  const [service2, setService2] = useState("");
  const [service3, setService3] = useState("");

  useEffect(() => {
    // Admin panel se save kiya hua data load karna
    setService1(localStorage.getItem('website_service1') || "SOCIAL MEDIA MARKETING\nInstagram Marketing\nFacebook Marketing");
    setService2(localStorage.getItem('website_service2') || "PAID ADVERTISING\nGoogle Ads\nFacebook Ads");
    setService3(localStorage.getItem('website_service3') || "WEBSITE SERVICE\nWebsite Design\nWebsite Development");
  }, []);

  // Content se dot (•) ko filter out karne ka clean logic function
  const renderCleanContent = (text) => {
    if (!text) return "";
    return text
      .split('\n')
      .map(line => line.replace(/^•\s*/, '')) // Agar shuruat me dot hai toh use hatado
      .filter(line => line.trim() !== "•" && line.trim() !== "") // Khali dot lines ko remove karo
      .join('\n');
  };

  // Main Card List Styling (Professional Typography Framework)
  const serviceCardStyle = {
    display: 'flex', 
    alignItems: 'center', 
    gap: '24px', 
    padding: '24px', 
    backgroundColor: 'rgba(255, 255, 255, 0.02)', 
    borderRadius: '16px', 
    border: '1px solid rgba(255, 255, 255, 0.05)', 
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const textContainerStyle = {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#ffffff', 
    fontSize: '15px', 
    fontWeight: '500', 
    lineHeight: '1.7', 
    whiteSpace: 'pre-line'
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 68px)', 
      background: 'linear-gradient(-45deg, #0f172a, #1e1b4b, #11274c, #0f172a)',
      backgroundSize: '400% 400%',
      animation: 'gradientMove 15s ease infinite',
      padding: '80px 24px', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Aurora Glow Backdrops */}
      <div style={{ position: 'absolute', width: '350px', height: '350px', background: 'rgba(16, 185, 129, 0.12)', filter: 'blur(90px)', top: '20%', right: '5%', borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'rgba(56, 189, 248, 0.12)', filter: 'blur(90px)', bottom: '10%', left: '5%', borderRadius: '50%' }}></div>

      {/* Main Container */}
      <div style={{ 
        maxWidth: '850px', 
        width: '100%',
        background: 'rgba(15, 23, 42, 0.65)', 
        backdropFilter: 'blur(20px)', 
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px', 
        padding: '50px', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)', 
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxSizing: 'border-box',
        zIndex: 1
      }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '40px' }}>
          <span style={{ background: 'linear-gradient(90deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px', fontFamily: '"Inter", sans-serif' }}>
            What We Offer
          </span>
          <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-1.5px', fontFamily: '"Inter", "SF Pro Display", sans-serif' }}>
            2. Our Services
          </h1>
        </div>

        {/* Vertical List Layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Card 1 */}
          <div style={serviceCardStyle}>
            <span style={{ fontSize: '26px', backgroundColor: 'rgba(56, 189, 248, 0.08)', padding: '16px', borderRadius: '14px', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '32px' }}>
              📈
            </span>
            <div>
              <strong style={{ color: '#38bdf8', fontSize: '11px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                Service Option 01
              </strong>
              <span style={textContainerStyle}>
                {renderCleanContent(service1)}
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div style={serviceCardStyle}>
            <span style={{ fontSize: '26px', backgroundColor: 'rgba(129, 140, 248, 0.08)', padding: '16px', borderRadius: '14px', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '32px' }}>
              📱
            </span>
            <div>
              <strong style={{ color: '#818cf8', fontSize: '11px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                Service Option 02
              </strong>
              <span style={textContainerStyle}>
                {renderCleanContent(service2)}
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div style={serviceCardStyle}>
            <span style={{ fontSize: '26px', backgroundColor: 'rgba(16, 185, 129, 0.08)', padding: '16px', borderRadius: '14px', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '32px' }}>
              💻
            </span>
            <div>
              <strong style={{ color: '#10b981', fontSize: '11px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                Service Option 03
              </strong>
              <span style={textContainerStyle}>
                {renderCleanContent(service3)}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}