var Router = require('express');
var MenuController = require('../controllers/menu.controller');

const router = new Router();
router.route('/addToMenu').post(MenuController.addToMenu);
router.route('/getMenu').get(MenuController.getMenu);

module.exports = router; 
