const express = require('express');
const router = express.Router();
const specializationController = require('../controllers/specializationController');

router.get('/', specializationController.getSpecializations);

module.exports = router; 