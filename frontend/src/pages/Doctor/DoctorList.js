import React, { useState, useEffect } from 'react';
import './DoctorList.css';
import { FaStar ,FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [review, setReview] = useState('');
  const [limit] = useState(10); // You can adjust this as needed
  const navigate = useNavigate();


  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      let params = { page, limit };
      if (search) params.name = search;
      if (city) params.city = city;
      if (specialty) params.specialization = specialty;
      if (review) params.avgReview = review;
      try {
        const res = await api.get('/doctor/public/docterlist', { params });
        const data = res.data;
        setDoctors(data.data || []);
        setTotalPages(Math.ceil((data.total || 1) / limit));
      } catch (err) {
        setDoctors([]);
        setTotalPages(1);
      }
      setLoading(false);
    };
    fetchDoctors();
  }, [page, search, city, specialty, review, limit]);

  return (
    <div className="doctorlist-page">
      {/* <div className="doctorlist-breadcrumb">&gt; Doctor &gt; Doctor List</div> */}
      <h2 className="doctorlist-title">Doctor List</h2>

      <div className="doctorlist-searchbar">
        <input
          type="text"
          placeholder="Search for Doctors, Hospitals, Clinics"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        <input
          type="text"
          placeholder="Location"
          value={city}
          onChange={e => { setCity(e.target.value); setPage(1); }}
        />
      </div>

      <div className="doctorlist-filters-row">
        <div className="doctorlist-filters">
          <select value={specialty} onChange={e => { setSpecialty(e.target.value); setPage(1); }}>
            <option value="">Specialties</option>
            <option value="Urology">Urology</option>
            <option value="Psychiatry">Psychiatry</option>
            <option value="Cardiology">Cardiology</option>
            {/* You can fetch and map real specialties here */}
          </select>

          <select value={review} onChange={e => { setReview(e.target.value); setPage(1); }}>
            <option value="">Reviews</option>
            <option value="5">5 Star</option>
            <option value="4">4 Star</option>
            <option value="3">3 Star</option>
            <option value="2">2 Star</option>
            <option value="1">1 Star</option>
          </select>

          <div className="doctorlist-availability-toggle">
            <label className="toggle-label">Availability</label>
            <label className="switch">
              <input type="checkbox" disabled />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <div className="doctorlist-sort">
          <span>Sort By</span>
          <select disabled>
            <option>Price (Low to High)</option>
            <option>Price (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="doctorlist-grid">
        {loading ? (
          <div>Loading...</div>
        ) : doctors.length === 0 ? (
          <div>No doctors found.</div>
        ) : (
          doctors.map((doc, idx) => (
            <div className="doctor-card" key={doc._id || idx}>
              <div className="doctor-card-img">
                <img src={ '/male.png'} alt={doc.name} />
                <span className="doctor-card-rating">
                  <FaStar /> {doc.avgRating?.toFixed(1) || '4.8'}
                </span>
                <span className="doctor-card-fav">♡</span>
              </div>
              <div className="doctor-card-info">
                <div className="doctor-card-specialty">
                  {doc.specialization?.name || 'General'}
                </div>
                {doc.available !== false && (
                  <span className="doctor-card-available">Available</span>
                )}
                <h4>{doc.name}</h4>
                <div className="doctor-card-location">{doc.city} • {doc.clinicName}</div>
                <div className="doctor-card-fee-row">
                  <span className="doctor-card-fee-label">Consultation Fees</span>
                  <span className="doctor-card-fee">${doc.fee || '45'}</span>
                  <button className="book-now-btn" onClick={() => navigate(`/book-appointment/${doc.user}`)}>
                    <FaCalendarAlt />
                    Book Now
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      <div className="doctorlist-pagination">
        <button
          className="doctorlist-page-btn"
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
        >Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`doctorlist-page-btn${page === i + 1 ? ' active' : ''}`}
            onClick={() => setPage(i + 1)}
          >{i + 1}</button>
        ))}
        <button
          className="doctorlist-page-btn"
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
          disabled={page === totalPages}
        >Next</button>
      </div>
    </div>
  );
};

export default DoctorList;
