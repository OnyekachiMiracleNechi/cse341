const User = require('../models/users');
const bcrypt = require('bcrypt');

// GET all users (with pagination)
const getAllUsers = async (req, res) => {
  try {
    

    const users = await User.find().select('-password');


     res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      totalUsers: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET single user
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user)
      return res.status(404).json({ success: false, error: 'User not found' });

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: 'Invalid ID format' });
  }
};

// CREATE a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, address, phone } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      address,
      phone,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { ...user._doc, password: undefined },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ success: false, error: 'Email already exists' });
    }
    res.status(400).json({ success: false, error: err.message });
  }
};

// UPDATE a user
const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user)
      return res.status(404).json({ success: false, error: 'User not found' });

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// DELETE a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user)
      return res.status(404).json({ success: false, error: 'User not found' });

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
