import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// 1. DYNAMIC NAVBAR MODULE (🚀 Fixed Alignment & Active Page Highlighting)
function Navbar() {
  const location = useLocation(); // Current active page url track karne ke liye

  // Function to return active color dynamically
  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      color: isActive ? '#ffffff' : '#94a3b8',
      fontWeight: isActive ? '700' : '500',
      textDecoration: 'none',
      fontSize: '15px',
      fontFamily: "'serif', Georgia, Times",
      transition: 'color 0.2s ease',
      position: 'relative',
      paddingBottom: '4px',
      borderBottom: isActive ? '2px solid #00a2ff' : '2px solid transparent' // Active link ke niche premium blue line
    };
  };

  return (
    <nav className="main-navbar" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '0 5%', 
      height: '75px', 
      backgroundColor: '#09111e', 
      borderBottom: '1px solid rgba(255, 255, 255, 0.04)', 
      color: '#fff',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 10
    }}>
      {/* Responsive Alignment Ke Liye Custom CSS Injector */}
      <style>{`
        @media (max-width: 650px) {
          .main-navbar {
            flex-direction: column !important;
            height: auto !important;
            padding: 15px 10px !important;
            gap: 15px !important;
          }
          .nav-links-box {
            gap: 18px !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            width: 100% !important;
          }
          .login-btn-nav {
            padding: 6px 14px !important;
            font-size: 13px !important;
          }
        }
      `}</style>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px', fontFamily: "'serif', Georgia, Times, 'Times New Roman'" }}>
          DigiGrow
        </span>
      </Link>
      
      {/* Links box jo active path ke according highlight hoga aur space out rahega */}
      <div className="nav-links-box" style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        <Link to="/" style={getLinkStyle('/')}>Home</Link>
        <Link to="/about" style={getLinkStyle('/about')}>About</Link>
        <Link to="/services" style={getLinkStyle('/services')}>Services</Link>
        <Link to="/find-us" style={getLinkStyle('/find-us')}>Find Us</Link>
        
        <Link to="/admin" className="login-btn-nav" style={{ 
          backgroundColor: '#00a2ff', 
          padding: '8px 22px', 
          borderRadius: '8px', 
          color: '#fff', 
          textDecoration: 'none', 
          fontSize: '14px', 
          fontWeight: '600',
          fontFamily: "'serif', Georgia, Times",
          borderBottom: location.pathname === '/admin' ? '2px solid #ffffff' : 'none'
        }}>
          Login
        </Link>
      </div>
    </nav>
  );
}

// 2. HOME COMPONENT WITH INTERACTIVE PARTICLES
function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let particlesArray = [];
    const mouse = { x: null, y: null, radius: 180 };

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        init();
      }
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffffff';
        ctx.fill();
        ctx.shadowBlur = 0; 
      }
      update() {
        this.x += this.directionX;
        this.y += this.directionY;
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (mouse.radius - distance) / mouse.radius;
            let speed = force * 3.5; 
            this.x += forceDirectionX * speed;
            this.y += forceDirectionY * speed;
          }
        }
        this.draw();
      }
    }

    const init = () => {
      particlesArray = [];
      let numberOfParticles = Math.floor((canvas.width * canvas.height) / 9000);
      if (numberOfParticles > 120) numberOfParticles = 120;
      if (numberOfParticles < 40) numberOfParticles = 40;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, '#ffffff'));
      }
    };

    canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    init();
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas && canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div style={{ padding: '0 24px', height: '100%', backgroundColor: '#09111e', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxSizing: 'border-box', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ zIndex: 2, maxWidth: '880px', padding: '0 10px' }}>
        <h1 style={{ fontSize: 'calc(32px + 2.4vw)', fontWeight: '900', marginBottom: '24px', letterSpacing: '-1px', lineHeight: '1.15', color: '#f8fafc', textShadow: '0 10px 30px rgba(0,0,0,0.5)', fontFamily: "'serif', Georgia, Times, 'Times New Roman'" }}>
          Welcome to <span style={{ background: 'linear-gradient(135deg, #00a2ff 0%, #00ffcc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0px 4px 20px rgba(0,162,255,0.3))' }}>DigiGrow</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 'calc(14px + 0.15vw)', maxWidth: '650px', lineHeight: '1.8', margin: '0 auto', fontWeight: '400', letterSpacing: '0.2px', textShadow: '0 4px 10px rgba(0,0,0,0.4)', fontFamily: "'serif', Georgia, Times, 'Times New Roman'" }}>
          Expert Digital Marketing Solutions For Your Business. Scale your digital footprint and dominate your market niche with our expert strategies.
        </p>
      </div>
    </div>
  );
}

