import React, { useState } from 'react';
import "./AppointmentPage.css";

const appointments = [
  {
    doctor: { name: 'Dr. Darren Elder', avatar: '/avatars/elder.png', specialty: 'Dental' },
    patient: { name: 'Travis Trimble', avatar: '/avatars/travis.png' },
    date: '5 Nov 2023',
    time: '11.00 AM - 11.35 AM',
    amount: '$300.00',
    status: false
  },
  {
    doctor: { name: 'Dr. Deborah Angel', avatar: '/avatars/angel.png', specialty: 'Cardiology' },
    patient: { name: 'Carl Kelly', avatar: '/avatars/carl.png' },
    date: '11 Nov 2023',
    time: '12.00 PM - 12.15 PM',
    amount: '$150.00',
    status: false
  },
  {
    doctor: { name: 'Dr. John Gibbs', avatar: '/avatars/gibbs.png', specialty: 'Dental' },
    patient: { name: 'Walter Roberson', avatar: '/avatars/walter.png' },
    date: '21 Nov 2023',
    time: '12.10 PM - 12.25 PM',
    amount: '$300.00',
    status: true
  },
  // Add more entries...
];

const AppointmentsPage = () => {
  const [data, setData] = useState(appointments);

  const toggleStatus = (index) => {
    const updated = [...data];
    updated[index].status = !updated[index].status;
    setData(updated);
  };

  return (
    <div className="main-content">
      <h2>Appointments</h2>
      <p className="breadcrumb">Dashboard / Appointments</p>
      <div className="table-wrapper">
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Speciality</th>
              <th>Patient Name</th>
              <th>Appointment Time</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((app, idx) => (
              <tr key={idx}>
                <td>
                  <div className="cell-with-img">
                    <img src={app.doctor.avatar} alt="doc" />
                    {app.doctor.name}
                  </div>
                </td>
                <td>{app.doctor.specialty}</td>
                <td>
                  <div className="cell-with-img">
                    <img src={app.patient.avatar} alt="pat" />
                    {app.patient.name}
                  </div>
                </td>
                <td>
                  <div>{app.date}</div>
                  <div className="appt-time">{app.time}</div>
                </td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={app.status}
                      onChange={() => toggleStatus(idx)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>{app.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsPage;
