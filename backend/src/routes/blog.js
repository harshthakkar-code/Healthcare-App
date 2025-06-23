const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

router.post('/', auth, role('admin'), blogController.createBlog);
router.get('/', blogController.getBlogs);

module.exports = router; 