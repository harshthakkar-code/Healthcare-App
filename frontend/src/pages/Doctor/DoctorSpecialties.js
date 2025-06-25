import React, { useState } from 'react';
import './DoctorSpecialities.css';



const DoctorSpecialities = () => {
  const [speciality, setSpeciality] = useState('');
  const [experience, setExperience] = useState('');
  const [specialities, setSpecialities] = useState([]);



  const handleSubmit = () => {
  if (specialities.length === 0) {
    console.log('No specialities added.');
    return;
  }

  console.log('Specialities to submit:', specialities);

  // Example API call (you can enable this when ready)
  /*
  fetch('/api/doctor/specialities', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ specialities })
  }).then(res => res.json()).then(data => {
    console.log('Submitted successfully:', data);
  });
  */
};


  const handleAdd = () => {
    const trimmedSpec = speciality.trim();
    const trimmedExp = experience.trim();

    if (trimmedSpec && trimmedExp && !isNaN(trimmedExp)) {
      setSpecialities([
        ...specialities,
        { name: trimmedSpec, experience: parseInt(trimmedExp) }
      ]);
      setSpeciality('');
      setExperience('');
    }
  };

  const handleDelete = (index) => {
    const updated = [...specialities];
    updated.splice(index, 1);
    setSpecialities(updated);
  };

  return (
    <div className="speciality-form">
      <div className="speciality-header">
        <h3>Speciality</h3>
      </div>

      <div className="speciality-row">
        <label>
          Speciality <span className="required">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g., Urology"
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
        />
      </div>

      <div className="speciality-row">
        <label>
          Experience (years) <span className="required">*</span>
        </label>
        <input
          type="number"
          min="0"
          placeholder="e.g., 5"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </div>

      <button className="add-btn" onClick={handleAdd}>Add Speciality</button>

      {specialities.length > 0 && (
        <ul className="speciality-list">
          {specialities.map((item, index) => (
            <li key={index}>
              <div>
                <strong>{item.name}</strong> — {item.experience} yrs of Experience
              </div>
              <button className="delete-btn" onClick={() => handleDelete(index)}>
                Delete ▾
              </button>
            </li>
          ))}
        </ul>
      )}

      <button className="submit-btn" onClick={handleSubmit}>Submit Specialities</button>

    </div>
  );
};

export default DoctorSpecialities;
