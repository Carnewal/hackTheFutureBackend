var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/Models.js').User;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({where: {username: username}})
      .then(function(user) {
        if ((!user) || (!user.validPassword(password))) {
          return done(null, false, {
            translate: 'loginFailed',
            message: 'Failed to login, please check username and password'
          });
        }
        return done(null, user);
      }).catch(function(error) {
        return done(null, false, {
          translate: 'loginFailed',
          message: 'Failed to login, please check username and password'
        });
      });
  })
);