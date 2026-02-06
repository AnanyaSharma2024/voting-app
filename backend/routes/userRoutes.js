const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { jwtAuthMiddleware, generateToken } = require('../jwt');

//POST route to add a person 
// POST route to signup user
router.post('/signup', async (req, res) => {
    console.log('POST /signup hit');
    console.log('Request body:', req.body);

    try {
        const data = req.body;

        // ✅ CHECK: only one admin allowed
        if (data.role === 'admin') {
            const existingAdmin = await User.findOne({ role: 'admin' });

            if (existingAdmin) {
                return res.status(400).json({
                    error: 'Admin already exists. Only one admin is allowed.'
                });
            }
        }

        // create new user
        const newUser = new User(data);
        const response = await newUser.save();

        const payload = { id: response._id };
        const token = generateToken(payload);

        res.status(201).json({
            response,
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        //extract aadharCardNumber and password from request body
        const { aadharCardNumber, password } = req.body;
        //find user by aadharCardNumber
        const user = await User.findOne({ aadharCardNumber: aadharCardNumber });
        //if user not found, return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        //generate jwt token
        const payload = {
            id: user.id,
        }
        const token = generateToken(payload);
        //return  token as response
        res.json({token})
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//PROFILE ROUTE
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user; //get user data from request object
        const userId = userData.id;
        const user = await User.findById(userId);
        res.status(200).json({user});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // ✅ FIX
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(userId);

        if (!(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router;





























