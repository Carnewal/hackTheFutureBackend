var express = require('express');
var passport = require('passport');
var router = express.Router();

var Model = require('../models/Models.js');



/**
 * @api {post} /api/register User Local Registration
 * @apiName PostRegister
 * @apiGroup Connect
 *
 * @apiParam {String} email Users Email Address
 * @apiParam {String} password Users Plain-Text Password
 * @apiParam {String} firstname Users First Name
 * @apiParam {String} lastname Users Last Name
 * @apiParam {String} gender Users Gender
 * @apiParam {String} birthday Users Gender
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": [GENERATED JWT TOKEN]
 *     }
 *
 *
 */
router.post('/register', function(req, res, next) {
  if (!req.body.username || !req.body.firstname || !req.body.lastname || !req.body.password) {
    return res.status(400).json({
      translate: 'incompleteData',
      message: 'Please fill in all the fields!'
    });
  }
  Model.User.findAll({
    where:{
      username: req.body.username
    }}).then(function(user) {
    if ((user) && (user.length > 0)) {
      return res.status(400).json({
        translate: 'userExists',
        message: 'The given username is already in use!'
      });
    }
    Model.User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      username: req.body.username
    }).then(function(usr) {
      return res.status(201).json({token: usr.generateJWT()});
    }).catch(function(error) {
      return res.status(400).json({
        translate: 'registerFailed',
        message: 'Failed to register, please try again!'
      });
    });
  });
});


/**
 * @api {post} /api/login User Local Login
 * @apiName PostLogin
 * @apiGroup Connect
 *
 * @apiParam {String} email Users email
 * @apiParam {String} password Users pass
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": [GENERATED JWT TOKEN]
 *     }
 *
 *  @apiFailedExample Failed-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "translate": [translation code],
 *       "message": [error message]
 *     }
 */
router.post('/login', function(req, res, next) {
  if ((!req.body.username) || (!req.body.password)) {
    return res.status(401).json({
      translate: 'loginFailed',
      message: 'Failed to login, check username and password!'
    });
  }
  passport.authenticate('local', function(err, user, info) {
    if (err) {return next(err);}
    if (user) {
      return res.status(202).json({token: user.generateJWT()});
    } else {
      return res.status(401).json({
        translate: 'loginFailed',
        message: 'Failed to login, check username and password!'
      });
    }
  })(req, res, next);
});

module.exports = router;
