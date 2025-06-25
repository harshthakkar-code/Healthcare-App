import React from 'react';
import './AppointmentsPage.css';

const appointments = [
  {
    id: '#Apt0001',
    name: 'Adrian',
    date: '11 Nov 2024',
    time: '10.45 AM',
    type: 'General Visit',
    mode: 'Video Call',
    email: 'adran@example.com',
    phone: '+1 504 368 6874',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '#Apt0002',
    name: 'Kelly',
    date: '05 Nov 2024',
    time: '11.50 AM',
    type: 'General Visit',
    mode: 'Audio Call',
    email: 'kelly@example.com',
    phone: '+1 832 891 8403',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    isNew: true,
  },
  {
    id: '#Apt0003',
    name: 'Samuel',
    date: '27 Oct 2024',
    time: '09.30 AM',
    type: 'General Visit',
    mode: 'Video Call',
    email: 'samuel@example.com',
    phone: '+1 749 104 6291',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '#Apt0004',
    name: 'Catherine',
    date: '18 Oct 2024',
    time: '12.20 PM',
    type: 'General Visit',
    mode: 'Direct Visit',
    email: 'catherine@example.com',
    phone: '+1 584 920 7183',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
];

const AppointmentsPage = () => {
  return (
    <div className="appointments-page">
      <h2>Appointments</h2>
      <div className="appointments-tabs">
        <button className="active">Upcoming <span>21</span></button>
        <button>Cancelled <span>16</span></button>
        <button>Completed <span>214</span></button>
      </div>

      <div className="appointments-list">
        {appointments.map((apt, index) => (
          <div className="appointment-card" key={index}>
            <img className="profile-img" src={apt.image} alt={apt.name} />
            <div className="appointment-info">
              <div className="top-row">
                <span className="apt-id">{apt.id}</span>
                <span className="apt-name">{apt.name}</span>
                {apt.isNew && <span className="new-badge">New</span>}
              </div>
              <div className="date-time">
                <span>{apt.date}</span> <span>{apt.time}</span>
              </div>
              <div className="visit-details">
                {apt.type} | {apt.mode}
              </div>
              <div className="contact-info">
                <span>{apt.email}</span>
                <span>{apt.phone}</span>
              </div>
            </div>
            <div className="actions">
              <button title="View"><i className="fa fa-eye" /></button>
              <button title="Edit"><i className="fa fa-edit" /></button>
              <button title="Delete"><i className="fa fa-trash" /></button>
            </div>
            <div className="start-now">
              <a href="#">Start Now</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsPage;
