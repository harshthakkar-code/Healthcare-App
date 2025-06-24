import React, { useState } from "react";
import "./EditInvoiceModal.css";

const EditInvoiceModal = ({ data, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? URL.createObjectURL(files[0]) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Invoice Report</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-grid">
            <div>
              <label>Invoice Number</label>
              <input name="number" value={formData.number} onChange={handleChange} />
            </div>
            <div>
              <label>Patient ID</label>
              <input name="patientId" value={formData.patientId} onChange={handleChange} />
            </div>
            <div>
              <label>Patient Name</label>
              <input name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label>Patient Image</label>
              <input type="file" name="photo" onChange={handleChange} />
            </div>
            <div>
              <label>Total Amount</label>
              <input name="amount" value={formData.amount} onChange={handleChange} />
            </div>
            <div>
              <label>Created Date</label>
              <input name="date" value={formData.date} onChange={handleChange} />
            </div>
          </div>
          <button type="submit" className="save-btn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditInvoiceModal;
