const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Route to handle user signup
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password, otp } = req.body;
    if (users[email] && users[email] === otp) {
      const user = new User({ fullName, email, password });
      await user.save();
      delete users[email]; // Remove OTP after successful registration
      res.send({ message: 'User registered successfully' });
    } else {
      res.status(400).send({ message: 'Invalid OTP' });
    }
  } catch (err) {
    res.status(400).send({ message: 'Error registering user', error: err.message });
  }
});

module.exports = router;
