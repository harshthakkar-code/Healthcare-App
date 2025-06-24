import React from 'react';
import './ReviewPage.css';

const reviews = [
  {
    patient: { name: 'Carl Kelly', avatar: '/avatars/carl.png' },
    doctor: { name: 'Dr. Deborah Angel', avatar: '/avatars/angel.png' },
    rating: 4,
    date: '1 Nov 2023',
    time: '02.59 PM',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  },
  {
    patient: { name: 'Charlene Reed', avatar: '/avatars/charlene.png' },
    doctor: { name: 'Dr. Ruby Perrin', avatar: '/avatars/perrin.png' },
    rating: 4,
    date: '3 Nov 2023',
    time: '09.59 AM',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  },
  // Add more reviews here...
];

const ReviewPage = () => {
  return (
    <div className="main-content">
      <h2>Reviews</h2>
      <p className="breadcrumb">Dashboard / Reviews</p>
      <div className="table-wrapper">
        <table className="review-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Ratings</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((rev, idx) => (
              <tr key={idx}>
                <td>
                  <div className="cell-with-img">
                    <img src={rev.patient.avatar} alt="avatar" />
                    {rev.patient.name}
                  </div>
                </td>
                <td>
                  <div className="cell-with-img">
                    <img src={rev.doctor.avatar} alt="avatar" />
                    {rev.doctor.name}
                  </div>
                </td>
                <td>
                  <div className="stars">
                    {'★'.repeat(rev.rating)}
                    {'☆'.repeat(5 - rev.rating)}
                  </div>
                </td>
                <td>{rev.description}</td>
                <td>
                  {rev.date}
                  <br />
                  <span className="time">{rev.time}</span>
                </td>
                <td>
                  <button className="btn-delete">
                    <i className="fa fa-trash" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewPage;
