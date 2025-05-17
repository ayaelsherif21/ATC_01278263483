const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

const seedEvents = [
  {
    name: "Music Concert",
    description: "A live music concert event.",
    category: "Music",
    date: new Date("2025-06-01T18:00:00Z"),
    venue: "City Hall",
    price: 50,
    image: "concert.jpg"
  },
  {
    name: "Art Exhibition",
    description: "Exhibition of modern art.",
    category: "Art",
    date: new Date("2025-06-10T10:00:00Z"),
    venue: "Art Gallery",
    price: 20,
    image: "art.jpg"
  },
  {
    name: "Tech Conference",
    description: "Annual conference about technology.",
    category: "Technology",
    date: new Date("2025-07-15T09:00:00Z"),
    venue: "Convention Center",
    price: 100,
    image: "tech.jpg"
  }
];

async function seedDB() {
  await connectDB();

  try {
    await Event.deleteMany({});
    console.log('Cleared existing events');

    await Event.insertMany(seedEvents);
    console.log('Seeded events successfully!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
