require('../src/utils/logger/logConfig');
require('../src/utils/requestHandlers/responseHandler');
require('../src/utils/db/mongo')();
require('dotenv').config();
const mongoose = require('mongoose');

const { AppError } = require('../src/utils/requestHandlers/errorHandler');
const user = require('../src/controller/User');
const authentication = require('../src/controller/Authentication');

// jest.mock('../src/controller/');

describe('Test suit for user', () => {
  beforeAll(async () => {
    await user.create({
      email: 'u.qureshi005@gmail.com',
      username: 'Ubaid',
      password: 'password',
      phoneNumber: '1234567890',
    });
  });

  it('Login should pass', async () => {
    const loginData = await authentication.login(
      {
        email: 'u.qureshi005@gmail.com',
        password: 'password',
      },
    );
    expect(loginData.accessToken).toBeDefined();
  });

  it('Login should fail', async () => {
    try {
      await authentication.login(
        {
          email: 'u.qureshi005@gmail.com',
          password: 'wrongPassword',
        },
      );
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.code).toBe(401);
      expect(error.message).toBe('Invalid email or password');
    }
  });

  afterAll(async (done) => {
    await mongoose.connection.close();
    done();
  });
});
