const { AppError } = require('../utils/requestHandlers/errorHandler');

class User {
  constructor() {
    this.userDao = require('../model/Dao/User');
  }

  // User Creation
  async create(userData) {
    try {
      _logger.debug(userData);
      const {
        id, email, username, phoneNumber,
      } = await this.userDao.create(userData);
      return {
        id, email, username, phoneNumber,
      };
    } catch (error) {
      throw new AppError(error.code || 400, error.message);
    }
  }

  async updateOne(id, { username, phoneNumber }) {
    /*
    User can update only 2 field which is username and phoneNumber
    */
    try {
      const user = await this.getOne(id);
      if (!user) throw new AppError(404, 'User doesn\'t exist');

      const updateData = {
        ...(username && { username }),
        ...(phoneNumber && { phoneNumber }),
      };
      _logger.debug('updateData', updateData);
      return this.userDao.findOneAndUpdate({ id }, updateData);
    } catch (error) {
      throw new AppError(
        error.code || 400, error.message,
      );
    }
  }

  // Getting Users

  async getOneCompleteDoc(filter) {
    // Including all DB fields
    _logger.debug(filter);
    return this.userDao.getCompleteDoc(filter);
  }

  async getOne(id) {
    _logger.debug(id);
    const user = await this.userDao.getOne(id);
    return user;
  }

  async getOneByQuery(filter) {
    _logger.debug(filter);
    return this.userDao.getOneByQuery(filter);
  }

  async getAll({ pageNo, pageSize }) {
    return this.userDao.getAll(pageNo, pageSize);
  }

  // Soft deleting user
  async deleteOne(id) {
    try {
      const updatedData = {
        isDeleted: true,
        deletedAt: new Date(),
      };
      _logger.debug(updatedData);
      const user = await this.userDao.updateOne(
        id, updatedData,
      );
      if (!user) throw new AppError(404, 'User doesn\'t exist');
      _logger.debug(user);
      return `${user.email} is deleted`;
    } catch (error) {
      throw new AppError(error.code || 400, error.message);
    }
  }
}

module.exports = new User();
