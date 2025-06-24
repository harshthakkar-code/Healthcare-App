import React, { useState } from 'react';
import './PatientStep0.css';

const PatientStep0 = ({ formData, setFormData, nextStep }) => {
  const [name, setName] = useState(formData.name || '');
  const [phone, setPhone] = useState(formData.phone || '');
  const [email, setEmail] = useState(formData.email || '');
  const [password, setPassword] = useState(formData.password || '');

  const handleNext = () => {
    if (!name || !phone || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setFormData({ ...formData, name, phone, email, password });
    nextStep();
  };

  return (
    <div className="login-container">
      <div className="login-banner">
        <img height={500} width={500} src="../../login-banner.png" alt="Patient Register Illustration" />
      </div>

      <div className="login-form-box">
        <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between' }}>
        <h2>Patient Register</h2>
        <a href="/doctor-register"><p>are you doctor?</p></a>
        </div>
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <label>Name</label>
          <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />

          <label>Phone</label>
          <input type="text" placeholder="Enter your phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Create Password</label>
          <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="button" className="signin-btn-patient" onClick={handleNext}>Sign Up</button>

          <div className="divider-signin-patient">or</div>
          <button className="social-btn google">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
            Sign in With Google
          </button>
          <button className="social-btn facebook">
            <img src="https://img.icons8.com/ios-filled/16/ffffff/facebook.png" alt="Facebook" />
            Sign in With Facebook
          </button>

          <p className="signup-link">Already have an account? <a href="/login">Sign In</a></p>
        </form>
      </div>
    </div>
  );
};

export default PatientStep0;
