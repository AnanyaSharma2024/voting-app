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

        // 3️⃣ Duplicate Aadhar
        if (aadharCardNumber) {
            const aadharExists = await User.findOne({ aadharCardNumber });
            if (aadharExists) {
                return res.status(400).json({ error: 'Aadhar already registered' });
            }
        }

        // 4️⃣ Duplicate email (if provided)
        if (email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ error: 'Email already exists' });
            }
        }

        // 5️⃣ Duplicate mobile (if provided)
        if (mobile) {
            const mobileExists = await User.findOne({ mobile });
            if (mobileExists) {
                return res.status(400).json({ error: 'Mobile number already exists' });
            }
        }

        next(); // ✅ sab sahi, controller pe jao
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Validation failed' });
    }
};

module.exports = validateUserSignup;
