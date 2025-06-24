import React, { useState, useEffect } from "react";
import "./PatientStep5.css";
import api from '../../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientStep5 = ({ formData, setFormData, prevStep, step, setStep }) => {
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

  const handleContinue = async () => {
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    const finalData = {
      ...formData,
      city,
      state,
      role: 'patient',
    };
    setFormData(finalData);
    setLoading(true);
    try {
      const res = await api.post('/auth/register', finalData);
      setLoading(false);
      if (res.status === 201) {
        toast.success('Patient registration complete! Please login.');
        setFormData({});
        setTimeout(() => { window.location.href = '/login'; }, 1500);
      } else {
        toast.error(res.data.message || 'Registration failed.');
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  // Remove error as soon as the user enters a valid value
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
    <div className="step5-container">
      <ToastContainer position="top-center" autoClose={2000} />
      <img src="/logo.svg" alt="Doccure" className="logo" />
      <div className="step-indicators">
        {[1, 2, 3, 4, 5].map((s, idx) => (
          <div key={s} className={`step${step === idx ? ' active' : ''}${step > idx ? ' completed' : ''}`}>{step > idx ? '✓' : s}</div>
        ))}
      </div>
      {step > 0 && (
        <button className="back-btn small" onClick={() => setStep(step - 1)} style={{ display: 'block', margin: '0 auto 18px auto' }}>← Back</button>
      )}
      <h4 className="sub-heading">Your Location</h4>
      <div className="form-group">
        <label>Select City</label>
        <select value={city} onChange={handleCityChange}>
          <option value="">Select Your City</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Surat">Surat</option>
          <option value="Vadodara">Vadodara</option>
        </select>
        {submitted && errors.city && <div className="input-error">{errors.city}</div>}
      </div>
      <div className="form-group">
        <label>Select State</label>
        <select value={state} onChange={handleStateChange}>
          <option value="">Select Your State</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Rajasthan">Rajasthan</option>
        </select>
        {submitted && errors.state && <div className="input-error">{errors.state}</div>}
      </div>
      <button className="continue-btn" onClick={handleContinue} disabled={loading}>
        {loading ? 'Registering...' : 'continue'}
      </button>
    </div>
  );
};

export default PatientStep5;
