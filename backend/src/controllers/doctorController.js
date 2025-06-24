const DoctorProfile = require('../models/DoctorProfile');
const Review = require('../models/Review');
const Specialization = require('../models/Specialization');
const Schedule = require('../models/Schedule');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

exports.getProfile = async (req, res, next) => { res.json({ message: 'Doctor profile' }); };
exports.updateProfile = async (req, res, next) => { res.json({ message: 'Update doctor profile' }); };
exports.createSchedule = async (req, res, next) => { res.json({ message: 'Create schedule' }); };
exports.getAppointments = async (req, res, next) => { res.json({ message: 'Get doctor appointments' }); };
exports.updateAppointment = async (req, res, next) => { res.json({ message: 'Update appointment' }); };
exports.getEarnings = async (req, res, next) => { res.json({ message: 'Get doctor earnings' }); };
exports.createAppointment = async (req, res, next) => {
  try {
    // Accept both guest and logged-in users
    let patientId = null;
    if (req.user && req.user._id) patientId = req.user._id;
    const {
      user: doctorId,
      specialty,
      selectedService,
      appointmentType,
      date,
      time,
      name,
      email,
      phone,
      symptoms
    } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: 'Doctor, date, and time are required.' });
    }

    // Fetch doctor name from User model
    let doctorName = '';
    const doctorUser = await User.findById(doctorId);
    if (doctorUser) doctorName = doctorUser.name;

    const appointment = new Appointment({
      doctor: doctorId,
      patient: patientId,
      specialty,
      service: selectedService,
      appointmentType,
      date,
      time,
      name,
      email,
      phone,
      symptoms,
      doctorName,
      status: 'pending'
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) { next(err); }
};

// Centralized: Get doctor list with reviews, avgRating, and filters
exports.getDoctorListWithReviews = async (req, res, next) => {
  try {
    const { specialization, city, name, avgReview } = req.query;
    const query = {};
    if (specialization) query.specialization = specialization;
    if (city) query.city = { $regex: city, $options: 'i' };
    if (name) query.name = { $regex: name, $options: 'i' };
    let doctors = await DoctorProfile.find(query)
      .populate({ path: 'reviews', select: 'rating comment createdAt', populate: { path: 'patient', select: 'name' } })
      .populate({ path: 'schedule' });
    doctors = doctors.map(doc => {
      const ratings = doc.reviews.map(r => r.rating);
      const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length) : null;
      return { ...doc.toObject(), avgRating };
    });
    if (avgReview) {
      const avg = parseFloat(avgReview);
      doctors = doctors.filter(doc => doc.avgRating && Math.round(doc.avgRating) === avg);
    }
    const total = doctors.length;
    res.json({ total, data: doctors });
  } catch (err) { next(err); }
};

// Public: Get doctor list with search, pagination, specialities, and average reviews
exports.getDoctors = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', specialization, sort = 'name' } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { clinicName: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }
    if (specialization) {
      query.specialization = specialization;
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const doctors = await DoctorProfile.find(query)
      .populate('specialization', 'name')
      .populate({ path: 'reviews', select: 'rating comment', populate: { path: 'patient', select: 'name' } })
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    // Calculate average rating for each doctor
    const doctorsWithAvg = doctors.map(doc => {
      const ratings = doc.reviews.map(r => r.rating);
      const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length) : null;
      return { ...doc.toObject(), avgRating };
    });
    const total = await DoctorProfile.countDocuments(query);
    res.json({
      data: doctorsWithAvg,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (err) { next(err); }
};

// Public: Get doctor details by ID (with reviews, specialization, etc)
exports.getDoctorDetails = async (req, res, next) => {
  try {
    const doctor = await DoctorProfile.findById(req.params.id)
      .populate('specialization', 'name description')
      .populate({ path: 'reviews', select: 'rating comment createdAt', populate: { path: 'patient', select: 'name' } });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    // Calculate average rating
    const ratings = doctor.reviews.map(r => r.rating);
    const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length) : null;
    res.json({ ...doctor.toObject(), avgRating });
  } catch (err) { next(err); }
};

exports.getDoctorByUserId = async (req, res, next) => {
  try {
    const doctor = await DoctorProfile.findOne({ user: req.params.userId })
      .populate('specialization', 'name description');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) { next(err); }
};

exports.getAppointmentsByDoctor = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorId })
      .populate('doctor', 'name email')
      .populate('patient', 'name email');
    res.json(appointments);
  } catch (err) { next(err); }
};

exports.getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate('doctor', 'name email')
      .populate('patient', 'name email');
    res.json(appointments);
  } catch (err) { next(err); }
};

exports.getAppointmentsByPatient = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.patientId })
      .populate('doctor', 'name email')
      .populate('patient', 'name email');
    res.json({ total: appointments.length, data: appointments });
  } catch (err) { next(err); }
};

exports.updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body; // expected: 'accepted', 'rejected', or 'completed'
    if (!['accepted', 'rejected', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    // Only allow the doctor assigned to the appointment to update
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    // if (req.user.role !== 'doctor' || String(appointment.doctor) !== String(req.user._id)) {
    //   return res.status(403).json({ message: 'Not authorized' });
    // }
    // Only allow marking as completed if today >= appointment date
    if (status === 'completed') {
      const today = new Date();
      const apptDate = new Date(appointment.date);
      // If appointment.date is only a date string (YYYY-MM-DD), this works
      if (today < apptDate.setHours(0,0,0,0)) {
        return res.status(400).json({ message: 'Cannot mark as completed before appointment date.' });
      }
    }
    appointment.status = status;
    await appointment.save();
    res.json(appointment);
  } catch (err) { next(err); }
}; 