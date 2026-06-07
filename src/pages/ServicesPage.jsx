import React, { useState, useEffect } from 'react';

function ServicesPage() {
  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('admin_services_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setServicesList(parsed);
        } else if (parsed && typeof parsed === 'object') {
          setServicesList([
            { title: parsed.card1Title || 'Social Media Marketing', desc: parsed.card1Desc || 'Instagram, Facebook and LinkedIn management.' },
            { title: parsed.card2Title || 'Paid Advertising', desc: parsed.card2Desc || 'Google Ads and Targeted Facebook Ads.' },
            { title: parsed.card3Title || 'Website Development', desc: parsed.card3Desc || 'Custom, fast, and fully responsive websites.' }
          ]);
        }
      } catch(e) {
        setServicesList([]);
      }
    } else {
      setServicesList([
        { title: 'Social Media Marketing', desc: 'Instagram, Facebook and LinkedIn management.' },
        { title: 'Paid Advertising', desc: 'Google Ads and Targeted Facebook Ads.' },
        { title: 'Website Development', desc: 'Custom, fast, and fully responsive websites.' }
      ]);
    }
  }, []);

  return (
    <div style={{ padding: '100px 20px', minHeight: '88vh', backgroundColor: '#090f1c', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <h2 style={{ fontSize: 'calc(24px + 1vw)', marginBottom: '40px', fontWeight: '700', textAlign: 'left' }}>
          Our <span style={{ color: '#00a2ff' }}>Services</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', width: '100%' }}>
          {Array.isArray(servicesList) && servicesList.map((service, index) => (
            <div key={index} style={{ backgroundColor: '#121a2e', padding: '40px 30px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)' }}>
              <h3 style={{ color: '#00a2ff', marginBottom: '15px', fontWeight: '700', fontSize: '20px' }}>{service.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;