// 3. ABOUTPAGE MODULE
function AboutPage() {
  const [aboutText, setAboutText] = useState("Hum businesses ko online grow karne mein help karte hain through smart aur result-oriented digital marketing solutions. Hamara goal brands, startups aur local businesses ko strong online presence dena hai, taaki woh zyada customers tak pahunch sakein aur apne business ko faster grow kar sakein. Hum har client ke business goals ke according customized marketing strategies provide karte hain.");

  useEffect(() => {
    const savedAbout = localStorage.getItem('admin_about_text');
    if (savedAbout && savedAbout.trim() !== "") {
      setAboutText(savedAbout);
    }
  }, []);

  return (
    <div style={{ padding: '40px 15px', minHeight: '85vh', backgroundColor: '#09111e', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: '#111b2d', padding: '35px 25px', borderRadius: '24px', maxWidth: '850px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.04)', textAlign: 'left', boxSizing: 'border-box' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '20px', color: '#ffffff', fontFamily: "'serif', Georgia, Times" }}>
          Who We Are & <span style={{ color: '#00a2ff' }}>What We Do</span>
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px', fontFamily: "'serif', Georgia, Times" }}>{aboutText}</p>
        <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.7', marginBottom: '30px', fontFamily: "'serif', Georgia, Times" }}>Hamari core mission startups, local brands aur established businesses ko ek strong digital foot-print dena hai, taaki aap sahi target audience tak pahunch sakein aur apne business ROI ko faster mode par grow sakein.</p>
        <h4 style={{ color: '#00a2ff', fontSize: '15px', fontWeight: '700', marginBottom: '15px', fontFamily: "'serif', Georgia, Times" }}>Hamari Core Expertise:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px 20px', color: '#ffffff', fontSize: '14px', lineHeight: '1.5', fontFamily: "'serif', Georgia, Times", fontWeight: '500' }}>
          <div><span style={{ color: '#00a2ff', marginRight: '8px' }}>✓</span> Social Media Management</div>
          <div><span style={{ color: '#00a2ff', marginRight: '8px' }}>✓</span> Search Engine Optimization (SEO)</div>
          <div><span style={{ color: '#00a2ff', marginRight: '8px' }}>✓</span> High-End Website Development</div>
          <div><span style={{ color: '#00a2ff', marginRight: '8px' }}>✓</span> Targeted Google & Meta Ads</div>
          <div><span style={{ color: '#00a2ff', marginRight: '8px' }}>✓</span> Content Strategy & Creation</div>
          <div><span style={{ color: '#00a2ff', marginRight: '8px' }}>✓</span> Corporate Brand Building</div>
        </div>
      </div>
    </div>
  );
}

