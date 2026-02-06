const express = require('express');
const app = express();
const cors = require('cors');  // 🔹 add this

const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors()); // 🔹 enable CORS for all origins

const PORT = process.env.PORT || 3000;

// importing routes
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

// use the routers
app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

// test root
app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
