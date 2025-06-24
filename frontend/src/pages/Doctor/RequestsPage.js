import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import './DoctorDashboard.css'; // Reuse styles for now

const getDoctorId = () => {
  // Try to get from localStorage (set at login)
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) return user.id;
    if (user && user._id) return user._id;
  } catch {}
  return null;
};

const RequestsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState({});
  const doctorId = getDoctorId();

  useEffect(() => {
    if (!doctorId) return;
    setLoading(true);
    api.get(`/doctor/appointments/doctor/${doctorId}`)
      .then(res => {
        // Only keep pending appointments
        setAppointments((res.data || []).filter(a => a.status === 'pending'));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [doctorId]);

  const handleStatus = (id, status) => {
    setStatusLoading(prev => ({ ...prev, [id]: true }));
    api.put(`/doctor/appointments/${id}/status`, { status })
      .then(() => {
        setAppointments(apps => apps.filter(a => a._id !== id)); // Remove from list on action
        setStatusLoading(prev => ({ ...prev, [id]: false }));
      })
      .catch(() => setStatusLoading(prev => ({ ...prev, [id]: false })));
  };

  if (!doctorId) {
    return <div className="dashboard-content"><h2>Error: Doctor ID not found. Please log in again.</h2></div>;
  }

  return (
    <div className="dashboard-content">
      <h2>Pending Appointment Requests</h2>
      <div className="appointments-list">
        {loading ? (
          <div>Loading...</div>
        ) : appointments.length === 0 ? (
          <div>No pending requests.</div>
        ) : (
          appointments.map((apt, idx) => (
            <div key={apt._id || idx} className="appointment-card">
              <img src={apt.patient?.profileImage || 'https://randomuser.me/api/portraits/men/32.jpg'} alt={apt.patient?.name || 'Patient'} />
              <div className="info">
                <span className="apt-id">#{apt._id?.slice(-6) || 'Apt'}</span>
                <h4>{apt.patient?.name || apt.name || 'Unknown'}</h4>
              </div>
              <div className="details">
                <p>{apt.date} {apt.time}</p>
                <span className="badge-type">{apt.appointmentType || 'General'}</span>
              </div>
              <div className="actions">
                <button className="accept" disabled={statusLoading[apt._id]} onClick={() => handleStatus(apt._id, 'accepted')}>✓</button>
                <button className="reject" disabled={statusLoading[apt._id]} onClick={() => handleStatus(apt._id, 'rejected')}>✗</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RequestsPage; 