import React from 'react';
import './Footer.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP } from 'react-icons/fa6';
const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-section about">
        <img src="/logo.svg" alt="Logo" className="footer-logo" />
        <p>
          Effortlessly schedule your medical appointments with Doccure. Connect
          with healthcare professionals, manage appointments & prioritize your
          well being
        </p>
      </div>

      <div className="footer-section">
        <h4>Company</h4>
        <ul>
          <li>Home</li>
          <li>Specialities</li>
          <li>Video Consult</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Specialities</h4>
        <ul>
          <li>Neurology</li>
          <li>Cardiologist</li>
          <li>Dentist</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Contact Us</h4>
        <p><FaMapMarkerAlt className="icon" /> 3556 Beech Street, USA</p>
        <p><FaPhoneAlt className="icon" /> +1 315 369 5943</p>
        <p><FaEnvelope className="icon" /> doccure@example.com</p>
      </div>

      <div className="footer-section newsletter">
        <h4>Join Our Newsletter</h4>
        <form>
          <input type="email" placeholder="Enter Email" />
          <button type="submit">Submit</button>
        </form>
        <div className="footer-socials">
          <span className="social-icon"><FaFacebookF /></span>
          <span className="social-icon"><FaXTwitter /></span>
          <span className="social-icon"><FaInstagram /></span>
          <span className="social-icon"><FaLinkedinIn /></span>
          <span className="social-icon"><FaPinterestP /></span>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
  <div className="footer-bottom-left">
    <p>Copyright © 2025 Doccure. All Rights Reserved</p>
  </div>
  <div className="footer-bottom-right">
    <a href="#">Privacy Policy</a>
    <span className="divider">|</span>
    <a href="#">Terms and Conditions</a>
  </div>
</div>

  </footer>
);

export default Footer;
