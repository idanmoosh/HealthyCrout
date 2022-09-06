const expressLoader = require('./express');
const passportLoader = require('./passport');
const routeLoader = require('../routes');

module.exports = async app => {
  // express middleware
  const expressApp = await expressLoader(app);
  //passport middlewate
  const passport = await passportLoader(expressApp);
  // load route handlers
  await routeLoader(app, passport);
  //swagger loader

  app.use((err, req, res, next) => {
    const { message, status } = err;

    return res.status(status).send({ message });
  });
};
