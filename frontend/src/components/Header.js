import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import './Header.css';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    setIsLoggedIn(true);
  }
}, []);


  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  const handleClickOutside = (e) => {
    if (navRef.current && !navRef.current.contains(e.target)) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <img src="/logo.svg" alt="Doccure Logo" className="logo" />
      </div>
      <nav className="nav" ref={navRef}>
        <ul className="nav-list">
          <li><a href="/login">Home</a></li>

          <li className="dropdown" onClick={() => toggleDropdown('doctors')}>
            Doctors <IoMdArrowDropdown />
            {openDropdown === 'doctors' && (
              <ul className="dropdown-menu styled-dropdown">
                <li><a href="#">Doctor Dashboard</a></li>
                <li><a href="#">Appointments</a></li>
                <li><a href="#">Available Timing</a></li>
                <li><a href="#">Patients List</a></li>
                <li><a href="#">Patients Profile</a></li>
                <li><a href="#">Chat</a></li>
                <li><a href="#">Invoices</a></li>
                <li><a href="#">Profile Settings</a></li>
                <li><a href="#">Reviews</a></li>
              </ul>
            )}
          </li>

          <li className="dropdown" onClick={() => toggleDropdown('patients')}>
            Patients <IoMdArrowDropdown />
            {openDropdown === 'patients' && (
              <ul className="dropdown-menu styled-dropdown">
                <li><a href="#">Patient Dashboard</a></li>
                <li><a href="#">Doctors</a></li>
                <li><a href="#">Search Doctor</a></li>
                <li><a href="#">Doctor Profile</a></li>
                <li><a href="#">Booking</a></li>
                <li><a href="#">Checkout</a></li>
                <li><a href="#">Booking Success</a></li>
                <li><a href="#">Favourites</a></li>
              </ul>
            )}
          </li>

          <li className="dropdown" onClick={() => toggleDropdown('pages')}>
            Pages <IoMdArrowDropdown />
            {openDropdown === 'pages' && (
              <ul className="dropdown-menu styled-dropdown">
                <li><a href="/about-us">About Us</a></li>
                <li><a href="/contact-us">Contact Us</a></li>
              </ul>
            )}
          </li>

          <li><a href="#">Blog</a></li>
          <li><a href="#">Admin <IoMdArrowDropdown /></a></li>
        </ul>
      </nav>

  {isLoggedIn ? (
  <div className="header-actions">
    <button className="btn-login" onClick={() => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      window.location.href = '/';
    }}>
      Logout
    </button>
  </div>
) : (
  <div className="header-actions">
    <button className="btn-register" onClick={() => window.location.href = '/doctor-register'}>
      <FaUser /> Register
    </button>
    <button className="btn-login" onClick={() => window.location.href = '/login'}>
      <FaLock /> Login
    </button>
  </div>
)}


    </header>
  );
};

export default Header;
