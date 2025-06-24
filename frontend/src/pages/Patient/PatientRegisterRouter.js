import React, { useState } from 'react';
import PatientStep0 from './PatientStep0';
import PatientStep1 from './PatientStep1';
import PatientStep2 from './PatientStep2';
import PatientStep3 from './PatientStep3';
import PatientStep4 from './PatientStep4';
import PatientStep5 from './PatientStep5';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientRegisterRouter = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
    dob: '',
    emergencyContact: '',
    medicalInfo: '',
    address: '',
    // ...more as per steps
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="patient-register-router-container">
      <ToastContainer position="top-center" autoClose={2000} />
      {/* Stepper/Tab Navigation */}
      {/* <div className="stepper">
        {[0, 1, 2, 3, 4, 5].map((s, idx) => (
          <div
            key={s}
            className={`stepper-step${step === s ? ' active' : ''}${step > s ? ' completed' : ''}`}
            onClick={() => setStep(s)}
            style={{ cursor: 'pointer' }}
          >
            {step > s ? '✓' : s + 1}
          </div>
        ))}
      </div> */}
      {step === 0 && <PatientStep0 formData={formData} setFormData={setFormData} nextStep={nextStep} step={step} setStep={setStep} />}
      {step === 1 && <PatientStep1 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} step={step} setStep={setStep} />}
      {step === 2 && <PatientStep2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} step={step} setStep={setStep} />}
      {step === 3 && <PatientStep3 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} step={step} setStep={setStep} />}
      {step === 4 && <PatientStep4 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} step={step} setStep={setStep} />}
      {step === 5 && <PatientStep5 formData={formData} setFormData={setFormData} prevStep={prevStep} step={step} setStep={setStep} />}
    </div>
  );
};

export default PatientRegisterRouter;
