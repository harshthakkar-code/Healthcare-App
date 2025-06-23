import React, { useState } from "react";
import "./BookAppointment.css"; // Create this for styling

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    doctor: "Dr. Michael Brown",
    specialty: "Cardiology",
    selectedService: "",
    appointmentType: "",
    date: "",
    time: "",
    patientName: "",
    patientEmail: "",
    paymentMethod: "",
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceSelect = (service) => {
    setFormData({ ...formData, selectedService: service });
  };

  const handleSubmit = () => {
    console.log("Final Appointment Data:", formData);
    // Submit to backend
  };

  return (
    <div className="appointment-container">
      <div className="step-header">
        {["Specialty", "Appointment Type", "Date & Time", "Basic Info", "Payment", "Confirm"].map((label, index) => (
          <div key={index} className={`step ${step === index + 1 ? "active" : step > index + 1 ? "done" : ""}`}>
            <div className="step-number">{step > index + 1 ? "✓" : index + 1}</div>
            <div className="step-label">{label}</div>
          </div>
        ))}
      </div>

      {/* Step Contents */}
      <div className="step-content">
        {step === 1 && (
          <>
            <h3>Select Speciality</h3>
            <select name="specialty" value={formData.specialty} onChange={handleChange}>
              <option value="Cardiology">Cardiology</option>
              <option value="Psychology">Psychology</option>
              <option value="Neurology">Neurology</option>
            </select>

            <h4>Services</h4>
            <div className="services-grid">
              {["Echocardiograms", "Stress tests", "Heart Catheterization"].map((s, i) => (
                <div
                  key={i}
                  className={`service-box ${formData.selectedService === s ? "selected" : ""}`}
                  onClick={() => handleServiceSelect(s)}
                >
                  <h5>{s}</h5>
                  <p>${(Math.random() * 500 + 100).toFixed(0)}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3>Select Appointment Type</h3>
            <label>
              <input
                type="radio"
                name="appointmentType"
                value="In-Person"
                checked={formData.appointmentType === "In-Person"}
                onChange={handleChange}
              />
              In-Person
            </label>
            <label>
              <input
                type="radio"
                name="appointmentType"
                value="Virtual"
                checked={formData.appointmentType === "Virtual"}
                onChange={handleChange}
              />
              Virtual
            </label>
          </>
        )}

        {step === 3 && (
          <>
            <h3>Date & Time</h3>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
            <input type="time" name="time" value={formData.time} onChange={handleChange} />
          </>
        )}

        {step === 4 && (
          <>
            <h3>Basic Information</h3>
            <input
              type="text"
              name="patientName"
              placeholder="Your Name"
              value={formData.patientName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="patientEmail"
              placeholder="Your Email"
              value={formData.patientEmail}
              onChange={handleChange}
            />
          </>
        )}

        {step === 5 && (
          <>
            <h3>Payment Method</h3>
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
              <option value="">Select Method</option>
              <option value="Card">Credit/Debit Card</option>
              <option value="UPI">UPI</option>
              <option value="Cash">Cash at Clinic</option>
            </select>
          </>
        )}

        {step === 6 && (
          <>
            <h3>Confirm Your Appointment</h3>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
            <button onClick={handleSubmit}>Confirm Booking</button>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="navigation">
        {step > 1 && <button onClick={prevStep}>Back</button>}
        {step < 6 && <button onClick={nextStep}>Next</button>}
      </div>
    </div>
  );
};

export default BookAppointment;
