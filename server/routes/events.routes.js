// server/routes/event.routes.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { verifyToken } = require('../middleware/auth');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(404).json({ error: 'Event not found' });
  }
});

// Create event (Admin only)
router.post('/', verifyToken, async (req, res) => {
  try {
    const newEvent = new Event({ ...req.body, createdBy: req.user.id });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create event' });
  }
});

// Update event (Admin only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update event' });
  }
});

// Delete event (Admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete event' });
  }
});

// Booking routes
router.post('/:id/book', verifyToken, async (req, res) => {
  try {
    const eventId = req.params.id;
    const { seats } = req.body;
    const booking = new Booking({ event: eventId, user: req.user.id, seats });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: 'Booking failed' });
  }
});

router.get('/:id/bookings', verifyToken, async (req, res) => {
  try {
    const eventId = req.params.id;
    const bookings = await Booking.find({ event: eventId }).populate('user', 'name email');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

module.exports = router;

