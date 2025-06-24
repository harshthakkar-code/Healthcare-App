import React, { useState } from "react";
import "./Header.css";
import { FaBars, FaBell, FaSearch } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="admin-header">
      <div className="header-left">
        <img src="/logo.svg" alt="Logo" className="header-logo" />
        <FaBars className="menu-toggle-icon" onClick={toggleSidebar} />
        <div className="search-box">
          <input type="text" placeholder="Search here" />
          <FaSearch className="search-icon" />
        </div>
      </div>

      <div className="header-right">
        <div className="notification">
          <FaBell />
          <span className="badge">3</span>
        </div>

        <div className="profile-area" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img
            src="https://randomuser.me/api/portraits/men/45.jpg"
            alt="Admin"
            className="profile-pic"
          />
          <span className="dropdown-arrow">&#9662;</span>
          {dropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <img
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  alt="Admin"
                  className="dropdown-pic"
                />
                <div>
                  <div className="admin-name">Ryan Taylor</div>
                  <div className="admin-role">Administrator</div>
                </div>
              </div>
              <ul>
                <li>My Profile</li>
                <li>Settings</li>
                <li>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
