const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');  // (Optional) used for password hashing if needed in other models

// Define the Candidate schema
const candidateSchema = new mongoose.Schema({

    // Name of the candidate
    name: {
        type: String,
        required: true
    },

    // Political party the candidate belongs to
    party: {
        type: String,
        required: true
    },
    // Age of the candidate
    age: {
        type: Number,
        required: true
    },
    // Array storing information about users who voted for this candidate
    votes: [
        {
            // Reference to the User who voted
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',  // Links to the User collection
                required: true
            },

            // Timestamp of when the vote was cast
            votedAt: {
                type: Date,
                default: Date.now()  // Automatically stores current date/time
            }
        }
    ],

    // Total number of votes received by the candidate
    voteCount: {
        type: Number,
        default: 0   // Starts at 0 and increases when votes are added
    }
});

// Create a model from the schema
// This allows interaction with the "candidates" collection in MongoDB
const Candidate = mongoose.model('Candidate', candidateSchema);

// Export the model so it can be used in other files
module.exports = Candidate;