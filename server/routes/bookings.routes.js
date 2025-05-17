//server/routes/bookings.routes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { verifyToken } = require('../middleware/auth');

// Book an event (alternate route)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { event, seats } = req.body;
    const user = req.user.id;

    const existingBooking = await Booking.findOne({ user, event });
    if (existingBooking) {
      return res.status(400).json({ message: 'Event already booked' });
    }

    const booking = new Booking({ user, event, seats });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get booked events for a user
router.get('/user/:userId', verifyToken, async (req, res) => {
  try {
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const bookings = await Booking.find({ user: req.params.userId }).populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
