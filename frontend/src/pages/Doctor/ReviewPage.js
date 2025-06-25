import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import './ReviewPage.css';

const getDoctorId = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) return user.id;
    if (user && user._id) return user._id;
  } catch {}
  return 'DOCTOR_ID_HERE';
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

function StarRating({ value }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= value ? 'star filled' : 'star'}>★</span>
    );
  }
  return <span className="star-rating">{stars}</span>;
}

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const doctorId = getDoctorId();

  useEffect(() => {
    setLoading(true);
    api.get(`/${doctorId}/reviews`)
      .then(res => {
        setReviews(res.data.reviews || []);
        setAvgRating(res.data.avgRating || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [doctorId]);

  return (
    <div className="review-page">
      <h2>Reviews</h2>
      <div className="review-summary">
        <div>
          <div className="review-summary-label">Overall Rating</div>
          <div className="review-summary-rating">
            <span className="review-summary-score">{avgRating ? avgRating.toFixed(1) : '--'}</span>
            <StarRating value={Math.round(avgRating)} />
          </div>
        </div>
      </div>
      <div className="review-list">
        {loading ? (
          <div className="review-empty">Loading...</div>
        ) : reviews.length === 0 ? (
          <div className="review-empty">No reviews yet.</div>
        ) : (
          reviews.map((r, idx) => (
            <div className="review-card" key={r._id || idx}>
              <div className="review-header">
                <img className="review-avatar" src={r.patient?.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'} alt={r.patient?.name || ''} />
                <div className="review-user-info">
                  <div className="review-user-name">{r.patient?.name || 'Unknown'}</div>
                  <div className="review-date">{formatDate(r.createdAt)}</div>
                </div>
                <div className="review-stars">
                  <StarRating value={r.rating} />
                </div>
              </div>
              <div className="review-comment">{r.comment}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewPage; 