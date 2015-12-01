var connection = require('../config/sequelize.js');

/**
 * Get the metadata from the models
 */
var UserMeta = require('./User.js');



/**
 * Models aanmaken
 */
var User = connection.define('User', UserMeta.attributes, UserMeta.options);


/**
 * Build the database
 */
connection.sync({force: true})
  .then(function() {
    User.create({
      username: 'zeus',
      firstname: 'Zeus',
      lastname: 'Hack The Future',
      password: 'htf2015'
    });
  });

module.exports.User = User;
