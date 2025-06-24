import React, { useState, useEffect } from "react";
import "./PatientStep2.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientStep2 = ({ formData, setFormData, nextStep, prevStep, step, setStep }) => {
  const [gender, setGender] = useState(formData.gender || "");
//   const [isPregnant, setIsPregnant] = useState(false);
  const [weight, setWeight] = useState(formData.weight || "");
  const [height, setHeight] = useState(formData.height || "");
  const [age, setAge] = useState(formData.age || "");
  const [blood, setBlood] = useState(formData.blood || "");
  const [heartRate, setHeartRate] = useState(formData.heartRate || "");
  const [bp, setBp] = useState(formData.bp || "");
  const [glucose, setGlucose] = useState(formData.glucose || "");
  const [allergies, setAllergies] = useState(formData.allergies || "");
  const [preExisting, setPreExisting] = useState(formData.preExisting || false);
  const [medication, setMedication] = useState(formData.medication || false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setGender(formData.gender || "");
    setWeight(formData.weight || "");
    setHeight(formData.height || "");
    setAge(formData.age || "");
    setBlood(formData.blood || "");
    setHeartRate(formData.heartRate || "");
    setBp(formData.bp || "");
    setGlucose(formData.glucose || "");
    setAllergies(formData.allergies || "");
    setPreExisting(formData.preExisting || false);
    setMedication(formData.medication || false);
  }, [formData]);

  const validate = () => {
    const newErrors = {};
    if (!gender) newErrors.gender = 'Gender is required.';
    if (!weight) newErrors.weight = 'Weight is required.';
    if (!height) newErrors.height = 'Height is required.';
    if (!age) newErrors.age = 'Age is required.';
    if (!blood) newErrors.blood = 'Blood group is required.';
    return newErrors;
  };

  const handleContinue = () => {
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
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
    toast.success('Step 3 complete!');
    setTimeout(() => nextStep(), 1000);
  };

  // Remove error as soon as the user enters a valid value
  const handleFieldChange = (field, value) => {
    switch (field) {
      case 'gender': setGender(value); setFormData(prev => ({ ...prev, gender: value })); break;
      case 'weight': setWeight(value); setFormData(prev => ({ ...prev, weight: value })); break;
      case 'height': setHeight(value); setFormData(prev => ({ ...prev, height: value })); break;
      case 'age': setAge(value); setFormData(prev => ({ ...prev, age: value })); break;
      case 'blood': setBlood(value); setFormData(prev => ({ ...prev, blood: value })); break;
      case 'heartRate': setHeartRate(value); setFormData(prev => ({ ...prev, heartRate: value })); break;
      case 'bp': setBp(value); setFormData(prev => ({ ...prev, bp: value })); break;
      case 'glucose': setGlucose(value); setFormData(prev => ({ ...prev, glucose: value })); break;
      case 'allergies': setAllergies(value); setFormData(prev => ({ ...prev, allergies: value })); break;
      case 'preExisting': setPreExisting(value); setFormData(prev => ({ ...prev, preExisting: value })); break;
      case 'medication': setMedication(value); setFormData(prev => ({ ...prev, medication: value })); break;
      default: break;
    }
    if (submitted) {
      setErrors((prev) => {
        const { [field]: removed, ...rest } = prev;
        if (field === 'gender' && !value) return { ...rest, gender: 'Gender is required.' };
        if (field === 'weight' && !value) return { ...rest, weight: 'Weight is required.' };
        if (field === 'height' && !value) return { ...rest, height: 'Height is required.' };
        if (field === 'age' && !value) return { ...rest, age: 'Age is required.' };
        if (field === 'blood' && !value) return { ...rest, blood: 'Blood group is required.' };
        return rest;
      });
    }
  };

  return (
    <div className="step2-container">
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

      <h3>Select Your Gender</h3>
      <div className="gender-options">
        <div className={`gender-card ${gender === "male" ? "selected" : ""}`} onClick={() => handleFieldChange('gender', 'male')}>
          <img src="/male.png" alt="Male" />
          <div>Male</div>
        </div>
        <div className={`gender-card ${gender === "female" ? "selected" : ""}`} onClick={() => handleFieldChange('gender', 'female')}>
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
          <input type="text" placeholder="Your Weight" value={weight} onChange={e => handleFieldChange('weight', e.target.value)} />
          <select><option>Kg</option></select>
        </div>
        {submitted && errors.weight && <div className="input-error">{errors.weight}</div>}
        <div className="form-pair">
          <input type="text" placeholder="Your Height" value={height} onChange={e => handleFieldChange('height', e.target.value)} />
          <select><option>cm</option></select>
        </div>
        {submitted && errors.height && <div className="input-error">{errors.height}</div>}
        <input type="text" placeholder="Your Age" value={age} onChange={e => handleFieldChange('age', e.target.value)} />
        {submitted && errors.age && <div className="input-error">{errors.age}</div>}
        <select value={blood} onChange={e => handleFieldChange('blood', e.target.value)}>
          <option>Select your blood group</option>
          <option>A+</option><option>B+</option><option>O+</option><option>AB+</option>
          <option>A-</option><option>B-</option><option>O-</option><option>AB-</option>
        </select>
        {submitted && errors.blood && <div className="input-error">{errors.blood}</div>}
        <select value={heartRate} onChange={e => handleFieldChange('heartRate', e.target.value)}>
          <option>Select Your Heart Rate</option>
          <option>60-80 bpm</option><option>80-100 bpm</option>
        </select>
        <select value={bp} onChange={e => handleFieldChange('bp', e.target.value)}>
          <option>Select Your Blood Pressure</option>
          <option>120/80</option><option>140/90</option>
        </select>
        <select value={glucose} onChange={e => handleFieldChange('glucose', e.target.value)}>
          <option>Select Your Glucose Level</option>
          <option>Normal</option><option>High</option><option>Low</option>
        </select>
        <input type="text" placeholder="Allergies" value={allergies} onChange={e => handleFieldChange('allergies', e.target.value)} />
      </div>

      <label className="checkbox">
        <span>Do you have any pre-existing conditions?</span>
        <input type="checkbox" checked={preExisting} onChange={e => handleFieldChange('preExisting', e.target.checked)} />
      </label>

      <label className="checkbox">
        <span>Are you currently taking any medication</span>
        <input type="checkbox" checked={medication} onChange={e => handleFieldChange('medication', e.target.checked)} />
      </label>

      <button onClick={handleContinue} className="continue-btn">continue</button>
    </div>
  );
};

export default PatientStep2;
