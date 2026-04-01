const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const http = require('http');              // ✅ ADD
const { Server } = require('socket.io');   // ✅ ADD

// DB connection
const db = require('./db');

const app = express();

// 👇 HTTP server create
const server = http.createServer(app);

// 👇 Socket setup
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// 👇 socket connection log
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
});

// 👇 IMPORTANT (routes me use hoga)
app.set('io', io);

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Voting App Backend is Running 🚀');
});

// Port
const PORT = process.env.PORT || 3000;

// ❌ app.listen hatao
// ✅ server.listen use karo
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});