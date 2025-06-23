exports.getProfile = async (req, res, next) => { res.json({ message: 'Doctor profile' }); };
exports.updateProfile = async (req, res, next) => { res.json({ message: 'Update doctor profile' }); };
exports.createSchedule = async (req, res, next) => { res.json({ message: 'Create schedule' }); };
exports.getAppointments = async (req, res, next) => { res.json({ message: 'Get doctor appointments' }); };
exports.updateAppointment = async (req, res, next) => { res.json({ message: 'Update appointment' }); };
exports.getEarnings = async (req, res, next) => { res.json({ message: 'Get doctor earnings' }); }; 