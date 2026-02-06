const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { jwtAuthMiddleware, generateToken } = require('../jwt');

// SIGNUP
router.post('/signup', async (req, res) => {
    console.log('POST /signup hit');
    console.log('Request body:', req.body);

    try {
        const data = req.body;

        // age string → number
        if (data.age) {
            data.age = Number(data.age);
        }

        // only one admin allowed
        if (data.role === 'admin') {
            const existingAdmin = await User.findOne({ role: 'admin' });
            if (existingAdmin) {
                return res.status(400).json({
                    error: 'Admin already exists. Only one admin is allowed.'
                });
            }
        }

        // ❌ NO bcrypt here
        const newUser = new User(data);
        const response = await newUser.save();

        const token = generateToken({ id: response._id });

        res.status(201).json({ response, token });

    } catch (err) {
        console.error('SIGNUP ERROR 🔴', err);
        res.status(500).json({ error: err.message });
    }
});
