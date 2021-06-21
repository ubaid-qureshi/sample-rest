const jwt = require('jsonwebtoken');
const { JWT_TOKEN_SECRET } = require('config');
const { AppError } = require('../utils/requestHandlers/errorHandler');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) throw new AppError(401, 'Invalid Access Token');

  return jwt.verify(token, process.env.TOKEN_SECRET || JWT_TOKEN_SECRET, (err) => {
    if (err) throw new AppError(403, err.message);
    next();
  });
};
