const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { SESSION_SECRET } = require('../config');

module.exports = app => {
  //enable cors
  app.use(cors());
  // transform from RAW STRING to JSON
  app.use(bodyParser.json());
  // handles URL encoded bodies to JSON
  app.use(bodyParser.urlencoded({ extended: true }));

  // creating a session
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  return app;
};
