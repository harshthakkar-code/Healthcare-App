import React, { useState } from "react";
import "./DoctorStep3.css";

const DoctorStep3 = ({ formData, prevStep }) => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!city || !state) {
      alert("City and State are required.");
      return;
    }

    const data = new FormData();
    // Required fields from all steps
    data.append("name", formData.name || "");
    data.append("email", formData.email || "");
    data.append("phone", formData.phone || "");
    data.append("password", formData.password || "");
    data.append("role", "doctor");
    data.append("clinicName", formData.clinicName || "");
    data.append("clinicAddress", formData.clinicAddress || "");
    data.append("address", formData.address || "");
    data.append("address2", formData.address2 || "");
    data.append("city", city);
    data.append("state", state);
    data.append("pincode", formData.pincode || "");
    data.append("gender", formData.gender || "");
    data.append("weight", formData.weight || "");
    data.append("height", formData.height || "");
    data.append("age", formData.age || "");
    data.append("blood", formData.blood || "");
    // File fields
    if (formData.profileImage) data.append("profileImage", formData.profileImage);
    if (formData.certFile) data.append("certFile", formData.certFile);
    if (formData.photoID) data.append("photoID", formData.photoID);
    if (formData.employmentProof) data.append("employmentProof", formData.employmentProof);

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      setLoading(false);
      if (res.ok) {
        alert("Registration complete! Please login.");
        window.location.href = "/login";
      } else {
        alert(result.message || "Registration failed.");
      }
    } catch (err) {
      setLoading(false);
      alert("Registration failed. Please try again.");
    }
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
        <button onClick={handleUpdate} className="update-btn" disabled={loading}>
          {loading ? "Registering..." : "Update"}
        </button>
      </div>

      {/* <p className="footer">© 2024 Doccure. All rights reserved.</p> */}
    </div>
  );
};

export default DoctorStep3;
