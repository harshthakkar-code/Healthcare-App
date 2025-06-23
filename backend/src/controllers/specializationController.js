const Specialization = require('../models/Specialization');

exports.getSpecializations = async (req, res, next) => {
  try {
    const specs = await Specialization.find();
    res.json(specs);
  } catch (err) { next(err); }
}; 