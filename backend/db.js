require('dotenv').config(); // dotenv top par

const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URL_LOCAL;

if (!mongoURL) {
    console.error("Error: MONGODB_URL_LOCAL is undefined. Check your .env file");
    process.exit(1);
}

// Mongoose 7+ me options automatically handle hote hain
mongoose.connect(mongoURL)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("MongoDB connection error:", err));

const db = mongoose.connection;

db.on('connected', () => console.log('MongoDB connected successfully'));
db.on('error', (err) => console.error('MongoDB connection error:', err));
db.on('disconnected', () => console.log('MongoDB disconnected'));

module.exports = db;
