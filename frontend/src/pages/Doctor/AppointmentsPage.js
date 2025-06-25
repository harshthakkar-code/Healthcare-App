import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import './AppointmentsPage.css';

const getDoctorId = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) return user.id;
    if (user && user._id) return user._id;
  } catch {}
  return '6859592ab3408025b2a3cdbe';
};

const statusTabs = [
  { key: 'all', label: 'All' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'cancelled', label: 'Cancelled' },
  { key: 'completed', label: 'Completed' },
];

const getStatus = (apt) => {
  if (apt.status === 'cancelled') return 'cancelled';
  if (apt.status === 'completed') return 'completed';
  if (apt.status === 'accepted' || apt.status === 'pending') {
    const today = new Date().toISOString().slice(0, 10);
    if (apt.date >= today) return 'upcoming';
  }
  return 'upcoming';
};

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const doctorId = getDoctorId();

  useEffect(() => {
    setLoading(true);
    api.get(`/doctor/appointments/doctor/${doctorId}`)
      .then(res => {
        setAppointments(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [doctorId]);

  const counts = {
    all: appointments.length,
    upcoming: appointments.filter(a => getStatus(a) === 'upcoming').length,
    cancelled: appointments.filter(a => getStatus(a) === 'cancelled').length,
    completed: appointments.filter(a => getStatus(a) === 'completed').length,
  };

  const filtered = activeTab === 'all'
    ? appointments
    : appointments.filter(a => getStatus(a) === activeTab);

  return (
    <div className="appointments-page">
      <h2>Appointments</h2>
      <div className="appointments-tabs">
        {statusTabs.map(tab => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? 'active' : ''}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label} <span>{counts[tab.key]}</span>
          </button>
        ))}
      </div>

      <div className="appointments-list">
        {loading ? (
          <div>Loading...</div>
        ) : filtered.length === 0 ? (
          <div>No appointments found.</div>
        ) : (
          filtered.map((apt, index) => (
            <div className="appointment-card" key={apt._id || index}>
              <img
                className="profile-img"
                src={apt.patient?.profileImage || 'https://randomuser.me/api/portraits/men/1.jpg'}
                alt={apt.patient?.name || apt.name || 'Patient'}
              />
              <div className="appointment-details">
                <div>
                  <span className="apt-id">#{apt._id?.slice(-6) || apt.id}</span>
                  <span className="apt-name">{apt.patient?.name || apt.name || 'Unknown'}</span>
                </div>
                <div style={{ margin: "2px 0" }}>
                  {apt.date} {apt.time}
                </div>
                <div style={{ color: "#222" }}>
                  {(apt.service || apt.type || apt.specialty || 'General Visit')}
                  {" | "}
                  {(apt.appointmentType || apt.mode || '')}
                </div>
                <div style={{ color: "#555" }}>
                  {apt.patient?.email || apt.email || ''}<br />
                  {apt.patient?.phone || apt.phone || ''}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
