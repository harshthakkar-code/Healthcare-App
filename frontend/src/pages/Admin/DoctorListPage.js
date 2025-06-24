import React, { useState } from 'react';
import './DoctorListPage.css';

const doctorData = [
  {
    name: 'Dr. Darren Elder',
    avatar: '/avatars/elder.png',
    specialty: 'Dental',
    memberSince: '11 Jun 2023',
    time: '4.50 AM',
    earned: '$5000.00',
    status: true
  },
  {
    name: 'Dr. Deborah Angel',
    avatar: '/avatars/angel.png',
    specialty: 'Cardiology',
    memberSince: '4 Jan 2018',
    time: '9.40 AM',
    earned: '$3300.00',
    status: true
  },
  {
    name: 'Dr. John Gibbs',
    avatar: '/avatars/gibbs.png',
    specialty: 'Dental',
    memberSince: '21 Apr 2018',
    time: '02.59 PM',
    earned: '$4100.00',
    status: true
  },
  // Add more doctors here...
];

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState(doctorData);

  const toggleStatus = (index) => {
    const updated = [...doctors];
    updated[index].status = !updated[index].status;
    setDoctors(updated);
  };

  return (
    <div className="main-content">
      <h2>List of Doctors</h2>
      <p className="breadcrumb">Dashboard / Users / Doctor</p>
      <div className="table-wrapper">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Speciality</th>
              <th>Member Since</th>
              <th>Earned</th>
              <th>Account Status</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc, idx) => (
              <tr key={idx}>
                <td>
                  <div className="cell-with-img">
                    <img src={doc.avatar} alt={doc.name} />
                    {doc.name}
                  </div>
                </td>
                <td>{doc.specialty}</td>
                <td>
                  {doc.memberSince}
                  <div className="appt-time">{doc.time}</div>
                </td>
                <td>{doc.earned}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={doc.status}
                      onChange={() => toggleStatus(idx)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorListPage;
