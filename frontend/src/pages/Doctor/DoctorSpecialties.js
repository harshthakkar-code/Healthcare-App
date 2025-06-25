import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import './DoctorSpecialities.css';

const getDoctorId = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) return user.id;
    if (user && user._id) return user._id;
  } catch {}
  return '';
};

const DoctorSpecialities = () => {
  const [speciality, setSpeciality] = useState('');
  const [experience, setExperience] = useState('');
  const [specialities, setSpecialities] = useState([]);
  const [addedSpecialities, setAddedSpecialities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const doctorId = getDoctorId();

  // Fetch added specializations on mount and after add/delete
  const fetchAddedSpecialities = async () => {
    if (!doctorId) return;
    setLoading(true);
    try {
      const res = await api.get('/specialization', { params: { doctorId } });
      setAddedSpecialities(res.data || []);
    } catch {
      setAddedSpecialities([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAddedSpecialities();
    // eslint-disable-next-line
  }, [doctorId]);

  // Direct submit on form
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!speciality.trim() || !experience.trim() || isNaN(experience)) return;
    setLoading(true);
    try {
      await api.post('/specialization', {
        doctorId,
        specializations: [{ name: speciality.trim(), experience: parseInt(experience.trim()) }]
      });
      setSpeciality('');
      setExperience('');
      await fetchAddedSpecialities();
    } catch (err) {}
    setLoading(false);
  };

  const handleDelete = (index) => {
    const updated = [...specialities];
    updated.splice(index, 1);
    setSpecialities(updated);
  };

  // Show custom modal for delete
  const handleDeleteAdded = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    if (!deleteId) return;
    setLoading(true);
    try {
      await api.delete(`/specialization/${deleteId}`);
      await fetchAddedSpecialities();
    } catch (err) {}
    setDeleteId(null);
    setLoading(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div>
      <form className="speciality-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="speciality-header">
          <h3>Speciality</h3>
        </div>
        <div className="speciality-row">
          <label>
            Speciality <span className="required">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Urology"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            required
          />
        </div>
        <div className="speciality-row">
          <label>
            Experience (years) <span className="required">*</span>
          </label>
          <input
            type="number"
            min="0"
            placeholder="e.g., 5"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </div>
        <button className="submit-btn" type="submit" disabled={loading || !speciality.trim() || !experience.trim() || isNaN(experience)}>
          Submit Specialities
        </button>
      </form>

      {/* Added Specialities Card */}
      <div className="speciality-form" style={{ marginTop: 32 }}>
        <div className="speciality-header">
          <h3>My Added Specialities</h3>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : addedSpecialities.length === 0 ? (
          <div>No specialities added yet.</div>
        ) : (
          <ul className="speciality-list">
            {addedSpecialities.map((item, index) => (
              <li key={item._id || index}>
                <div>
                  <strong>{item.name}</strong> — {item.experience} yrs of Experience
                </div>
                <button className="delete-btn" onClick={() => handleDeleteAdded(item._id)}>
                  Delete ▾
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Are you sure you want to delete this specialization?</h4>
            <div className="modal-actions">
              <button className="modal-btn confirm" onClick={confirmDelete}>Yes, Delete</button>
              <button className="modal-btn cancel" onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorSpecialities;
