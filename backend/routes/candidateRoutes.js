const express = require('express');
const router = express.Router();

// ✅ FIX 1: Correct models imported
const User = require('../models/user');
const Candidate = require('../models/candidate');

const { jwtAuthMiddleware } = require('../jwt');

// ================= ADMIN CHECK =================
// ✅ FIX 2: async function properly used with await
const checkAdminRole = async (userId) => {
    const user = await User.findById(userId);

    if (!user || user.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
    }
    return true;
};

// ================= ADD CANDIDATE =================
router.post('/', jwtAuthMiddleware, async (req, res) => {
    try {
        // ✅ FIX 3: await added (pehle missing tha)
        await checkAdminRole(req.user.id);

        // ✅ FIX 4: basic validation
        const { name, party, age } = req.body;
        if (!name || !party || !age) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newCandidate = new Candidate({ name, party, age });
        const response = await newCandidate.save();

        res.status(201).json({ response });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

// ================= GET ALL CANDIDATES =================
// ✅ FIX 5: Voting ke liye zaroori route
router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

// ================= UPDATE CANDIDATE =================
router.put('/:candidateId', jwtAuthMiddleware, async (req, res) => {
    try {
        await checkAdminRole(req.user.id);

        const { candidateId } = req.params;

        const response = await Candidate.findByIdAndUpdate(
            candidateId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        res.status(200).json(response);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

// ================= DELETE CANDIDATE =================
router.delete('/:candidateId', jwtAuthMiddleware, async (req, res) => {
    try {
        await checkAdminRole(req.user.id);

        const { candidateId } = req.params;

        // ✅ FIX 6: Person ❌ → Candidate ✅
        const response = await Candidate.findByIdAndDelete(candidateId);

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

//lets start voting route
router.post('/vote/:candidateId', jwtAuthMiddleware, async (req, res) => {
    //no admin can vote
    //user can vote only once 
    candidateId = req.params.candidateId;
    userId = req.user.id;
    try {
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if(user.isVoted) {
            return res.status(403).json({ error: 'User has already voted' });
        }
        if (user.role === 'admin') {
            return res.status(403).json({ error: 'Admins are not allowed to vote' });
        }
        candidate.votes.push({ user: userId });
        candidate.voteCount += 1;
        await candidate.save();
        user.isVoted = true;
        await user.save();
        res.status(200).json({ message: 'Vote cast successfully' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

//vote count 
router.get('/vote/count', async (req, res) => {
    try {
        const candidate = await Candidate.find().sort({ voteCount: 'desc' });
        const voterecord = candidate.map((date) => {
            return {
                party: date.party,
                count: date.voteCount
            }
        });
        return res.status(200).json(voterecord);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

//list of candidates 
router.get('/candidate', async (req, res) => {
    try {
        //list of candidates with their details
        const candidates = await Candidate.find();
        const candidateList = candidates.map((candidate) => {
            return {
                name: candidate.name,
                party: candidate.party,
                age: candidate.age,
                voteCount: candidate.voteCount
            }
        });
        return res.status(200).json(candidateList);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }   
});

module.exports = router;
