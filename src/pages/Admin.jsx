import React, { useState, useEffect } from 'react';

function Admin() {
  // Authentication & Brute-force Prevention States
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState(0); // in seconds

  // Dashboard Content States
  const [aboutText, setAboutText] = useState("Hum businesses ko online grow karne mein help karte hain through smart aur result-oriented digital marketing solutions.");
  const [services, setServices] = useState({
    card1Title: 'Social Media Marketing',
    card1Desc: 'Instagram Marketing\nFacebook Marketing\nLinkedIn Marketing\nYoutube Marketing',
    card2Title: 'Paid Advertising',
    card2Desc: 'Google Ads\nFacebook Ads\nInstagram Ads\nYouTube Ads',
    card3Title: 'Website Development',
    card3Desc: 'Website Design\nWebsite Development\nWebsite Maintenance',
  });
  const [findUs, setFindUs] = useState({
    location: 'Roshan Bagh Prayagraj',
    email: 'anasknanprince1234@gmail.com',
    call: '+91 7007684279'
  });

  useEffect(() => {
    // 1. Session state auth check
    const authStatus = sessionStorage.getItem('admin_session_auth');
    if (authStatus === 'true') {
      setIsAuthorized(true);
    }

    // 2. Persistent Lockout Checking (Survives Reloads/Restarts)
    const savedLockoutExpiry = localStorage.getItem('admin_lockout_expiry');
    const savedAttempts = localStorage.getItem('admin_failed_attempts');
    
    if (savedAttempts) {
      setAttempts(parseInt(savedAttempts, 10));
    }

    if (savedLockoutExpiry) {
      const currentTime = Date.now();
      const timeLeft = Math.ceil((parseInt(savedLockoutExpiry, 10) - currentTime) / 1000);
      
      if (timeLeft > 0) {
        setLockoutTimeLeft(timeLeft);
      } else {
        // Lockout expired naturally
        localStorage.removeItem('admin_lockout_expiry');
        localStorage.removeItem('admin_failed_attempts');
        setAttempts(0);
      }
    }

    // 3. Retrieve system components data safely
    const savedAbout = localStorage.getItem('admin_about_text');
    if (savedAbout) setAboutText(savedAbout);

    const savedServices = localStorage.getItem('admin_services_json');
    if (savedServices) {
      try { setServices(JSON.parse(savedServices)); } catch(e) {}
    }

    const savedFindUs = localStorage.getItem('admin_findus_json');
    if (savedFindUs) {
      try { setFindUs(JSON.parse(savedFindUs)); } catch(e) {}
    }
  }, []);

  // ⏱️ Countdown Timer Hook for Lockout Mode
  useEffect(() => {
    if (lockoutTimeLeft <= 0) return;

    const timer = setInterval(() => {
      setLockoutTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          localStorage.removeItem('admin_lockout_expiry');
          localStorage.removeItem('admin_failed_attempts');
          setAttempts(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lockoutTimeLeft]);

  // Format seconds to HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 🔒 Authentication Submission Handler
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Secondary layer safeguard check
    if (lockoutTimeLeft > 0) {
      return;
    }

    if (passwordInput === 'bhai163') {
      setIsAuthorized(true);
      setLoginError('');
      setAttempts(0);
      localStorage.removeItem('admin_failed_attempts');
      sessionStorage.setItem('admin_session_auth', 'true');
    } else {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setPasswordInput('');

      if (nextAttempts >= 3) {
        // Trigger 2-hour server lock (2 hours = 7200 seconds)
        const expiryTimestamp = Date.now() + 2 * 60 * 60 * 1000;
        localStorage.setItem('admin_lockout_expiry', expiryTimestamp.toString());
        localStorage.setItem('admin_failed_attempts', '3');
        setLockoutTimeLeft(7200);
        setLoginError('Brute-force detected! Panel locked for 2 hours.');
      } else {
        localStorage.setItem('admin_failed_attempts', nextAttempts.toString());
        setLoginError(`Incorrect Password! (${3 - nextAttempts} attempts remaining)`);
      }
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem('admin_session_auth');
  };

  const handleServiceChange = (field, value) => {
    setServices(prev => ({ ...prev, [field]: value }));
  };

  const handleFindUsChange = (field, value) => {
    setFindUs(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveAll = () => {
    localStorage.setItem('admin_about_text', aboutText);
    localStorage.setItem('admin_services_json', JSON.stringify(services));
    localStorage.setItem('admin_findus_json', JSON.stringify(findUs));
    alert('Bhai, saara data permanently local space me save ho gaya hai!');
  };

  // 🛑 1. LOCKOUT PERMANENT TIMER VIEW
  if (lockoutTimeLeft > 0) {
    return (
      <div style={{ padding: '20px', minHeight: '85vh', backgroundColor: '#090f1c', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box' }}>
        <div style={{ backgroundColor: '#121a2e', padding: '40px 30px', borderRadius: '24px', maxWidth: '420px', width: '100%', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.6)', border: '1px solid #ef4444' }}>
          
          {/* Danger Lock Icon */}
          <div style={{ width: '60px', height: '60px', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px auto', color: '#ef4444' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>

          <h3 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 8px 0', color: '#ef4444' }}>Security Lockout Active</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 25px 0', lineHeight: '1.5' }}>
            3 baar galat password enter kiya gaya hai. System security ke liye admin panel ko temporary freeze kar diya gaya hai.
          </p>

          {/* Dynamic Countdown Screen */}
          <div style={{ backgroundColor: '#090f1c', padding: '16px', borderRadius: '12px', border: '1px solid #1e2d4a', fontSize: '24px', fontWeight: '800', color: '#00ffcc', letterSpacing: '1px', marginBottom: '10px' }}>
            {formatTime(lockoutTimeLeft)}
          </div>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Please try again after the countdown ends.</span>
        </div>
      </div>
    );
  }

  // 🔒 2. NORMAL ACCESS LOGIN VIEW
  if (!isAuthorized) {
    return (
      <div style={{ padding: '20px', minHeight: '85vh', backgroundColor: '#090f1c', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box' }}>
        <form onSubmit={handleLoginSubmit} autoComplete="off" style={{ backgroundColor: '#121a2e', padding: '40px 30px', borderRadius: '24px', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
          
          <div style={{ width: '60px', height: '60px', backgroundColor: 'rgba(0,162,255,0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px auto', color: '#00a2ff' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>

          <h3 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Admin Panel Lock</h3>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 25px 0' }}>This area is protected. Please enter the master password to unlock.</p>
          
          <input 
            type="password" 
            placeholder="Enter Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            autoComplete="new-password" // Prevents automatic browser cache display
            style={{ width: '100%', backgroundColor: '#090f1c', border: loginError ? '1px solid #ef4444' : '1px solid #1e2d4a', borderRadius: '12px', color: '#fff', padding: '14px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', textAlign: 'center', marginBottom: '15px' }}
          />

          {loginError && <p style={{ color: loginError.includes('remaining') ? '#f59e0b' : '#ef4444', fontSize: '13px', fontWeight: '500', margin: '0 0 15px 0', lineHeight: '1.4' }}>{loginError}</p>}

          <button type="submit" style={{ width: '100%', backgroundColor: '#00a2ff', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,162,255,0.3)' }}>
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  // 🔓 3. FULLY UNLOCKED ACCESS PANEL
  return (
    <div style={{ padding: '60px 20px', minHeight: '100vh', backgroundColor: '#090f1c', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', boxSizing: 'border-box' }}>
      
      <div style={{ maxWidth: '750px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: '700', margin: '0' }}>Admin Dashboard</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '5px' }}>Logged in successfully. Configure your settings below.</p>
        </div>
        <button onClick={handleLogout} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
          Lock Panel
        </button>
      </div>

      {/* MODULE 1: ABOUT */}
      <div style={{ width: '100%', maxWidth: '750px', borderLeft: '4px solid #00a2ff', paddingLeft: '15px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>ABOUT PAGE SETTINGS</h3>
        <div style={{ backgroundColor: '#121a2e', padding: '25px', borderRadius: '24px' }}>
          <textarea value={aboutText} onChange={(e) => setAboutText(e.target.value)} style={{ width: '100%', height: '100px', backgroundColor: '#090f1c', border: '1px solid #1e2d4a', borderRadius: '12px', color: '#fff', padding: '14px', fontSize: '15px', resize: 'vertical', outline: 'none', lineHeight: '1.6' }} />
        </div>
      </div>

      {/* MODULE 2: SERVICES */}
      <div style={{ width: '100%', maxWidth: '750px', borderLeft: '4px solid #38bdf8', paddingLeft: '15px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>SERVICES PAGE SETTINGS</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ backgroundColor: '#121a2e', padding: '25px', borderRadius: '20px' }}>
            <span style={{ fontSize: '11px', color: '#38bdf8', display: 'block', fontWeight: '700', marginBottom: '8px' }}>SERVICE CARD 1</span>
            <input type="text" value={services.card1Title} onChange={(e) => handleServiceChange('card1Title', e.target.value)} style={{ width: '100%', backgroundColor: '#090f1c', border: '1px solid #1e2d4a', borderRadius: '10px', color: '#fff', padding: '12px', fontSize: '14px', marginBottom: '12px', outline: 'none' }} />
            <textarea value={services.card1Desc} onChange={(e) => handleServiceChange('card1Desc', e.target.value)} style={{ width: '100%', height: '90px', backgroundColor: '#090f1c', border: '1px solid #1e2d4a', borderRadius: '10px', color: '#fff', padding: '12px', fontSize: '14px', resize: 'vertical', outline: 'none', fontFamily: 'inherit', lineHeight: '1.6' }} />
          </div>

          <div style={{ backgroundColor: '#121a2e', padding: '25px', borderRadius: '20px' }}>
            <span style={{ fontSize: '11px', color: '#38bdf8', display: 'block', fontWeight: '700', marginBottom: '8px' }}>SERVICE CARD 2</span>
            <input type="text" value={services.card2Title} onChange={(e) => handleServiceChange('card2Title', e.target.value)} style={{ width: '100%', backgroundColor: '#090f1c', border: '1px solid #1e2d4a', borderRadius: '10px', color: '#fff', padding: '12px', fontSize: '14px', marginBottom: '12px', outline: 'none' }} />
            <textarea value={services.card2Desc} onChange={(e) => handleServiceChange('card2Desc', e.target.value)} style={{ width: '100%', height: '90px', backgroundColor: '#090f1c', border: '1px solid #1e2d4a', borderRadius: '10px', color: '#fff', padding: '12px', fontSize: '14px', resize: 'vertical', outline: 'none', fontFamily: 'inherit', lineHeight: '1.6' }} />
          </div>

          <div style={{ backgroundColor: '#121a2e', padding: '25px', borderRadius: '20px' }}>
            <span style={{ fontSize: '11px', color: '#38bdf8', display: 'block', fontWeight: '700', marginBottom: '8px' }}>SERVICE CARD 3</span>
            <input type="text" value={services.card3Title} onChange={(e) => handleServiceChange('card3Title', e.target.value)} style={{ width: '100%', backgroundColor: '#090f1c', border: '1px solid #1e2d4a', borderRadius: '10px', color: '#fff', padding: '12px', fontSize: '14px', marginBottom: '12px', outline: 'none' }} />
            <textarea value={services.card3Desc} onChange={(e) => handleServiceChange('card3Desc', e.target.value)} style={{ width: '100%', height: '90px', backgroundColor: '#090f1c', border: '1px solid #1e2d4a', borderRadius: '10px', color: '#fff', padding: '12px', fontSize: '14px', resize: 'vertical', outline: 'none', fontFamily: 'inherit', lineHeight: '1.6' }} />
          </div>

        </div>
      </div>

      {/* MODULE 3: FIND US */}
      <div style={{ width: '100%', maxWidth: '750px', borderLeft: '4px solid #10b981', paddingLeft: '15px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>FIND US PAGE SETTINGS</h3>
        <div style={{ backgroundColor: '#121a2e', padding: '30px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Office Location</label>
            <input type="text" value={findUs.location} onChange={(e) => handleFindUsChange('location', e.target.value)} style={{ width: '100%', backgroundColor: '#090f1c', border: '1px solid #1e2d4a', borderRadius: '10px', color: '#fff', padding: '12px', fontSize: '14px', outline: 'none' }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Email Support</label>
            <input type="text" value={findUs.email} onChange={(e) => handleFindUsChange('email', e.target.value)} style={{ width: '100%', backgroundColor: '#090f1c', border: '1px solid #1e2d4a', borderRadius: '10px', color: '#fff', padding: '12px', fontSize: '14px', outline: 'none' }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Phone Number</label>
            <input type="text" value={findUs.call} onChange={(e) => handleFindUsChange('call', e.target.value)} style={{ width: '100%', backgroundColor: '#090f1c', border: '1px solid #1e2d4a', borderRadius: '10px', color: '#fff', padding: '12px', fontSize: '14px', outline: 'none' }} />
          </div>
        </div>
      </div>

      <button onClick={handleSaveAll} style={{ maxWidth: '750px', width: '100%', backgroundColor: '#00a2ff', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginBottom: '40px' }}>
        Save All Changes
      </button>

    </div>
  );
}

export default Admin;