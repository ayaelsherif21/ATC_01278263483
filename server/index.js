// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/events.routes');
const bookingRoutes = require('./routes/bookings');

dotenv.config();
const app = express();
//
connectDB();

// Middleware
app.use(cors());
app.use(express.json());  

// Routes
app.use('/api/auth', authRoutes);

mongoose.connect('mongodb://localhost:27017/eventBookingDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
