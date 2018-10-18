var Router = require('express');
var UserController = require('../controllers/user.controller');

const router = new Router();
router.route('/logout').get(UserController.logout);
router.route('/authenticate').post(UserController.authenticate);
router.route('/login').post(UserController.login);
router.route('/register').post(UserController.register);
router.route('/update').post(UserController.update);

module.exports = router; 