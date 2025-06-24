import React from 'react';
import './TransactionListPage.css';

const transactions = [
  {
    invoice: '#IN0001',
    patientId: '#PT001',
    name: 'Charlene Reed',
    avatar: '/avatars/charlene.png',
    amount: '$100.00',
    status: 'Paid'
  },
  {
    invoice: '#IN0002',
    patientId: '#PT002',
    name: 'Travis Trimble',
    avatar: '/avatars/travis.png',
    amount: '$200.00',
    status: 'Paid'
  },
  {
    invoice: '#IN0003',
    patientId: '#PT003',
    name: 'Carl Kelly',
    avatar: '/avatars/carl.png',
    amount: '$250.00',
    status: 'Paid'
  },
  // Add more records...
];

const TransactionListPage = () => {
  return (
    <div className="transaction-container">
      <h2>Transactions</h2>
      <p className="breadcrumb">Dashboard / Transactions</p>

      <div className="table-wrapper">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, idx) => (
              <tr key={idx}>
                <td className="blue-text">{txn.invoice}</td>
                <td>{txn.patientId}</td>
                <td>
                  <div className="cell-with-img">
                    <img src={txn.avatar} alt={txn.name} />
                    {txn.name}
                  </div>
                </td>
                <td>{txn.amount}</td>
                <td>
                  <span className={`status-pill ${txn.status.toLowerCase()}`}>
                    {txn.status}
                  </span>
                </td>
                <td>
                  <button className="btn-delete">🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-footer">
          <span>Showing 1 to {transactions.length} of {transactions.length} entries</span>
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

export default TransactionListPage;
