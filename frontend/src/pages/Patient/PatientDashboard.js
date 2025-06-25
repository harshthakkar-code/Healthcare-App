import React, { useState } from 'react';
import './PatientDashboard.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import HealthRecords from './HealthRecords';
import PatientAppointments from '../../components/Appointments/AppointmentList';
import DoctorList from '../Doctor/DoctorList';

const PatientDashboard = () => {
  const [active, setActive] = useState('dashboard');

  return (
    <div className="dashboard-layout">
      <Sidebar active={active} setActive={setActive} />

      <div className="main-panel">

        {active === 'dashboard' && (
          <div className="dashboard-main">
            <HealthRecords
              records={[
                { label: 'Heart Rate', value: '140 Bpm', change: '2%' },
                { label: 'Body Temperature', value: '37.5 C' },
                { label: 'Glucose Level', value: '70 – 90', change: '6%' },
                { label: 'SpO₂', value: '96%' },
                { label: 'Blood Pressure', value: '100 mg/dl', change: '2%' },
                { label: 'BMI', value: '20.1 kg/m²' },
              ]}
              lastVisit="25 Mar 2024"
            />
          </div>
        )}

        {active === 'appointments' && (
          <PatientAppointments activeTab={active} setActiveTab={setActive} />
        )}

        {active === 'doctors' && (
  <DoctorList />
)}

      </div>
    </div>
  );
};

export default PatientDashboard;
