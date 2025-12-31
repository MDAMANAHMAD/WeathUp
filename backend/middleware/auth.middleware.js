const jwt = require('jsonwebtoken');

// Secret key for JWT (should be in .env)
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key'; 

module.exports = function(req, res, next) {
    // 1. Get token from header
    const token = req.header('x-auth-token'); 

    // 2. Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // 3. Verify token
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Add user from payload to the request object
        req.user = decoded.user; 
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};