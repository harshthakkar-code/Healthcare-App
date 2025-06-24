import React from 'react';
import './Sidebar.css';
import { FaCalendarAlt, FaStar, FaUserFriends, FaFileMedical, FaWallet, FaFileInvoiceDollar, FaEnvelope, FaHeartbeat, FaCog, FaSignOutAlt, FaThLarge } from 'react-icons/fa';

const Sidebar = ({ active, setActive }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaThLarge /> },
    { id: 'appointments', label: 'My Appointments', icon: <FaCalendarAlt /> },
    // { id: 'favourites', label: 'Favourites', icon: <FaStar /> },
    // { id: 'dependants', label: 'Dependants', icon: <FaUserFriends /> },
    // { id: 'records', label: 'Medical Records', icon: <FaFileMedical /> },
    // { id: 'wallet', label: 'Wallet', icon: <FaWallet /> },
    // { id: 'invoices', label: 'Invoices', icon: <FaFileInvoiceDollar /> },
    // { id: 'message', label: 'Message', icon: <FaEnvelope />, badge: 7 },
    // { id: 'vitals', label: 'Vitals', icon: <FaHeartbeat /> },
    // { id: 'settings', label: 'Settings', icon: <FaCog /> },
  ];

  return (
    <div className="sidebar-p">
      <div className="sidebar-profile">
        <div className="sidebar-cover" />
        <img src="/avatar.jpg" alt="profile" className="avatar" />
        <h3>Hendrita Hayes</h3>
        <p className="patient-id">Patient ID: PT254654</p>
        <p className="meta">Female <span className="dot" /> 32 years 03 Months</p>
      </div>

      <ul className="sidebar-menu">
        {tabs.map(tab => (
          <li
            key={tab.id}
            className={active === tab.id ? 'active' : ''}
            onClick={() => setActive(tab.id)}
          >
            {tab.icon} <span>{tab.label}</span>
            {tab.badge && <span className="badge">{tab.badge}</span>}
          </li>
        ))}
        <li className="logout">
          <FaSignOutAlt /> <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
