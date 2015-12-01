var express = require('express');
var router = express.Router();


/**
 * @api {get} /api/user/ current user
 * @apiName GetUser
 * @apiGroup User
 * @apiHeader {String} authorization Authorization header-value. Should be in format "Bearer [TOKEN]".
 *
 * @apiDescription This method returns the current
 * logged in user. It returns a object as described below.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       {
 *         "id": 3,
 *         "username": "zeus",
 *         "firstname": "Zeus",
 *         "lastname": "Hack The Future",
 *         "coins": 0,
 *         "createdAt": "2015-12-01T23:00:27.000Z",
 *         "updatedAt": "2015-12-01T23:00:27.000Z",
 *         "deletedAt": null
 *       }
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "translate": "unauthorized",
 *       "message": [Unauthorized message]
 *     }
 */
router.get('/', function(req, res, next) {
  res.status(200).json(req.user);
});


module.exports = router;

