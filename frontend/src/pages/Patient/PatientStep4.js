import React, { useState, useEffect } from 'react';
import './PatientStep4.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientStep4 = ({ formData, setFormData, nextStep, prevStep, step, setStep }) => {
  const { selectedMembers = {}, memberDetails = {} } = formData;
  const [localDetails, setLocalDetails] = useState(memberDetails);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setLocalDetails(memberDetails);
  }, [memberDetails]);

  const handleInputChange = (member, field, value) => {
    setLocalDetails(prev => ({
      ...prev,
      [member]: {
        ...prev?.[member],
        [field]: value
      }
    }));
    setFormData(prev => ({
      ...prev,
      memberDetails: {
        ...prev.memberDetails,
        [member]: {
          ...prev.memberDetails?.[member],
          [field]: value
        }
      }
    }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(selectedMembers).forEach(([member, selected]) => {
      if (selected && (member === 'Child' || member === 'Self' || member === 'Spouse' || member === 'Father' || member === 'Mother')) {
        const memberKey = member === 'Child' ? `Child_${formData.childCount || 1}` : member;
        if (!localDetails?.[memberKey]?.age) {
          newErrors[memberKey] = 'Age is required.';
        }
      }
    });
    return newErrors;
  };

  const handleContinue = () => {
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    toast.success('Step 5 complete!');
    setTimeout(() => nextStep(), 1000);
  };

  const renderFields = (member, index) => (
    <div key={index} className="member-group">
      <label>{member.replace(/_/g, ' ')} Age</label>
      <input
        type="number"
        placeholder={`Enter age of ${member.replace(/_/g, ' ')}`}
        value={localDetails?.[member]?.age || ''}
        onChange={(e) => handleInputChange(member, 'age', e.target.value)}
      />
      {submitted && errors[member] && <div className="input-error">{errors[member]}</div>}
      <label>{member.replace(/_/g, ' ')} Image</label>
      <input
        type="file"
        onChange={(e) => handleInputChange(member, 'image', e.target.files[0])}
      />
    </div>
  );

  return (
    <div className="step4-container">
      <ToastContainer position="top-center" autoClose={2000} />
      <img src="/logo.svg" alt="Doccure Logo" className="logo" />
      <div className="step-indicators">
        {[1, 2, 3, 4, 5].map((s, idx) => (
          <div key={idx} className={`step-box${step === idx ? ' active' : ''}${step > idx ? ' completed' : ''}`}>{step > idx ? '✓' : s}</div>
        ))}
      </div>
      {step > 0 && (
        <button className="back-btn small" onClick={() => setStep(step - 1)} style={{ display: 'block', margin: '0 auto 18px auto' }}>← Back</button>
      )}
      <h3>Add age of the each members</h3>
      {Object.entries(selectedMembers).map(([member, selected], i) => {
        if (selected && (member === 'Child' || member === 'Self' || member === 'Spouse' || member === 'Father' || member === 'Mother')) {
          const memberKey = member === 'Child' ? `Child_${formData.childCount || 1}` : member;
          return renderFields(memberKey, i);
        }
        return null;
      })}
      <button className="continue-btn" onClick={handleContinue}>continue</button>
    </div>
  );
};

export default PatientStep4;
