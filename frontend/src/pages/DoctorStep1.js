import React, { useRef, useState } from 'react';
import './register.css';

const DoctorStep1 = ({ formData, setFormData, nextStep }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
  if (!formData.profileImage) {
    alert("Profile image is required.");
    return;
  }
  nextStep();
};


  return (
    <div className="register-step-container">
      <div className="register-logo">
        <img src="../../logo.svg" alt="Doccure" />
      </div>

      <div className="step-indicator">
        <div className="step active">1</div>
        <div className="step">2</div>
        <div className="step">3</div>
      </div>

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

      <button onClick={handleNext} className="register-btn">Continue</button>

      <footer className="step-footer">© 2024 Doccure. All rights reserved.</footer>
    </div>
  );
};

export default DoctorStep1;
