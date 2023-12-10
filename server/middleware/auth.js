const jwt = require('jsonwebtoken');

const { User } = require('../models/User');

const isAuthenticated = async (req, res, next) => {
    try {
        if (!req.headers.authorization) throw new Error('Access denied');
        
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { isAuthenticated };
