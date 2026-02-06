const mongoose = require('mongoose');
// ✅ Using bcryptjs instead of bcrypt for async/await friendly hashing
const bcrypt = require('bcryptjs');

// Define user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    aadharCardNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter',
    },
    isVoted: {
        type: Boolean,
        default: false,
    }
});

// ✅ FIXED pre-save hook (async/await friendly, no next() error)
// Password hashing before saving user
userSchema.pre('save', async function() {
    // If password not modified, skip hashing
    if (!this.isModified('password')) return;

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // ✅ No next() needed in modern async pre-hooks
});

// Method to compare password during login
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
};

// Create User model
const User = mongoose.model('User', userSchema);
module.exports = User;
