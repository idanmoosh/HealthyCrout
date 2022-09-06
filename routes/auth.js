const express = require('express');
const router = express.Router();

//initiate Authservice
const authService = require('../services/authService');
const authServiceInstance = new authService();

module.exports = (app, passport) => {
  app.use('/auth', router);

  //registration
  router.post('/register', async (req, res, next) => {
    try {
      const data = req.body;

      const response = await authServiceInstance.register(data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
  // login
  router.post(
    '/login',
    passport.authenticate('local'),
    async (req, res, next) => {
      try {
        const { username, password } = req.body;
        const response = await authServiceInstance.login({
          email: username,
          password,
        });
        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    }
  );
};
