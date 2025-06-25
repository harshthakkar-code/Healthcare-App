import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientLayout from './PatientLayout';
import PatientDashboard from './PatientDashboard';
import HealthRecords from './HealthRecords';
import AppointmentsPage from '../Admin/AppointmentPage';
import DoctorList from '../Doctor/DoctorList';

const PatientRoutes = () => (
  <PatientLayout>
    <Routes>
      <Route path="dashboard" element={<PatientDashboard />} />
      <Route path="health-records" element={<HealthRecords />} />
      <Route path='doctors' element={<DoctorList />} />
      {/* Add more routes as needed */}
      <Route path="*" element={<PatientDashboard />} />
      
    </Routes>
  </PatientLayout>
);

export default PatientRoutes; 