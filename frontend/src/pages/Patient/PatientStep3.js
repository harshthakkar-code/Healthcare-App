import React, { useState, useEffect } from "react";
import "./PatientStep3.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientStep3 = ({ formData, setFormData, nextStep, prevStep, step, setStep }) => {
  const [members, setMembers] = useState(formData.members || {
    self: true,
    spouse: false,
    child: 0,
    mother: false,
    father: false,
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMembers(formData.members || {
      self: true,
      spouse: false,
      child: 0,
      mother: false,
      father: false,
    });
  }, [formData]);

  const handleCheckboxChange = (field) => {
    setMembers((prev) => {
      const updated = { ...prev, [field]: !prev[field] };
      setFormData(f => ({ ...f, members: updated }));
      return updated;
    });
  };

  const incrementChild = () => {
    setMembers((prev) => {
      const updated = { ...prev, child: prev.child + 1 };
      setFormData(f => ({ ...f, members: updated }));
      return updated;
    });
  };

  const decrementChild = () => {
    setMembers((prev) => {
      const updated = { ...prev, child: prev.child > 0 ? prev.child - 1 : 0 };
      setFormData(f => ({ ...f, members: updated }));
      return updated;
    });
  };

  const handleContinue = () => {
    setSubmitted(true);
    const hasAny = members.self || members.spouse || members.mother || members.father || members.child > 0;
    if (!hasAny) {
      setError('Select at least one member.');
      return;
    }
    setError('');
    setFormData({
      ...formData,
      members,
      selectedMembers: {
        Self: members.self,
        Spouse: members.spouse,
        Mother: members.mother,
        Father: members.father,
        Child: members.child > 0
      },
      childCount: members.child,
    });
    toast.success('Step 4 complete!');
    setTimeout(() => nextStep(), 1000);
  };

  return (
    <div className="step3-container">
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
      <h4 className="sub-heading">Who all you want to cover in health insurance</h4>
      <div className="insurance-section">
        <label>
          <span>Self</span>
          <input
            type="checkbox"
            checked={members.self}
            onChange={() => handleCheckboxChange("self")}
          />
        </label>
        <label>
          <span>Spouse</span>
          <input
            type="checkbox"
            checked={members.spouse}
            onChange={() => handleCheckboxChange("spouse")}
          />
        </label>
        <div className="child-row">
          <span>Child</span>
          <div className="counter">
            <button type="button" onClick={decrementChild}>-</button>
            <span>{members.child}</span>
            <button type="button" onClick={incrementChild}>+</button>
          </div>
        </div>
        <label>
          <span>Mother</span>
          <input
            type="checkbox"
            checked={members.mother}
            onChange={() => handleCheckboxChange("mother")}
          />
        </label>
        <label>
          <span>Father</span>
          <input
            type="checkbox"
            checked={members.father}
            onChange={() => handleCheckboxChange("father")}
          />
        </label>
      </div>
      {submitted && error && <div className="input-error">{error}</div>}
      <button onClick={handleContinue} className="continue-btn">continue</button>
    </div>
  );
};

export default PatientStep3;
