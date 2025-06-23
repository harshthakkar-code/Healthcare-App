import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="header-container">
      <div className="logo">
        <Link to="/">ClinicApp</Link>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/doctors">Doctors</Link></li>
          <li><Link to="/patients">Patients</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link> / <Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header; 