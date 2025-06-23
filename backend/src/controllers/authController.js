const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!['doctor', 'patient'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    const user = new User({ name, email, password, role, isApproved: role === 'doctor' ? false : true });
    await user.save();
    res.status(201).json({ message: 'Registration successful, please login.' });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) return res.status(400).json({ message: 'Invalid credentials' });
    if (user.role === 'doctor' && !user.isApproved) return res.status(403).json({ message: 'Doctor not approved yet' });
    const token = generateToken(user);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) { next(err); }
};

exports.getMe = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) { next(err); }
}; 