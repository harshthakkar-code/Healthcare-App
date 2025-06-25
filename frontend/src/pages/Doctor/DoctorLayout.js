import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCalendarCheck, FaUsers, FaClock, FaUserMd, FaStar, FaFileInvoice, FaNotesMedical } from 'react-icons/fa';

const DoctorLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="doctor-dashboard">
      <aside className="sidebar">
        <ul>
          <li className={location.pathname === '/doctor/dashboard' ? 'active' : ''}>
            <Link to="/doctor/dashboard"><FaCalendarCheck /> Dashboard</Link>
          </li>
          <li className={location.pathname === '/doctor/requests' ? 'active' : ''}>
            <Link to="/doctor/requests"><FaUsers /> Requests</Link>
          </li>
          <li className={location.pathname === '/doctor/appointments' ? 'active' : ''}>
            <Link to="/doctor/appointments"><FaClock /> Appointments</Link>
          </li>
          <li className={location.pathname === '/doctor/available-timings' ? 'active' : ''}>
            <Link to="/doctor/available-timings"><FaUserMd /> Available Timings</Link>
          </li>
          <li className={location.pathname === '/doctor/my-patients' ? 'active' : ''}>
            <Link to="/doctor/my-patients"><FaUsers /> My Patients</Link>
          </li>
          <li className={location.pathname === '/doctor/specialties' ? 'active' : ''}>
            <Link to="/doctor/specialties"><FaNotesMedical /> Specialties & Services</Link>
          </li>
          <li className={location.pathname === '/doctor/reviews' ? 'active' : ''}>
            <Link to="/doctor/reviews"><FaStar /> Reviews</Link>
          </li>
          <li className={location.pathname === '/doctor/invoices' ? 'active' : ''}>
            <Link to="/doctor/invoices"><FaFileInvoice /> Invoices</Link>
          </li>
          <li>
            <button className="logout-btn"><FaCalendarCheck /> Logout</button>
          </li>
        </ul>
      </aside>
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
};

export default DoctorLayout; 