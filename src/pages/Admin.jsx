import React, { useState, useEffect } from 'react';

export default function Admin() {
  // --- Security & Authentication States ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // --- Active Workspace Tab State ---
  const [activeTab, setActiveTab] = useState('about');

  // --- All Content States ---
  const [aboutText, setAboutText] = useState("");
  
  const [title1, setTitle1] = useState("");
  const [desc1, setDesc1] = useState("");
  const [title2, setTitle2] = useState("");
  const [desc2, setDesc2] = useState("");
  const [title3, setTitle3] = useState(""); 
  const [desc3, setDesc3] = useState("");   
  
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  // --- Check Login Session & Load Data ---
  useEffect(() => {
    // Check if already logged in earlier
    const sessionToken = sessionStorage.getItem('admin_session');
    if (sessionToken === 'authenticated_bhai') {
      setIsAuthenticated(true);
    }

    setAboutText(localStorage.getItem('website_about') || "Welcome to DigiGrow...");
    
    setTitle1(localStorage.getItem('web_service_title1') || "SOCIAL MEDIA MARKETING");
    setDesc1(localStorage.getItem('web_service_desc1') || "Instagram Marketing, Facebook Marketing");
    
    setTitle2(localStorage.getItem('web_service_title2') || "PAID ADVERTISING");
    setDesc2(localStorage.getItem('web_service_desc2') || "Google Ads, Facebook Ads");
    
    setTitle3(localStorage.getItem('web_service_title3') || "WEBSITE SERVICE");
    setDesc3(localStorage.getItem('web_service_desc3') || "Website Design, Website Development");
    
    setAddress(localStorage.getItem('website_address') || "Roshan Bagh Prayagraj");
    setEmail(localStorage.getItem('website_email') || "anasknanprince1234@gmail.com");
    setPhone(localStorage.getItem('website_phone') || "+91 7007684279");
  }, []);

  // --- Login Handler ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === "bhai163") {
      setIsAuthenticated(true);
      setLoginError("");
      sessionStorage.setItem('admin_session', 'authenticated_bhai'); // Save session
    } else {
      setLoginError("❌ Galat Password Hai Bhai! Dobara Try Karo.");
    }
  };

  // --- Logout Handler ---
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput("");
    sessionStorage.removeItem('admin_session'); // Clear session
  };

  // --- Save Configuration Handler ---
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('website_about', aboutText);
      
      localStorage.setItem('web_service_title1', title1);
      localStorage.setItem('web_service_desc1', desc1);
      localStorage.setItem('web_service_title2', title2);
      localStorage.setItem('web_service_desc2', desc2);
      localStorage.setItem('web_service_title3', title3);
      localStorage.setItem('web_service_desc3', desc3);
      
      localStorage.setItem('website_address', address);
      localStorage.setItem('website_email', email);
      localStorage.setItem('website_phone', phone);
      
      localStorage.setItem('website_service1', `${title1}\n${desc1}`);
      localStorage.setItem('website_service2', `${title2}\n${desc2}`);
      localStorage.setItem('website_service3', `${title3}\n${desc3}`);
      
      setLoading(false);
      alert('🎉 Configuration Saved Successfully!');
    }, 400);
  };

  // --- Premium Shared Styles ---
  const sharedInputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: '#1e293b',
    color: '#ffffff',
    boxSizing: 'border-box',
    fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
  };

  const sharedLabelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: '700',
    color: '#38bdf8',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
  };

  const tabButtonStyle = (tabName) => ({
    padding: '12px 28px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
    backgroundColor: activeTab === tabName ? '#0ea5e9' : 'rgba(255, 255, 255, 0.03)',
    color: activeTab === tabName ? '#ffffff' : '#94a3b8',
    boxShadow: activeTab === tabName ? '0 4px 15px rgba(14, 165, 233, 0.25)' : 'none',
  });

  // ================= RENDER LOCK SCREEN IF NOT LOGGED IN =================
  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: 'calc(100vh - 68px)', 
        background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
        padding: '24px',
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          backgroundColor: 'rgba(30, 41, 59, 0.45)', 
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px', 
          padding: '40px 50px', 
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          maxWidth: '420px',
          width: '100%',
          textAlign: 'center',
          boxSizing: 'border-box'
        }}>
          <span style={{ fontSize: '50px', display: 'block', marginBottom: '16px' }}>🔒</span>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#ffffff', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Access Restricted</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 24px 0', lineHeight: '1.5' }}>Admin Control Panel ko open karne ke liye secure password enter karein.</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="password" 
              placeholder="Enter Admin Password..." 
              value={passwordInput} 
              onChange={(e) => setPasswordInput(e.target.value)} 
              style={{ ...sharedInputStyle, textAlign: 'center', fontSize: '16px', letterSpacing: '4px' }} 
              autoFocus
            />
            {loginError && <p style={{ color: '#f87171', fontSize: '13px', margin: 0, fontWeight: '500' }}>{loginError}</p>}
            <button type="submit" style={{ 
              backgroundColor: '#0ea5e9', 
              color: 'white', 
              border: 'none', 
              padding: '14px', 
              borderRadius: '12px', 
              fontSize: '15px', 
              fontWeight: '700', 
              cursor: 'pointer', 
              boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)',
              marginTop: '8px'
            }}>
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================= MAIN RENDER DASHBOARD (IF LOGGED IN) =================
  return (
    <div style={{ 
      minHeight: 'calc(100vh - 68px)', 
      background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
      padding: '60px 24px', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      
      {/* Logout Floating Button */}
      <button onClick={handleLogout} style={{
        position: 'absolute',
        top: '24px',
        right: '24px',
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        border: '1px solid rgba(248, 113, 113, 0.2)',
        color: '#f87171',
        padding: '10px 20px',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}>
        🚪 Secure Logout
      </button>

      <form onSubmit={handleSave} style={{ maxWidth: '750px', width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* ================= HEADER SECTION ================= */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#ffffff', margin: '0 0 6px 0', letterSpacing: '-1px' }}>
            Digi Grow - Admin Panel
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0, fontWeight: '400' }}>
            Select a specific section to customize your website content.
          </p>
        </div>

        {/* ================= MODERN SEGMENTED TABS ================= */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', backgroundColor: 'rgba(15, 23, 42, 0.4)', padding: '8px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.03)' }}>
          <button type="button" onClick={() => setActiveTab('about')} style={tabButtonStyle('about')}>📝 About Section</button>
          <button type="button" onClick={() => setActiveTab('services')} style={tabButtonStyle('services')}>💼 Services Card</button>
          <button type="button" onClick={() => setActiveTab('contact')} style={tabButtonStyle('contact')}>📍 Contact Details</button>
        </div>

        {/* ================= CARD WORKSPACE CONTAINER ================= */}
        <div style={{ 
          backgroundColor: 'rgba(30, 41, 59, 0.45)', 
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '20px', 
          padding: '40px', 
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          minHeight: '340px'
        }}>

          {/* SET 1: ABOUT US */}
          {activeTab === 'about' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: '#ffffff', fontSize: '18px', fontWeight: '700', letterSpacing: '-0.5px' }}>1. Customize About Us</h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>Modify your main branding text and mission lines statement.</p>
              </div>
              <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }}></div>
              <div>
                <label style={sharedLabelStyle}>Main About Us Description</label>
                <textarea rows="6" value={aboutText} onChange={(e) => setAboutText(e.target.value)} style={{ ...sharedInputStyle, lineHeight: '1.6' }} />
              </div>
            </div>
          )}

          {/* SET 2: 3 SERVICES */}
          {activeTab === 'services' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: '#ffffff', fontSize: '18px', fontWeight: '700', letterSpacing: '-0.5px' }}>2. Customize 3 Services</h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>Update headings and details for all three individual blocks.</p>
              </div>
              <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }}></div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxHeight: '400px', overflowY: 'auto', paddingRight: '6px' }}>
                {/* Service 1 */}
                <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.2)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)' }}>
                  <label style={sharedLabelStyle}>Service 01 Title</label>
                  <input type="text" value={title1} onChange={(e) => setTitle1(e.target.value)} style={{ ...sharedInputStyle, marginBottom: '16px', fontWeight: '600' }} />
                  <label style={sharedLabelStyle}>Service 01 Description</label>
                  <textarea rows="3" value={desc1} onChange={(e) => setDesc1(e.target.value)} style={sharedInputStyle} />
                </div>

                {/* Service 2 */}
                <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.2)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)' }}>
                  <label style={sharedLabelStyle}>Service 02 Title</label>
                  <input type="text" value={title2} onChange={(e) => setTitle2(e.target.value)} style={{ ...sharedInputStyle, marginBottom: '16px', fontWeight: '600' }} />
                  <label style={sharedLabelStyle}>Service 02 Description</label>
                  <textarea rows="3" value={desc2} onChange={(e) => setDesc2(e.target.value)} style={sharedInputStyle} />
                </div>

                {/* Service 3 */}
                <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.2)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)' }}>
                  <label style={sharedLabelStyle}>Service 03 Title</label>
                  <input type="text" value={title3} onChange={(e) => setTitle3(e.target.value)} style={{ ...sharedInputStyle, marginBottom: '16px', fontWeight: '600' }} />
                  <label style={sharedLabelStyle}>Service 03 Description</label>
                  <textarea rows="3" value={desc3} onChange={(e) => setDesc3(e.target.value)} style={sharedInputStyle} />
                </div>
              </div>
            </div>
          )}

          {/* SET 3: CONTACT DETAILS */}
          {activeTab === 'contact' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: '#ffffff', fontSize: '18px', fontWeight: '700', letterSpacing: '-0.5px' }}>3. Contact Details</h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>Maintain your active addresses and primary communication links.</p>
              </div>
              <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }}></div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={sharedLabelStyle}>Office Address</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={sharedInputStyle} />
                </div>
                <div>
                  <label style={sharedLabelStyle}>Support Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={sharedInputStyle} />
                </div>
                <div>
                  <label style={sharedLabelStyle}>Phone Number</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={sharedInputStyle} />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ================= CENTRALIZED SUBMIT BUTTON ================= */}
        <div style={{ textAlign: 'center' }}>
          <button type="submit" disabled={loading} style={{ 
            backgroundColor: '#0ea5e9', 
            color: 'white', 
            border: 'none', 
            padding: '16px 44px', 
            borderRadius: '12px', 
            fontSize: '15px', 
            fontWeight: '700', 
            cursor: 'pointer', 
            fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
            boxShadow: '0 6px 20px rgba(14, 165, 233, 0.25)',
          }}>
            {loading ? 'Saving Layout...' : 'Save Configuration Permanent'}
          </button>
        </div>

      </form>
    </div>
  );
}