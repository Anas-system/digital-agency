import React, { useState } from 'react';

const Admin = () => {
  // Password check karne ke liye states
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(false);

  // --- APNA PASSWORD YAHAN BADLEIN ---
  const SECRET_PASSWORD = "bhai123"; 

  const handleLogin = (e) => {
    e.preventDefault(); // Page refresh hone se rokne ke liye
    if (password === SECRET_PASSWORD) {
      setIsLoggedIn(true);
      setError(false);
    } else {
      setError(true);
      setPassword(''); // Galat password hone par input khali karne ke liye
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
  };

  // 1. Agar password sahi nahi hai, toh pehle ye Lock Screen dikhegi
  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0d1527', padding: '20px' }}>
        <div style={{ background: '#111c32', border: '1px solid #1e293b', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#ffffff' }}>Digi Grow</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '25px' }}>Admin Security Lock</p>
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#38bdf8', marginBottom: '8px', fontWeight: '500' }}>ENTER SECRET PASSWORD</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0d1527', border: '1px solid #334155', borderRadius: '6px', color: 'white', fontSize: '15px', outline: 'none' }}
              />
            </div>
            
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#0284c7', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>Unlock Panel</button>
          </form>
          
          {error && <div style={{ color: '#ef4444', fontSize: '14px', marginTop: '15px' }}>Galat Password Hai Bhai! ❌</div>}
        </div>
      </div>
    );
  }

  // 2. Agar password SAHI hai, toh aapka ye asli Admin Panel open hoga
  return (
    <div style={{ backgroundColor: '#0d1527', minHeight: '100vh', color: '#ffffff' }}>
      {/* Navbar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 5%', borderBottom: '1px solid #1e293b' }}>
        <div style={{ fontSize: '22px', fontWeight: '700', color: '#ffffff' }}>🚀 Digi<span style={{ color: '#38bdf8' }}>Grow</span></div>
        <nav style={{ display: 'flex', alignItems: 'center' }}>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', marginLeft: '20px', fontSize: '14px' }}>About</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', marginLeft: '20px', fontSize: '14px' }}>Services</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', marginLeft: '20px', fontSize: '14px' }}>Find Us</a>
          <button onClick={handleLogout} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', marginLeft: '20px' }}>Lock Panel</button>
        </nav>
      </header>

      {/* Main Content Dashboard */}
      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Digi Grow - Admin Panel</h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '30px' }}>Select a specific section to customize your website content.</p>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
          <button style={{ background: '#0284c7', color: 'white', border: '1px solid #38bdf8', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>📝 About Section</button>
          <button style={{ background: '#111c32', color: '#94a3b8', border: '1px solid #1e293b', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>💼 Services Card</button>
          <button style={{ background: '#111c32', color: '#94a3b8', border: '1px solid #1e293b', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>📍 Contact Details</button>
        </div>

        {/* Customization Form Card */}
        <div style={{ background: '#111c32', border: '1px solid #1e293b', borderRadius: '12px', padding: '30px', textAlign: 'left', maxWidth: '700px', margin: '0 auto 30px auto' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '6px' }}>1. Customize About Us</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Modify your main branding text and mission lines statement.</p>
          
          <label style={{ display: 'block', fontSize: '12px', color: '#38bdf8', textTransform: 'uppercase', fontWeight: '600', marginBottom: '10px' }}>Main About Us Description</label>
          <textarea 
            defaultValue="Hum businesses ko online grow karne mein help karte hain through smart aur result-oriented digital marketing solutions.&#10;&#10;Hamara goal brands, startups aur local businesses ko strong online presence dena hai, taaki woh zyada customers tak pahunch sakein aur apne business ko faster grow kar sakein."
            style={{ width: '100%', height: '150px', background: '#0d1527', border: '1px solid #1e293b', borderRadius: '8px', color: '#e2e8f0', padding: '15px', fontSize: '14px', lineHeight: '1.6', resize: 'none', outline: 'none' }}
          />
        </div>

        {/* Save Button */}
        <button onClick={() => alert("Settings successfully save ho gayi hain bhai! 👍")} style={{ display: 'block', width: '100%', maxWidth: '300px', margin: '0 auto', background: '#0091ff', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', cursor: 'pointer' }}>Save Configuration Permanent</button>
      </div>
    </div>
  );
};

export default Admin;