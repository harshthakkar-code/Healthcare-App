import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorDashboard from './DoctorDashboard';
import RequestsPage from './RequestsPage';
import AvailableTimings from './AvailableTimings';
import DoctorLayout from './DoctorLayout';
import AppointmentsPage from './AppointmentsPage';
import MyPatientsPage from './MyPatientsPage';
import DoctorSpecialities from './DoctorSpecialties';
import ReviewPage from './ReviewPage';



// Stubs for other pages
// const SpecialtiesPage = () => <div className="dashboard-content"><h2>Specialties & Services</h2></div>;
// const ReviewsPage = () => <div className="dashboard-content"><h2>Reviews</h2></div>;
const InvoicesPage = () => <div className="dashboard-content"><h2>Invoices</h2></div>;

const DoctorRoutes = () => (
  <DoctorLayout>
    <Routes>
      <Route path="dashboard" element={<DoctorDashboard />} />
      <Route path="requests" element={<RequestsPage />} />
      <Route path="appointments" element={<AppointmentsPage />} />
      <Route path="available-timings" element={<AvailableTimings />} />
      <Route path="my-patients" element={<MyPatientsPage />} />
      <Route path="specialties" element={<DoctorSpecialities />} />
      <Route path="reviews" element={<ReviewPage />} />
      <Route path="invoices" element={<InvoicesPage />} />
      <Route path="*" element={<DoctorDashboard />} />
    </Routes>
  </DoctorLayout>
);

export default DoctorRoutes; 