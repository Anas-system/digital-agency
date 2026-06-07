import React, { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FindUsPage from './pages/FindUsPage';
import Admin from './pages/Admin';

function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let particlesArray = [];
    
    const mouse = {
      x: null,
      y: null,
      radius: 180 
    };

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
        let color = '#ffffff';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement.clientHeight || window.innerHeight;

    init();
    animate();

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

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
    <div className="starry-hero" style={{ 
      padding: '0 24px', 
      height: '100%', 
      backgroundColor: '#090f1c', 
      color: '#fff', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      textAlign: 'center',
      boxSizing: 'border-box',
      width: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 1,
          pointerEvents: 'none'
        }} 
      />

      <div style={{ zIndex: 2, maxWidth: '880px', padding: '0 10px' }}>
        <h1 style={{ 
          fontSize: 'calc(36px + 2.4vw)', 
          fontWeight: '900', 
          marginBottom: '24px', 
          letterSpacing: '-1px',
          lineHeight: '1.15',
          fontFamily: "'Inter', system-ui, sans-serif",
          color: '#f8fafc',
          textShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          Welcome to <span style={{
            background: 'linear-gradient(135deg, #00a2ff 0%, #00ffcc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '900',
            filter: 'drop-shadow(0px 4px 20px rgba(0,162,255,0.3))'
          }}>DigiGrow</span>
        </h1>
        
        <p style={{ 
          color: '#94a3b8', 
          fontSize: 'calc(15px + 0.15vw)', 
          maxWidth: '650px', 
          lineHeight: '1.8', 
          margin: '0 auto',
          fontWeight: '400',
          letterSpacing: '0.2px',
          textShadow: '0 4px 10px rgba(0,0,0,0.4)'
        }}>
          Expert Digital Marketing Solutions For Your Business. Scale your digital footprint and dominate your market niche with our expert strategies.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ 
      backgroundColor: '#090f1c', 
      height: '100vh', 
      width: '100vw', 
      margin: 0, 
      padding: 0,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden'
    }}>
      <style>{`
        body, html, #root {
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          width: 100% !important;
          height: 100% !important;
          background-color: #090f1c;
          font-family: 'Inter', system-ui, sans-serif;
        }
      `}</style>

      <Navbar/>
      
      <div style={{ flex: '1', width: '100%', height: 'calc(100vh - 75px)', overflowY: 'auto', overflowX: 'hidden' }}>
        <Routes>
          <Route element="{<Home" path="/"/>} />
          <Route element="{<AboutPage" path="/about"/>} />
          <Route element="{<ServicesPage" path="/services"/>} />
          <Route element="{<FindUsPage" path="/find-us"/>} />
          <Route element="{<Admin" path="/admin"/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;