import React from 'react'
import './Footer.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© 2023 Fotofusion. All rights reserved.</p>
        <p className="footer-text">Made By Saifur Rahman.💖</p>
        
        <div className="footer-links">
          <a href="/">Home</a>
          {/* <a href="/">Features</a> */}
          {/* <a href="/privacy">Privacy Policy</a>
          <a href="/privacy">Features</a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer