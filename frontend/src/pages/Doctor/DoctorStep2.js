// // DoctorStep2.jsx
// import React, { useState } from "react";
// import "./DoctorStep2.css";

// const DoctorStep2 = ({ formData, setFormData, nextStep, prevStep }) => {
//   const [gender, setGender] = useState("");
//   const [clinicAddress, setClinicAddress] = useState("");
// const [address2, setAddress2] = useState("");
// const [pincode, setPincode] = useState("");
// const [weight, setWeight] = useState("");
// const [height, setHeight] = useState("");
// const [age, setAge] = useState("");
// const [blood, setBlood] = useState("");
// const [certFile, setCertFile] = useState(null);
// const [photoID, setPhotoID] = useState(null);
// const [employmentProof, setEmploymentProof] = useState(null);


//  const handleContinue = () => {
//   if (!gender || !clinicAddress || !pincode || !weight || !height || !age || !blood || !certFile || !photoID || !employmentProof) {
//     alert("Please fill all required fields.");
//     return;
//   }

//   setFormData({
//     ...formData,
//     gender,
//     clinicAddress,
//     address2,
//     pincode,
//     weight,
//     height,
//     age,
//     blood,
//     certFile,
//     photoID,
//     employmentProof
//   });

//   nextStep();
// };



//   return (
//     <div className="step2-container">
//       <img src="/logo.svg" alt="Doccure" className="logo" />

//       <div className="step-indicators">
//         <div className="step completed">✓</div>
//         <div className="step active">2</div>
//         <div className="step">3</div>
//       </div>

//       <h2>Select Your Gender</h2>
//       <div className="gender-options">
//         <div
//           className={`gender-card ${gender === "male" ? "selected" : ""}`}
//           onClick={() => setGender("male")}
//         >
//           <img src="../../male.png" alt="Male" />
//           <div>Male</div>
//         </div>
//         <div
//           className={`gender-card ${gender === "female" ? "selected" : ""}`}
//           onClick={() => setGender("female")}
//         >
//           <img src="../../female.png" alt="Female" />
//           <div>Female</div>
//         </div>
//       </div>

//       <div className="form-section">
//         <input type="text" placeholder="Registered Clinic address" value={clinicAddress} onChange={(e) => setClinicAddress(e.target.value)} />
// <input type="text" placeholder="Address 2" value={address2} onChange={(e) => setAddress2(e.target.value)} />
// <input type="text" placeholder="Pincode / Zipcoode" value={pincode} onChange={(e) => setPincode(e.target.value)} />

//       </div>

//       <h3>Certification and Employer</h3>
//       <div className="upload-section">
//         <label className="upload-box">
//           <span className="upload-icon">📷</span>
//           <p>Upload Right To sell Certificate</p>
//           <input type="file" style={{ display: "none" }}      onChange={(e) => setCertFile(e.target.files[0])} />
//         </label>
//         <label className="upload-box">
//           <span className="upload-icon">📷</span>
//           <p>Upload Photo ID</p>
//           <input type="file" style={{ display: "none" }}       onChange={(e) => setPhotoID(e.target.files[0])}
//  />
//         </label>
//         <label className="upload-box">
//           <span className="upload-icon">📷</span>
//           <p>Upload Clinical employment</p>
//           <input type="file" style={{ display: "none" }} onChange={(e) => setEmploymentProof(e.target.files[0])} />
//         </label>
//       </div>

//       <div className="form-section double">
//         <div className="input-group">
//           <input type="text" placeholder="Your Weight" />
//           <select><option>Kg</option></select>
//         </div>
//         <div className="input-group">
//           <input type="text" placeholder="Your Height" />
//           <select><option>cm</option></select>
//         </div>
//       </div>

//       <div className="form-section">
//         <input type="text" placeholder="Your Age" />
//         <select>
//           <option>Select your blood group</option>
//           <option>A+</option><option>B+</option><option>O+</option><option>AB+</option>
//           <option>A-</option><option>B-</option><option>O-</option><option>AB-</option>
//         </select>
//       </div>

//       <div className="">
//         {/* <button onClick={prevStep} className="back-btn">Back</button> */}
//         <button onClick={handleContinue} className="continue-btn">Continue</button>
//       </div>

//       {/* <p className="footer">© 2024 Doccure. All rights reserved.</p> */}
//     </div>
//   );
// };

// export default DoctorStep2;


import React, { useRef, useState } from "react";
import "./DoctorStep2.css";

const DoctorStep2 = ({ formData, setFormData, nextStep, prevStep }) => {
  const [gender, setGender] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [pincode, setPincode] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [blood, setBlood] = useState("");
  const [certFile, setCertFile] = useState(null);
  const [photoID, setPhotoID] = useState(null);
  const [employmentProof, setEmploymentProof] = useState(null);

  const certRef = useRef();
  const photoRef = useRef();
  const proofRef = useRef();

  const handleContinue = () => {
    if (
      !gender || !clinicAddress || !pincode || !weight || !height ||
      !age || !blood || !certFile || !photoID || !employmentProof
    ) {
      alert("Please fill all required fields.");
      return;
    }

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

    nextStep();
  };

  return (
    <div className="step2-container">
      <img src="/logo.svg" alt="Doccure" className="logo" />

      <div className="step-indicators">
        <div className="step completed">✓</div>
        <div className="step active">2</div>
        <div className="step">3</div>
      </div>

      <h2>Select Your Gender</h2>
      <div className="gender-options">
        <div
          className={`gender-card ${gender === "male" ? "selected" : ""}`}
          onClick={() => setGender("male")}
        >
          <img src="../../male.png" alt="Male" />
          <div>Male</div>
        </div>
        <div
          className={`gender-card ${gender === "female" ? "selected" : ""}`}
          onClick={() => setGender("female")}
        >
          <img src="../../female.png" alt="Female" />
          <div>Female</div>
        </div>
      </div>

      <div className="form-section">
        <input type="text" placeholder="Registered Clinic address" value={clinicAddress} onChange={(e) => setClinicAddress(e.target.value)} />
        <input type="text" placeholder="Address 2" value={address2} onChange={(e) => setAddress2(e.target.value)} />
        <input type="text" placeholder="Pincode / Zipcode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
      </div>

      <h3>Certification and Employer</h3>
      <div className="upload-section">
        <div className="upload-box" onClick={() => certRef.current.click()}>
          <span className="upload-icon">📷</span>
          <p>{certFile ? certFile.name : "Upload Right To Sell Certificate"}</p>
          <input type="file" accept="image/*" ref={certRef} style={{ display: "none" }} onChange={(e) => setCertFile(e.target.files[0])} />
        </div>

        <div className="upload-box" onClick={() => photoRef.current.click()}>
          <span className="upload-icon">📷</span>
          <p>{photoID ? photoID.name : "Upload Photo ID"}</p>
          <input type="file" accept="image/*" ref={photoRef} style={{ display: "none" }} onChange={(e) => setPhotoID(e.target.files[0])} />
        </div>

        <div className="upload-box" onClick={() => proofRef.current.click()}>
          <span className="upload-icon">📷</span>
          <p>{employmentProof ? employmentProof.name : "Upload Clinical Employment"}</p>
          <input type="file" accept="image/*" ref={proofRef} style={{ display: "none" }} onChange={(e) => setEmploymentProof(e.target.files[0])} />
        </div>
      </div>

      <div className="form-section double">
        <div className="input-group">
          <input type="text" placeholder="Your Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <select><option>Kg</option></select>
        </div>
        <div className="input-group">
          <input type="text" placeholder="Your Height" value={height} onChange={(e) => setHeight(e.target.value)} />
          <select><option>cm</option></select>
        </div>
      </div>

      <div className="form-section">
        <input type="text" placeholder="Your Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <select value={blood} onChange={(e) => setBlood(e.target.value)}>
          <option value="">Select your blood group</option>
          <option>A+</option><option>B+</option><option>O+</option><option>AB+</option>
          <option>A-</option><option>B-</option><option>O-</option><option>AB-</option>
        </select>
      </div>

      <div>
        <button onClick={handleContinue} className="continue-btn">Continue</button>
      </div>
    </div>
  );
};

export default DoctorStep2;
