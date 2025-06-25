import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorDashboard from './DoctorDashboard';
import RequestsPage from './RequestsPage';
import AvailableTimings from './AvailableTimings';
import DoctorLayout from './DoctorLayout';

// Stubs for other pages
const AppointmentsPage = () => <div className="dashboard-content"><h2>Appointments</h2></div>;
const MyPatientsPage = () => <div className="dashboard-content"><h2>My Patients</h2></div>;
const SpecialtiesPage = () => <div className="dashboard-content"><h2>Specialties & Services</h2></div>;
const ReviewsPage = () => <div className="dashboard-content"><h2>Reviews</h2></div>;
const InvoicesPage = () => <div className="dashboard-content"><h2>Invoices</h2></div>;

const DoctorRoutes = () => (
  <DoctorLayout>
    <Routes>
      <Route path="dashboard" element={<DoctorDashboard />} />
      <Route path="requests" element={<RequestsPage />} />
      <Route path="appointments" element={<AppointmentsPage />} />
      <Route path="available-timings" element={<AvailableTimings />} />
      <Route path="my-patients" element={<MyPatientsPage />} />
      <Route path="specialties" element={<SpecialtiesPage />} />
      <Route path="reviews" element={<ReviewsPage />} />
      <Route path="invoices" element={<InvoicesPage />} />
      <Route path="*" element={<DoctorDashboard />} />
    </Routes>
  </DoctorLayout>
);

export default DoctorRoutes; 