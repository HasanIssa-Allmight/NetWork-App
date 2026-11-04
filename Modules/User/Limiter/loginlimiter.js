const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 3, 
    message: {
        status: 429,
        error: 'you are out of limiting',
    },
    standardHeaders: true, 
    legacyHeaders: false, 
});

module.exports = loginLimiter