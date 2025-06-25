import React, { useState, useEffect } from 'react';
import './AvailableTimings.css';
import api from '../../api/api';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const defaultIntervals = ['10 Minutes', '15 Minutes'];
const defaultDurations = ['20 Minutes', '30 Minutes', '60 Minutes'];
const defaultSpaces = ['Space 1', 'Space 2', 'Space 3', 'Space 4'];

function timeStringToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}
function minutesToTimeString(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}
function formatTime12hr(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

// Helper to get next date for a given day name
function getNextDateOfDay(dayName) {
  const today = new Date();
  const dayIndex = daysOfWeek.indexOf(dayName);
  const result = new Date(today);
  result.setDate(today.getDate() + ((7 + dayIndex - today.getDay()) % 7));
  result.setHours(0,0,0,0);
  return result;
}

function getMondayOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  return new Date(d.setDate(diff));
}

function formatUIDate(dateObj) {
  return dateObj.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
}

function AvailableTimings() {
  const doctorId = localStorage.getItem('userId'); // or get from auth context
  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week, +1 = next week, -1 = prev week
  const [selectedDayIdx, setSelectedDayIdx] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1); // default to today if in current week
  const [slots, setSlots] = useState([]);
  const [fees, setFees] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    startTime: '',
    endTime: '',
    duration: defaultDurations[0],
  });
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Calculate the current week's Monday
  const today = new Date();
  const baseMonday = getMondayOfWeek(today);
  const monday = new Date(baseMonday);
  monday.setDate(monday.getDate() + weekOffset * 7);

  // Generate the week days and dates
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return {
      day: daysOfWeek[i],
      date,
      dateStr: date.toISOString().slice(0, 10),
      uiDate: formatUIDate(date),
    };
  });

  // Fetch slots for selected day
  useEffect(() => {
    if (!doctorId) return;
    setLoading(true);
    const date = weekDays[selectedDayIdx].dateStr;
    api.get(`/slots/${doctorId}?date=${date}`)
      .then(res => setSlots(res.data.slots || []))
      .catch(() => setSlots([]))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [doctorId, selectedDayIdx, weekOffset, showModal]);

  const handleDayClick = (idx) => setSelectedDayIdx(idx);
  const handlePrevWeek = () => {
    setWeekOffset((prev) => prev - 1);
    setSelectedDayIdx(0);
  };
  const handleNextWeek = () => {
    setWeekOffset((prev) => prev + 1);
    setSelectedDayIdx(0);
  };

  const handleAddSlot = () => {
    setShowModal(true);
    setErrors({});
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fees') {
      setFees(value);
    } else {
      setModalData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateModal = () => {
    const errs = {};
    if (!modalData.startTime) errs.startTime = 'Start time required';
    if (!modalData.endTime) errs.endTime = 'End time required';
    if (modalData.startTime && modalData.endTime && modalData.startTime >= modalData.endTime) {
      errs.endTime = 'End time must be after start time';
    }
    if (!fees || isNaN(Number(fees)) || Number(fees) <= 0) errs.fees = 'Appointment fees required';
    // Overlap validation
    const newStart = timeStringToMinutes(modalData.startTime);
    const newEnd = timeStringToMinutes(modalData.endTime);
    for (const slot of slots) {
      const slotStart = timeStringToMinutes(slot.startTime);
      const slotEnd = timeStringToMinutes(slot.endTime);
      // If ranges overlap
      if (newStart < slotEnd && newEnd > slotStart) {
        errs.overlap = 'Slot time overlaps with an existing slot.';
        break;
      }
    }
    return errs;
  };

  const handleSaveSlot = async () => {
    const errs = validateModal();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    try {
      setLoading(true);
      const date = weekDays[selectedDayIdx].dateStr;
      await api.post('/slots', {
        doctorId,
        date,
        startTime: modalData.startTime,
        endTime: modalData.endTime,
        duration: parseInt(modalData.duration, 10),
        fees: parseInt(fees, 10)
      });
      setShowModal(false);
      setModalData({ startTime: '', endTime: '', duration: defaultDurations[0] });
      setErrors({});
    } catch (err) {
      setErrors({ api: err.response?.data?.error || 'Failed to save slots' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = () => setShowDeleteConfirm(true);
  const confirmDeleteAll = async () => {
    setLoading(true);
    try {
      for (const slot of slots) {
        await api.delete(`/slots/${slot._id}`);
      }
      setSlots([]);
    } catch {}
    setShowDeleteConfirm(false);
    setLoading(false);
  };
  const cancelDeleteAll = () => setShowDeleteConfirm(false);

  const handleFeesChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setFees(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // No-op, handled in modal
  };

  // Slot preview logic for modal
  let slotPreview = [];
  if (modalData.startTime && modalData.endTime && modalData.duration) {
    const durationMin = parseInt(modalData.duration.split(' ')[0], 10);
    const start = timeStringToMinutes(modalData.startTime);
    const end = timeStringToMinutes(modalData.endTime);
    let t = start;
    while (t + durationMin <= end) {
      slotPreview.push({
        startTime: minutesToTimeString(t),
        endTime: minutesToTimeString(t + durationMin),
      });
      t = t + durationMin;
    }
  }

  return (
    <div className="available-timings-container">
      <h2>Available Timings</h2>
      <div className="tabs">
        <button className="active">General Availability</button>
      </div>
      <div className="card">
        <h3>Select Available Slots</h3>
        <div className="days-row week-slider">
          <button className="week-nav-btn" onClick={handlePrevWeek}>&lt;</button>
          {weekDays.map((wd, idx) => (
            <button
              key={wd.day + wd.dateStr}
              className={selectedDayIdx === idx ? 'day-btn active' : 'day-btn'}
              onClick={() => handleDayClick(idx)}
            >
              <div>{wd.day}</div>
              <div style={{ fontSize: '0.95em', color: '#888' }}>{wd.uiDate}</div>
            </button>
          ))}
          <button className="week-nav-btn" onClick={handleNextWeek}>&gt;</button>
        </div>
        <div className="slots-section">
          <div className="slots-header">
            <span className="slots-day">{weekDays[selectedDayIdx].day}</span>
            <span className="slots-actions">
              <span className="add-slots" onClick={handleAddSlot}>Add Slots</span>
              <span className="delete-all" onClick={handleDeleteAll}>Delete All</span>
            </span>
          </div>
          <div className="slots-list">
            {loading ? (
              <span>Loading...</span>
            ) : slots.length === 0 ? (
              <span className="no-slots">No slots added</span>
            ) : (
              slots.map((slot, idx) => (
                <span key={slot._id || idx} className="slot-chip">
                  {formatTime12hr(slot.startTime)} - {formatTime12hr(slot.endTime)}
                </span>
              ))
            )}
          </div>
        </div>
        {/* <div className="fees-section">
          <label>Appointment Fees ($)</label>
          <input
            type="text"
            value={fees}
            onChange={handleFeesChange}
            className="fees-input"
            placeholder="Enter fees"
          />
          {errors.fees && <div className="error-msg">{errors.fees}</div>}
        </div> */}
        <div className="form-actions">
          {/* <button className="cancel-btn" type="button">Cancel</button> */}
          <button className="save-btn" onClick={handleFormSubmit}>Save Changes</button>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ position: 'relative' }}>
            <button
              className="modal-close-btn"
              aria-label="Close"
              onClick={() => { setShowModal(false); setErrors({}); }}
            >
              &times;
            </button>
            <h3>Add New Slot</h3>
            {errors.api && <div className="error-msg" style={{ marginBottom: 10, textAlign: 'center' }}>{errors.api}</div>}
            {errors.overlap && <div className="error-msg" style={{ marginBottom: 10, textAlign: 'center' }}>{errors.overlap}</div>}
            <div className="modal-row time-row">
              <div>
                <label>Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={modalData.startTime}
                  onChange={handleModalChange}
                />
                {errors.startTime && <div className="error-msg">{errors.startTime}</div>}
              </div>
              <div>
                <label>End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={modalData.endTime}
                  onChange={handleModalChange}
                />
                {errors.endTime && <div className="error-msg">{errors.endTime}</div>}
              </div>
            </div>
            <div className="modal-row">
              <div>
                <label>Appointment Durations</label>
                <select name="duration" value={modalData.duration} onChange={handleModalChange}>
                  {defaultDurations.map((dur) => (
                    <option key={dur} value={dur}>{dur}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Appointment Fees ($)</label>
                <input
                  type="text"
                  name="fees"
                  value={fees}
                  onChange={handleModalChange}
                  className="fees-input"
                  placeholder="Enter fees"
                />
                {errors.fees && <div className="error-msg">{errors.fees}</div>}
              </div>
            </div>
            {slotPreview.length > 0 && (
              <div className="slot-preview-list">
                <div className="slot-preview-title">Total Appointments: {slotPreview.length}</div>
                <div className="slot-preview-items">
                  {slotPreview.map((slot, idx) => (
                    <div key={idx} className="slot-preview-chip">
                      {formatTime12hr(slot.startTime)} - {formatTime12hr(slot.endTime)}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSaveSlot} disabled={loading}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal delete-confirm-modal">
            <div className="delete-confirm-icon">
              <span>&#10006;</span>
            </div>
            <h3>Remove Slots</h3>
            <p style={{ textAlign: 'center', margin: '12px 0 24px 0' }}>
              Are you sure you want to remove this slots?
            </p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={confirmDeleteAll} disabled={loading}>Yes</button>
              <button className="save-btn" onClick={cancelDeleteAll} disabled={loading}>No, I Changed my mind</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvailableTimings; 