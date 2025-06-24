import React, { useState } from "react";
import "./BookAppointment.css";

const servicesList = [
  { name: "Echocardiograms", price: 310 },
  { name: "Stress tests", price: 754 },
  { name: "Heart Catheterization", price: 150 },
  { name: "Echocardiograms", price: 200 },
];

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    specialty: "Cardiology",
    selectedService: "",
  });

  const handleServiceSelect = (service) => {
    setFormData({ ...formData, selectedService: service });
  };

  return (
    <div className="appointment-container">
     <div className="doccure-stepper">
  {["Specialty", "Appointment Type", "Date & Time", "Basic Information", "Payment", "Confirmation"].map(
    (label, index) => (
      <div key={index} className="doccure-stepper-item">
        <div className={`step-circle ${step === index + 1 ? "active" : ""}`}>
          {index + 1}
        </div>
       
        {index !== 5 && <div className="dotted-line" />}
         {/* <div className={`step-label ${step === index + 1 ? "active" : ""}`}>
          {label}
        </div> */}
      </div>
      
    )
  )}
</div>


      {step === 1 && (
        <div className="step1-wrapper">
          <div className="doctor-card">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Doctor"
              className="doctor-avatar"
            />
            <div className="doctor-details">
              <h3>
                Dr. Michael Brown <span className="rating">★ 5.0</span>
              </h3>
              <p className="role">Psychologist</p>
              <p className="address">
                5th Street - 1011 W 5th St, Suite 120, Austin, TX 78703
              </p>
            </div>
          </div>

          <div className="form-section">
            <label className="section-label">Select Speciality</label>
            <div className="specialty-box">{formData.specialty}</div>
          </div>

          <div className="form-section">
            <label className="section-label">Services</label>
            <div className="services-grid">
              {servicesList.map((s, i) => (
                <div
                  key={i}
                  className={`service-box ${formData.selectedService === s.name ? "selected" : ""}`}
                  onClick={() => handleServiceSelect(s.name)}
                >
                  <h5>{s.name}</h5>
                  <p>${s.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
  <>
    <div className="doctor-card">
      <img
        className="doctor-avatar"
        src="https://randomuser.me/api/portraits/men/75.jpg"
        alt="Doctor"
      />
      <div className="doctor-details">
        <h3>
          Dr. Michael Brown <span className="rating">★ 5.0</span>
        </h3>
        <p className="role">Psychologist</p>
        <p className="address">
          📍 5th Street - 1011 W 5th St, Suite 120, Austin, TX 78703
        </p>
      </div>
    </div>

    <div className="form-section">
      <label className="section-label">Select Appointment Type</label>
      <div className="appointment-type-grid">
        {[
          { label: "Clinic", icon: "🏥" },
          { label: "Video Call", icon: "📹" },
          { label: "Audio Call", icon: "📞" },
          { label: "Chat", icon: "💬" },
          { label: "Home Visit", icon: "🏠" },
        ].map((type, idx) => (
          <div
            key={idx}
            className={`appointment-type-box ${
              formData.appointmentType === type.label ? "selected" : ""
            }`}
            onClick={() =>
              setFormData({ ...formData, appointmentType: type.label })
            }
          >
            <div className="type-icon">{type.icon}</div>
            <div className="type-label">{type.label}</div>
          </div>
        ))}
      </div>
    </div>
  </>
)}

{step === 3 && (
  <>
   <div className="doctor-summary-card">
  <div className="doctor-top-row">
    <img
      src="https://randomuser.me/api/portraits/men/75.jpg"
      alt="Doctor"
      className="doctor-summary-avatar"
    />
    <div className="doctor-summary-info">
      <h3>
        Dr. Michael Brown <span className="rating">★ 5.0</span>
      </h3>
      <p className="role">Psychologist</p>
      <p className="address">📍 5th Street - 1011 W 5th St, Suite 120, Austin, TX 78703</p>
    </div>
  </div>

  <div className="booking-info">
    <h4>Booking Info</h4>
    <div className="info-grid">
      <div>
        <strong>Service</strong>
        <p>{formData.specialty} (30 Mins)</p>
      </div>
      <div>
        <strong>Service</strong>
        <p>{formData.selectedService || "-"}</p>
      </div>
      <div>
        <strong>Date & Time</strong>
        <p>{formData.date || "-"} {formData.time ? `, ${formData.time}` : ""}</p>
      </div>
      <div>
        <strong>Appointment type</strong>
        <p>{formData.appointmentType || "-"}</p>
      </div>
    </div>
  </div>
</div>


    <div className="datetime-section">
      <div className="calendar-box">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>
      <div className="time-box">
        {["Morning", "Afternoon", "Evening"].map((period, i) => (
          <div key={i} className="time-period">
            <h5>{period}</h5>
            <div className="time-slots">
              {["09:45", "10:45", "11:30", "12:15"].map((slot, idx) => (
                <div
                  key={idx}
                  className={`time-slot ${formData.time === slot ? "selected" : ""}`}
                  onClick={() => setFormData({ ...formData, time: slot })}
                >
                  {slot}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
)}



      <div className="navigation">
        {step > 1 && <button style={{ marginRight: "auto" }} onClick={() => setStep(step - 1)}>Back</button>}
        {step === 1 && (
          <button onClick={() => setStep(2)}>Select Appointment Type</button>
        )}
        {step === 2 && (
          <button onClick={() => setStep(3)}>Select Date & Time</button>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
