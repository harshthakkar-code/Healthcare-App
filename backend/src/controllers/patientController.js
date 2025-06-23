exports.getProfile = async (req, res, next) => { res.json({ message: 'Patient profile' }); };
exports.updateProfile = async (req, res, next) => { res.json({ message: 'Update patient profile' }); };
exports.bookAppointment = async (req, res, next) => { res.json({ message: 'Book appointment' }); };
exports.getAppointments = async (req, res, next) => { res.json({ message: 'Get patient appointments' }); };
exports.postReview = async (req, res, next) => { res.json({ message: 'Post review' }); };
exports.getMedicalRecords = async (req, res, next) => { res.json({ message: 'Get medical records' }); }; 