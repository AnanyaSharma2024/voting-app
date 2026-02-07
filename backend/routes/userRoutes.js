const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { jwtAuthMiddleware, generateToken } = require('../jwt');
const validateUserSignup = require('../middlewares/validateUser');

/* =========================
   SIGNUP ROUTE
========================= */
router.post(
  '/signup',
  validateUserSignup, // Middleware for validation
  async (req, res) => {
    try {
        const data = req.body;

        // Only one admin allowed
        if (data.role === 'admin') {
            const adminUser = await User.findOne({ role: 'admin' });
            if (adminUser) {
                return res.status(400).json({ error: 'Admin already exists' });
            }
        }

        // Create new user
        const newUser = new User(data);
        const savedUser = await newUser.save();

        // Generate JWT token
        const token = generateToken({ id: savedUser.id });

        res.status(201).json({
            response: savedUser,
            token: token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/* =========================
   LOGIN ROUTE
========================= */
router.post('/login', async (req, res) => {
    try {
        const { aadharCardNumber, password } = req.body;

        if (!aadharCardNumber || !password) {
            return res.status(400).json({
                error: 'Aadhar Card Number and password are required'
            });
        }

        const user = await User.findOne({ aadharCardNumber });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                error: 'Invalid Aadhar Card Number or Password'
            });
        }

        const token = generateToken({ id: user.id });
        res.status(200).json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/* =========================
   PROFILE ROUTE
========================= */
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password'); // don't return password
        res.status(200).json({ user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/* =========================
   UPDATE PASSWORD ROUTE
========================= */
router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                error: 'currentPassword and newPassword are required'
            });
        }

        const user = await User.findById(userId);

        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(401).json({
                error: 'Invalid current password'
            });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
