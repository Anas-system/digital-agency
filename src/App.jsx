import React, { useEffect, useRef, useState } from 'react';
// 🚀 Version 5 ke mutabik Switch aur Router imports
import { Switch, Route, Link } from 'react-router-dom';

// 1. DYNAMIC NAVBAR MODULE
function Navbar() {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '0 5%', 
      height: '75px', 
      backgroundColor: '#090f1c', 
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
      color: '#fff',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 10
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px' }}>
          DigiGrow
        </span>
      </Link>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link to="/about" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>About</Link>
        <Link to="/services" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>Services</Link>
        <Link to="/find-us" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>Find Us</Link>
        <Link to="/admin" style={{ 
          backgroundColor: '#00a2ff', 
          padding: '9px 24px', 
          borderRadius: '8px', 
          color: '#fff', 
          textDecoration: 'none', 
          fontSize: '14px', 
          fontWeight: '600'
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
    <div style={{ padding: '0 24px', height: '100%', backgroundColor: '#090f1c', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxSizing: 'border-box', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ zIndex: 2, maxWidth: '880px', padding: '0 10px' }}>
        <h1 style={{ fontSize: 'calc(36px + 2.4vw)', fontWeight: '900', marginBottom: '24px', letterSpacing: '-1px', lineHeight: '1.15', color: '#f8fafc', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          Welcome to <span style={{ background: 'linear-gradient(135deg, #00a2ff 0%, #00ffcc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0px 4px 20px rgba(0,162,255,0.3))' }}>DigiGrow</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 'calc(15px + 0.15vw)', maxWidth: '650px', lineHeight: '1.8', margin: '0 auto', fontWeight: '400', letterSpacing: '0.2px', textShadow: '0 4px 10px rgba(0,0,0,0.4)' }}>
          Expert Digital Marketing Solutions For Your Business. Scale your digital footprint and dominate your market niche with our expert strategies.
        </p>
      </div>
    </div>
  );
}

// 3. ABOUTPAGE MODULE
function AboutPage() {
  const [aboutText, setAboutText] = useState("Hum aapke business ko online scale karne aur brand value build karne mein madad karte hain through custom, data-driven aur result-oriented digital marketing strategies.");
  useEffect(() => {
    const savedAbout = localStorage.getItem('admin_about_text');
    if (savedAbout) setAboutText(savedAbout);
  }, []);

  return (
    <div style={{ padding: '40px 20px', minHeight: '85vh', backgroundColor: '#090f1c', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: '#121a2e', padding: '40px 30px', borderRadius: '24px', maxWidth: '850px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'left' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '20px', color: '#ffffff' }}>Who We Are & <span style={{ color: '#00a2ff' }}>What We Do</span></h2>
        <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.7', marginBottom: '20px' }}>{aboutText}</p>
        <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.7', marginBottom: '30px' }}>Hamara core mission startups, local brands aur established businesses ko ek strong digital foot-print dena hai, taaki aap sahi target audience tak pahunch sakein aur apne business ROI ko faster mode par grow sakein.</p>
        <h4 style={{ color: '#00a2ff', fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Hamari Core Expertise:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px 25px', color: '#e2e8f0', fontSize: '14px', lineHeight: '1.5' }}>
          <div><span style={{ color: '#00a2ff', marginRight: '8px' }}>✓</span> Social Media Management</div>
          <div><span style={{ color: '#00a2ff', marginRight: '8px' }}>✓</span> Search Engine Optimization (SEO)</div>
          <div><span style={{ color: '#00a2ff', marginRight: '8px' }}>✓</span> High-End Website Development</div>
          <div><span style={{ color: '#00a2ff', marginRight: '8px' }}>✓</span> Targeted Google & Meta Ads</div>
        </div>
      </div>
    </div>
  );
}

// 4. SERVICESPAGE MODULE
function ServicesPage() {
  const [services, setServices] = useState({
    card1Title: 'Social Media Marketing', card1Desc: 'Instagram Marketing\nFacebook Marketing\nLinkedIn Marketing',
    card2Title: 'Paid Advertising', card2Desc: 'Google Ads\nFacebook Ads\nInstagram Ads',
    card3Title: 'Website Development', card3Desc: 'Website Design\nWebsite Development\nWebsite Maintenance'
  });
  useEffect(() => {
    const saved = localStorage.getItem('admin_services_json');
    if (saved) { try { setServices(JSON.parse(saved)); } catch(e) {} }
  }, []);

  return (
    <div style={{ padding: '60px 20px', minHeight: '85vh', backgroundColor: '#090f1c', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyY: 'center' }}>
      <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '40px' }}>Our Services</h2>
      <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1100px', width: '100%' }}>
        {[1, 2, 3].map(num => (
          <div key={num} style={{ backgroundColor: '#121a2e', padding: '30px', borderRadius: '20px', flex: '1', minWidth: '280px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', color: '#00a2ff', marginBottom: '15px' }}>{services[`card${num}Title`]}</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{services[`card${num}Desc`]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. FINDUSPAGE MODULE
function FindUsPage() {
  const [findUs, setFindUs] = useState({ location: 'Roshan Bagh Prayagraj', email: 'anasknanprince1234@gmail.com', call: '+91 7007684279' });
  useEffect(() => {
    const saved = localStorage.getItem('admin_findus_json');
    if (saved) { try { setFindUs(JSON.parse(saved)); } catch(e) {} }
  }, []);

  return (
    <div style={{ padding: '60px 20px', minHeight: '85vh', backgroundColor: '#090f1c', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#121a2e', padding: '40px', borderRadius: '24px', maxWidth: '500px', width: '100%', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '25px' }}>Find Us</h2>
        <p style={{ color: '#94a3b8', marginBottom: '12px' }}>📍 <strong>Location:</strong> {findUs.location}</p>
        <p style={{ color: '#94a3b8', marginBottom: '12px' }}>✉️ <strong>Email:</strong> {findUs.email}</p>
        <p style={{ color: '#94a3b8' }}>📞 <strong>Call:</strong> {findUs.call}</p>
      </div>
    </div>
  );
}

// 6. ADMIN SECURITY MODULE
function Admin() {
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState(0);
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem('admin_session_auth') === 'true') setIsAuthorized(true);
    const savedLockout = localStorage.getItem('admin_lockout_expiry');
    const savedAttempts = localStorage.getItem('admin_failed_attempts');
    if (savedAttempts) setAttempts(parseInt(savedAttempts, 10));
    
    if (savedLockout) {
      const timeLeft = Math.ceil((parseInt(savedLockout, 10) - Date.now()) / 1000);
      if (timeLeft > 0) setLockoutTimeLeft(timeLeft);
    }
    setAboutText(localStorage.getItem('admin_about_text') || "Hum aapke business ko online scale karne aur brand value build karne mein madad karte hain...");
  }, []);

  useEffect(() => {
    if (lockoutTimeLeft <= 0) return;
    const timer = setInterval(() => {
      setLockoutTimeLeft(prev => {
        if (prev <= 1) {
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === 'bhai163') {
      setIsAuthorized(true);
      setAttempts(0);
      localStorage.removeItem('admin_failed_attempts');
      sessionStorage.setItem('admin_session_auth', 'true');
    } else {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setPasswordInput('');
      if (nextAttempts >= 3) {
        localStorage.setItem('admin_lockout_expiry', (Date.now() + 7200000).toString());
        localStorage.setItem('admin_failed_attempts', '3');
        setLockoutTimeLeft(7200);
        setLoginError('Brute-force detected! Locked for 2 hours.');
      } else {
        localStorage.setItem('admin_failed_attempts', nextAttempts.toString());
        setLoginError(`Incorrect Password! (${3 - nextAttempts} attempts remaining)`);
      }
    }
  };

  const handleSaveAll = () => {
    localStorage.setItem('admin_about_text', aboutText);
    alert('Bhai, saara data save ho gaya!');
  };

  if (lockoutTimeLeft > 0) {
    return (
      <div style={{ padding: '20px', minHeight: '85vh', backgroundColor: '#090f1c', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ backgroundColor: '#121a2e', padding: '40px', borderRadius: '24px', textAlign: 'center', border: '1px solid #ef4444' }}>
          <h3 style={{ color: '#ef4444', marginBottom: '10px' }}>Security Lockout Active</h3>
          <div style={{ backgroundColor: '#090f1c', padding: '15px', borderRadius: '12px', fontSize: '24px', color: '#00ffcc', fontWeight: '800' }}>
            {Math.floor(lockoutTimeLeft / 3600)}:{(Math.floor((lockoutTimeLeft % 3600) / 60)).toString().padStart(2,'0')}:{(lockoutTimeLeft % 60).toString().padStart(2,'0')}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div style={{ padding: '20px', minHeight: '85vh', backgroundColor: '#090f1c', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <form onSubmit={handleLoginSubmit} style={{ backgroundColor: '#121a2e', padding: '40px', borderRadius: '24px', textAlign: 'center', width: '100%', maxWidth: '380px' }}>
          <h3 style={{ marginBottom: '20px' }}>Admin Panel Lock</h3>
          <input type="password" placeholder="Enter Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} style={{ width: '100%', backgroundColor: '#090f1c', border: '1px solid #1e2d4a', borderRadius: '12px', color: '#fff', padding: '14px', textAlign: 'center', marginBottom: '15px', outline: 'none' }} />
          {loginError && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '15px' }}>{loginError}</p>}
          <button type="submit" style={{ width: '100%', backgroundColor: '#00a2ff', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }}>Unlock Dashboard</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', minHeight: '100vh', backgroundColor: '#090f1c', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px' }}>
      <h2 style={{ width: '100%', maxWidth: '700px', textAlign: 'left' }}>Admin Dashboard</h2>
      <div style={{ width: '100%', maxWidth: '700px', backgroundColor: '#121a2e', padding: '20px', borderRadius: '16px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>About Page Text:</label>
        <textarea value={aboutText} onChange={(e) => setAboutText(e.target.value)} style={{ width: '100%', height: '80px', backgroundColor: '#090f1c', color: '#fff', border: '1px solid #1e2d4a', borderRadius: '8px', padding: '10px', outline: 'none' }} />
      </div>
      <button onClick={handleSaveAll} style={{ width: '100%', maxWidth: '700px', backgroundColor: '#00a2ff', color: '#fff', border: 'none', padding: '15px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }}>Save Changes</button>
    </div>
  );
}

// 7. GLOBAL ROUTER CONTROLLER (v5 Switch & Route architecture)
function App() {
  return (
    <div style={{ backgroundColor: '#090f1c', height: '100vh', width: '100vw', margin: 0, padding: 0, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, overflow: 'hidden' }}>
      <Navbar />
      <div style={{ flex: '1', width: '100%', height: 'calc(100vh - 75px)', overflowY: 'auto', overflowX: 'hidden' }}>
        {/* 🚀 VERSION 5 COMPATIBLE ROUTING ENGINE */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={AboutPage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/find-us" component={FindUsPage} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </div>
    </div>
  );
}

export default App;