import React, { useState } from "react";
import "./PatientStep3.css";

const PatientStep3 = ({ formData, setFormData, nextStep, prevStep }) => {
  const [members, setMembers] = useState({
    self: true,
    spouse: false,
    child: 0,
    mother: false,
    father: false,
  });

  const handleCheckboxChange = (field) => {
    setMembers((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const incrementChild = () => {
    setMembers((prev) => ({
      ...prev,
      child: prev.child + 1,
    }));
  };

  const decrementChild = () => {
    setMembers((prev) => ({
      ...prev,
      child: prev.child > 0 ? prev.child - 1 : 0,
    }));
  };

  const handleContinue = () => {
 const normalized = {
    Self: members.self,
    Spouse: members.spouse,
    Mother: members.mother,
    Father: members.father,
    Child: members.child > 0
  };

    setFormData({
      ...formData,
      selectedMembers: normalized,
    childCount: members.child,
    });

    nextStep();
  };

  return (
    <div className="step3-container">
      <img src="/logo.svg" alt="Doccure" className="logo" />

      <div className="step-indicators">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className={`step ${s <= 3 ? "active" : ""} ${s < 3 ? "completed" : ""}`}>
            {s < 3 ? "✓" : s}
          </div>
        ))}
      </div>

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
            <button onClick={decrementChild}>-</button>
            <span>{members.child}</span>
            <button onClick={incrementChild}>+</button>
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

      <button onClick={handleContinue} className="continue-btn">continue</button>
    </div>
  );
};

export default PatientStep3;
