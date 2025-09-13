const mongodb = require('../data/connectTemple');
const ObjectId = require('mongodb').ObjectId;

const getAllTemples = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('temples').find();
    result.toArray().then((temples) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(temples);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTempleById = async (req, res) => {
  try {
    const templeId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('temples').findOne({ _id: templeId });
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Temple not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTemple = async (req, res) => {
  try {
    const temple = {
      name: req.body.name,
      location: req.body.location,
      dedicated: req.body.dedicated,
      area: req.body.area
    };
    const result = await mongodb.getDb().collection('temples').insertOne(temple);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTemple = async (req, res) => {
  try {
    const templeId = new ObjectId(req.params.id);
    const temple = {
      name: req.body.name,
      location: req.body.location,
      dedicated: req.body.dedicated,
      area: req.body.area
    };
    const result = await mongodb.getDb().collection('temples').replaceOne({ _id: templeId }, temple);
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Temple not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTemple = async (req, res) => {
  try {
    const templeId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('temples').deleteOne({ _id: templeId });
    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Temple not found' });
    }
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
