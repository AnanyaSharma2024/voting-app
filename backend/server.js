const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// DB connection
const db = require('./db');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes'); // ✅ FIXED

// Use routes
app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Voting App Backend is Running 🚀');
});

// Port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
