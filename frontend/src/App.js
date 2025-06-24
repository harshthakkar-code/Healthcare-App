import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import PatientDashboard from './pages/Patient/PatientDashboard';
import Login from './pages/Auth/Login';
import AboutUs from './pages/AboutUs/AboutUs';
import ContactUs from './pages/ContactUs/ContactUs';
import ForgotPassword from './pages/Auth/ForgotPassword';
import RegisterRouter from './pages/Auth/RegisterRouter';
import PatientRegisterRouter from './pages/Patient/PatientRegisterRouter';
import DoctorList from './pages/Doctor/DoctorList';
import './styles/App.css';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/doctor-register" element={<RegisterRouter />} />
          <Route path="/patient-registration" element={<PatientRegisterRouter />} />

          <Route path="/doctors" element={<DoctorList />} />
          {/* Add other routes here */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
