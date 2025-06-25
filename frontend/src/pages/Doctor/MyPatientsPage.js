import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import './MyPatientsPage.css';

const statusTabs = [
  { label: 'Active', key: 'Active' },
  { label: 'InActive', key: 'InActive' },
];

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    day: '2-digit', month: 'short', year: 'numeric',
  }) + (dateStr.length > 10 ? ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '');
}

function formatBooking(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

const MyPatientsPage = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [filter, setFilter] = useState('');
  const [patients, setPatients] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const params = {
          page,
          limit,
          search,
          dateFrom: dateRange.from,
          dateTo: dateRange.to,
        };
        const res = await api.get('/doctor/patients-with-appointments', { params });
        setPatients(res.data.data || []);
        setTotal(res.data.total || 0);
      } catch (err) {
        setPatients([]);
        setTotal(0);
      }
      setLoading(false);
    };
    fetchPatients();
  }, [search, dateRange, page]);

  // Filtering by gender/blood group (client-side, since backend doesn't support it yet)
  const filtered = patients.filter(p => {
    if (activeTab === 'Active' && p.patient && p.patient.isActive === false) return false;
    if (activeTab === 'InActive' && p.patient && p.patient.isActive !== false) return false;
    if (filter === 'male' && p.patient?.gender?.toLowerCase() !== 'male') return false;
    if (filter === 'female' && p.patient?.gender?.toLowerCase() !== 'female') return false;
    if (filter === 'blood' && !p.patient?.blood) return false;
    return true;
  });

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
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mypatients-actions">
          <input
            className="mypatients-search"
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
          {/* <input
            className="mypatients-date"
            type="date"
            value={dateRange.from}
            onChange={e => { setDateRange(r => ({ ...r, from: e.target.value })); setPage(1); }}
          />
          <span style={{ margin: '0 8px' }}>-</span>
          <input
            className="mypatients-date"
            type="date"
            value={dateRange.to}
            onChange={e => { setDateRange(r => ({ ...r, to: e.target.value })); setPage(1); }}
          />
          <select className="mypatients-filter" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">Filter By</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="blood">Blood Group</option>
          </select> */}
        </div>
      </div>
      <div className="mypatients-list">
        {loading ? (
          <div className="mypatients-empty">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="mypatients-empty">No patients found.</div>
        ) : (
          filtered.map((p, idx) => (
            <div className="mypatients-card" key={p._id || idx}>
              <div className="mypatients-avatar">
                <img src={p.patient?.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'} alt={p.patient?.name || ''} />
              </div>
              <div className="mypatients-info">
                <div className="mypatients-id">#{p.patient?._id?.slice(-6) || ''}</div>
                <div className="mypatients-name">{p.name || ''}</div>
                <div className="mypatients-meta">
                  Age: {p.patient?.age || '--'} <span className="dot">•</span> {p.patient?.gender || '--'} <span className="dot">•</span> {p.patient?.blood || '--'}
                </div>
                <div className="mypatients-appointment">
                  <span className="mypatients-datebox">
                    <i className="fa fa-calendar" /> {formatDate(p.date)}
                  </span>
                  <span className="mypatients-location">
                    <i className="fa fa-map-marker" /> {p.patient?.city || '--'}
                  </span>
                </div>
                <div className="mypatients-lastbooking">
                  <i className="fa fa-clock-o" /> Last Booking {formatBooking(p.updatedAt)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Pagination controls */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
          <button
            key={i}
            className={`mypatients-tab${page === i + 1 ? ' active' : ''}`}
            onClick={() => setPage(i + 1)}
            style={{ margin: '0 2px' }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyPatientsPage; 