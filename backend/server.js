// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// DB connection
const db = require('./db');

// Middleware
app.use(express.json());
app.use(cors());

// API routes
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

// SPA fallback route (must be LAST, after all API routes)
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Optional test route
app.get('/api-test', (req, res) => {
    res.send('Server is running 🚀');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
