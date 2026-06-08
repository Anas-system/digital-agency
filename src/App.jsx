import React, { useState, useEffect, useRef } from 'react';

// ===================================================
// 1. CREAM MELT THEME — PROFESSIONAL EDITION
// ===================================================
const styles = {
  main: { 
    backgroundColor: '#faf6f0', 
    minHeight: '100vh', 
    color: '#2c1f0e', 
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
    background: 'radial-gradient(circle at 50% 30%, rgba(210,170,110,0.10) 0%, rgba(245,230,200,0.04) 50%, transparent 100%)',
    pointerEvents: 'none', zIndex: 2
  },
  header: {
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(176,125,58,0.14)',
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    backgroundColor: 'rgba(250, 246, 240, 0.95)', 
    boxShadow: '0 1px 0 rgba(176,125,58,0.08), 0 8px 32px rgba(44,31,14,0.06)',
    transition: 'all 0.3s ease',
    width: '100%'
  },
  navbar: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '18px 6%',
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
    fontSize: '24px', 
    fontWeight: '800', 
    letterSpacing: '-0.5px',
    color: '#8a5e1e', 
    userSelect: 'none',
  },
  navRightContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px', 
    listStyle: 'none',
    padding: 0,
    margin: 0,
    flexWrap: 'nowrap'
  },
  linkButton: { 
    color: '#6b4f2e', 
    background: 'transparent',
    backgroundColor: 'transparent',
    border: '1px solid transparent', 
    fontSize: '14px', 
    fontWeight: '500', 
    transition: 'all 0.2s ease', 
    padding: '8px 18px', 
    position: 'relative', 
    letterSpacing: '0.2px', 
    cursor: 'pointer',
    fontFamily: "'Source Serif 4', serif",
    outline: 'none',
    borderRadius: '6px', 
    boxShadow: 'none',
    WebkitTapHighlightColor: 'transparent',
    whiteSpace: 'nowrap'
  },
  activeLink: { 
    color: '#8a5e1e', 
    fontWeight: '600',
    backgroundColor: 'rgba(176,125,58,0.09)',
    border: '1px solid rgba(176,125,58,0.22)',
    boxShadow: 'none'
  },
  auditBtn: { 
    padding: '9px 22px', 
    background: '#8a5e1e', 
    border: 'none', 
    borderRadius: '6px', 
    color: '#fdf8f0', 
    fontWeight: '600', 
    cursor: 'pointer', 
    fontSize: '13px',
    letterSpacing: '0.3px',
    boxShadow: '0 2px 8px rgba(138,94,30,0.25)', 
    transition: 'all 0.2s ease',
    fontFamily: "'Source Serif 4', serif",
    whiteSpace: 'nowrap',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
    marginLeft: '10px',
    flexShrink: 0
  },
  scrollSection: {
    minHeight: '100vh', 
    paddingTop: '140px', 
    paddingBottom: '100px',
    paddingLeft: '6%',
    paddingRight: '6%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10,
    boxSizing: 'border-box',
    borderBottom: '1px solid rgba(176,125,58,0.07)',
    width: '100%'
  },
  viewWrapper: { 
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    boxSizing: 'border-box'
  },
  heroSection: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%', position: 'relative', zIndex: 20 },
  sectionHeader: { textAlign: 'center', marginBottom: '56px', width: '100%' },
  hugeTitle: { fontSize: 'clamp(30px, 6vw, 58px)', fontWeight: '700', lineHeight: '1.2', letterSpacing: '-0.5px', marginBottom: '20px', width: '100%', color: '#1a1008' },
  gradientBlueText: { color: '#8a5e1e' },
  subtitleText: { color: '#7a6048', fontSize: 'clamp(15px, 2.5vw, 18px)', maxWidth: '640px', lineHeight: '1.75', margin: '0 auto', fontWeight: '400', width: '100%' },
  topBadge: {
    background: 'rgba(176,125,58,0.08)',
    border: '1px solid rgba(176,125,58,0.25)',
    borderRadius: '4px',
    padding: '5px 14px',
    fontSize: '11px',
    fontWeight: '700',
    color: '#8a5e1e',
    letterSpacing: '1.5px',
    marginBottom: '28px',
    display: 'inline-block',
    textTransform: 'uppercase'
  },
  glassCard: {
    backgroundColor: '#fff9f2',
    border: '1px solid rgba(176,125,58,0.12)', 
    borderRadius: '12px', 
    padding: 'clamp(24px, 4vw, 44px)',
    boxShadow: '0 4px 24px rgba(44,31,14,0.06), 0 1px 4px rgba(44,31,14,0.04)', 
    transition: 'all 0.3s ease', 
    width: '100%',
    boxSizing: 'border-box'
  },
  metricCard: {
    backgroundColor: '#fff9f2',
    border: '1px solid rgba(176,125,58,0.10)',
    borderRadius: '10px', 
    padding: '28px 24px', 
    transition: 'box-shadow 0.2s ease', 
    position: 'relative', 
    overflow: 'hidden', 
    width: '100%', 
    boxSizing: 'border-box',
    boxShadow: '0 2px 12px rgba(44,31,14,0.04)'
  },
  gridContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', width: '100%', marginTop: '40px', boxSizing: 'border-box' },
  toast: {
    position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#fff9f2',
    borderLeft: '3px solid #8a5e1e',
    border: '1px solid rgba(176,125,58,0.18)',
    borderLeftWidth: '3px',
    borderLeftColor: '#8a5e1e',
    padding: '14px 20px', borderRadius: '8px', boxShadow: '0 8px 32px rgba(44,31,14,0.12)',
    zIndex: 9999, display: 'flex', alignItems: 'center', gap: '10px', color: '#2c1f0e', fontSize: '14px'
  },
  adminOverlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(250,246,240,0.85)', backdropFilter: 'blur(16px)',
    zIndex: 99999, display: 'flex', alignItems: 'center',
    justifyContent: 'center', padding: '20px', boxSizing: 'border-box'
  },
  adminModal: {
    backgroundColor: '#fff9f2', border: '1px solid rgba(176,125,58,0.15)',
    borderRadius: '12px', padding: '32px', maxWidth: '650px', width: '100%',
    boxShadow: '0 20px 60px rgba(44,31,14,0.12)', maxHeight: '90vh', overflowY: 'auto'
  },
  adminInput: {
    width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid rgba(176,125,58,0.2)',
    backgroundColor: '#fdf8f0', color: '#2c1f0e', fontSize: '14px', outline: 'none', marginTop: '6px',
    marginBottom: '16px', fontFamily: 'sans-serif'
  },
  adminLabel: { fontSize: '11px', color: '#8a5e1e', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px' },
  adminSectionDivider: { borderTop: '1px solid rgba(176,125,58,0.12)', margin: '20px 0 15px 0', paddingTop: '12px', color: '#2c1f0e', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }
};

