const express = require('express');

const router = express.Router();
const Authentication = require('../../controller/Authentication');

router.post('/login',
  async (req, res, next) => {
    Authentication.login(req.body)
      .then((response) => {
        _handleResponse({
          res,
          statusCode: 200,
          ...(response && { response }),
        });
      })
      .catch((err) => next(err));
  });
router.post('/signup',
  async (req, res, next) => {
    Authentication.signUp(req.body)
      .then((response) => {
        _handleResponse({
          res,
          statusCode: 200,
          ...(response && { response }),
        });
      })
      .catch((err) => next(err));
  });

module.exports = router;
