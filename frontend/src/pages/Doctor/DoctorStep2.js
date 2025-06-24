import React, { useRef, useState, useEffect } from "react";
import "./DoctorStep2.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoctorStep2 = ({ formData, setFormData, nextStep, prevStep, step, setStep }) => {
  const [gender, setGender] = useState(formData.gender || "");
  const [clinicAddress, setClinicAddress] = useState(formData.clinicAddress || "");
  const [address2, setAddress2] = useState(formData.address2 || "");
  const [pincode, setPincode] = useState(formData.pincode || "");
  const [weight, setWeight] = useState(formData.weight || "");
  const [height, setHeight] = useState(formData.height || "");
  const [age, setAge] = useState(formData.age || "");
  const [blood, setBlood] = useState(formData.blood || "");
  const [certFile, setCertFile] = useState(formData.certFile || null);
  const [photoID, setPhotoID] = useState(formData.photoID || null);
  const [employmentProof, setEmploymentProof] = useState(formData.employmentProof || null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const certRef = useRef();
  const photoRef = useRef();
  const proofRef = useRef();

  useEffect(() => {
    setGender(formData.gender || "");
    setClinicAddress(formData.clinicAddress || "");
    setAddress2(formData.address2 || "");
    setPincode(formData.pincode || "");
    setWeight(formData.weight || "");
    setHeight(formData.height || "");
    setAge(formData.age || "");
    setBlood(formData.blood || "");
    setCertFile(formData.certFile || null);
    setPhotoID(formData.photoID || null);
    setEmploymentProof(formData.employmentProof || null);
  }, [formData]);

  const validate = () => {
    const newErrors = {};
    if (!gender) newErrors.gender = 'Gender is required.';
    if (!clinicAddress) newErrors.clinicAddress = 'Clinic address is required.';
    if (!pincode) newErrors.pincode = 'Pincode is required.';
    if (!weight) newErrors.weight = 'Weight is required.';
    if (!height) newErrors.height = 'Height is required.';
    if (!age) newErrors.age = 'Age is required.';
    if (!blood) newErrors.blood = 'Blood group is required.';
    if (!certFile) newErrors.certFile = 'Certificate is required.';
    if (!photoID) newErrors.photoID = 'Photo ID is required.';
    if (!employmentProof) newErrors.employmentProof = 'Employment proof is required.';
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
      clinicAddress,
      address2,
      pincode,
      weight,
      height,
      age,
      blood,
      certFile,
      photoID,
      employmentProof,
    });
    toast.success('Step 2 complete!');
    setTimeout(() => nextStep(), 1000);
  };

  const handleFieldChange = (field, value) => {
    switch (field) {
      case 'gender': setGender(value); setFormData(prev => ({ ...prev, gender: value })); break;
      case 'clinicAddress': setClinicAddress(value); setFormData(prev => ({ ...prev, clinicAddress: value })); break;
      case 'address2': setAddress2(value); setFormData(prev => ({ ...prev, address2: value })); break;
      case 'pincode': setPincode(value); setFormData(prev => ({ ...prev, pincode: value })); break;
      case 'weight': setWeight(value); setFormData(prev => ({ ...prev, weight: value })); break;
      case 'height': setHeight(value); setFormData(prev => ({ ...prev, height: value })); break;
      case 'age': setAge(value); setFormData(prev => ({ ...prev, age: value })); break;
      case 'blood': setBlood(value); setFormData(prev => ({ ...prev, blood: value })); break;
      default: break;
    }
    if (submitted) {
      setErrors((prev) => {
        const { [field]: removed, ...rest } = prev;
        if (field === 'gender' && !value) return { ...rest, gender: 'Gender is required.' };
        if (field === 'clinicAddress' && !value) return { ...rest, clinicAddress: 'Clinic address is required.' };
        if (field === 'pincode' && !value) return { ...rest, pincode: 'Pincode is required.' };
        if (field === 'weight' && !value) return { ...rest, weight: 'Weight is required.' };
        if (field === 'height' && !value) return { ...rest, height: 'Height is required.' };
        if (field === 'age' && !value) return { ...rest, age: 'Age is required.' };
        if (field === 'blood' && !value) return { ...rest, blood: 'Blood group is required.' };
        return rest;
      });
    }
  };
  const handleFileChange = (field, file) => {
    switch (field) {
      case 'certFile': setCertFile(file); setFormData(prev => ({ ...prev, certFile: file })); break;
      case 'photoID': setPhotoID(file); setFormData(prev => ({ ...prev, photoID: file })); break;
      case 'employmentProof': setEmploymentProof(file); setFormData(prev => ({ ...prev, employmentProof: file })); break;
      default: break;
    }
    if (submitted) {
      setErrors((prev) => {
        const { [field]: removed, ...rest } = prev;
        if (!file) return { ...rest, [field]: 'This file is required.' };
        return rest;
      });
    }
  };

  return (
    <div className="step2-container">
      <ToastContainer position="top-center" autoClose={2000} />
      <img src="/logo.svg" alt="Doccure" className="logo" />
      <div className="step-indicator">
        <div className="step completed">✓</div>
        <div className="step active">2</div>
        <div className="step">3</div>
      </div>
      {step > 0 && (
        <button className="back-btn small" onClick={() => setStep(step - 1)} style={{ display: 'block', margin: '0 auto 18px auto' }}>
          ← Back
        </button>
      )}

      <h2>Select Your Gender</h2>
      <div className="gender-options">
        <div
          className={`gender-card ${gender === "male" ? "selected" : ""}`}
          onClick={() => handleFieldChange('gender', 'male')}
        >
          <img src="../../male.png" alt="Male" />
          <div>Male</div>
        </div>
        <div
          className={`gender-card ${gender === "female" ? "selected" : ""}`}
          onClick={() => handleFieldChange('gender', 'female')}
        >
          <img src="../../female.png" alt="Female" />
          <div>Female</div>
        </div>
      </div>
      {submitted && errors.gender && <div className="input-error">{errors.gender}</div>}

      <div className="form-section">
        <input type="text" placeholder="Registered Clinic address" value={clinicAddress} onChange={e => handleFieldChange('clinicAddress', e.target.value)} />
        {submitted && errors.clinicAddress && <div className="input-error">{errors.clinicAddress}</div>}
        <input type="text" placeholder="Address 2" value={address2} onChange={e => handleFieldChange('address2', e.target.value)} />
        <input type="text" placeholder="Pincode / Zipcode" value={pincode} onChange={e => handleFieldChange('pincode', e.target.value)} />
        {submitted && errors.pincode && <div className="input-error">{errors.pincode}</div>}
      </div>

      <h3>Certification and Employer</h3>
      <div className="upload-section">
        <div className="upload-box" onClick={() => certRef.current.click()}>
          <span className="upload-icon">📷</span>
          <p>{certFile ? certFile.name : "Upload Right To Sell Certificate"}</p>
          <input type="file" accept="image/*" ref={certRef} style={{ display: "none" }} onChange={e => handleFileChange('certFile', e.target.files[0])} />
        </div>
        {submitted && errors.certFile && <div className="input-error">{errors.certFile}</div>}

        <div className="upload-box" onClick={() => photoRef.current.click()}>
          <span className="upload-icon">📷</span>
          <p>{photoID ? photoID.name : "Upload Photo ID"}</p>
          <input type="file" accept="image/*" ref={photoRef} style={{ display: "none" }} onChange={e => handleFileChange('photoID', e.target.files[0])} />
        </div>
        {submitted && errors.photoID && <div className="input-error">{errors.photoID}</div>}

        <div className="upload-box" onClick={() => proofRef.current.click()}>
          <span className="upload-icon">📷</span>
          <p>{employmentProof ? employmentProof.name : "Upload Clinical Employment"}</p>
          <input type="file" accept="image/*" ref={proofRef} style={{ display: "none" }} onChange={e => handleFileChange('employmentProof', e.target.files[0])} />
        </div>
        {submitted && errors.employmentProof && <div className="input-error">{errors.employmentProof}</div>}
      </div>

      <div className="form-section double">
        <div className="input-group">
          <input type="text" placeholder="Your Weight" value={weight} onChange={e => handleFieldChange('weight', e.target.value)} />
          <select><option>Kg</option></select>
        </div>
        {submitted && errors.weight && <div className="input-error">{errors.weight}</div>}
        <div className="input-group">
          <input type="text" placeholder="Your Height" value={height} onChange={e => handleFieldChange('height', e.target.value)} />
          <select><option>cm</option></select>
        </div>
        {submitted && errors.height && <div className="input-error">{errors.height}</div>}
      </div>

      <div className="form-section">
        <input type="text" placeholder="Your Age" value={age} onChange={e => handleFieldChange('age', e.target.value)} />
        {submitted && errors.age && <div className="input-error">{errors.age}</div>}
        <select value={blood} onChange={e => handleFieldChange('blood', e.target.value)}>
          <option value="">Select your blood group</option>
          <option>A+</option><option>B+</option><option>O+</option><option>AB+</option>
          <option>A-</option><option>B-</option><option>O-</option><option>AB-</option>
        </select>
        {submitted && errors.blood && <div className="input-error">{errors.blood}</div>}
      </div>

      <div className="">
        {/* <button onClick={prevStep} className="back-btn">Back</button> */}
        <button onClick={handleContinue} className="continue-btn">Continue</button>
      </div>
    </div>
  );
};

export default DoctorStep2;
