import React from 'react';
import './HealthRecords.css';

const HealthRecords = ({ records = [], lastVisit }) => (
  <div className="health-records">
        <h1 className="dashboard-header">Patient Dashboard</h1>
    <h2>Health Records</h2>
    <div className="records-grid">
      {records.map((r, i) => (
        <div key={i} className="record-card">
          <span className={`record-label record-${i}`}>{r.label}</span>
          <span className="record-value">{r.value}</span>
          {r.change && <span className="record-change">{r.change}</span>}
        </div>
      ))}
    </div>
    <div className="record-footer">
      Report generated on last visit: {lastVisit}
    </div>
  </div>
);

export default HealthRecords;
