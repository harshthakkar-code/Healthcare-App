import React, { useState, useEffect } from 'react';
import './DoctorListPage.css';
import api from '../../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const res = await api.get('/doctor/public/docterlist');
      setDoctors(res.data?.data || []);
    } catch (error) {
      toast.error('Failed to fetch doctor list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const updateApproval = async (id, isApprovedValue) => {
    try {
      await api.put(`/admin/doctor-status/${id}`, { isApproved: isApprovedValue });
      toast.success(`Doctor ${isApprovedValue === 'true' ? 'approved' : 'rejected'} successfully`);
      fetchDoctors();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const renderBadge = (status) => {
    switch (status) {
      case 'true':
        return <span className="badge green">Approved</span>;
      case 'false':
        return <span className="badge red">Rejected</span>;
      case 'pending':
      default:
        return <span className="badge yellow">Pending</span>;
    }
  };

  return (
    <div className="main-content">
      <ToastContainer position="top-center" autoClose={2000} />
      <h2>List of Doctors</h2>
      <p className="breadcrumb">Dashboard / Users / Doctor</p>

      {loading ? (
        <p>Loading doctors...</p>
      ) : (
        <div className="table-wrapper">
          <table className="doctor-table">
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Phone</th>
                <th>City</th>
                <th>Created At</th>
                <th>Approval Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc.name || 'N/A'}</td>
                  <td>{doc.phone || 'N/A'}</td>
                  <td>{doc.city || '-'}</td>
                  <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                  <td>{renderBadge(doc.isApproved)}</td>
                  <td>
                    {doc.isApproved === 'pending' ? (
                      <>
                        <span
                          className="icon-btn approve"
                          onClick={() => updateApproval(doc._id, 'true')}
                          title="Approve"
                        >
                          ✅
                        </span>
                        <span
                          className="icon-btn reject"
                          onClick={() => updateApproval(doc._id, 'false')}
                          title="Reject"
                        >
                          ❌
                        </span>
                      </>
                    ) : (
                      <span className="icon-btn disabled" style={{ alignContent: 'center' }}>✅</span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorListPage;