// 4. SERVICESPAGE MODULE
function ServicesPage() {
  const [services, setServices] = useState({
    card1Title: 'Social Media Marketing', 
    card1Desc: 'Instagram Marketing\nFacebook Marketing',
    card2Title: 'Paid Advertising', 
    card2Desc: 'Google Ads\nFacebook Ads',
    card3Title: 'Website Development', 
    card3Desc: 'Website Design\nWebsite Development'
  });

  useEffect(() => {
    const saved = localStorage.getItem('admin_services_json');
    if (saved) { 
      try { 
        const parsed = JSON.parse(saved);
        if (parsed && parsed.card1Title) setServices(parsed); 
      } catch(e) {} 
    }
  }, []);

  return (
    <div style={{ padding: '50px 15px', minHeight: '85vh', backgroundColor: '#09111e', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
      <h2 style={{ fontSize: '30px', fontWeight: '700', marginBottom: '40px', color: '#ffffff', textAlign: 'center', fontFamily: "'serif', Georgia, Times" }}>
        Our <span style={{ color: '#00a2ff' }}>Services</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '25px', maxWidth: '1140px', width: '100%', boxSizing: 'border-box' }}>
        {[1, 2, 3].map(num => (
          <div key={num} style={{ backgroundColor: '#111b2d', padding: '35px 25px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.04)', boxSizing: 'border-box', textAlign: 'left' }}>
            <h3 style={{ fontSize: '19px', color: '#00a2ff', marginBottom: '15px', fontWeight: '700', letterSpacing: '-0.3px', fontFamily: "'serif', Georgia, Times" }}>
              {services[`card${num}Title`]}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.7', whiteSpace: 'pre-line', fontWeight: '400', fontFamily: "'serif', Georgia, Times" }}>
              {services[`card${num}Desc`]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. FINDUSPAGE MODULE
function FindUsPage() {
  const [findUs, setFindUs] = useState({ 
    location: 'Roshan Bagh Prayagraj', 
    email: 'anasknanprince1234@gmail.com', 
    call: '+91 7007684279' 
  });

  useEffect(() => {
    const saved = localStorage.getItem('admin_findus_json');
    if (saved) { 
      try { 
        const parsed = JSON.parse(saved);
        if (parsed && parsed.location) setFindUs(parsed); 
      } catch(e) {} 
    }
  }, []);

  return (
    <div style={{ padding: '60px 15px', minHeight: '85vh', backgroundColor: '#09111e', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: '#111b2d', padding: '40px 25px', borderRadius: '24px', maxWidth: '600px', width: '100%', textAlign: 'center', boxSizing: 'border-box', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.04)' }}>
        <h2 style={{ fontSize: '30px', marginBottom: '30px', fontWeight: '700', color: '#ffffff', fontFamily: "'serif', Georgia, Times" }}>
          Find <span style={{ color: '#00a2ff' }}>Us</span>
        </h2>
        <div style={{ textAlign: 'left', display: 'inline-block', fontSize: '14px', lineHeight: '2.0', fontFamily: "'serif', Georgia, Times" }}>
          <p style={{ color: '#94a3b8', margin: '10px 0' }}>📍 <strong style={{ color: '#fff' }}>Location:</strong> {findUs.location}</p>
          <p style={{ color: '#94a3b8', margin: '10px 0' }}>✉️ <strong style={{ color: '#fff' }}>Email:</strong> {findUs.email}</p>
          <p style={{ color: '#94a3b8', margin: '10px 0' }}>📞 <strong style={{ color: '#fff' }}>Call:</strong> {findUs.call}</p>
        </div>
      </div>
    </div>
  );
}

// 6. ADMIN PANEL
function Admin() {
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState(0);

  const [formAbout, setFormAbout] = useState('');
  const [formServices, setFormServices] = useState({
    card1Title: '', card1Desc: '',
    card2Title: '', card2Desc: '',
    card3Title: '', card3Desc: ''
  });
  const [formFindUs, setFormFindUs] = useState({ location: '', email: '', call: '' });

  useEffect(() => {
    if (sessionStorage.getItem('admin_session_auth') === 'true') setIsAuthorized(true);
    
    const savedLockout = localStorage.getItem('admin_lockout_expiry');
    const savedAttempts = localStorage.getItem('admin_failed_attempts');
    if (savedAttempts) setAttempts(parseInt(savedAttempts, 10));
    
    if (savedLockout) {
      const timeLeft = Math.ceil((parseInt(savedLockout, 10) - Date.now()) / 1000);
      if (timeLeft > 0) setLockoutTimeLeft(timeLeft);
    }

    setFormAbout(localStorage.getItem('admin_about_text') || "Hum businesses ko online grow karne mein help karte hain...");
    try { 
      setFormServices(JSON.parse(localStorage.getItem('admin_services_json')) || {
        card1Title: 'Social Media Marketing', card1Desc: 'Instagram Marketing\nFacebook Marketing',
        card2Title: 'Paid Advertising', card2Desc: 'Google Ads\nFacebook Ads',
        card3Title: 'Website Development', card3Desc: 'Website Design\nWebsite Development'
      }); 
    } catch(e){}
    try { 
      setFormFindUs(JSON.parse(localStorage.getItem('admin_findus_json')) || { 
        location: 'Roshan Bagh Prayagraj', email: 'anasknanprince1234@gmail.com', call: '+91 7007684279' 
      }); 
    } catch(e){}
  }, []);

  useEffect(() => {
    if (lockoutTimeLeft <= 0) return;
    const timer = setInterval(() => {
      setLockoutTimeLeft(prev => {
        if (prev <= 1) {
          localStorage.removeItem('admin_lockout_expiry');
          localStorage.removeItem('admin_failed_attempts');
          setAttempts(0);
          setLoginError('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutTimeLeft]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === 'bhai163') {
      setIsAuthorized(true);
      setAttempts(0);
      setLoginError('');
      localStorage.removeItem('admin_failed_attempts');
      sessionStorage.setItem('admin_session_auth', 'true');
    } else {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setPasswordInput('');
      
      if (nextAttempts >= 3) {
        const expiryTime = Date.now() + 7200000;
        localStorage.setItem('admin_lockout_expiry', expiryTime.toString());
        localStorage.setItem('admin_failed_attempts', '3');
        setLockoutTimeLeft(7200);
        setLoginError('Brute-force detected! Panel Locked for 2 hours.');
      } else {
        localStorage.setItem('admin_failed_attempts', nextAttempts.toString());
        setLoginError(`Incorrect Password! (${3 - nextAttempts} attempts remaining)`);
      }
    }
  };

  const handleSaveAllSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('admin_about_text', formAbout);
    localStorage.setItem('admin_services_json', JSON.stringify(formServices));
    localStorage.setItem('admin_findus_json', JSON.stringify(formFindUs));
    alert('Bhai, saara data kamyabi se save ho gaya hai!');
    window.location.reload();
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: '#09111e',
    border: '1px solid #1e2d4a',
    borderRadius: '10px',
    color: '#fff',
    padding: '12px',
    fontSize: '14px',
    marginBottom: '15px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    textAlign: 'left',
    fontSize: '14px',
    color: '#00a2ff',
    fontWeight: '600',
    marginBottom: '6px',
    fontFamily: "'serif', Georgia, Times"
  };

  if (lockoutTimeLeft > 0) {
    return (
      <div style={{ padding: '20px', minHeight: '85vh', backgroundColor: '#09111e', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ backgroundColor: '#111b2d', padding: '40px 20px', borderRadius: '24px', textAlign: 'center', maxWidth: '420px', width: '100%', border: '1px solid #ef4444', boxSizing: 'border-box' }}>
          <h3 style={{ color: '#ef4444', marginBottom: '15px', fontSize: '20px', fontFamily: "'serif', Georgia, Times" }}>Security Lockout Active</h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px', lineHeight: '1.5' }}>3 baar galat password daala gaya hai. Panel temporary locked hai.</p>
          <div style={{ backgroundColor: '#09111e', padding: '15px', borderRadius: '12px', fontSize: '24px', color: '#00ffcc', fontWeight: '800', border: '1px solid rgba(0,255,204,0.1)' }}>
            {Math.floor(lockoutTimeLeft / 3600)}:{(Math.floor((lockoutTimeLeft % 3600) / 60)).toString().padStart(2,'0')}:{(lockoutTimeLeft % 60).toString().padStart(2,'0')}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div style={{ padding: '20px', minHeight: '85vh', backgroundColor: '#09111e', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <form onSubmit={handleLoginSubmit} style={{ backgroundColor: '#111b2d', padding: '35px 25px', borderRadius: '24px', textAlign: 'center', width: '100%', maxWidth: '380px', border: '1px solid rgba(255,255,255,0.04)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', boxSizing: 'border-box' }}>
          <h3 style={{ marginBottom: '20px', fontFamily: "'serif', Georgia, Times", fontSize: '22px' }}>Admin Dashboard</h3>
          <input type="password" placeholder="Enter Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} style={inputStyle} />
          {loginError && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '15px', fontWeight: '500' }}>{loginError}</p>}
          <button type="submit" style={{ width: '100%', backgroundColor: '#00a2ff', color: '#fff', border: 'none', padding: '13px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: "'serif', Georgia, Times" }}>Unlock Panel</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 15px', minHeight: '85vh', backgroundColor: '#09111e', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box' }}>
      <style>{`
        .responsive-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px; }
        .responsive-find-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; }
        @media (max-width: 680px) {
          .responsive-card-grid { grid-template-columns: 1fr !important; gap: 5px !important; }
          .responsive-find-grid { grid-template-columns: 1fr !important; gap: 5px !important; }
          .admin-box-card { padding: 30px 20px !important; }
        }
      `}</style>

      <div className="admin-box-card" style={{ backgroundColor: '#111b2d', padding: '45px 40px', borderRadius: '24px', maxWidth: '750px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.04)', textAlign: 'center', boxSizing: 'border-box' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '30px', color: '#ffffff', fontFamily: "'serif', Georgia, Times" }}>
          Dashboard <span style={{ color: '#00a2ff' }}>Control Panel</span>
        </h2>
        <form onSubmit={handleSaveAllSettings}>
          <div style={{ marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
            <label style={labelStyle}>Edit About Text Description:</label>
            <textarea rows="4" value={formAbout} onChange={(e) => setFormAbout(e.target.value)} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'sans-serif' }} />
          </div>
          <div style={{ marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
            <h4 style={{ ...labelStyle, color: '#fff', fontSize: '15px', marginBottom: '15px' }}>Edit Services Content:</h4>
            {[1, 2, 3].map(i => (
              <div key={i} className="responsive-card-grid">
                <div>
                  <label style={{ ...labelStyle, fontSize: '12px' }}>Card {i} Title</label>
                  <input type="text" value={formServices[`card${i}Title`]} onChange={(e) => setFormServices({...formServices, [`card${i}Title`]: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={{ ...labelStyle, fontSize: '12px' }}>Card {i} Description</label>
                  <textarea rows="2" value={formServices[`card${i}Desc`]} onChange={(e) => setFormServices({...formServices, [`card${i}Desc`]: e.target.value})} style={{ ...inputStyle, fontFamily: 'sans-serif' }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ ...labelStyle, color: '#fff', fontSize: '15px', marginBottom: '15px' }}>Edit Find Us Info:</h4>
            <div className="responsive-find-grid">
              <div>
                <label style={{ ...labelStyle, fontSize: '12px' }}>Location</label>
                <input type="text" value={formFindUs.location} onChange={(e) => setFormFindUs({...formFindUs, location: e.target.value})} style={inputStyle} />
              </div>
              <div>
                <label style={{ ...labelStyle, fontSize: '12px' }}>Email Address</label>
                <input type="text" value={formFindUs.email} onChange={(e) => setFormFindUs({...formFindUs, email: e.target.value})} style={inputStyle} />
              </div>
              <div>
                <label style={{ ...labelStyle, fontSize: '12px' }}>Call Number</label>
                <input type="text" value={formFindUs.call} onChange={(e) => setFormFindUs({...formFindUs, call: e.target.value})} style={inputStyle} />
              </div>
            </div>
          </div>
          <button type="submit" style={{ backgroundColor: '#00a2ff', color: '#fff', border: 'none', padding: '14px 35px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'serif', Georgia, Times", boxShadow: '0 4px 15px rgba(0,162,255,0.3)', width: '100%', maxWidth: '300px' }}>
            Save All Settings Live
          </button>
        </form>
      </div>
    </div>
  );
}

// 7. GLOBAL MASTER ROUTER CONTROL
function App() {
  return (
    <div style={{ backgroundColor: '#09111e', height: '100vh', width: '100vw', margin: 0, padding: 0, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, overflow: 'hidden' }}>
      <style>{`
        body, html, #root {
          background-color: #09111e !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>
      
      <Navbar />
      <div style={{ flex: '1', width: '100%', height: 'calc(100vh - 75px)', overflowY: 'auto', overflowX: 'hidden' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/find-us" element={<FindUsPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;