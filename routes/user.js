const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

const userServiceInstance = new userService();

module.exports = () => {
  app.use('/users', router);

  //get user details
  router.get('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params;
      const response = await userServiceInstance.get({ id: userId });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
  //update user details
  router.put('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params;
      const data = req.body;

      const response = await userServiceInstance.update({
        id: userId,
        ...data,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
  // find user by email
  async function findOneByEmail(email) {
    try {
      // Generate SQL statement
      const statement = `SELECT *
                         FROM users
                         WHERE email = $1`;
      const values = [email];

      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
  // find user by ID
  async function findOneById(id) {
    try {
      // Generate SQL statement
      const statement = `SELECT *
                         FROM users
                         WHERE id = $1`;
      const values = [id];

      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
};
