import React, { useState } from 'react';
import DoctorStep1 from '../Doctor/DoctorStep1';
import DoctorStep2 from '../Doctor/DoctorStep2';
import DoctorStep3 from '../Doctor/DoctorStep3';
import DoctorStep0 from '../Doctor/DoctorStep0';

const steps = [
  'About',
  'Profile',
  'Details',
  'Location',
];

const RegisterRouter = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clinicName: '',
    address: '',
    password: '',
    // add all fields you want to persist here
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="register-router-container">
      {/* Stepper/Tab Navigation */}
      {/* <div className="stepper">
        {[0, 1, 2, 3].map((s, idx) => (
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
      {/* Step Content */}
      {step === 0 && (
        <DoctorStep0 nextStep={nextStep} formData={formData} setFormData={setFormData} step={step} setStep={setStep} />
      )}
      {step === 1 && (
        <DoctorStep1
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          step={step}
          setStep={setStep}
        />
      )}
      {step === 2 && (
        <DoctorStep2
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          step={step}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <DoctorStep3
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          step={step}
          setStep={setStep}
        />
      )}
    </div>
  );
};

export default RegisterRouter;
