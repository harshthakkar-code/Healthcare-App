import React, { useState } from 'react';
import './DoctorStep0.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const DoctorStep0 = ({ nextStep, formData, setFormData }) => {
  const [name, setName] = useState(formData.name || '');
  const [phone, setPhone] = useState(formData.phone || '');
  const [email, setEmail] = useState(formData.email || '');
  const [password, setPassword] = useState(formData.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required.';
    if (!phone) newErrors.phone = 'Phone is required.';
    else if (!/^\d{10,}$/.test(phone)) newErrors.phone = 'Enter a valid phone number.';
    if (!email) newErrors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) newErrors.email = 'Enter a valid email.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    return newErrors;
  };

  const handleStart = () => {
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setFormData(prev => ({ ...prev, name, phone, email, password }));
    toast.success('Step is complete!');
    setTimeout(() => nextStep(), 1000);
  };

  // Remove error as soon as the user enters a valid value
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (submitted) {
      setErrors((prev) => {
        const { name, ...rest } = prev;
        if (!e.target.value) return { ...rest, name: 'Name is required.' };
        return rest;
      });
    }
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (submitted) {
      setErrors((prev) => {
        const { phone, ...rest } = prev;
        if (!/^\d{10,}$/.test(e.target.value)) return { ...rest, phone: 'Enter a valid phone number.' };
        return rest;
      });
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (submitted) {
      setErrors((prev) => {
        const { email, ...rest } = prev;
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e.target.value)) return { ...rest, email: 'Enter a valid email.' };
        return rest;
      });
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (submitted) {
      setErrors((prev) => {
        const { password, ...rest } = prev;
        if (e.target.value.length < 6) return { ...rest, password: 'Password must be at least 6 characters.' };
        return rest;
      });
    }
  };

  return (
    <div className="step0-container">
      <ToastContainer position="top-center" autoClose={2000} />
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
        <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
        {submitted && errors.name && <div className="input-error">{errors.name}</div>}
        <input type="tel" placeholder="Phone" value={phone} onChange={handlePhoneChange} />
        {submitted && errors.phone && <div className="input-error">{errors.phone}</div>}
        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        {submitted && errors.email && <div className="input-error">{errors.email}</div>}
        <div className="password-input-wrapper">
          <input type={showPassword ? 'text' : 'password'} placeholder="Create Password" value={password} onChange={handlePasswordChange} />
          <span className="eye-icon" onClick={() => setShowPassword((show) => !show)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {submitted && errors.password && <div className="input-error">{errors.password}</div>}

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
