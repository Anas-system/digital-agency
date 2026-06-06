import React from 'react';

const ServicesPage = () => {
  const services = [
    { id: 1, title: 'Social Media Marketing', desc: 'Instagram, Facebook and LinkedIn management.' },
    { id: 2, title: 'Paid Advertising', desc: 'Google Ads and Targeted Facebook Ads.' },
    { id: 3, title: 'Website Development', desc: 'Custom, fast, and fully responsive websites.' }
  ];

  return (
    <div style={{ padding: '40px 15px', backgroundColor: '#0f172a', margin: '20px 0' }}>
      <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '25px', color: '#fff' }}>Our Services</h2>
      
      <div className="services-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {services.map(service => (
          <div key={service.id} style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#38bdf8', marginBottom: '8px' }}>{service.title}</h3>
            <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>{service.desc}</p>
          </div>
        ))}
      </div>

      {/* Responsive Grid Styles */}
      <style>{`
        @media (min-width: 768px) {
          .services-grid {
            flex-direction: row !important;
            flex-wrap: wrap;
          }
          .services-grid > div {
            flex: 1 1 calc(33.33% - 20px);
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;