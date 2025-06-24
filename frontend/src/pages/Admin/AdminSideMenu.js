import React from "react";
import "./AdminSideMenu.css";
import {
  FaTachometerAlt,
  FaUserMd,
  FaUserInjured,
  FaStar,
  FaChartBar,
  FaCogs,
  FaFileAlt,
  FaUserCircle,
  FaLock,
  FaExclamationCircle,
  FaColumns,
  FaClipboardList,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-section">
        <h2 className="logo-text">
          <span className="logo-blue">DOC</span>
          <span className="logo-green">CURE</span>
        </h2>
      </div>

      <ul className="menu">
        <li className="menu-label">Main</li>
        <li className="menu-item active">
          <FaTachometerAlt /> Dashboard
        </li>
        <li className="menu-item">
          <FaCalendarAlt /> Appointments
        </li>
        <li className="menu-item">
          <FaClipboardList /> Specialities
        </li>
        <li className="menu-item">
          <FaUserMd /> Doctors
        </li>
        <li className="menu-item">
          <FaUserInjured /> Patients
        </li>
        <li className="menu-item">
          <FaStar /> Reviews
        </li>
        <li className="menu-item">
          <FaChartBar /> Transactions
        </li>

        <li className="menu-label">Pages</li>
        <li className="menu-item">
          <FaCogs /> Settings
        </li>
        <li className="menu-item">
          <FaFileAlt /> Reports
        </li>
        <li className="menu-item">
          <FaUserCircle /> Profile
        </li>
        <li className="menu-item">
          <FaLock /> Authentication
        </li>
        <li className="menu-item">
          <FaExclamationCircle /> Error Pages
        </li>
        <li className="menu-item">
          <FaColumns /> Blank Page
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
