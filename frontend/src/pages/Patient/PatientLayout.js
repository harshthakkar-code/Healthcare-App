import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header';

const PatientLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="patient-dashboard-root">
      {/* <Header /> */}
      <div className="patient-dashboard-row">
        <aside className="sidebar">
          <ul>
            <li className={location.pathname === '/patient/dashboard' ? 'active' : ''}>
              <Link to="/patient/dashboard">Dashboard</Link>
            </li>
            <li className={location.pathname === '/patient/health-records' ? 'active' : ''}>
              <Link to="/patient/health-records">Health Records</Link>
            </li>
          </ul>
        </aside>
        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PatientLayout; 