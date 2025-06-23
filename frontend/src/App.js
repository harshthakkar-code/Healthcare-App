import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Login from './pages/Login';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes as you scaffold pages */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </MainLayout>
  );
}

export default App;
