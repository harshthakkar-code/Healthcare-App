import React from 'react';
import './PatientListPage.css';

const patients = [
  {
    id: '#PT001',
    name: 'Charlene Reed',
    age: 29,
    address: '4417 Goosetown Drive, Taylorsville, North Carolina, 28681',
    phone: '8286329170',
    lastVisit: '20 Oct 2023',
    paid: '$100.00',
    avatar: '/avatars/charlene.png'
  },
  {
    id: '#PT002',
    name: 'Travis Trimble',
    age: 23,
    address: '4026 Fantages Way, Brunswick, Maine, 04011',
    phone: '2077299974',
    lastVisit: '22 Oct 2023',
    paid: '$200.00',
    avatar: '/avatars/travis.png'
  },
  {
    id: '#PT003',
    name: 'Carl Kelly',
    age: 29,
    address: '2037 Pearcy Avenue, Decatur, Indiana, 46733',
    phone: '2607247769',
    lastVisit: '21 Oct 2023',
    paid: '$250.00',
    avatar: '/avatars/carl.png'
  },
  // Add more patients...
];

const PatientListPage = () => {
  return (
    <div className="main-content">
      <h2>List of Patient</h2>
      <p className="breadcrumb">Dashboard / Users / Patient</p>

      <div className="table-wrapper">
        <table className="patient-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Last Visit</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, idx) => (
              <tr key={idx}>
                <td>{p.id}</td>
                <td>
                  <div className="cell-with-img">
                    <img src={p.avatar} alt={p.name} />
                    {p.name}
                  </div>
                </td>
                <td>{p.age}</td>
                <td>{p.address}</td>
                <td>{p.phone}</td>
                <td>{p.lastVisit}</td>
                <td>{p.paid}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-footer">
          <span>Showing 1 to {patients.length} of {patients.length} entries</span>
          <div className="pagination">
            <button disabled>Previous</button>
            <button className="active">1</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientListPage;
