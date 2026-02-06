const jwt = require('jsonwebtoken');
const { error } = require('node:console');
const jwtAuthMiddleware = (req, res, next) => {
    //first check request headers for authorization token
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error: 'Token not found'});
    }
    //extract token from request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error: 'Unauthorized'});
    }

    try{
        //verify token using jwt verify method
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //attach decoded user information to request object
        next(); //proceed to next middleware or route handler
    }
    catch(err){
        console.error(err);
        return res.status(401).json({error: 'Invalid token'});
    }
}

//function to generate jwt token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30000}); //token expires in 30 minutes
}

module.exports = {
    jwtAuthMiddleware,
    generateToken
};



