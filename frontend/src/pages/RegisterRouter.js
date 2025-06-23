import React, { useState } from 'react';
import DoctorStep1 from './DoctorStep1';
import DoctorStep2 from './DoctorStep2';
import DoctorStep3 from './DoctorStep3';
import DoctorStep0 from './DoctorStep0';

const RegisterRouter = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clinicName: '',
    address: '',
    password: '',
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <>{
        step === 0 && (
            <DoctorStep0 nextStep={nextStep} formData={formData} setFormData={setFormData} />
        ) 
    }
      {step === 1 && (
        <DoctorStep1 formData={formData} setFormData={setFormData} nextStep={nextStep} />
      )}
      {step === 2 && (
        <DoctorStep2
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <DoctorStep3 formData={formData} prevStep={prevStep} />
      )}
    </>
  );
};

export default RegisterRouter;
