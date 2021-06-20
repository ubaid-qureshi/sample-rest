const bcrypt = require('bcrypt');
// const { BCRYPT_SALT } = require('config');
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
      _logger.debug(`${email} ${password}`);
      const user = await this.userController.getOneCompleteDoc({ email });
      // check credentials
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      throw new AppError(400, 'Invalid email or password');
    } catch (error) {
      throw new AppError(error.code || 400, error.message);
    }
  }
}

module.exports = new Authentication();
