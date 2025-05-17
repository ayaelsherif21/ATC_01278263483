// server/routes/user.routes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Booking = require('../models/Booking');
const { verifyToken } = require('../middleware/auth');

// Get current user profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
});

// Get current user's bookings
router.get('/my/bookings', verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user bookings' });
  }
});

module.exports = router;