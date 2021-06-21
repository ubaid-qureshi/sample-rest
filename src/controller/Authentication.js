const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_TOKEN_SECRET } = require('config');
const { AppError } = require('../utils/requestHandlers/errorHandler');

class Authentication {
  constructor() {
    this.userController = require('./User');
  }

  async signUp(userData) {
    try {
      return this.userController.create(userData);
    } catch (error) {
      throw new AppError(error.code || 400, error.message);
    }
  }

  async login({ email, password }) {
    try {
      /**
       * ToDO: Add Refresh Token as well
       */
      _logger.debug(`${email} ${password}`);
      const {
        id,
        username,
        email: userEmail,
        password: userPassword,
      } = await this.userController.getOneCompleteDoc({ email });
      // check credentials
      if (bcrypt.compareSync(password, userPassword)) {
        return {
          id,
          username,
          email: userEmail,
          accessToken: jwt.sign(
            userPassword,
            process.env.TOKEN_SECRET || JWT_TOKEN_SECRET,
          ),
        };
      }
      throw new AppError(401, 'Invalid email or password');
    } catch (error) {
      throw new AppError(error.code || 400, error.message);
    }
  }
}

module.exports = new Authentication();
