import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: '#0f172a',
      color: '#94a3b8',
      textAlign: 'center',
      padding: '20px',
      marginTop: '40px',
      borderTop: '1px solid #1e293b',
      fontSize: '14px'
    }}>
      <p>© {new Date().getFullYear()} <strong>DigiGrow Marketing Agency</strong>. All Rights Reserved.</p>
      <p style={{ fontSize: '12px', marginTop: '5px', color: '#64748b' }}>Powered by React & Firebase</p>
    </footer>
  );
};

export default Footer;