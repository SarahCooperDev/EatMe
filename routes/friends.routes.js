/**
 * Sets up routing for actions related to a users friends
 */

// Imports required libraries and classes
const Router = require('express');
const FriendController = require('../controllers/friends.controller');

const router = new Router();

// Sets urls endings that begin with /api/friends
router.route('/getFriends').get(FriendController.getFriends);
router.route('/addFriend').post(FriendController.addFriend);
router.route('/friendsdishes').get(FriendController.getFriendsDishes);

module.exports = router; 