import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Admindashboard from './Admindashboard';
import Profile from './Profile';
import AdminHeader from './AdminHeader';
import AdminSideMenu from './AdminSideMenu';
import ReviewPage from './ReviewPage';
import InvoiceReport from './InvoiceReport';
import AppointmentsPage from './AppointmentPage';
import DoctorListPage from './DoctorListPage';
import PatientListPage from './PatientListPage';
import TransactionListPage from './TransactionListPage';


// Layout wrapper to ensure all admin pages have the same header and sidebar
const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(window.innerWidth >= 900);
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 900) setSidebarOpen((open) => !open);
    else setCollapsed((prev) => !prev);
  };
  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleCollapseSidebar = () => setCollapsed((prev) => !prev);

  return (
    <div className={`admin-dashboard-outer${collapsed ? ' sidebar-collapsed' : ''}`}>
      <AdminHeader toggleSidebar={handleToggleSidebar} collapsed={collapsed} />
      <div className="admin-dashboard-inner">
        <div
          className={`sidebar-container${sidebarOpen ? ' open' : ''}${collapsed ? ' collapsed' : ''}`}
          style={{ display: sidebarOpen ? 'block' : 'none' }}
        >
          <AdminSideMenu onClose={handleCloseSidebar} collapsed={collapsed} onCollapse={handleCollapseSidebar} />
        </div>
        {sidebarOpen && window.innerWidth < 900 && <div className="sidebar-overlay" onClick={handleCloseSidebar} />}
        {children}
      </div>
    </div>
  );
};

// Wrapper component for each admin page to ensure it uses the admin layout
const AdminRoute = ({ component: Component }) => {
  return (
    <AdminLayout>
      <Component />
    </AdminLayout>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminRoute component={Admindashboard} />} />
      <Route path="profile" element={<AdminRoute component={Profile} />} />
      <Route path="reviews" element={<AdminRoute component={ReviewPage} />} />
      <Route path="reports" element={<AdminRoute component={InvoiceReport} />} />
      <Route path="appointments" element={<AdminRoute component={AppointmentsPage} />} />
      <Route path="doctors" element={<AdminRoute component={DoctorListPage} />} />
      <Route path="patients" element={<AdminRoute component={PatientListPage} />} />
      <Route path="transactions" element={<AdminRoute component={TransactionListPage} />} />
    </Routes>
  );
};

export default AdminRoutes; 