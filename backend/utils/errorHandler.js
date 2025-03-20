const logger = require('./logger');

module.exports = (err, req, res, next) => {
    logger.error(err.stack);
    
    res.status(err.statusCode || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'production' 
            ? 'Something went wrong!' 
            : err.message
    });
};