import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [password, setPassword] = useState('');

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2>Admin Dashboard</h2>
        
        {/* Fake fields taaki browser inhein bhare, real field ko nahi */}
        <input type="text" style={{display: 'none'}} />
        <input type="password" style={{display: 'none'}} />

        <form>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            autoComplete="off"
            // Yeh part fix hai:
            readOnly
            onFocus={(e) => e.target.removeAttribute('readOnly')}
          />
          <button type="submit">Unlock Panel</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;