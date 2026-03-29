const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    // first check request headers has authorization or not
    const authorization = req.headers.authorization;

    if (!authorization) 
        return res.status(401).json({ error: 'Token Not Found' });

    // Extract token
    const token = authorization.split(' ')[1];

    if (!token) 
        return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info
        req.user = decoded;

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Generate token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: '1h'   // FIXED
    });
};

module.exports = { jwtAuthMiddleware, generateToken };