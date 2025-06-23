const mongoose = require('mongoose');
const doctorProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialization' },
  experience: Number,
  bio: String,
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  earnings: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('DoctorProfile', doctorProfileSchema); 