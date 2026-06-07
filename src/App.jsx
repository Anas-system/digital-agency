import React, { useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

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
  return (
    <div style={{ padding: '40px 20px', minHeight: '85vh', backgroundColor: '#090f1c', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: '#121a2e', padding: '40px 30px', borderRadius: '24px', maxWidth: '850px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'left' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '20px', color: '#ffffff' }}>Who We Are & <span style={{ color: '#00a2ff' }}>What We Do</span></h2>
        <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.7', marginBottom: '20px' }}>Hum businesses ko online grow karne mein help karte hain through smart aur result-oriented digital marketing solutions.</p>
        <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.7', marginBottom: '30px' }}>Hamara core mission startups, local brands aur established businesses ko ek strong digital foot-print dena hai, taaki aap sahi target audience tak pahunch sakein aur apne business ROI ko faster mode par grow sakein. Hum har ek client ki specific requirements ke mutabik tailored solutions design karte hain.</p>
        <h4 style={{ color: '#00a2ff', fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Hamari Core Expertise:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px 25px', color: '#e2e8f0', fontSize: '14px', lineHeight: '1.5' }}>
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

// 4. SERVICESPAGE MODULE (Pure Hardcoded - image_772bcd.png Standard)
function ServicesPage() {
  return (
    <div style={{ padding: '60px 4%', minHeight: '85vh', backgroundColor: '#090f1c', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
      <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '50px', fontFamily: "'serif', Georgia, Times, 'Times New Roman'" }}>Our Services</h2>
      <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px', width: '100%' }}>
        
        <div style={{ backgroundColor: '#111726', padding: '35px 30px', borderRadius: '18px', flex: '1', minWidth: '280px', boxSizing: 'border-box', textAlign: 'left' }}>
          <h3 style={{ fontSize: '18px', color: '#00a2ff', marginBottom: '20px', fontWeight: '700' }}>Social Media Marketing</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-line' }}>Instagram Marketing{"\n"}Facebook Marketing</p>
        </div>

        <div style={{ backgroundColor: '#111726', padding: '35px 30px', borderRadius: '18px', flex: '1', minWidth: '280px', boxSizing: 'border-box', textAlign: 'left' }}>
          <h3 style={{ fontSize: '18px', color: '#00a2ff', marginBottom: '20px', fontWeight: '700' }}>Paid Advertising</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-line' }}>Google Ads{"\n"}Facebook Ads</p>
        </div>

        <div style={{ backgroundColor: '#111726', padding: '35px 30px', borderRadius: '18px', flex: '1', minWidth: '280px', boxSizing: 'border-box', textAlign: 'left' }}>
          <h3 style={{ fontSize: '18px', color: '#00a2ff', marginBottom: '20px', fontWeight: '700' }}>Website Development</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-line' }}>Website Design{"\n"}Website Development</p>
        </div>

      </div>
    </div>
  );
}

// 5. FINDUSPAGE MODULE (Pure Hardcoded - image_772bad.png Standard)
function FindUsPage() {
  return (
    <div style={{ padding: '60px 20px', minHeight: '85vh', backgroundColor: '#090f1c', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: '#111726', padding: '50px 40px', borderRadius: '20px', maxWidth: '550px', width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '35px', fontWeight: '700', fontFamily: "'serif', Georgia, Times, 'Times New Roman'" }}>Find Us</h2>
        <div style={{ textAlign: 'left', display: 'inline-block', fontSize: '14px', lineHeight: '2' }}>
          <p style={{ color: '#94a3b8', margin: '10px 0' }}>📍 <strong style={{ color: '#fff' }}>Location:</strong> Roshan Bagh Prayagraj</p>
          <p style={{ color: '#94a3b8', margin: '10px 0' }}>✉️ <strong style={{ color: '#fff' }}>Email:</strong> anasknanprince1234@gmail.com</p>
          <p style={{ color: '#94a3b8', margin: '10px 0' }}>📞 <strong style={{ color: '#fff' }}>Call:</strong> +91 7007684279</p>
        </div>
      </div>
    </div>
  );
}

// 6. ADMIN SYSTEM FRAMEWORK (Standard Interface Keep Safe)
function Admin() {
  return (
    <div style={{ padding: '40px 20px', minHeight: '85vh', backgroundColor: '#090f1c', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#121a2e', padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
        <h3>Admin System Settings</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Framework is running in native deployment override mode.</p>
      </div>
    </div>
  );
}

// 7. GLOBAL MASTER ROUTER CONTROL
function App() {
  return (
    <div style={{ backgroundColor: '#090f1c', height: '100vh', width: '100vw', margin: 0, padding: 0, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, overflow: 'hidden' }}>
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