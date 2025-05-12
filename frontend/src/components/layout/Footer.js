import React from 'react';
import './Layout.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Employee Training Tracker. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/help">Help & Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
