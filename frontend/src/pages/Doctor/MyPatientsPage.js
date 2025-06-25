import React, { useState } from 'react';
import './MyPatientsPage.css';

const mockPatients = [
  {
    id: 'Apt0001',
    name: 'Adrian',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    age: 42,
    gender: 'Male',
    blood: 'AB+',
    date: '2024-11-11T10:45',
    location: 'Alabama, USA',
    lastBooking: '2024-02-27',
    status: 'Active',
  },
  {
    id: 'Apt0002',
    name: 'Kelly Stevens',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    age: 37,
    gender: 'Female',
    blood: 'O+',
    date: '2024-11-05T11:50',
    location: 'San Diego, USA',
    lastBooking: '2024-03-20',
    status: 'Active',
  },
  {
    id: 'Apt0003',
    name: 'Samuel James',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    age: 43,
    gender: 'Male',
    blood: 'B+',
    date: '2024-10-27T09:30',
    location: 'Chicago, USA',
    lastBooking: '2024-03-12',
    status: 'Active',
  },
  {
    id: 'Apt0004',
    name: 'Catherine Gracey',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    age: 36,
    gender: 'Female',
    blood: 'AB-',
    date: '2024-10-18T12:20',
    location: 'Los Angeles, USA',
    lastBooking: '2024-02-18',
    status: 'Active',
  },
  {
    id: 'Apt0005',
    name: 'Robert Miller',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    age: 38,
    gender: 'Male',
    blood: 'A+',
    date: '2024-10-10T11:30',
    location: 'Dallas, USA',
    lastBooking: '2024-02-10',
    status: 'Active',
  },
  {
    id: 'Apt0006',
    name: 'Anderea Kearns',
    avatar: 'https://randomuser.me/api/portraits/women/69.jpg',
    age: 40,
    gender: 'Female',
    blood: 'B-',
    date: '2024-09-26T10:20',
    location: 'San Francisco, USA',
    lastBooking: '2024-02-15',
    status: 'Active',
  },
  // Add more mock data for InActive as needed
];

const statusTabs = [
  { label: 'Active', key: 'Active' },
  { label: 'InActive', key: 'InActive' },
];

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    day: '2-digit', month: 'short', year: 'numeric',
  }) + ' ' + (dateStr.length > 10 ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '');
}

function formatBooking(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

const MyPatientsPage = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [filter, setFilter] = useState('');

  const filtered = mockPatients.filter(p =>
    p.status === activeTab &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mypatients-page">
      <h2>My Patients</h2>
      <div className="mypatients-toolbar">
        <div className="mypatients-tabs">
          {statusTabs.map(tab => (
            <button
              key={tab.key}
              className={`mypatients-tab${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label} <span className="mypatients-badge">{mockPatients.filter(p => p.status === tab.key).length}</span>
              {tab.key === 'Active' && <span className="mypatients-badge blue">200</span>}
              {tab.key === 'InActive' && <span className="mypatients-badge grey">22</span>}
            </button>
          ))}
        </div>
        <div className="mypatients-actions">
          <input
            className="mypatients-search"
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <input
            className="mypatients-date"
            type="date"
            value={dateRange.from}
            onChange={e => setDateRange(r => ({ ...r, from: e.target.value }))}
          />
          <span style={{ margin: '0 8px' }}>-</span>
          <input
            className="mypatients-date"
            type="date"
            value={dateRange.to}
            onChange={e => setDateRange(r => ({ ...r, to: e.target.value }))}
          />
          <select className="mypatients-filter" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">Filter By</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="blood">Blood Group</option>
          </select>
        </div>
      </div>
      <div className="mypatients-list">
        {filtered.length === 0 ? (
          <div className="mypatients-empty">No patients found.</div>
        ) : (
          filtered.map(p => (
            <div className="mypatients-card" key={p.id}>
              <div className="mypatients-avatar">
                <img src={p.avatar} alt={p.name} />
              </div>
              <div className="mypatients-info">
                <div className="mypatients-id">#{p.id}</div>
                <div className="mypatients-name">{p.name}</div>
                <div className="mypatients-meta">
                  Age: {p.age} <span className="dot">•</span> {p.gender} <span className="dot">•</span> {p.blood}
                </div>
                <div className="mypatients-appointment">
                  <span className="mypatients-datebox">
                    <i className="fa fa-calendar" /> {formatDate(p.date)}
                  </span>
                  <span className="mypatients-location">
                    <i className="fa fa-map-marker" /> {p.location}
                  </span>
                </div>
                <div className="mypatients-lastbooking">
                  <i className="fa fa-clock-o" /> Last Booking {formatBooking(p.lastBooking)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPatientsPage; 