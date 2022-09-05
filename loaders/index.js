const expressLoader = require('./express');

module.exports = async app => {
  // express middleware
  const expressApp = await expressLoader(app);
};
