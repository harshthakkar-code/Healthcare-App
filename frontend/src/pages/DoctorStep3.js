import React, { useState } from "react";
import "./DoctorStep3.css";

const DoctorStep3 = ({ formData, prevStep }) => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleUpdate = () => {
  if (!city || !state) {
    alert("City and State are required.");
    return;
  }

  const finalData = {
    ...formData,
    city,
    state
  };

  console.log("✅ Registration Complete:\n");

  Object.entries(finalData).forEach(([key, value]) => {
    if (value instanceof File) {
      console.log(`${key}: ${value.name}`);
    } else {
      console.log(`${key}: ${value}`);
    }
  });

  alert("Registration complete!");
};


  return (
    <div className="step3-container">
      <img src="/logo.svg" alt="Doccure" className="logo" />

      <div className="step-indicators">
        <div className="step completed">✓</div>
        <div className="step completed">✓</div>
        <div className="step active">3</div>
      </div>

      <h2>Your Location</h2>

      <div className="form-section">
        <label>Select City</label>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select Your City</option>
          <option>Ahmedabad</option>
          <option>Surat</option>
          <option>Vadodara</option>
        </select>

        <label>Select State</label>
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">Select Your State</option>
          <option>Gujarat</option>
          <option>Maharashtra</option>
          <option>Rajasthan</option>
        </select>
      </div>

      <div className="">
        {/* <button onClick={prevStep} className="back-btn">Back</button> */}
        <button onClick={handleUpdate} className="update-btn">Update</button>
      </div>

      {/* <p className="footer">© 2024 Doccure. All rights reserved.</p> */}
    </div>
  );
};

export default DoctorStep3;
