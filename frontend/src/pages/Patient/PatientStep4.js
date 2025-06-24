import React from 'react';
import './PatientStep4.css';

const PatientStep4 = ({ formData, setFormData, nextStep, prevStep }) => {
  const { selectedMembers = {}, memberDetails = {} } = formData;
console.log('selectedMembers:', selectedMembers);
console.log('memberDetails:', memberDetails);

  const handleInputChange = (member, field, value) => {
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

  const renderFields = (member, index) => (
    <div key={index} className="member-group">
      <label>{member.replace(/_/g, ' ')} Age</label>
      <input
        type="number"
        placeholder={`Enter age of ${member.replace(/_/g, ' ')}`}
        value={memberDetails?.[member]?.age || ''}
        onChange={(e) => handleInputChange(member, 'age', e.target.value)}
      />

      <label>{member.replace(/_/g, ' ')} Image</label>
      <input
        type="file"
        onChange={(e) => handleInputChange(member, 'image', e.target.files[0])}
      />
    </div>
  );

  return (
    <div className="step4-container">
      <img src="/logo.svg" alt="Doccure Logo" className="logo" />
      <div className="step-indicators">
        {[1, 2, 3, 4, 5].map((s, i) => (
          <div key={i} className={`step-box ${s <= 4 ? 'active' : ''}`}>{s}</div>
        ))}
      </div>

      <h3>Add age of the each members</h3>

      {Object.entries(selectedMembers).map(([member, selected], i) => {
        if (selected && (member === 'Child' || member === 'Self' || member === 'Spouse' || member === 'Father' || member === 'Mother')) {
          const memberKey = member === 'Child' ? `Child_${formData.childCount || 1}` : member;
          return renderFields(memberKey, i);
        }
        return null;
      })}

      <button className="continue-btn" onClick={nextStep}>continue</button>
      <button className="back-btn" onClick={prevStep}>back</button>
    </div>
  );
};

export default PatientStep4;
