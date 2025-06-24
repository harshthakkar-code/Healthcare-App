import React from 'react';
import './Admindashboard.css';
import { FaUserFriends, FaRegCreditCard, FaRegMoneyBillAlt, FaRegFolderOpen } from 'react-icons/fa';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const revenueData = [
  { year: '2013', value: 60 },
  { year: '2014', value: 90 },
  { year: '2015', value: 230 },
  { year: '2016', value: 110 },
  { year: '2017', value: 70 },
  { year: '2018', value: 100 },
  { year: '2019', value: 300 },
];
const statusData = [
  { year: '2015', blue: 120, orange: 40 },
  { year: '2016', blue: 30, orange: 60 },
  { year: '2017', blue: 110, orange: 130 },
  { year: '2018', blue: 60, orange: 90 },
  { year: '2019', blue: 150, orange: 200 },
];
const doctorList = [
  { name: 'Dr. Ruby Perrin', specialty: 'Dental', earned: 3200, reviews: 4, img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Dr. Darren Elder', specialty: 'Dental', earned: 3100, reviews: 3, img: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Dr. Deborah Angel', specialty: 'Cardiology', earned: 4000, reviews: 4, img: 'https://randomuser.me/api/portraits/women/46.jpg' },
  { name: 'Dr. Sofia Brient', specialty: 'Urology', earned: 3200, reviews: 3, img: 'https://randomuser.me/api/portraits/women/47.jpg' },
  { name: 'Dr. Marvin Campbell', specialty: 'Orthopaedics', earned: 3500, reviews: 4, img: 'https://randomuser.me/api/portraits/men/48.jpg' },
];
const patientList = [
  { name: 'Charlene Reed', phone: '8286329170', lastVisit: '20 Oct 2023', paid: 100, img: 'https://randomuser.me/api/portraits/women/49.jpg' },
  { name: 'Travis Trimble', phone: '2077299974', lastVisit: '22 Oct 2023', paid: 200, img: 'https://randomuser.me/api/portraits/men/50.jpg' },
  { name: 'Carl Kelly', phone: '2607247769', lastVisit: '21 Oct 2023', paid: 250, img: 'https://randomuser.me/api/portraits/men/51.jpg' },
  { name: 'Michelle Fairfax', phone: '5043686874', lastVisit: '21 Sep 2023', paid: 150, img: 'https://randomuser.me/api/portraits/women/52.jpg' },
  { name: 'Gina Moore', phone: '9548207887', lastVisit: '18 Sep 2023', paid: 350, img: 'https://randomuser.me/api/portraits/women/53.jpg' },
];
const appointmentList = [
  { doctor: doctorList[0], patient: patientList[0], specialty: 'Dental', time: '9 Nov 2023\n11.00 AM - 11.15 AM', status: true, amount: 200 },
  { doctor: doctorList[1], patient: patientList[1], specialty: 'Dental', time: '5 Nov 2023\n11.00 AM - 11.35 AM', status: true, amount: 300 },
  { doctor: doctorList[2], patient: patientList[2], specialty: 'Cardiology', time: '11 Nov 2023\n12.00 PM - 12.15 PM', status: true, amount: 150 },
  { doctor: doctorList[3], patient: patientList[3], specialty: 'Urology', time: '7 Nov 2023\n1.00 PM - 1.20 PM', status: true, amount: 150 },
  { doctor: doctorList[4], patient: patientList[4], specialty: 'Orthopaedics', time: '15 Nov 2023\n1.00 PM - 1.15 PM', status: true, amount: 200 },
];
const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);

const Admindashboard = () => {
  return (
    <div className="admin-dashboard main-content">
      <h2>Welcome Admin!</h2>
      <div className="admin-dashboard-subtitle">Dashboard</div>

      {/* Cards */}
      <div className="admin-dashboard-cards-row">
        <div className="admin-dashboard-card blue">
          <div className="icon blue-outline"><FaUserFriends /></div>
          <div className="card-info">
            <div className="value">168</div>
            <div className="label">Doctors</div>
            <div className="progress"><div className="bar blue" style={{ width: '40%' }} /></div>
          </div>
        </div>
        <div className="admin-dashboard-card green">
          <div className="icon green-outline"><FaRegCreditCard /></div>
          <div className="card-info">
            <div className="value">487</div>
            <div className="label">Patients</div>
            <div className="progress"><div className="bar green" style={{ width: '60%' }} /></div>
          </div>
        </div>
        <div className="admin-dashboard-card red">
          <div className="icon red-outline"><FaRegMoneyBillAlt /></div>
          <div className="card-info">
            <div className="value">485</div>
            <div className="label">Appointment</div>
            <div className="progress"><div className="bar red" style={{ width: '50%' }} /></div>
          </div>
        </div>
        <div className="admin-dashboard-card yellow">
          <div className="icon yellow-outline"><FaRegFolderOpen /></div>
          <div className="card-info">
            <div className="value">$62523</div>
            <div className="label">Revenue</div>
            <div className="progress"><div className="bar yellow" style={{ width: '50%' }} /></div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="admin-dashboard-charts-row">
        <div className="admin-dashboard-chart">
          <div className="chart-title">Revenue</div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="year" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="admin-dashboard-chart">
          <div className="chart-title">Status</div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={statusData}>
              <XAxis dataKey="year" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line type="monotone" dataKey="blue" stroke="#3b82f6" strokeWidth={2} dot />
              <Line type="monotone" dataKey="orange" stroke="#facc15" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="admin-dashboard-tables-row">
        <div className="admin-dashboard-table doctors">
          <div className="table-title">Doctors List</div>
          <table>
            <thead>
              <tr><th>Doctor Name</th><th>Speciality</th><th>Earned</th><th>Reviews</th></tr>
            </thead>
            <tbody>
              {doctorList.map(doc => (
                <tr key={doc.name}>
                  <td><img src={doc.img} alt={doc.name} className="avatar" /> {doc.name}</td>
                  <td>{doc.specialty}</td>
                  <td>${doc.earned.toFixed(2)}</td>
                  <td><span className="stars">{stars(doc.reviews)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="admin-dashboard-table patients">
          <div className="table-title">Patients List</div>
          <table>
            <thead>
              <tr><th>Patient Name</th><th>Phone</th><th>Last Visit</th><th>Paid</th></tr>
            </thead>
            <tbody>
              {patientList.map(p => (
                <tr key={p.name}>
                  <td><img src={p.img} alt={p.name} className="avatar" /> {p.name}</td>
                  <td>{p.phone}</td>
                  <td>{p.lastVisit}</td>
                  <td>${p.paid.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-dashboard-table appointments">
        <div className="table-title">Appointment List</div>
        <table>
          <thead>
            <tr><th>Doctor Name</th><th>Speciality</th><th>Patient Name</th><th>Appointment Time</th><th>Status</th><th>Amount</th></tr>
          </thead>
          <tbody>
            {appointmentList.map((a, i) => (
              <tr key={i}>
                <td><img src={a.doctor.img} alt={a.doctor.name} className="avatar" /> {a.doctor.name}</td>
                <td>{a.specialty}</td>
                <td><img src={a.patient.img} alt={a.patient.name} className="avatar" /> {a.patient.name}</td>
                <td>{a.time.split('\n').map((t, idx) => <div key={idx}>{t}</div>)}</td>
                <td><input type="checkbox" checked={a.status} readOnly style={{ accentColor: 'green' }} /></td>
                <td>${a.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admindashboard;
