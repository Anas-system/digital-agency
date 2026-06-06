import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Agar aapke paas index.css ya App.css hai toh use rehne de sakte hain global styles ke liye
// import './index.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)