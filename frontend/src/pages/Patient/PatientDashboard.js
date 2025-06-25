import React from 'react';
import './PatientDashboard.css';
import HealthRecords from './HealthRecords';

const PatientDashboard = () => {
  return (
    <div>
      {/* Example dashboard content, update as needed */}
      <h2>Welcome to your Patient Dashboard</h2>
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
  );
};

export default PatientDashboard;
