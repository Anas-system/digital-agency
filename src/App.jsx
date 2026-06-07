import React, { useState, useEffect, useRef } from 'react';

// ===================================================
// 1. PREMIUM SOFT-DARK SYSTEM DESIGN STYLES WITH GLOW
// ===================================================
const styles = {
  main: { 
    backgroundColor: '#0b0f19', 
    minHeight: '100vh', 
    color: '#f1f5f9', 
    fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif",
    overflowX: 'hidden', 
    position: 'relative',
    scrollBehavior: 'smooth',
    WebkitTapHighlightColor: 'transparent',
    width: '100%'
  },
  canvasContainer: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    height: '100%', width: '100%',
    zIndex: 1, pointerEvents: 'none'
  },
  ambientLighting: {
    position: 'fixed', top: '10%', left: '50%', transform: 'translate(-50%, -50%)',
    width: '120vw', height: '60vh',
    background: 'radial-gradient(circle at 50% 30%, rgba(56,189,248,0.12) 0%, rgba(99,102,241,0.04) 50%, transparent 100%)',
    pointerEvents: 'none', zIndex: 2
  },
  header: {
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    backgroundColor: 'rgba(11, 15, 25, 0.8)', 
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255,255,255,0.05)',
    transition: 'all 0.3s ease',
    width: '100%'
  },
  // FIXED ALIGNMENT: Proper spacing structure to avoid edge spilling
  navbar: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '16px 5%',
    maxWidth: '1280px',
    margin: '0 auto',
    gap: '20px',
    boxSizing: 'border-box'
  },
  logoWrapper: { 
    display: 'flex', 
    alignItems: 'center', 
    cursor: 'pointer', 
    textDecoration: 'none',
    outline: 'none',
    border: 'none',
    WebkitTapHighlightColor: 'transparent',
    flexShrink: 0
  },
  logoText: { 
    fontSize: '26px', 
    fontWeight: '800', 
    letterSpacing: '-1px',
    color: '#38bdf8', 
    userSelect: 'none',
    textShadow: '0 0 20px rgba(56,189,248,0.3)'
  },
  // FIXED LAYER SHIFT: Combined flexible structure preventing overlapping
  navRightContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px', 
    listStyle: 'none',
    padding: 0,
    margin: 0,
    flexWrap: 'nowrap'
  },
  linkButton: { 
    color: '#94a3b8', 
    background: 'transparent',
    backgroundColor: 'transparent',
    border: '1px solid transparent', 
    fontSize: '14px', 
    fontWeight: '500', 
    transition: 'all 0.25s ease', 
    padding: '8px 16px', 
    position: 'relative', 
    letterSpacing: '0.3px', 
    cursor: 'pointer',
    fontFamily: "'Source Serif 4', serif",
    outline: 'none',
    borderRadius: '20px', 
    boxShadow: 'none',
    WebkitTapHighlightColor: 'transparent',
    whiteSpace: 'nowrap'
  },
  activeLink: { 
    color: '#38bdf8 !important', 
    fontWeight: '600',
    background: 'rgba(56, 189, 248, 0.12) !important',
    backgroundColor: 'rgba(56, 189, 248, 0.12) !important',
    border: '1px solid rgba(56, 189, 248, 0.3) !important',
    textShadow: '0 0 10px rgba(56,189,248,0.4)',
    boxShadow: '0 4px 15px rgba(56, 189, 248, 0.08)'
  },
  auditBtn: { 
    padding: '8px 18px', 
    background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)', 
    border: '1px solid rgba(255,255,255,0.1)', 
    borderRadius: '20px', 
    color: 'white', 
    fontWeight: '600', 
    cursor: 'pointer', 
    fontSize: '13px',
    boxShadow: '0 4px 14px rgba(14,165,233,0.2)', 
    transition: 'all 0.3s ease',
    fontFamily: "'Source Serif 4', serif",
    whiteSpace: 'nowrap',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
    marginLeft: '6px',
    flexShrink: 0
  },
  scrollSection: {
    minHeight: '100vh', 
    paddingTop: '150px', 
    paddingBottom: '80px',
    paddingLeft: '5%',
    paddingRight: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10,
    boxSizing: 'border-box',
    borderBottom: '1px solid rgba(255, 255, 255, 0.02)',
    width: '100%'
  },
  viewWrapper: { 
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    boxSizing: 'border-box'
  },
  heroSection: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%', position: 'relative', zIndex: 20 },
  sectionHeader: { textAlign: 'center', marginBottom: '50px', width: '100%' },
  hugeTitle: { fontSize: 'clamp(32px, 7vw, 64px)', fontWeight: '700', lineHeight: '1.25', letterSpacing: '-1px', marginBottom: '24px', width: '100%', color: '#ffffff' },
  gradientBlueText: { color: '#38bdf8' },
  subtitleText: { color: '#94a3b8', fontSize: 'clamp(15px, 3.8vw, 20px)', maxWidth: '760px', lineHeight: '1.7', margin: '0 auto', fontWeight: '300', width: '100%' },
  topBadge: {
    background: 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(99,102,241,0.1) 100%)',
    border: '1px solid rgba(56,189,248,0.3)',
    borderRadius: '30px',
    padding: '6px 16px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#38bdf8',
    letterSpacing: '0.5px',
    marginBottom: '24px',
    display: 'inline-block',
    boxShadow: '0 4px 20px rgba(56,189,248,0.15)',
    textTransform: 'uppercase'
  },
  
  glassCard: {
    backgroundColor: 'rgba(17, 24, 39, 0.45)', 
    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '20px', padding: 'clamp(20px, 5vw, 40px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)', transition: 'all 0.3s ease', width: '100%',
    boxSizing: 'border-box'
  },
  metricCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.35)', border: '1px solid rgba(255, 255, 255, 0.03)',
    borderRadius: '14px', padding: '25px', transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden', width: '100%', boxSizing: 'border-box'
  },
  gridContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', width: '100%', marginTop: '40px', boxSizing: 'border-box' },
  toast: {
    position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#0b1329',
    borderLeft: '4px solid #38bdf8', borderTop: '1px solid rgba(255,255,255,0.04)',
    borderRight: '1px solid rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
    padding: '14px 20px', borderRadius: '6px', boxShadow: '0 20px 45px rgba(0,0,0,0.6)',
    zIndex: 9999, display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontSize: '14px'
  },
  
  adminOverlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(3, 7, 18, 0.85)', backdropFilter: 'blur(16px)',
    zIndex: 99999, display: 'flex', alignItems: 'center',
    justifyContent: 'center', padding: '20px', boxSizing: 'border-box'
  },
  adminModal: {
    backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px', padding: '30px', maxWidth: '650px', width: '100%',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', maxHeight: '90vh', overflowY: 'auto'
  },
  adminInput: {
    width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: '#020617', color: '#fff', fontSize: '14px', outline: 'none', marginTop: '6px',
    marginBottom: '16px', fontFamily: 'sans-serif'
  },
  adminLabel: { fontSize: '12px', color: '#38bdf8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' },
  adminSectionDivider: { borderTop: '1px solid rgba(255,255,255,0.1)', margin: '20px 0 15px 0', paddingTop: '10px', color: '#e2e8f0', fontSize: '14px', fontWeight: 'bold' }
};

