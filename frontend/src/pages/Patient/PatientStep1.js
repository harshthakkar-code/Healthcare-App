import React, { useRef, useState } from 'react';
import './PatientStep1.css';

const PatientStep1 = ({ formData, setFormData, nextStep }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(formData.profileImagePreview || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({
      ...formData,
      profileImage: file,
      profileImagePreview: URL.createObjectURL(file)
    });

    setPreview(URL.createObjectURL(file));
  };

  const handleNext = () => {
    if (!formData.profileImage) {
      alert('Profile image is required.');
      return;
    }
    nextStep();
  };

  return (
    <div className="patient-step-container">
      <div className="register-logo">
        <img src="../../logo.svg" alt="Doccure" />
      </div>

      <div className="step-indicator">
        <div className="step active">1</div>
        <div className="step">2</div>
        <div className="step">3</div>
        <div className="step">4</div>
        <div className="step">5</div>
      </div>

      <h2 className="step-title">Profile Picture</h2>

      <div className="profile-upload-box" onClick={() => fileInputRef.current.click()}>
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
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>

      <button onClick={handleNext} className="register-btn">
        continue
      </button>
    </div>
  );
};

export default PatientStep1;
