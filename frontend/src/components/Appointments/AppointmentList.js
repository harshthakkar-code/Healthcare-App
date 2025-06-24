import React, { useState } from 'react';
import './AppointmentList.css';

const appointments = [
  {
    id: '#Apt0001',
    doctor: 'Dr Edalin',
    datetime: '11 Nov 2024 10.45 AM',
    visit: 'General Visit',
    mode: 'Video Call',
    email: 'edalin@example.com',
    phone: '+1 504 368 6874',
  },
  {
    id: '#Apt0002',
    doctor: 'Dr Shanta',
    datetime: '05 Nov 2024 11.50 AM',
    visit: 'General Visit',
    mode: 'Audio Call',
    email: 'shanta@example.com',
    phone: '+1 832 891 8403',
  },
  // add more...
];

const PatientAppointments = () => {
  const [filter, setFilter] = useState('Upcoming');

  return (
    <div className="appointments-page">
      <div className="appointments-header">
        <h2>Appointments</h2>
        <div className="filters">
          {['Upcoming', 'Cancelled', 'Completed'].map(f => (
            <button
              key={f}
              className={filter === f ? 'active' : ''}
              onClick={() => setFilter(f)}
            >
              {f} ({appointments.filter(a => a.id).length})
            </button>
          ))}
        </div>
        <div className="book-appointment">
          <button style={{ backgroundColor: '#059dff', color: 'white' }}>Book Appointment</button>
        </div>
      </div>

      <div className="appointment-list">
        {appointments.map(a => (
          <div key={a.id} className="appointment-card">
            <div className="left">
              <div className="apt-id">{a.id}</div>
              <div className="doctor-name">{a.doctor}</div>
            </div>
            <div className="middle">
              <div>{a.datetime}</div>
              <div>{a.visit} · {a.mode}</div>
              <div>{a.email}</div>
              <div>{a.phone}</div>
            </div>
            <div className="right">
              <button className="btn-attend">Attend</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientAppointments;
