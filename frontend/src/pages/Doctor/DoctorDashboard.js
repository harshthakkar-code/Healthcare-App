import React from 'react';
import './DoctorDashboard.css';
import { FaCalendarCheck, FaUsers, FaClock, FaUserMd, FaStar, FaFileInvoice, FaNotesMedical } from 'react-icons/fa';

const appointments = [
  {
    id: '#Apt0001',
    name: 'Adrian Marshall',
    time: '11 Nov 2024 10.45 AM',
    type: 'General',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '#Apt0002',
    name: 'Kelly Stevens',
    time: '10 Nov 2024 11.00 AM',
    type: 'Clinic Consulting',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '#Apt0003',
    name: 'Samuel Anderson',
    time: '03 Nov 2024 02.00 PM',
    type: 'General',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    id: '#Apt0004',
    name: 'Catherine Griffin',
    time: '01 Nov 2024 04.00 PM',
    type: 'Clinic Consulting',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  {
    id: '#Apt0005',
    name: 'Robert Hutchinson',
    time: '28 Oct 2024 05.30 PM',
    type: 'General',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
  },
];

const DoctorDashboard = () => {
  return (
    <div className="doctor-dashboard">
      <aside className="sidebar">
        <ul>
          <li className="active"><FaCalendarCheck /> Dashboard</li>
          <li><FaUsers /> Requests <span className="badge">2</span></li>
          <li><FaClock /> Appointments</li>
          <li><FaUserMd /> Available Timings</li>
          <li><FaUsers /> My Patients</li>
          <li><FaNotesMedical /> Specialties & Services</li>
          <li><FaStar /> Reviews</li>
          <li><FaFileInvoice /> Invoices</li>
          <li><FaCalendarCheck /> Logout</li>
        </ul>
      </aside>

      <main className="dashboard-content">
        <div className="stats-row">
          <div className="stat-card green">
            <h3>Total Patients</h3>
            <p className="count">978</p>
            <p className="trend up">↑ 15% From Last Week</p>
          </div>
          <div className="stat-card red">
            <h3>Patients Today</h3>
            <p className="count">80</p>
            <p className="trend down">↓ 15% From Yesterday</p>
          </div>
          <div className="stat-card green">
            <h3>Appointments Today</h3>
            <p className="count">50</p>
            <p className="trend up">↑ 20% From Yesterday</p>
          </div>
        </div>

        <div className="appointment-section">
          <div className="header">
            <h3>Appointment</h3>
            <select>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
            </select>
          </div>

          <div className="appointments-list">
            {appointments.map((apt, idx) => (
              <div key={idx} className="appointment-card">
                <img src={apt.avatar} alt={apt.name} />
                <div className="info">
                  <span className="apt-id">{apt.id}</span>
                  <h4>{apt.name}</h4>
                </div>
                <div className="details">
                  <p>{apt.time}</p>
                  <span className="badge-type">{apt.type}</span>
                </div>
                <div className="actions">
                  <button className="accept">✓</button>
                  <button className="reject">✗</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
