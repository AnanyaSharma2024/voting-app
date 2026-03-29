const User = require('../models/user');

const validateUserSignup = async (req, res, next) => {
    try {
        const { name, age, email, mobile, aadharCardNumber } = req.body;

        // 1️⃣ Name empty check
        if (!name || name.trim().length === 0) {
            return res.status(400).json({ error: 'Name is required' });
        }

        // 2️⃣ Age validation
        if (!age || age < 18) {
            return res.status(400).json({ error: 'Age must be 18 or above' });
        }

        // 3️⃣ Aadhar format check
        if (!/^\d{12}$/.test(aadharCardNumber)) {
            return res.status(400).json({ error: 'Invalid Aadhar format' });
        }

        // 4️⃣ Duplicate Aadhar
        const aadharExists = await User.findOne({ aadharCardNumber });
        if (aadharExists) {
            return res.status(400).json({ error: 'Aadhar already registered' });
        }

        // 5️⃣ Duplicate email
        if (email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ error: 'Email already exists' });
            }
        }

        // 6️⃣ Duplicate mobile
        if (mobile) {
            const mobileExists = await User.findOne({ mobile });
            if (mobileExists) {
                return res.status(400).json({ error: 'Mobile number already exists' });
            }
        }

        next();

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Validation failed' });
    }
};

module.exports = validateUserSignup;