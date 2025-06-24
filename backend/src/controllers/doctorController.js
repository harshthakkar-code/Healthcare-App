const DoctorProfile = require('../models/DoctorProfile');
const Review = require('../models/Review');
const Specialization = require('../models/Specialization');
const Schedule = require('../models/Schedule');

exports.getProfile = async (req, res, next) => { res.json({ message: 'Doctor profile' }); };
exports.updateProfile = async (req, res, next) => { res.json({ message: 'Update doctor profile' }); };
exports.createSchedule = async (req, res, next) => { res.json({ message: 'Create schedule' }); };
exports.getAppointments = async (req, res, next) => { res.json({ message: 'Get doctor appointments' }); };
exports.updateAppointment = async (req, res, next) => { res.json({ message: 'Update appointment' }); };
exports.getEarnings = async (req, res, next) => { res.json({ message: 'Get doctor earnings' }); };

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