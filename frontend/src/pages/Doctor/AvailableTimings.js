import React, { useState } from 'react';
import './AvailableTimings.css';

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

function AvailableTimings() {
  const [selectedTab] = useState('General Availability');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [slots, setSlots] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  const [fees, setFees] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    startTime: '',
    endTime: '',
    duration: defaultDurations[0],
  });
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDayClick = (day) => setSelectedDay(day);

  const handleAddSlot = () => setShowModal(true);

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  const validateModal = () => {
    const errs = {};
    if (!modalData.startTime) errs.startTime = 'Start time required';
    if (!modalData.endTime) errs.endTime = 'End time required';
    if (modalData.startTime && modalData.endTime && modalData.startTime >= modalData.endTime) {
      errs.endTime = 'End time must be after start time';
    }
    return errs;
  };

  const handleSaveSlot = () => {
    const errs = validateModal();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    // Generate slots for each duration (back-to-back)
    const durationMin = parseInt(modalData.duration.split(' ')[0], 10);
    const start = timeStringToMinutes(modalData.startTime);
    const end = timeStringToMinutes(modalData.endTime);
    let newSlots = [];
    let t = start;
    while (t + durationMin <= end) {
      newSlots.push({
        startTime: minutesToTimeString(t),
        endTime: minutesToTimeString(t + durationMin),
      });
      t = t + durationMin;
    }
    setSlots((prev) => ({
      ...prev,
      [selectedDay]: [...prev[selectedDay], ...newSlots],
    }));
    setShowModal(false);
    setModalData({
      startTime: '',
      endTime: '',
      duration: defaultDurations[0],
    });
    setErrors({});
  };

  const handleDeleteAll = () => {
    setShowDeleteConfirm(true);
  };
  const confirmDeleteAll = () => {
    setSlots((prev) => ({ ...prev, [selectedDay]: [] }));
    setShowDeleteConfirm(false);
  };
  const cancelDeleteAll = () => {
    setShowDeleteConfirm(false);
  };

  const handleFeesChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setFees(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!fees) errs.fees = 'Appointment fees required';
    if (slots[selectedDay].length === 0) errs.slots = 'At least one slot required';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // Submit logic here
      alert('Saved!');
    }
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
        <div className="days-row">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              className={selectedDay === day ? 'day-btn active' : 'day-btn'}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="slots-section">
          <div className="slots-header">
            <span className="slots-day">{selectedDay}</span>
            <span className="slots-actions">
              <span className="add-slots" onClick={handleAddSlot}>Add Slots</span>
              <span className="delete-all" onClick={handleDeleteAll}>Delete All</span>
            </span>
          </div>
          <div className="slots-list">
            {slots[selectedDay].length === 0 ? (
              <span className="no-slots">No slots added</span>
            ) : (
              slots[selectedDay].map((slot, idx) => (
                <span key={idx} className="slot-chip">
                  {formatTime12hr(slot.startTime)}
                </span>
              ))
            )}
          </div>
          {errors.slots && <div className="error-msg">{errors.slots}</div>}
        </div>
        <div className="fees-section">
          <label>Appointment Fees ($)</label>
          <input
            type="text"
            value={fees}
            onChange={handleFeesChange}
            className="fees-input"
            placeholder="Enter fees"
          />
          {errors.fees && <div className="error-msg">{errors.fees}</div>}
        </div>
        <div className="form-actions">
          <button className="cancel-btn" type="button">Cancel</button>
          <button className="save-btn" onClick={handleFormSubmit}>Save Changes</button>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ position: 'relative' }}>
            <button
              className="modal-close-btn"
              aria-label="Close"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h3>Add New Slot</h3>
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
            </div>
            {slotPreview.length > 0 && (
              <div className="slot-preview-list">
                <div className="slot-preview-title">Total Appointments: {slotPreview.length}</div>
                <div className="slot-preview-items">
                  {slotPreview.map((slot, idx) => (
                    <div key={idx} className="slot-preview-chip">
                      {formatTime12hr(slot.startTime)}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSaveSlot}>Save Changes</button>
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
              <button className="cancel-btn" onClick={confirmDeleteAll}>Yes</button>
              <button className="save-btn" onClick={cancelDeleteAll}>No, I Changed my mind</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvailableTimings; 