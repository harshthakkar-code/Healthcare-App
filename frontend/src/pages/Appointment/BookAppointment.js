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
     <div className="stepper-line">
  {["Specialty", "Appointment Type", "Date & Time", "Basic Information", "Payment", "Confirmation"].map(
    (label, index) => (
      <div
        key={index}
        className={`stepper-item ${step === index + 1 ? "active" : step > index + 1 ? "done" : ""}`}
      >
        <div className="stepper-icon">{index + 1}</div>
        <div className="stepper-label">{label}</div>
        {index < 5 && <div className="stepper-line-separator" />}
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

      <div className="navigation">
        {step > 1 && <button onClick={() => setStep(step - 1)}>Back</button>}
        {step === 1 && (
          <button onClick={() => setStep(2)}>Select Appointment Type</button>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
