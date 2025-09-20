const Temple = require('../models/temples');

// GET all temples
const getAllTemples = async (req, res) => {
  try {
    const temples = await Temple.find();
    res.status(200).json(temples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET temple by ID
const getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }
    res.status(200).json(temple);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE a temple
const createTemple = async (req, res) => {
  try {
    const temple = new Temple(req.body);
    const newTemple = await temple.save();
    res.status(201).json(newTemple);
  } catch (err) {
    res.status(400).json({ message: err.message }); // validation errors
  }
};

// UPDATE a temple
const updateTemple = async (req, res) => {
  try {
    const updatedTemple = await Temple.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTemple) {
      return res.status(404).json({ message: 'Temple not found' });
    }
    res.status(200).json(updatedTemple);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a temple
const deleteTemple = async (req, res) => {
  try {
    const deletedTemple = await Temple.findByIdAndDelete(req.params.id);
    if (!deletedTemple) {
      return res.status(404).json({ message: 'Temple not found' });
    }
    res.status(200).json({ message: 'Temple deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllTemples,
  getTempleById,
  createTemple,
  updateTemple,
  deleteTemple
};
