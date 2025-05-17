const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST book an event
router.post('/', async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    // تحقق لو الحجز موجود أصلاً
    const existingBooking = await Booking.findOne({ userId, eventId });
    if (existingBooking) {
      return res.status(400).json({ message: 'Event already booked' });
    }
    const booking = new Booking({ userId, eventId });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET booked events for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    const bookedEventIds = bookings.map(b => b.eventId);
    res.json({ bookedEventIds });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
