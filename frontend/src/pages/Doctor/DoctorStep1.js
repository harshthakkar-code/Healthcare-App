import React, { useRef, useState, useEffect } from 'react';
import './register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoctorStep1 = ({ formData, setFormData, nextStep, step, setStep }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (formData.profileImage && typeof formData.profileImage !== 'string') {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(formData.profileImage);
    } else if (typeof formData.profileImage === 'string') {
      setPreview(formData.profileImage);
    } else {
      setPreview(null);
    }
  }, [formData.profileImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });
    setError('');
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    setSubmitted(true);
    if (!formData.profileImage) {
      setError('Profile image is required.');
      return;
    }
    setError('');
    toast.success('Step 1 complete!');
    setTimeout(() => nextStep(), 1000);
  };

  return (
    <div className="register-step-container">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="register-logo">
        <img src="../../logo.svg" alt="Doccure" />
      </div>
      <div className="step-indicator">
        <div className="step active">1</div>
        <div className="step">2</div>
        <div className="step">3</div>
      </div>
      {step > 0 && (
        <button className="back-btn small" onClick={() => setStep(step - 1)} style={{ display: 'block', margin: '0 auto 18px auto' }}>
          ← Back
        </button>
      )}
      <h2 className="step-title">Profile Picture</h2>

      <div
        className="profile-upload-box"
        onClick={() => fileInputRef.current.click()}
      >
        {preview ? (
          <img src={preview} alt="preview" className="profile-preview" />
        ) : (
          <>
            <span className="camera-icon">📷</span>
            <p>Upload Profile Picture</p>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>
      {submitted && error && <div className="input-error">{error}</div>}

      <button onClick={handleNext} className="register-btn">Continue</button>

      <footer className="step-footer">© 2024 Doccure. All rights reserved.</footer>
    </div>
  );
};

export default DoctorStep1;
