import React, { useState } from "react";
import "./BookAppointment.css";
import { useParams } from "react-router-dom";

const servicesList = [
  { name: "Echocardiograms", price: 310 },
  { name: "Stress tests", price: 754 },
  { name: "Heart Catheterization", price: 150 },
];
const specialties = ["Cardiology", "Urology", "Orthopaedics"];




const BookAppointment = () => {
  const { doctorId } = useParams();
console.log("Doctor ID:", doctorId);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    specialty: "",
    selectedService: "",
    appointmentType: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    symptoms: "",
  });

  const handleServiceSelect = (service) => {
    setFormData({ ...formData, selectedService: service });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderDoctorCard = () => (
    <div className="doctor-summary-card">
      <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Doctor" />
      <div className="info">
        <h3>Dr. Michael Brown</h3>
        <p className="specialty">Psychologist</p>
        <p className="rating">★ 5.0</p>
        <p className="address">📍 1011 W 5th St, Austin, TX</p>
      </div>
    </div>
  );

  return (
    <div className="booking-wrapper">
      <aside className="booking-sidebar">{renderDoctorCard()}</aside>

      <main className="booking-main">
       <div className="stepper">
  {["Specialty", "Type", "Date/Time", "Basic Info", "Confirm"].map((label, index) => (
    <div
      key={index}
      className={`step ${step === index + 1 ? "active" : ""} ${step > index + 1 ? "completed" : ""}`}
    >
      <div className="circle">{index + 1}</div>
      <div className="label">{label}</div>
    </div>
  ))}
</div>


        {step === 1 && (
          <>
            <h2>Select Service</h2>
<div className="specialty-select-grid">
  {specialties.map((s, i) => (
    <div
      key={i}
      className={`specialty-box ${formData.specialty === s ? "selected" : ""}`}
      onClick={() => setFormData({ ...formData, specialty: s })}
    >
      {s}
    </div>
  ))}
</div>
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
          </>
        )}

        {step === 2 && (
          <>
            <h2>Select Appointment Type</h2>
            <div className="appointment-type-grid">
              {["Clinic", "Video Call", "Audio Call", "Chat", "Home Visit"].map((type, i) => (
                <div
                  key={i}
                  className={`appointment-type-box ${formData.appointmentType === type ? "selected" : ""}`}
                  onClick={() => setFormData({ ...formData, appointmentType: type })}
                >
                  {type}
                </div>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Select Date & Time</h2>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
            <div className="time-slots">
              {["09:00 AM", "10:30 AM", "02:00 PM", "04:00 PM"].map((t, i) => (
                <div
                  key={i}
                  className={`slot ${formData.time === t ? "selected" : ""}`}
                  onClick={() => setFormData({ ...formData, time: t })}
                >
                  {t}
                </div>
              ))}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2>Enter Basic Information</h2>
            <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            <input name="symptoms" placeholder="Symptoms" value={formData.symptoms} onChange={handleChange} />
          </>
        )}

        {step === 5 && (
          <>
            <h2>Confirm Your Details</h2>
            <div className="confirmation-box">
              <p><strong>Service:</strong> {formData.selectedService}</p>
              <p><strong>Appointment Type:</strong> {formData.appointmentType}</p>
              <p><strong>Date & Time:</strong> {formData.date}, {formData.time}</p>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
            </div>
            <button className="confirm-btn" onClick={() => {
    console.log("Appointment confirmed with data:", formData);
    // Optionally, send this data to backend here via fetch/axios
  }} >Confirm Appointment</button>
          </>
        )}

        <div className="navigation-buttons">
          {step > 1 && <button onClick={() => setStep(step - 1)}>Back</button>}
          {step < 5 && <button onClick={() => setStep(step + 1)}>Next</button>}
        </div>
      </main>
    </div>
  );
};

export default BookAppointment;
