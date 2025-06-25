// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FaCalendarCheck, FaUsers, FaClock, FaUserMd, FaStar, FaFileInvoice, FaNotesMedical } from 'react-icons/fa';

// const DoctorLayout = ({ children }) => {
//   const location = useLocation();
//   return (
//     <div className="doctor-dashboard">
//       <aside className="sidebar">
//         <ul>
//           <li className={location.pathname === '/doctor/dashboard' ? 'active' : ''}>
//             <Link to="/doctor/dashboard"><FaCalendarCheck /> Dashboard</Link>
//           </li>
//           <li className={location.pathname === '/doctor/requests' ? 'active' : ''}>
//             <Link to="/doctor/requests"><FaUsers /> Requests</Link>
//           </li>
//           <li className={location.pathname === '/doctor/appointments' ? 'active' : ''}>
//             <Link to="/doctor/appointments"><FaClock /> Appointments</Link>
//           </li>
//           <li className={location.pathname === '/doctor/available-timings' ? 'active' : ''}>
//             <Link to="/doctor/available-timings"><FaUserMd /> Available Timings</Link>
//           </li>
//           <li className={location.pathname === '/doctor/my-patients' ? 'active' : ''}>
//             <Link to="/doctor/my-patients"><FaUsers /> My Patients</Link>
//           </li>
//           <li className={location.pathname === '/doctor/specialties' ? 'active' : ''}>
//             <Link to="/doctor/specialties"><FaNotesMedical /> Specialties & Services</Link>
//           </li>
//           <li className={location.pathname === '/doctor/reviews' ? 'active' : ''}>
//             <Link to="/doctor/reviews"><FaStar /> Reviews</Link>
//           </li>
//           <li className={location.pathname === '/doctor/invoices' ? 'active' : ''}>
//             <Link to="/doctor/invoices"><FaFileInvoice /> Invoices</Link>
//           </li>
//           <li>
//             <button className="logout-btn"><FaCalendarCheck /> Logout</button>
//           </li>
//         </ul>
//       </aside>
//       <main className="dashboard-content">
//         {children}
//       </main>
//     </div>
//   );
// };

// export default DoctorLayout; 

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaCalendarCheck, FaUsers, FaClock, FaUserMd,
  FaStar, FaFileInvoice, FaNotesMedical, FaSignOutAlt, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import './DoctorSidebar.css'; // Use a separate or shared CSS file

const DoctorLayout = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const doctorLinks = [
    { path: '/doctor/dashboard', icon: <FaCalendarCheck />, label: 'Dashboard' },
    { path: '/doctor/requests', icon: <FaUsers />, label: 'Requests' },
    { path: '/doctor/appointments', icon: <FaClock />, label: 'Appointments' },
    { path: '/doctor/available-timings', icon: <FaUserMd />, label: 'Available Timings' },
    { path: '/doctor/my-patients', icon: <FaUsers />, label: 'My Patients' },
    { path: '/doctor/specialties', icon: <FaNotesMedical />, label: 'Specialties & Services' },
    { path: '/doctor/reviews', icon: <FaStar />, label: 'Reviews' },
    { path: '/doctor/invoices', icon: <FaFileInvoice />, label: 'Invoices' },
  ];

  return (
    <div className={`doctor-dashboard ${collapsed ? 'sidebar-collapsed' : ''}`} >
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} style={{ marginTop: "0px" }}>
        <ul className="menu">
          {doctorLinks.map((link) => (
            <li key={link.path} className={`menu-item${location.pathname === link.path ? ' active' : ''}`}>
              <Link to={link.path}>
                {link.icon}
                {!collapsed && <span>{link.label}</span>}
              </Link>
            </li>
          ))}
          <li className="menu-item">
            <button className="logout-btn">
              <FaSignOutAlt /> {!collapsed && <span>Logout</span>}
            </button>
          </li>
        </ul>
        {/* <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button> */}
      </aside>
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
};

export default DoctorLayout;
