var _DB_NAME = process.env.DB_NAME;
var _DB_USER = process.env.DB_USER;
var _DB_PASSWORD = process.env.DB_PASSWORD;
var _DB_HOST = process.env.DB_HOST;
var _DB_PORT = process.env.DB_PORT;


var Sequelize = require('sequelize');
var settings = {
  host: _DB_HOST,
  port: _DB_PORT,
  dialect: 'mysql',
  logging: false
};

var sequelize = new Sequelize(_DB_NAME, _DB_USER, _DB_PASSWORD, settings);

module.exports = sequelize;