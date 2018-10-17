var Router = require('express');
var FriendController = require('../controllers/friends.controller');

const router = new Router();
router.route('/getFriends').get(FriendController.getFriends);
router.route('/addFriend').post(FriendController.addFriend);
router.route('/friendsdishes').get(FriendController.getFriendsDishes);

module.exports = router; 