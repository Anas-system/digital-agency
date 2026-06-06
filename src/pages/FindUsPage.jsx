import React, { useState, useEffect } from 'react';

export default function FindUsPage() {
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // LocalStorage se saved content uthana
    const savedAddress = localStorage.getItem('website_address') || "123 Digital Street, Tech Hub, India";
    const savedEmail = localStorage.getItem('website_email') || "contact@digigrow.com";
    const savedPhone = localStorage.getItem('website_phone') || "+91 98765 43210";

    setAddress(savedAddress);
    setEmail(savedEmail);
    setPhone(savedPhone);
  }, []);

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
      fontFamily: '"Segoe UI", Roboto, sans-serif',
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

      {/* Background Neon Glowing Blur Rings */}
      <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'rgba(56, 189, 248, 0.12)', filter: 'blur(90px)', bottom: '5%', left: '5%', borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'rgba(139, 92, 246, 0.1)', filter: 'blur(90px)', top: '10%', right: '5%', borderRadius: '50%' }}></div>

      {/* Main Glassmorphism Contact Card */}
      <div style={{ 
        maxWidth: '750px', 
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
        
        {/* Page Header */}
        <div style={{ marginBottom: '40px' }}>
          <span style={{ background: 'linear-gradient(90deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>Get In Touch</span>
          <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-1px' }}>3. How to Find Us</h1>
        </div>

        {/* Clean Professional Contact List Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Address Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '28px', backgroundColor: 'rgba(56, 189, 248, 0.1)', padding: '12px', borderRadius: '10px', color: '#38bdf8' }}>📍</span>
            <div>
              <strong style={{ color: '#94a3b8', fontSize: '13px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Our Location</strong>
              <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: '500' }}>{address}</span>
            </div>
          </div>

          {/* Email Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '28px', backgroundColor: 'rgba(129, 140, 248, 0.1)', padding: '12px', borderRadius: '10px', color: '#818cf8' }}>✉️</span>
            <div>
              <strong style={{ color: '#94a3b8', fontSize: '13px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Support</strong>
              <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: '500' }}>{email}</span>
            </div>
          </div>

          {/* Phone Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '28px', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '10px', color: '#10b981' }}>📞</span>
            <div>
              <strong style={{ color: '#94a3b8', fontSize: '13px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Call Anytime</strong>
              <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: '500' }}>{phone}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}