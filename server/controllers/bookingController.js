const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.bookEvent = async (req, res) => {
  const { eventId, userEmail } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const existingBooking = await Booking.findOne({ event: eventId, userEmail });
    if (existingBooking) return res.status(400).json({ message: 'Already booked' });

    const booking = new Booking({ event: eventId, userEmail });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
