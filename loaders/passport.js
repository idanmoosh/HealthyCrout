const passport = require('passport');
const LocalStrategy = require('passport-local');

const AuthServiceInstance = require('../services/authService');

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  //serialization and deserialization
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  // local strategy - email and password
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await AuthServiceInstance.login({
          email: username,
          password,
        });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  return passport;
};
