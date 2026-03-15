const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Library used to hash and compare passwords securely

// User Schema
const userSchema = new mongoose.Schema({

    // Name of the user
    name: {
        type: String,
        required: true
    },

    // Age of the user
    age: {
        type: Number,
        required: true
    },

    // Email address of the user (optional)
    email: {
        type: String
    },

    // Mobile number of the user (optional)
    mobile: {
        type: String
    },

    // Address of the user
    address: {
        type: String,
        required: true
    },

    // Unique Aadhar card number used for voter identification
    aadharCardNumber: {
        type: String,
        required: true,
        unique: true // Ensures no two users can have the same Aadhar number
    },

    // Password of the user (will be stored in hashed form)
    password: {
        type: String,
        required: true
    },

    // Role of the user in the system
    // 'voter' can vote, 'admin' can manage the system
    role: {
        type: String,
        enum: ['voter', 'admin'], // Only these two roles are allowed
        default: 'voter'
    },

    // Tracks whether the user has already voted
    isVoted: {
        type: Boolean,
        default: false
    }
});


// Middleware: Hash password before saving the user to the database
userSchema.pre('save', async function () {

    // If password was not modified, skip hashing
    if (!this.isModified('password')) return;

    // Generate salt for hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the password and store it
    this.password = await bcrypt.hash(this.password, salt);
});


// Method to compare entered password with stored hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {

    // bcrypt.compare returns true if passwords match
    return await bcrypt.compare(candidatePassword, this.password);
};


// Create User model from schema
const User = mongoose.model('User', userSchema);

// Export the model so it can be used in other files
module.exports = User;