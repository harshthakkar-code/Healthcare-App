import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-section company">
        <h3>ClinicApp</h3>
        <p>Working for Your Better Health.</p>
        <p>Copyright © 2025 ClinicApp. All Rights Reserved</p>
      </div>
      <div className="footer-section links">
        <h4>Company</h4>
        <ul>
          <li>About</li>
          <li>Features</li>
          <li>Careers</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="footer-section newsletter">
        <h4>Newsletter</h4>
        <form>
          <input type="email" placeholder="Your email" />
          <button type="submit">Subscribe</button>
        </form>
        <div className="footer-socials">
          <span className="social-icon">F</span>
          <span className="social-icon">T</span>
          <span className="social-icon">I</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 