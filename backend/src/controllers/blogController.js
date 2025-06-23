const Blog = require('../models/Blog');

exports.createBlog = async (req, res, next) => {
  try {
    const blog = new Blog({ ...req.body, author: req.user._id });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) { next(err); }
};

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate('author', 'name');
    res.json(blogs);
  } catch (err) { next(err); }
}; 