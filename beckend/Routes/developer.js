const express = require('express');
const router = express.Router();
const Developer = require('../Model/developer');
const nodemailer = require('nodemailer');

// Get all developers
router.get('/', async (req, res) => {
  try {
    const developers = await Developer.find();
    res.json(developers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get developers sorted by rating
router.get('/sorted', async (req, res) => {
  try {
    const developers = await Developer.find().sort({ rating: -1 });
    res.json(developers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Search developers by skills
router.get('/search', async (req, res) => {
  const { skills } = req.query;
  try {
    const developers = await Developer.find({ skills: { $regex: skills, $options: 'i' } });
    res.json(developers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Add feedback to developer
router.post('/:id/feedback', async (req, res) => {
  try {
    const developer = await Developer.findById(req.params.id);
    if (!developer) {
      return res.status(404).json({ message: 'Developer not found' });
    }

    const { user, comment, rating } = req.body;
    developer.feedback.push({ user, comment, rating });

    // Recalculate rating
    const totalRating = developer.feedback.reduce((acc, feedback) => acc + feedback.rating, 0);
    developer.rating = totalRating / developer.feedback.length;

    await developer.save();
    res.json(developer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
