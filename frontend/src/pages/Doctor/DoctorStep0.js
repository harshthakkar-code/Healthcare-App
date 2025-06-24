import React, { useState } from 'react';
import './DoctorStep0.css';

const DoctorStep0 = ({ nextStep, formData, setFormData }) => {
  const [name, setName] = useState(formData.name || '');
  const [phone, setPhone] = useState(formData.phone || '');
  const [email, setEmail] = useState(formData.email || '');
  const [password, setPassword] = useState(formData.password || '');

  const handleStart = () => {
    if (!name || !phone || !password) {
      alert("All fields are required.");
      return;
    }

    setFormData(prev => ({
      ...prev,
      name,
      phone,
      email,
      password
    }));

    nextStep();
  };

  return (
    <div className="step0-container">
      {/* Left Illustration */}
      <div className="step0-banner">
        <img src="../../login-banner.png" alt="Register Illustration" height={500} width={500} />
      </div>

      {/* Right Registration Form */}
      <div className="step0-form-box">
        <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between' }}>
        <h2>Doctor Register</h2>
        <a href="/patient-registration"><p>not a doctor?</p></a>
        </div>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value )} />
        <input type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleStart} className="step0-btn">Sign Up</button>

        <div className="divider-signup">or</div>

        <button className="social-btn google">
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
          Sign in With Google
        </button>
        <button className="social-btn facebook">
          <img src="https://img.icons8.com/ios-filled/16/ffffff/facebook.png" alt="Facebook" />
          Sign in With Facebook
        </button>

        <p className="signup-link">Already have an account? <a href="/login">Sign In</a></p>
      </div>
    </div>
  );
};

export default DoctorStep0;
