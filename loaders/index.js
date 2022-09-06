const expressLoader = require('./express');
const passportLoader = require('./passport');
const routeLoader = require('../routes');
const swaggerLoader = require('./swagger');
const swagger = require('./swagger');

module.exports = async app => {
  // express middleware
  const expressApp = await expressLoader(app);
  //passport middlewate
  const passport = await passportLoader(expressApp);

  await routeLoader(app, passport);

  await swaggerLoader(app);

  app.use((err, req, res, next) => {
    const { message, status } = err;
    return res.status(status).send({ message });
  });
};
