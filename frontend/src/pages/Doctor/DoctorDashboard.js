import React, { useEffect, useState } from 'react';
import './DoctorDashboard.css';
import { FaCalendarCheck, FaUsers, FaClock, FaUserMd, FaStar, FaFileInvoice, FaNotesMedical } from 'react-icons/fa';
import api from '../../api/api';
import { Link, useLocation } from 'react-router-dom';

const doctorId = '6859592ab3408025b2a3cdbe'; // TODO: Replace with dynamic doctorId from auth or route if needed

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState({});
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    api.get(`/doctor/appointments/doctor/${doctorId}`)
      .then(res => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Calculate stats
  const todayStr = new Date().toISOString().slice(0, 10);
  const patients = [...new Set(appointments.map(a => a.patient?._id || a.patient))];
  const patientsToday = [...new Set(appointments.filter(a => a.date === todayStr).map(a => a.patient?._id || a.patient))];
  const appointmentsToday = appointments.filter(a => a.date === todayStr);

  // Dummy trend values for now
  const totalPatients = patients.length;
  const patientsTodayCount = patientsToday.length;
  const appointmentsTodayCount = appointmentsToday.length;
  const totalPatientsTrend = 15; // %
  const patientsTodayTrend = -15; // %
  const appointmentsTodayTrend = 20; // %

  // Approve/Reject handler
  const handleStatus = (id, status) => {
    setStatusLoading(prev => ({ ...prev, [id]: true }));
    console.log(id, status);
    api.put(`/doctor/appointments/${id}/status`, { status })
      .then(res => {
        setAppointments(apps => apps.map(a => a._id === id ? { ...a, status: res.data.status } : a));
        setStatusLoading(prev => ({ ...prev, [id]: false }));
      })
      .catch(() => setStatusLoading(prev => ({ ...prev, [id]: false })));
  };

  return (
    <>
      <div className="stats-row">
        <div className="stat-card green">
          <h3>Total Patients</h3>
          <p className="count">{totalPatients}</p>
          <p className="trend up">↑ {totalPatientsTrend}% From Last Week</p>
        </div>
        <div className="stat-card red">
          <h3>Patients Today</h3>
          <p className="count">{patientsTodayCount}</p>
          <p className="trend down">↓ {Math.abs(patientsTodayTrend)}% From Yesterday</p>
        </div>
        <div className="stat-card green">
          <h3>Appointments Today</h3>
          <p className="count">{appointmentsTodayCount}</p>
          <p className="trend up">↑ {appointmentsTodayTrend}% From Yesterday</p>
        </div>
      </div>

      <div className="appointment-section">
        <div className="header">
          <h3>Appointment</h3>
        </div>

        <div className="appointments-list">
          {loading ? (
            <div>Loading...</div>
          ) : appointments.length === 0 ? (
            <div>No appointments found.</div>
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
                  {apt.status === 'pending' && (
                    <>
                      <button className="accept" disabled={statusLoading[apt._id]} onClick={() => handleStatus(apt._id, 'accepted')}>✓</button>
                      <button className="reject" disabled={statusLoading[apt._id]} onClick={() => handleStatus(apt._id, 'rejected')}>✗</button>
                    </>
                  )}
                  {apt.status === 'accepted' && <span style={{color: 'green'}}>Accepted</span>}
                  {apt.status === 'rejected' && <span style={{color: 'red'}}>Rejected</span>}
                  {apt.status === 'completed' && <span style={{color: 'gray'}}>Completed</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
