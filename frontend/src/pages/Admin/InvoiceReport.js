import React, { useState } from "react";
import "./InvoiceReport.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditInvoiceModal from "./EditInvoiceModal";

const invoiceData = [
  {
    number: "#IN0001",
    patientId: "#PT001",
    name: "Charlene Reed",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    amount: "$100.00",
    date: "9 Sep 2023",
    status: "Paid",
  },
  {
    number: "#IN0002",
    patientId: "#PT002",
    name: "Travis Trimble",
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
    amount: "$200.00",
    date: "29 Oct 2023",
    status: "Paid",
  }
];

const InvoiceReport = () => {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (invoice) => {
    setEditData(invoice);
    setShowModal(true);
  };

  return (
    <div className="invoice-page">
      <div className="page-header">
        <h2>Invoice Report</h2>
        <p>Dashboard / Invoice Report</p>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Total Amount</th>
              <th>Created Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((item, index) => (
              <tr key={index}>
                <td className="link">{item.number}</td>
                <td>{item.patientId}</td>
                <td className="user-cell">
                  <img src={item.photo} alt={item.name} />
                  {item.name}
                </td>
                <td>{item.amount}</td>
                <td>{item.date}</td>
                <td><span className="status-pill paid">{item.status}</span></td>
                <td className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEdit(item)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="delete-btn">
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <EditInvoiceModal
          data={editData}
          onClose={() => setShowModal(false)}
          onSave={(updated) => {
            console.log("Save clicked with:", updated);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default InvoiceReport;
