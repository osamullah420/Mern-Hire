const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }
});

const developerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: [String], required: true },
  contact: { type: String, required: true },
  feedback: [feedbackSchema],
  rating: { type: Number, default: 0, min: 1, max: 5 }
});

module.exports = mongoose.model('Developer', developerSchema);
