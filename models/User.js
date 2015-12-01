var Sequelize = require('sequelize');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var _SECRET = process.env.JWT_SECRET;
var _EXP_TIME = process.env.EXPERATION_LOGIN;

var attributes = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING
  },
  firstname: {
    type: Sequelize.STRING
  },
  lastname: {
    type: Sequelize.STRING
  },
  hash: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  coins: {
    type: Sequelize.BIGINT,
    notNull: true,
    defaultValue: 0
  }
};

var options = {
  paranoid: true,
  freezeTableName: true,
  tableName: 'User',
  instanceMethods: {
    toJSON: function() {
      var me = this.get();
      delete me.hash;
      delete me.salt;
      return me;
    },

    validPassword: function(pass) {
      var h4sh = crypto.pbkdf2Sync(pass, this.getDataValue('salt'), 1000, 64).toString('hex');
      return this.hash === h4sh;
    },

    generateJWT: function() {
      var today = new Date();
      var exp = new Date(today);
      exp.setDate(today.getDate() + _EXP_TIME);
      return jwt.sign({
                id: this.id,
                username: this.username,
                exp: parseInt(exp.getTime() / 1000)
            }, _SECRET);
    }
  },
  setterMethods: {
    password: function(pass) {
      this.setDataValue('salt', crypto.randomBytes(16).toString('hex'));
      this.setDataValue('hash', crypto.pbkdf2Sync(pass, this.getDataValue('salt'), 1000, 64).toString('hex'));
    }
  }
};

module.exports.attributes = attributes;
module.exports.options = options;

