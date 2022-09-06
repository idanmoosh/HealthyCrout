const createError = require('http-errors');
const userModel = require('./models/user');
const userModelInstance = new userModel();

modoule.exports = () => {
  //registering - return instace of new user if mail doesn't exist already
  async function register(data) {
    const email = data;
    try {
      const user = await userModelInstance.findOneByEmail(email);

      //rejects if user exists
      if (user) {
        throw createError(409, `Email address : ${email} already in use`);
      }
      return await userModelInstance.create;
    } catch (err) {
      throw createError(500, err);
    }
  }
  // login if the email and password are correct
  async function login(data) {
    const { email, password } = data;
    try {
      const user = await userModelInstance.findOneByEmail(email);
      if (!user) {
        throw createError(409, `Email address : ${email} not registered`);
      }
      if (user.password !== password) {
        throw createError(401, 'Incorrect username OR password');
      }
      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }
};
