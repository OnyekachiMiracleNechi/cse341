const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Temple name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  dedicated: {
    type: Date,
    required: [true, 'Dedicated date is required']
  },
  area: {
    type: Number,
    min: [1, 'Area must be at least 1 square meter'],
    required: [true, 'Area is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Temple', templeSchema, 'temples');
