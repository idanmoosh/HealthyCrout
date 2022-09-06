const createError = require('http-errors');
const userModelInstance = require('../models/user.js');

module.exports = () => {
  async function get(data) {
    const { id } = data;
    try {
      //check if user exists
      const user = await userModelInstance.findById(id);
      // IF NOT - REJECT
      if (!user) {
        throw createError(404, 'User record not found');
      }
      return user;
    } catch (err) {
      throw err;
    }
  }
  async function update(data) {
    try {
      //checks user
      const user = await userModelInstance.update(data);
      return user;
    } catch (err) {
      throw err;
    }
  }
};
