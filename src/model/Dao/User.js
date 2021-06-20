const { AppError } = require('../../utils/requestHandlers/errorHandler');

class User {
  constructor() {
    this.userModel = require('../Schema/User');
    this.projection = {
      _id: 0,
      password: 0,
      __v: 0,
    };
  }

  async create(payload) {
    try {
      return await this.userModel.create(payload);
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }

  async getOne(id) {
    try {
      return await this.userModel.findOne({ id }, this.projection);
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }

  async getCompleteDoc(filter) {
    try {
      return await this.userModel.findOne(filter);
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }

  async getOneByQuery(filter) {
    try {
      return await this.userModel.findOne(filter, this.projection);
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }

  async getAll(filter = {}) {
    try {
      filter.isDeleted = false;
      filter.isBlocked = false;
      return await this.userModel.find(filter, this.projection);
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }

  async updateOne(id, updateData) {
    try {
      return await this.userModel.updateOne(
        { id },
        updateData,
        this.projection,
      );
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }

  async findOneAndUpdate(filter, updateData) {
    try {
      return await this.userModel.findOneAndUpdate(
        filter,
        updateData,
        { new: true, ...this.projection },
      );
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
}

module.exports = new User();
