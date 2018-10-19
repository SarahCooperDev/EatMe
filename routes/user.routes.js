/**
 * Sets up routing for actions related to a user
 */

// Import required libraries and classes
const Router = require('express');
const UserController = require('../controllers/user.controller');

const router = new Router();

// Sets urls endings that begin with /api/user
router.route('/logout').get(UserController.logout);
router.route('/authenticate').post(UserController.authenticate);
router.route('/login').post(UserController.login);
router.route('/register').post(UserController.register);

module.exports = router; 