var Model = require('../models/Models.js');

module.exports = function(req, res, next) {
  if ((req.payload) && (req.payload.id)) {
    Model.User.findOne({where:{id: req.payload.id}}).then(function(user) {
      if (user) {
        req.user = user;
      }
      return next();
    }).catch(function(err) {
      return next(err);
    });
  } else {
    return res.status(401).json({
      translate: 'unauthorized',
      message: 'You are not authorized for this action, please login!'
    });
  }
};