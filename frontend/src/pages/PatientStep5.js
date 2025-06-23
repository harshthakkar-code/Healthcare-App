import React, { useState } from "react";
import "./PatientStep5.css";

const PatientStep5 = ({ formData, setFormData, prevStep }) => {
  const [city, setCity] = useState(formData.city || "");
  const [state, setState] = useState(formData.state || "");

  const handleContinue = () => {
    const finalData = {
      ...formData,
      city,
      state,
    };
    setFormData(finalData);
    console.log("✅ Final Patient Registration Data:", finalData);
    alert("Patient registration complete! Check console for full data.");
  };

  return (
    <div className="step5-container">
      <img src="/logo.svg" alt="Doccure" className="logo" />

      <div className="step-indicators">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className={`step ${s < 5 ? "active" : ""}`}>✓</div>
        ))}
      </div>

      <h4 className="sub-heading">Your Location</h4>

      <div className="form-group">
        <label>Select City</label>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select Your City</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Surat">Surat</option>
          <option value="Vadodara">Vadodara</option>
        </select>
      </div>

      <div className="form-group">
        <label>Select State</label>
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">Select Your State</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Rajasthan">Rajasthan</option>
        </select>
      </div>

      <button className="continue-btn" onClick={handleContinue}>continue</button>
      <button className="back-btn" onClick={prevStep}>back</button>
    </div>
  );
};

export default PatientStep5;