const responsiveStyles = `
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    background-color: #faf6f0 !important;
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
    color: #8a5e1e !important;
    background-color: rgba(138,94,30,0.07) !important;
    border: 1px solid rgba(138,94,30,0.15) !important;
  }
  .login-btn-glow:hover {
    background: #6e4a17 !important;
    box-shadow: 0 4px 18px rgba(138,94,30,0.35) !important;
    transform: translateY(-1px) !important;
  }
  .service-card:hover {
    box-shadow: 0 8px 36px rgba(44,31,14,0.10) !important;
    border-color: rgba(138,94,30,0.20) !important;
    transform: translateY(-2px) !important;
  }
  .metric-card-hover:hover {
    box-shadow: 0 6px 24px rgba(44,31,14,0.09) !important;
    border-color: rgba(138,94,30,0.18) !important;
  }
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
      gap: 4px !important;
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

// Animation removed as per user request

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
          <span>{toast.message}</span>
        </div>
      )}

      {isAdminOpen && (
        <div style={styles.adminOverlay}>
          <div style={styles.adminModal}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center'}}>
              <h2 style={{fontSize: '20px', fontWeight: '700', color: '#2c1f0e'}}>Website Live Editor</h2>
              <button 
                onClick={() => { setIsAdminOpen(false); setIsAuthorized(false); setPasscode(''); }}
                style={{background: 'none', border: 'none', color: '#9a7a50', fontSize: '18px', cursor: 'pointer'}}
              >✕</button>
            </div>

            {Date.now() < lockUntil ? (
              <div style={{textAlign: 'center', padding: '20px 0'}}>
                <div style={{fontSize: '44px', marginBottom: '15px'}}>&#x1F512;</div>
                <h4 style={{color: '#c0392b', fontWeight: 'bold', fontSize: '16px'}}>SECURITY CONSOLE LOCKED</h4>
                <p style={{color: '#7a6048', fontSize: '14px', marginTop: '6px', lineHeight: '1.5'}}>
                  Too many incorrect authentication parameters. Cooldown active.
                </p>
                <div style={{marginTop: '20px', padding: '12px', backgroundColor: 'rgba(192,57,43,0.06)', border: '1px solid rgba(192,57,43,0.15)', borderRadius: '8px', color: '#c0392b', fontWeight: 'bold', fontSize: '15px', fontFamily: 'sans-serif'}}>
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
                <div style={{fontSize: '11px', color: '#9a7a50', marginBottom: '12px'}}>Remaining Entry Node Tokens: {3 - failedAttempts}/3</div>
                <button type="submit" style={{...styles.auditBtn, width: '100%'}}>Verify Dashboard</button>
              </form>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <p style={{fontSize: '13px', color: '#2d8a55', marginBottom: '15px'}}>✓ Connected. Change any field below to see live changes on website.</p>
                
                <div style={styles.adminSectionDivider}>Home Section Content</div>
                <label style={styles.adminLabel}>Home Subtitle / Paragraph</label>
                <textarea rows="3" value={liveData.homeSubtitle} onChange={(e) => setLiveData({...liveData, homeSubtitle: e.target.value})} style={{...styles.adminInput, resize: 'none'}} />

                <div style={styles.adminSectionDivider}>About Section Content</div>
                <label style={styles.adminLabel}>About Heading Tagline</label>
                <input type="text" value={liveData.aboutSubtitle} onChange={(e) => setLiveData({...liveData, aboutSubtitle: e.target.value})} style={styles.adminInput} />
                <label style={styles.adminLabel}>About Main Long Description</label>
                <textarea rows="4" value={liveData.aboutDesc} onChange={(e) => setLiveData({...liveData, aboutDesc: e.target.value})} style={{...styles.adminInput, resize: 'none'}} />

                <div style={styles.adminSectionDivider}>Services Block Content</div>
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

                <div style={styles.adminSectionDivider}>Find Us / Contact Data</div>
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
                  style={{...styles.auditBtn, background: 'linear-gradient(135deg, #2d8a55 0%, #1a6b3c 100%)', marginTop: '15px', marginBottom: '10px'}}
                >
                  Save & Live Deploy
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* NAVBAR */}
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

      <section id="home" style={styles.scrollSection} ref={homeRef}>
        <div style={styles.viewWrapper}>
          <div style={styles.heroSection}>
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
              <p style={{color: '#4a3520', lineHeight: '1.8', fontSize: '17px'}}>{liveData.aboutDesc}</p>
              <h3 style={{color: '#8a5e1e', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '15px', marginBottom: '0'}}>Our Core Features</h3>
              <div style={styles.gridContainer}>
                <div style={styles.metricCard} className="metric-card-hover">
                  <h4 style={{fontSize: '16px', fontWeight: '600', color: '#1a1008', marginBottom: '8px', letterSpacing: '-0.2px'}}>Social Media Management</h4>
                  <p style={{color: '#8a6a45', fontSize: '14px', lineHeight: '1.6', margin: 0}}>Sahi strategy aur rules ke saath pages ko manage aur daily brand reputation grow karna.</p>
                </div>
                <div style={styles.metricCard} className="metric-card-hover">
                  <h4 style={{fontSize: '16px', fontWeight: '600', color: '#1a1008', marginBottom: '8px', letterSpacing: '-0.2px'}}>Search Engine Optimization (SEO)</h4>
                  <p style={{color: '#8a6a45', fontSize: '14px', lineHeight: '1.6', margin: 0}}>Google search result ranking ko improve karke free customer traffic laana.</p>
                </div>
                <div style={styles.metricCard} className="metric-card-hover">
                  <h4 style={{fontSize: '16px', fontWeight: '600', color: '#1a1008', marginBottom: '8px', letterSpacing: '-0.2px'}}>High-End Website Development</h4>
                  <p style={{color: '#8a6a45', fontSize: '14px', lineHeight: '1.6', margin: 0}}>Tez chalne wali modern custom single page websites jo business ka trust build karein.</p>
                </div>
                <div style={styles.metricCard} className="metric-card-hover">
                  <h4 style={{fontSize: '16px', fontWeight: '600', color: '#1a1008', marginBottom: '8px', letterSpacing: '-0.2px'}}>Targeted Google & Meta Ads</h4>
                  <p style={{color: '#8a6a45', fontSize: '14px', lineHeight: '1.6', margin: 0}}>Sahi logon ko low investment cost par real-time products aur business ads show karna.</p>
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
            <div style={{...styles.glassCard, transition: 'all 0.25s ease'}} className="service-card">
              <div style={{marginBottom: '20px'}}>
                <span style={{fontSize: '10px', color: '#7c5cbf', fontWeight: '700', border: '1px solid rgba(124,92,191,0.2)', padding: '3px 10px', borderRadius: '4px', letterSpacing: '1px'}}>ORGANIC MANAGEMENT</span>
              </div>
              <h3 style={{fontSize: '22px', fontWeight: '700', color: '#1a1008', marginBottom: '12px', letterSpacing: '-0.3px'}}>{liveData.service1Title}</h3>
              <p style={{color: '#7a6048', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px'}}>{liveData.service1Desc}</p>
              <div style={{borderTop: '1px solid rgba(176,125,58,0.10)', paddingTop: '20px'}}>
                <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#5a4030'}}>
                  <li style={{display: 'flex', alignItems: 'center', gap: '10px'}}><span style={{width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'rgba(124,92,191,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#7c5cbf', flexShrink: 0}}>✓</span>Daily Instagram Profile Strategy</li>
                  <li style={{display: 'flex', alignItems: 'center', gap: '10px'}}><span style={{width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'rgba(124,92,191,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#7c5cbf', flexShrink: 0}}>✓</span>Professional Facebook Page Tuning</li>
                  <li style={{display: 'flex', alignItems: 'center', gap: '10px'}}><span style={{width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'rgba(124,92,191,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#7c5cbf', flexShrink: 0}}>✓</span>High Engagement Creative Analytics</li>
                </ul>
              </div>
            </div>
            <div style={{...styles.glassCard, transition: 'all 0.25s ease'}} className="service-card">
              <div style={{marginBottom: '20px'}}>
                <span style={{fontSize: '10px', color: '#8a5e1e', fontWeight: '700', border: '1px solid rgba(138,94,30,0.22)', padding: '3px 10px', borderRadius: '4px', letterSpacing: '1px'}}>PAID CHANNELS</span>
              </div>
              <h3 style={{fontSize: '22px', fontWeight: '700', color: '#1a1008', marginBottom: '12px', letterSpacing: '-0.3px'}}>{liveData.service2Title}</h3>
              <p style={{color: '#7a6048', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px'}}>{liveData.service2Desc}</p>
              <div style={{borderTop: '1px solid rgba(176,125,58,0.10)', paddingTop: '20px'}}>
                <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#5a4030'}}>
                  <li style={{display: 'flex', alignItems: 'center', gap: '10px'}}><span style={{width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'rgba(138,94,30,0.10)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#8a5e1e', flexShrink: 0}}>✓</span>Targeted Google Search Campaigns</li>
                  <li style={{display: 'flex', alignItems: 'center', gap: '10px'}}><span style={{width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'rgba(138,94,30,0.10)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#8a5e1e', flexShrink: 0}}>✓</span>High Converting Meta Video Lead Ads</li>
                  <li style={{display: 'flex', alignItems: 'center', gap: '10px'}}><span style={{width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'rgba(138,94,30,0.10)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#8a5e1e', flexShrink: 0}}>✓</span>Daily Cost Management & Scaling Optimization</li>
                </ul>
              </div>
            </div>
            <div style={{...styles.glassCard, transition: 'all 0.25s ease'}} className="service-card">
              <div style={{marginBottom: '20px'}}>
                <span style={{fontSize: '10px', color: '#2d8a55', fontWeight: '700', border: '1px solid rgba(45,138,85,0.2)', padding: '3px 10px', borderRadius: '4px', letterSpacing: '1px'}}>WEB ARCHITECTURE</span>
              </div>
              <h3 style={{fontSize: '22px', fontWeight: '700', color: '#1a1008', marginBottom: '12px', letterSpacing: '-0.3px'}}>{liveData.service3Title}</h3>
              <p style={{color: '#7a6048', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px'}}>{liveData.service3Desc}</p>
              <div style={{borderTop: '1px solid rgba(176,125,58,0.10)', paddingTop: '20px'}}>
                <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#5a4030'}}>
                  <li style={{display: 'flex', alignItems: 'center', gap: '10px'}}><span style={{width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'rgba(45,138,85,0.10)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#2d8a55', flexShrink: 0}}>✓</span>Smooth Interactive User Interfaces</li>
                  <li style={{display: 'flex', alignItems: 'center', gap: '10px'}}><span style={{width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'rgba(45,138,85,0.10)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#2d8a55', flexShrink: 0}}>✓</span>Lightning Fast Page Speed & Loading Time</li>
                  <li style={{display: 'flex', alignItems: 'center', gap: '10px'}}><span style={{width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'rgba(45,138,85,0.10)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#2d8a55', flexShrink: 0}}>✓</span>All Mobile Responsive Clean Design Layouts</li>
                </ul>
              </div>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '520px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
            <div style={styles.metricCard} className="metric-card-hover">
              <span style={{fontSize: '10px', color: '#8a5e1e', fontWeight: '700', letterSpacing: '1.2px', textTransform: 'uppercase'}}>Our Location</span>
              <p style={{fontSize: '17px', fontWeight: '600', marginTop: '8px', marginBottom: 0, color: '#1a1008'}}>{liveData.contactLocation}</p>
            </div>
            <div style={styles.metricCard} className="metric-card-hover">
              <span style={{fontSize: '10px', color: '#7c5cbf', fontWeight: '700', letterSpacing: '1.2px', textTransform: 'uppercase'}}>Email Us</span>
              <p style={{fontSize: '16px', fontWeight: '500', marginTop: '8px', marginBottom: 0, color: '#1a1008'}}>{liveData.contactEmail}</p>
            </div>
            <div style={styles.metricCard} className="metric-card-hover">
              <span style={{fontSize: '10px', color: '#2d8a55', fontWeight: '700', letterSpacing: '1.2px', textTransform: 'uppercase'}}>Call Us</span>
              <p style={{fontSize: '17px', fontWeight: '600', marginTop: '8px', marginBottom: 0, color: '#1a1008'}}>{liveData.contactPhone}</p>
            </div>
            <div style={{...styles.metricCard, backgroundColor: '#fff4e6', border: '1px solid rgba(138,94,30,0.18)'}} className="metric-card-hover">
              <span style={{fontSize: '10px', color: '#8a5e1e', fontWeight: '700', letterSpacing: '1.2px', textTransform: 'uppercase'}}>Trust Metric</span>
              <p style={{fontSize: '26px', fontWeight: '800', marginTop: '8px', marginBottom: '4px', color: '#8a5e1e', letterSpacing: '-0.5px'}}>{liveData.happyCustomersText}</p>
              <p style={{color: '#9a7a50', fontSize: '13px', marginTop: 0, marginBottom: 0}}>Trusted by growing brands and startups all over India.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;