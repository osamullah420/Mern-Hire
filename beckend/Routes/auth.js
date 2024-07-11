const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/user');

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log('Signup request received with data:', req.body); // Log request data

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists'); // Log existing user check
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error during signup:', err); // Log detailed error
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login request received with data:', req.body); // Log request data

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User does not exist'); // Log user existence check
      return res.status(400).json({ message: 'User does not exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.log('Invalid credentials'); // Log credential check
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ result: user, token });
  } catch (err) {
    console.error('Error during login:', err); // Log detailed error
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
});

module.exports = router;
