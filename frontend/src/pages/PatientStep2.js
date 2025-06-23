import React, { useState } from "react";
import "./PatientStep2.css";

const PatientStep2 = ({ formData, setFormData, nextStep, prevStep }) => {
  const [gender, setGender] = useState(formData.gender || "");
//   const [isPregnant, setIsPregnant] = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [blood, setBlood] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [bp, setBp] = useState("");
  const [glucose, setGlucose] = useState("");
  const [allergies, setAllergies] = useState("");
  const [preExisting, setPreExisting] = useState(false);
  const [medication, setMedication] = useState(false);

  const handleContinue = () => {
    if (!gender || !weight || !height || !age || !blood) {
      alert("Please fill all required fields.");
      return;
    }

    setFormData({
      ...formData,
      gender,
    //   isPregnant,
      weight,
      height,
      age,
      blood,
      heartRate,
      bp,
      glucose,
      allergies,
      preExisting,
      medication,
    });

    nextStep();
  };

  return (
    <div className="step2-container">
      <img src="/logo.svg" alt="Doccure" className="logo" />

      <div className="step-indicators">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className={`step ${s === 2 ? "active" : ""} ${s < 2 ? "completed" : ""}`}>
            {s < 2 ? "✓" : s}
          </div>
        ))}
      </div>

      <h3>Select Your Gender</h3>
      <div className="gender-options">
        <div className={`gender-card ${gender === "male" ? "selected" : ""}`} onClick={() => setGender("male")}>
          <img src="/male.png" alt="Male" />
          <div>Male</div>
        </div>
        <div className={`gender-card ${gender === "female" ? "selected" : ""}`} onClick={() => setGender("female")}>
          <img src="/female.png" alt="Female" />
          <div>Female</div>
        </div>
      </div>

      {/* <label className="checkbox">
        <span>Are you Pregnant</span>
        <input type="checkbox" checked={isPregnant} onChange={(e) => setIsPregnant(e.target.checked)} />
      </label> */}

      <div className="form-grid">
        <div className="form-pair">
          <input type="text" placeholder="Your Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <select><option>Kg</option></select>
        </div>
        <div className="form-pair">
          <input type="text" placeholder="Your Height" value={height} onChange={(e) => setHeight(e.target.value)} />
          <select><option>cm</option></select>
        </div>
        <input type="text" placeholder="Your Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <select value={blood} onChange={(e) => setBlood(e.target.value)}>
          <option>Select your blood group</option>
          <option>A+</option><option>B+</option><option>O+</option><option>AB+</option>
          <option>A-</option><option>B-</option><option>O-</option><option>AB-</option>
        </select>
        <select value={heartRate} onChange={(e) => setHeartRate(e.target.value)}>
          <option>Select Your Heart Rate</option>
          <option>60-80 bpm</option><option>80-100 bpm</option>
        </select>
        <select value={bp} onChange={(e) => setBp(e.target.value)}>
          <option>Select Your Blood Pressure</option>
          <option>120/80</option><option>140/90</option>
        </select>
        <select value={glucose} onChange={(e) => setGlucose(e.target.value)}>
          <option>Select Your Glucose Level</option>
          <option>Normal</option><option>High</option><option>Low</option>
        </select>
        <input type="text" placeholder="Allergies" value={allergies} onChange={(e) => setAllergies(e.target.value)} />
      </div>

      <label className="checkbox">
        <span>Do you have any pre-existing conditions?</span>
        <input type="checkbox" checked={preExisting} onChange={(e) => setPreExisting(e.target.checked)} />
      </label>

      <label className="checkbox">
        <span>Are you currently taking any medication</span>
        <input type="checkbox" checked={medication} onChange={(e) => setMedication(e.target.checked)} />
      </label>

      <button onClick={handleContinue} className="continue-btn">continue</button>
    </div>
  );
};

export default PatientStep2;
