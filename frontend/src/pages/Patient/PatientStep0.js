import React, { useState, useEffect } from 'react';
import './PatientStep0.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PatientStep0 = ({ formData, setFormData, nextStep, step, setStep }) => {
  const [name, setName] = useState(formData.name || '');
  const [phone, setPhone] = useState(formData.phone || '');
  const [email, setEmail] = useState(formData.email || '');
  const [password, setPassword] = useState(formData.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setName(formData.name || '');
    setPhone(formData.phone || '');
    setEmail(formData.email || '');
    setPassword(formData.password || '');
  }, [formData]);

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

  const handleNext = () => {
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setFormData(prev => ({ ...prev, name, phone, email, password }));
    toast.success('Step 1 complete!');
    setTimeout(() => nextStep(), 1000);
  };

  // Remove error as soon as the user enters a valid value
  const handleNameChange = (e) => {
    setName(e.target.value);
    setFormData(prev => ({ ...prev, name: e.target.value }));
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
    setFormData(prev => ({ ...prev, phone: e.target.value }));
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
    setFormData(prev => ({ ...prev, email: e.target.value }));
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
    setFormData(prev => ({ ...prev, password: e.target.value }));
    if (submitted) {
      setErrors((prev) => {
        const { password, ...rest } = prev;
        if (e.target.value.length < 6) return { ...rest, password: 'Password must be at least 6 characters.' };
        return rest;
      });
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="login-banner">
        <img height={500} width={500} src="../../login-banner.png" alt="Patient Register Illustration" />
      </div>
      <div className="login-form-box">
        <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between' }}>
        <h2>Patient Register</h2>
        <a href="/doctor-register"><p>are you doctor?</p></a>
        </div>
        {/* Stepper/Tab Navigation */}
        {/* <div className="stepper">
          {[1,2,3,4,5].map((s, idx) => (
            <div key={s} className={`stepper-step${step === idx ? ' active' : ''}${step > idx ? ' completed' : ''}`}>{step > idx ? '✓' : s}</div>
          ))} */}
        {/* </div> */}
        {step > 0 && (
          <button className="back-btn small" onClick={() => setStep(step - 1)} style={{ display: 'block', margin: '0 auto 18px auto' }}>← Back</button>
        )}
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <label>Name</label>
          <input type="text" placeholder="Enter your name" value={name} onChange={handleNameChange} />
          {submitted && errors.name && <div className="input-error">{errors.name}</div>}

          <label>Phone</label>
          <input type="text" placeholder="Enter your phone" value={phone} onChange={handlePhoneChange} />
          {submitted && errors.phone && <div className="input-error">{errors.phone}</div>}

          <label>Email</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
          {submitted && errors.email && <div className="input-error">{errors.email}</div>}

          <label>Create Password</label>
          <div className="password-input-wrapper">
            <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={handlePasswordChange} />
            <span className="eye-icon" onClick={() => setShowPassword((show) => !show)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {submitted && errors.password && <div className="input-error">{errors.password}</div>}

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