const responsiveStyles = `
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    background-color: #0b0f19 !important;
    overflow-x: hidden !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
  * {
    box-sizing: border-box !important;
  }
  .nav-custom-btn {
    background-color: transparent !important;
    background: transparent !important;
  }
  .nav-custom-btn:hover {
    color: #38bdf8 !important;
    background-color: rgba(56, 189, 248, 0.06) !important;
    border: 1px solid rgba(56, 189, 248, 0.15) !important;
  }
  .login-btn-glow:hover {
    transform: translateY(-1px) !important;
    box-shadow: 0 0 35px rgba(14,165,233,0.55) !important;
  }
  
  /* FIXED RESPONSIVE GRID OVERLAP LOGIC */
  @media (max-width: 768px) {
    .navbar-container-box {
      flex-direction: column !important;
      gap: 14px !important;
      padding: 14px 4% !important;
    }
    .right-nav-wrapper {
      width: 100% !important;
      flex-direction: row !important;
      justify-content: center !important;
      align-items: center !important;
      gap: 6px !important;
      flex-wrap: wrap !important;
    }
    .right-nav-wrapper li {
      display: inline-block !important;
    }
    .right-nav-wrapper button {
      padding: 6px 10px !important;
      font-size: 13px !important;
    }
  }
`;

// ==========================================================
// 2. EXCLUSIVE SOFT WHITE ANIMATION FOR HOME ONLY
// ==========================================================
const HomeWhiteAnimationEngine = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);
    let mouse = { x: null, y: null, radius: 140 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = 75; 

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35, 
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.5
      });
    }

    const renderLoop = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 1.0;
            p.y += Math.sin(angle) * force * 1.0;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.18)'; 
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = ((120 - dist) / 120) * 0.12; 
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`; 
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <div style={styles.canvasContainer}><canvas ref={canvasRef} /></div>;
};

// ===================================================
// 3. MAIN APP MODULE
// ===================================================
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [toast, setToast] = useState({ visible: false, message: '' });
  
  const [liveData, setLiveData] = useState({
    homeTitle: "Welcome to",
    homeSubtitle: "Expert Digital Marketing Solutions For Your Business. Hum aapke business ko online grow karne aur zyaada se zyaada customers tak pahunchane mein madad karte hain.",
    aboutHeader: "Who We Are & What We Do",
    aboutSubtitle: "Bina kisi jhanjhat ke marketing aur simple data analytics jisse aapka business grow kare.",
    aboutDesc: "Hamari core mission startups, local brands aur established businesses ko ek strong digital footprint dena hai. Hum aapke sahi customers ko target karte hain, website ko optimize karte hain aur aise marketing systems banate hain jisse aapka business har taraf popular ho sake.",
    service1Title: "Social Media Marketing",
    service1Desc: "Aapke brand ki popularity badhane ke liye sahi timing par post scheduling aur audience engagement.",
    service2Title: "Paid Advertising",
    service2Desc: "Google aur Meta Ads ke zyaada se zyaada conversion laane wale targeted ads jo kam budget mein accha result edin.",
    service3Title: "Website Development",
    service3Desc: "Fast aur responsive websites jo users ko bhatkaye bina seedhe leads generate karne mein help karein.",
    contactLocation: "Roshan Bagh, Prayagraj",
    contactEmail: "anasknanprince1234@gmail.com",
    contactPhone: "+91 7007684279",
    happyCustomersText: "1000+ Happy Customers"
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const [failedAttempts, setFailedAttempts] = useState(() => {
    return parseInt(localStorage.getItem('admin_failed_attempts') || '0', 10);
  });
  const [lockUntil, setLockUntil] = useState(() => {
    return parseInt(localStorage.getItem('admin_lock_timestamp') || '0', 10);
  });
  const [timeLeft, setTimeLeft] = useState(0);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const findUsRef = useRef(null);

  useEffect(() => {
    const fontNode = document.createElement('style');
    fontNode.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap');
    ${responsiveStyles}`; 
    document.head.appendChild(fontNode);
    return () => document.head.removeChild(fontNode);
  }, []);

  useEffect(() => {
    if (lockUntil <= 0) return;

    const calculateTime = () => {
      const remainingTime = Math.ceil((lockUntil - Date.now()) / 1000);
      if (remainingTime <= 0) {
        setLockUntil(0);
        setFailedAttempts(0);
        localStorage.removeItem('admin_lock_timestamp');
        localStorage.setItem('admin_failed_attempts', '0');
        setTimeLeft(0);
        triggerToast("Lockout expired. Security panel open.");
      } else {
        setTimeLeft(remainingTime);
      }
    };

    calculateTime();
    const timerId = setInterval(calculateTime, 1000);
    return () => clearInterval(timerId);
  }, [lockUntil]);

  useEffect(() => {
    const sectionRefs = [
      { id: 'home', ref: homeRef },
      { id: 'about', ref: aboutRef },
      { id: 'services', ref: servicesRef },
      { id: 'find-us', ref: findUsRef },
    ];
    const observerOptions = { root: null, rootMargin: '-20% 0px -50% 0px', threshold: 0 };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionRefs.forEach((item) => { if (item.ref.current) observer.observe(item.ref.current); });
    return () => observer.disconnect();
  }, []);

  const triggerToast = (msg) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: '' }), 4000);
  };

  const scrollToNode = (elementRef) => {
    window.scrollTo({ top: elementRef.current.offsetTop - 85, behavior: 'smooth' });
  };

  const handleAuthVerify = (e) => {
    e.preventDefault();
    if (Date.now() < lockUntil) {
      triggerToast(`Console locked.`);
      return;
    }

    if (passcode === 'bhai163') { 
      setIsAuthorized(true);
      setFailedAttempts(0);
      localStorage.setItem('admin_failed_attempts', '0');
      triggerToast("Access granted successfully!");
    } else {
      const updatedAttempts = failedAttempts + 1;
      setFailedAttempts(updatedAttempts);
      localStorage.setItem('admin_failed_attempts', updatedAttempts.toString());

      if (updatedAttempts >= 3) {
        const lockDurationTimestamp = Date.now() + 2 * 60 * 60 * 1000; 
        setLockUntil(lockDurationTimestamp);
        localStorage.setItem('admin_lock_timestamp', lockDurationTimestamp.toString());
        triggerToast("System locked for 2 Hours.");
      } else {
        triggerToast(`Incorrect password. ${3 - updatedAttempts} attempts left.`);
      }
    }
  };

  const formatTimeRemaining = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${mins}m ${secs}s`;
  };

  return (
    <div style={styles.main}>
      <div style={styles.ambientLighting}></div>
      
      {toast.visible && (
        <div style={styles.toast}>
          <span>ℹ️</span>
          <span>{toast.message}</span>
        </div>
      )}

      {isAdminOpen && (
        <div style={styles.adminOverlay}>
          <div style={styles.adminModal}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center'}}>
              <h2 style={{fontSize: '20px', fontWeight: '700', color: '#fff'}}>🔧 Website Live Editor Core</h2>
              <button 
                onClick={() => { setIsAdminOpen(false); setIsAuthorized(false); setPasscode(''); }}
                style={{background: 'none', border: 'none', color: '#64748b', fontSize: '18px', cursor: 'pointer'}}
              >✕</button>
            </div>

            {Date.now() < lockUntil ? (
              <div style={{textAlign: 'center', padding: '20px 0'}}>
                <div style={{fontSize: '44px', marginBottom: '15px'}}>🔒</div>
                <h4 style={{color: '#ef4444', fontWeight: 'bold', fontSize: '16px'}}>SECURITY CONSOLE LOCKED</h4>
                <p style={{color: '#94a3b8', fontSize: '14px', marginTop: '6px', lineHeight: '1.5'}}>
                  Too many incorrect authentication parameters. Cooldown active.
                </p>
                <div style={{marginTop: '20px', padding: '12px', backgroundColor: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '8px', color: '#f87171', fontWeight: 'bold', fontSize: '15px', fontFamily: 'sans-serif'}}>
                  Cooldown: {formatTimeRemaining(timeLeft)}
                </div>
              </div>
            ) : !isAuthorized ? (
              <form onSubmit={handleAuthVerify} autoComplete="off">
                <label style={styles.adminLabel}>Enter Admin Password</label>
                <input 
                  type="password" 
                  value={passcode} 
                  onChange={(e) => setPasscode(e.target.value)}
                  style={styles.adminInput} 
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <div style={{fontSize: '11px', color: '#64748b', marginBottom: '12px'}}>Remaining Entry Node Tokens: {3 - failedAttempts}/3</div>
                <button type="submit" style={{...styles.auditBtn, width: '100%'}}>Verify Dashboard</button>
              </form>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <p style={{fontSize: '13px', color: '#22c55e', marginBottom: '15px'}}>✓ Connected. Change any field below to see live changes on website.</p>
                
                <div style={styles.adminSectionDivider}>🏠 Home Section Content</div>
                <label style={styles.adminLabel}>Home Subtitle / Paragraph</label>
                <textarea rows="3" value={liveData.homeSubtitle} onChange={(e) => setLiveData({...liveData, homeSubtitle: e.target.value})} style={{...styles.adminInput, resize: 'none'}} />

                <div style={styles.adminSectionDivider}>ℹ️ About Section Content</div>
                <label style={styles.adminLabel}>About Heading Tagline</label>
                <input type="text" value={liveData.aboutSubtitle} onChange={(e) => setLiveData({...liveData, aboutSubtitle: e.target.value})} style={styles.adminInput} />
                <label style={styles.adminLabel}>About Main Long Description</label>
                <textarea rows="4" value={liveData.aboutDesc} onChange={(e) => setLiveData({...liveData, aboutDesc: e.target.value})} style={{...styles.adminInput, resize: 'none'}} />

                <div style={styles.adminSectionDivider}>💼 Services Block Content</div>
                <label style={styles.adminLabel}>Service 1 Title</label>
                <input type="text" value={liveData.service1Title} onChange={(e) => setLiveData({...liveData, service1Title: e.target.value})} style={styles.adminInput} />
                <label style={styles.adminLabel}>Service 1 Short Description</label>
                <input type="text" value={liveData.service1Desc} onChange={(e) => setLiveData({...liveData, service1Desc: e.target.value})} style={styles.adminInput} />
                
                <label style={styles.adminLabel}>Service 2 Title</label>
                <input type="text" value={liveData.service2Title} onChange={(e) => setLiveData({...liveData, service2Title: e.target.value})} style={styles.adminInput} />
                <label style={styles.adminLabel}>Service 2 Short Description</label>
                <input type="text" value={liveData.service2Desc} onChange={(e) => setLiveData({...liveData, service2Desc: e.target.value})} style={styles.adminInput} />

                <label style={styles.adminLabel}>Service 3 Title</label>
                <input type="text" value={liveData.service3Title} onChange={(e) => setLiveData({...liveData, service3Title: e.target.value})} style={styles.adminInput} />
                <label style={styles.adminLabel}>Service 3 Short Description</label>
                <input type="text" value={liveData.service3Desc} onChange={(e) => setLiveData({...liveData, service3Desc: e.target.value})} style={styles.adminInput} />

                <div style={styles.adminSectionDivider}>📍 Find Us / Contact Data</div>
                <label style={styles.adminLabel}>Our Location</label>
                <input type="text" value={liveData.contactLocation} onChange={(e) => setLiveData({...liveData, contactLocation: e.target.value})} style={styles.adminInput} />
                <label style={styles.adminLabel}>Email Us</label>
                <input type="text" value={liveData.contactEmail} onChange={(e) => setLiveData({...liveData, contactEmail: e.target.value})} style={styles.adminInput} />
                <label style={styles.adminLabel}>Call Us</label>
                <input type="text" value={liveData.contactPhone} onChange={(e) => setLiveData({...liveData, contactPhone: e.target.value})} style={styles.adminInput} />
                
                <label style={styles.adminLabel}>Happy Customers Metric Text</label>
                <input type="text" value={liveData.happyCustomersText} onChange={(e) => setLiveData({...liveData, happyCustomersText: e.target.value})} style={styles.adminInput} />

                <button 
                  onClick={() => { setIsAdminOpen(false); setIsAuthorized(false); setPasscode(''); triggerToast("Changes deployed successfully!"); }}
                  style={{...styles.auditBtn, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', marginTop: '15px', marginBottom: '10px'}}
                >
                  Save & Live Deploy
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FIXED NAVBAR STRIP INTERFACE */}
      <header style={styles.header}>
        <nav className="navbar-container-box" style={styles.navbar}>
          <div style={styles.logoWrapper} onClick={() => scrollToNode(homeRef)}>
            <span style={styles.logoText}>DigiGrow</span>
          </div>
          
          <ul className="right-nav-wrapper" style={styles.navRightContainer}>
            <li><button onClick={() => scrollToNode(homeRef)} className="nav-custom-btn" style={{...styles.linkButton, ...(activeSection === 'home' ? styles.activeLink : {})}}>Home</button></li>
            <li><button onClick={() => scrollToNode(aboutRef)} className="nav-custom-btn" style={{...styles.linkButton, ...(activeSection === 'about' ? styles.activeLink : {})}}>About</button></li>
            <li><button onClick={() => scrollToNode(servicesRef)} className="nav-custom-btn" style={{...styles.linkButton, ...(activeSection === 'services' ? styles.activeLink : {})}}>Services</button></li>
            <li><button onClick={() => scrollToNode(findUsRef)} className="nav-custom-btn" style={{...styles.linkButton, ...(activeSection === 'find-us' ? styles.activeLink : {})}}>Find Us</button></li>
            <li>
              <button className="login-btn-glow" style={styles.auditBtn} onClick={() => setIsAdminOpen(true)}>
                Login
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* 1. HOME SECTION WITH HIGHLIGHTS */}
      <section id="home" style={styles.scrollSection} ref={homeRef}>
        <HomeWhiteAnimationEngine />
        <div style={styles.viewWrapper}>
          <div style={styles.heroSection}>
            <div style={styles.topBadge}>🚀 Next-Gen Marketing Engine</div>
            <h1 style={styles.hugeTitle}>
              {liveData.homeTitle} <span style={styles.gradientBlueText}>DigiGrow</span>
            </h1>
            <p style={styles.subtitleText}>{liveData.homeSubtitle}</p>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" style={styles.scrollSection} ref={aboutRef}>
        <div style={styles.viewWrapper}>
          <div style={styles.sectionHeader}>
            <h1 style={styles.hugeTitle}>{liveData.aboutHeader}</h1>
            <p style={styles.subtitleText}>{liveData.aboutSubtitle}</p>
          </div>
          <div style={styles.glassCard}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '26px'}}>
              <p style={{color: '#cbd5e1', lineHeight: '1.8', fontSize: '17px'}}>{liveData.aboutDesc}</p>
              <h3 style={{color: '#38bdf8', fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '15px'}}>Our Core Features Grid:</h3>
              <div style={styles.gridContainer}>
                <div style={styles.metricCard}>
                  <div style={{fontSize: '20px', marginBottom: '10px'}}>📱</div>
                  <h4 style={{fontSize: '19px', fontWeight: '600', color: '#fff', marginBottom: '6px'}}>Social Media Management</h4>
                  <p style={{color: '#64748b', fontSize: '14px', lineHeight: '1.5'}}>Sahi strategy aur rules ke saath pages ko manage aur daily brand reputation grow karna.</p>
                </div>
                <div style={styles.metricCard}>
                  <div style={{fontSize: '20px', marginBottom: '10px'}}>📈</div>
                  <h4 style={{fontSize: '19px', fontWeight: '600', color: '#fff', marginBottom: '6px'}}>Search Engine Optimization (SEO)</h4>
                  <p style={{color: '#64748b', fontSize: '14px', lineHeight: '1.5'}}>Google search result ranking ko improve karke free customer traffic laana.</p>
                </div>
                <div style={styles.metricCard}>
                  <div style={{fontSize: '20px', marginBottom: '10px'}}>💻</div>
                  <h4 style={{fontSize: '19px', fontWeight: '600', color: '#fff', marginBottom: '6px'}}>High-End Website Development</h4>
                  <p style={{color: '#64748b', fontSize: '14px', lineHeight: '1.5'}}>Tez chalne wali modern custom single page websites jo business ka trust build karein.</p>
                </div>
                <div style={styles.metricCard}>
                  <div style={{fontSize: '20px', marginBottom: '10px'}}>🎯</div>
                  <h4 style={{fontSize: '19px', fontWeight: '600', color: '#fff', marginBottom: '6px'}}>Targeted Google & Meta Ads</h4>
                  <p style={{color: '#64748b', fontSize: '14px', lineHeight: '1.5'}}>Sahi logon ko low investment cost par real-time products aur business ads show karna.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" style={styles.scrollSection} ref={servicesRef}>
        <div style={styles.viewWrapper}>
          <div style={styles.sectionHeader}>
            <h1 style={styles.hugeTitle}>Our Premium <span style={styles.gradientBlueText}>Services</span></h1>
            <p style={styles.subtitleText}>Aapke business scale ko badhane ke liye custom targeted services plans.</p>
          </div>
          <div style={styles.gridContainer}>
            <div style={styles.glassCard}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div style={{fontSize: '28px'}}>📱</div>
                <span style={{fontSize: '11px', color: '#6366f1', fontWeight: '600', border: '1px solid rgba(99,102,241,0.2)', padding: '2px 10px', borderRadius: '12px'}}>ORGANIC MANAGEMENT</span>
              </div>
              <h3 style={{fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '12px'}}>{liveData.service1Title}</h3>
              <p style={{color: '#94a3b8', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px'}}>{liveData.service1Desc}</p>
              <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#cbd5e1'}}>
                <li>✓ Daily Instagram Profile Strategy</li>
                <li>✓ Professional Facebook Page Tuning</li>
                <li>✓ High Engagement Creative Analytics</li>
              </ul>
            </div>
            <div style={styles.glassCard}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div style={{fontSize: '28px'}}>🎯</div>
                <span style={{fontSize: '11px', color: '#38bdf8', fontWeight: '600', border: '1px solid rgba(14,165,233,0.2)', padding: '2px 10px', borderRadius: '12px'}}>PAID CHANNELS</span>
              </div>
              <h3 style={{fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '12px'}}>{liveData.service2Title}</h3>
              <p style={{color: '#94a3b8', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px'}}>{liveData.service2Desc}</p>
              <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#cbd5e1'}}>
                <li>✓ Targeted Google Search Campaigns</li>
                <li>✓ High Converting Meta Video Lead Ads</li>
                <li>✓ Daily Cost Management & Scaling Optimization</li>
              </ul>
            </div>
            <div style={styles.glassCard}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div style={{fontSize: '28px'}}>💻</div>
                <span style={{fontSize: '11px', color: '#10b981', fontWeight: '600', border: '1px solid rgba(16,185,129,0.2)', padding: '2px 10px', borderRadius: '12px'}}>WEB ARCHITECTURE</span>
              </div>
              <h3 style={{fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '12px'}}>{liveData.service3Title}</h3>
              <p style={{color: '#94a3b8', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px'}}>{liveData.service3Desc}</p>
              <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#cbd5e1'}}>
                <li>✓ Smooth Interactive User Interfaces</li>
                <li>✓ Lightning Fast Page Speed & Loading Time</li>
                <li>✓ All Mobile Responsive Clean Design Layouts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FIND US SECTION */}
      <section id="find-us" style={styles.scrollSection} ref={findUsRef}>
        <div style={styles.viewWrapper}>
          <div style={styles.sectionHeader}>
            <h1 style={styles.hugeTitle}>Find <span style={styles.gradientBlueText}>Us</span></h1>
            <p style={styles.subtitleText}>Hamari team se connect karke apne business growth plan ko discuss karein.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '550px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
            
            <div style={styles.metricCard}>
              <span style={{fontSize: '11px', color: '#38bdf8', fontWeight: '600', letterSpacing: '0.5px'}}>📍 OUR LOCATION</span>
              <p style={{fontSize: '18px', fontWeight: '600', marginTop: '6px', color: '#ffffff'}}>{liveData.contactLocation}</p>
            </div>
            <div style={styles.metricCard}>
              <span style={{fontSize: '11px', color: '#818cf8', fontWeight: '600', letterSpacing: '0.5px'}}>📧 EMAIL US</span>
              <p style={{fontSize: '17px', fontWeight: '600', marginTop: '6px', color: '#ffffff'}}>{liveData.contactEmail}</p>
            </div>
            <div style={styles.metricCard}>
              <span style={{fontSize: '11px', color: '#34d399', fontWeight: '600', letterSpacing: '0.5px'}}>📞 CALL US</span>
              <p style={{fontSize: '18px', fontWeight: '600', marginTop: '6px', color: '#ffffff'}}>{liveData.contactPhone}</p>
            </div>
            
            <div style={{...styles.metricCard, background: 'linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(99,102,241,0.05) 100%)', border: '1px solid rgba(56,189,248,0.2)'}}>
              <span style={{fontSize: '11px', color: '#38bdf8', fontWeight: '800', letterSpacing: '1px'}}>🎉 OUR PROUD TRUST METRIC</span>
              <p style={{fontSize: '22px', fontWeight: '800', marginTop: '6px', color: '#38bdf8', letterSpacing: '-0.5px'}}>{liveData.happyCustomersText}</p>
              <p style={{color: '#94a3b8', fontSize: '13px', marginTop: '2px'}}>Trusted by growing brands and startups all over India.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;