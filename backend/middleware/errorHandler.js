const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
};