import React, { useState } from 'react';
import PatientStep0 from './PatientStep0';
import PatientStep1 from './PatientStep1';
import PatientStep2 from './PatientStep2';
import PatientStep3 from './PatientStep3';
import PatientStep4 from './PatientStep4';

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
    <>
      {step === 0 && <PatientStep0 formData={formData} setFormData={setFormData} nextStep={nextStep} />}
      {step === 1 && <PatientStep1 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 2 && <PatientStep2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <PatientStep3 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <PatientStep4 formData={formData} prevStep={prevStep} />}
    </>
  );
};

export default PatientRegisterRouter;
