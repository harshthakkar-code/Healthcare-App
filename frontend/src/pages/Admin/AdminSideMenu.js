import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
  FaCalendarAlt,
} from "react-icons/fa";

const Sidebar = ({ onClose, collapsed, onCollapse }) => {
  const location = useLocation();

  return (
    <div className={`sidebar${collapsed ? ' collapsed' : ''}`} style={{ marginTop: "60px" }}>
      <button className="close-btn" onClick={onClose} aria-label="Close sidebar">×</button>
      <ul className="menu">
        {/* <li className="menu-label">Main</li> */}
        <li className={`menu-item${location.pathname === '/admin/dashboard' ? ' active' : ''}`}>
          <Link to="/admin/dashboard">
            <FaTachometerAlt /> {!collapsed && <span>Dashboard</span>}
          </Link>
        </li>
        <li className={`menu-item${location.pathname === '/admin/appointments' ? ' active' : ''}`}>
          <Link to="/admin/appointments">
            <FaCalendarAlt /> {!collapsed && <span>Appointments</span>}
          </Link>
        </li>
        {/* <li className={`menu-item${location.pathname === '/admin/specialities' ? ' active' : ''}`}>
          <Link to="/admin/specialities">
            <FaClipboardList /> Specialities
          </Link>
        </li> */}
        <li className={`menu-item${location.pathname === '/admin/doctors' ? ' active' : ''}`}>
          <Link to="/admin/doctors">
            <FaUserMd /> {!collapsed && <span>Doctors</span>}
          </Link>
        </li>
        <li className={`menu-item${location.pathname === '/admin/patients' ? ' active' : ''}`}>
          <Link to="/admin/patients">
            <FaUserInjured /> {!collapsed && <span>Patients</span>}
          </Link>
        </li>
        <li className={`menu-item${location.pathname === '/admin/reviews' ? ' active' : ''}`}>
          <Link to="/admin/reviews">
            <FaStar /> {!collapsed && <span>Reviews</span>}
          </Link>
        </li>
        <li className={`menu-item${location.pathname === '/admin/transactions' ? ' active' : ''}`}>
          <Link to="/admin/transactions">
            <FaChartBar /> {!collapsed && <span>Transactions</span>}
          </Link>
        </li>

        {/* <li className="menu-label">Pages</li> */}
        <li className={`menu-item${location.pathname === '/admin/reports' ? ' active' : ''}`}>
          <Link to="/admin/reports">
            <FaFileAlt /> {!collapsed && <span>Reports</span>}
          </Link>
        </li>
        <li className={`menu-item${location.pathname === '/admin/profile' ? ' active' : ''}`}>
          <Link to="/admin/profile">
            <FaUserCircle /> {!collapsed && <span>Profile</span>}
          </Link>
        </li>
      </ul>
      {/* <button className="collapse-btn" onClick={onCollapse} aria-label="Collapse sidebar">
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button> */}
    </div>
  );
};

export default Sidebar;
