import React, { useState } from 'react';
import './DoctorList.css';

const doctors = [
  {
    name: 'Dr. Michael Brown',
    specialty: 'Psychologist',
    rating: 5.0,
    location: 'Minneapolis, MN',
    time: '30 Min',
    available: true,
    fee: 650,
    image: '',
  },
  {
    name: 'Dr. Nicholas Tello',
    specialty: 'Pediatrician',
    rating: 4.6,
    location: 'Ogden, IA',
    time: '60 Min',
    available: true,
    fee: 400,
    image: '',
  },
  {
    name: 'Dr. Harold Bryant',
    specialty: 'Neurologist',
    rating: 4.8,
    location: 'Winona, MS',
    time: '30 Min',
    available: true,
    fee: 500,
    image: '',
  },
  {
    name: 'Dr. Sandra Jones',
    specialty: 'Cardiologist',
    rating: 4.8,
    location: 'Beckley, WV',
    time: '30 Min',
    available: true,
    fee: 550,
    image: '',
  },
  {
    name: 'Dr. Charles Scott',
    specialty: 'Neurologist',
    rating: 4.2,
    location: 'Hamshire, TX',
    time: '30 Min',
    available: true,
    fee: 600,
    image: '',
  },
  {
    name: 'Dr. Robert Thomas',
    specialty: 'Cardiologist',
    rating: 4.2,
    location: 'Oakland, CA',
    time: '30 Min',
    available: true,
    fee: 450,
    image: '',
  },
];

const DoctorList = () => {
  const [page, setPage] = useState(2);

  return (
    <div className="doctorlist-page">
      <div className="doctorlist-breadcrumb">&gt; Doctor &gt; Doctor List</div>
      <h2 className="doctorlist-title">Doctor List</h2>

      <div className="doctorlist-searchbar">
        <input type="text" placeholder="Search for Doctors, Hospitals, Clinics" />
        <input type="text" placeholder="Location" />
        <input type="date" />
        <button className="search-btn"><i className="fa fa-search" /> Search</button>
      </div>


      <div className="doctorlist-filters-row">
        <div className="doctorlist-filters">
          <select>
            <option>Specialties</option>
            <option>Urology</option>
            <option>Psychiatry</option>
            <option>Cardiology</option>
          </select>

          <select>
            <option>Reviews</option>
            <option>5 Star</option>
            <option>4 Star</option>
            <option>3 Star</option>
          </select>

          <div className="doctorlist-availability-toggle">
            <label className="toggle-label">Availability</label>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <div className="doctorlist-sort">
          <span>Sort By</span>
          <select>
            <option>Price (Low to High)</option>
            <option>Price (High to Low)</option>
          </select>
        </div>

      </div>

      <div className="doctorlist-grid">
        {doctors.map((doc, idx) => (
          <div className="doctor-card" key={idx}>
            <div className="doctor-card-img">
              <img src={doc.image || 'https://placehold.co/220x180?text=Doctor'} alt={doc.name} />
              <span className="doctor-card-rating">{doc.rating.toFixed(1)}</span>
              <span className="doctor-card-fav">♡</span>
            </div>
            <div className="doctor-card-info">
              <div className="doctor-card-specialty">{doc.specialty}</div>
              <span className="doctor-card-available">{doc.available ? 'Available' : 'Unavailable'}</span>
              <h4>{doc.name}</h4>
              <div className="doctor-card-location">{doc.location} • {doc.time}</div>
              <div className="doctor-card-fee-row">
                <span className="doctor-card-fee-label">Consultation Fees</span>
                <span className="doctor-card-fee">${doc.fee}</span>
                <button className="doctor-card-book">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="doctorlist-pagination">
        <button className="doctorlist-page-btn">Prev</button>
        <button className="doctorlist-page-btn">1</button>
        <button className="doctorlist-page-btn active">2</button>
        <button className="doctorlist-page-btn">3</button>
        <button className="doctorlist-page-btn">4</button>
        <button className="doctorlist-page-btn">Next</button>
      </div>
    </div>
  );
};

export default DoctorList;
