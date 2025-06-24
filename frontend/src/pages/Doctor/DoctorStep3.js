import React, { useState, useEffect } from "react";
import "./DoctorStep3.css";
import api from '../../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoctorStep3 = ({ formData, prevStep, step, setStep, setFormData }) => {
  const [city, setCity] = useState(formData.city || "");
  const [state, setState] = useState(formData.state || "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setCity(formData.city || "");
    setState(formData.state || "");
  }, [formData]);

  const validate = () => {
    const newErrors = {};
    if (!city) newErrors.city = 'City is required.';
    if (!state) newErrors.state = 'State is required.';
    return newErrors;
  };

  const handleUpdate = async () => {
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

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
      const res = await api.post('/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setLoading(false);
      if (res.status === 201) {
        toast.success("Registration complete! Please login.");
        setFormData({});
        setTimeout(() => { window.location.href = '/login'; }, 1500);
      } else {
        toast.error(res.data.message || "Registration failed.");
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setFormData(prev => ({ ...prev, city: e.target.value }));
    if (submitted) {
      setErrors((prev) => {
        const { city, ...rest } = prev;
        if (!e.target.value) return { ...rest, city: 'City is required.' };
        return rest;
      });
    }
  };
  const handleStateChange = (e) => {
    setState(e.target.value);
    setFormData(prev => ({ ...prev, state: e.target.value }));
    if (submitted) {
      setErrors((prev) => {
        const { state, ...rest } = prev;
        if (!e.target.value) return { ...rest, state: 'State is required.' };
        return rest;
      });
    }
  };

  return (
    <div className="step3-container">
      <ToastContainer position="top-center" autoClose={2000} />
      <img src="/logo.svg" alt="Doccure" className="logo" />
      <div className="step-indicator">
        <div className="step completed">✓</div>
        <div className="step completed">✓</div>
        <div className="step active">3</div>
      </div>
      {step > 0 && (
        <button className="back-btn small" onClick={() => setStep(step - 1)} style={{ display: 'block', margin: '0 auto 18px auto' }}>
          ← Back
        </button>
      )}

      <h2>Your Location</h2>

      <div className="form-section">
        <label>Select City</label>
        <select value={city} onChange={handleCityChange}>
          <option value="">Select Your City</option>
          <option>Ahmedabad</option>
          <option>Surat</option>
          <option>Vadodara</option>
        </select>
        {submitted && errors.city && <div className="input-error">{errors.city}</div>}

        <label>Select State</label>
        <select value={state} onChange={handleStateChange}>
          <option value="">Select Your State</option>
          <option>Gujarat</option>
          <option>Maharashtra</option>
          <option>Rajasthan</option>
        </select>
        {submitted && errors.state && <div className="input-error">{errors.state}</div>}
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
