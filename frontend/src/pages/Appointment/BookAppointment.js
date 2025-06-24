import React, { useState, useEffect } from "react";
import "./BookAppointment.css";
import { useParams } from "react-router-dom";
import api from '../../api/api';

const servicesList = [
  { name: "Echocardiograms", price: 310 },
  { name: "Stress tests", price: 754 },
  { name: "Heart Catheterization", price: 150 },
];
const specialties = ["Cardiology", "Urology", "Orthopaedics"];

const BookAppointment = () => {
  const { doctorId } = useParams();
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
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorId) return;
    setLoading(true);
    api.get(`/doctor/by-user/${doctorId}`)
      .then(res => {
        setDoctor(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [doctorId]);

  const handleServiceSelect = (service) => {
    setFormData({ ...formData, selectedService: service });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderDoctorCard = () => {
    let avatarSrc = "https://placehold.co/120x120?text=Doctor";
    if (doctor) {
      if (doctor.profileImage) {
        avatarSrc = doctor.profileImage;
      } else if (doctor.gender === "female") {
        avatarSrc = process.env.PUBLIC_URL + "/female.png";
      } else if (doctor.gender === "male") {
        avatarSrc = process.env.PUBLIC_URL + "/male.png";
      } else {
        avatarSrc = process.env.PUBLIC_URL + "/logo192.png";
      }
    }
    return (
      <div className="doctor-summary-card">
        {loading ? (
          <div>Loading doctor...</div>
        ) : doctor ? (
          <>
            <img src={avatarSrc} alt={doctor.name} />
            <div className="info">
              <h3>{doctor.name}</h3>
              <p className="specialty">{doctor.specialization?.name || "General"}</p>
              <p className="rating">★ {doctor.avgRating ? doctor.avgRating.toFixed(1) : "N/A"}</p>
              <p className="address">📍 {doctor.clinicAddress || doctor.city || "-"}</p>
            </div>
          </>
        ) : (
          <div>Doctor not found</div>
        )}
      </div>
    );
  };

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
