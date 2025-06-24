const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

router.get('/public/docterlist', doctorController.getDoctorListWithReviews);
router.get('/public', doctorController.getDoctors);
router.get('/public/:id', doctorController.getDoctorDetails);
router.use(auth, role('doctor'));
router.get('/profile', doctorController.getProfile);
router.put('/profile', doctorController.updateProfile);
router.post('/schedule', doctorController.createSchedule);
router.get('/appointments', doctorController.getAppointments);
router.put('/appointments/:id', doctorController.updateAppointment);
router.get('/earnings', doctorController.getEarnings);

module.exports = router; 