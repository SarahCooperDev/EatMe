/**
 * Sets up routing for actions related to a users menu/likes images
 */

// Import required libraries and classes
const Router = require('express');
const MenuController = require('../controllers/menu.controller');

const router = new Router();

// Sets urls endings that begin with /api/menu
router.route('/addToMenu').post(MenuController.addToMenu);
router.route('/getMenu').get(MenuController.getMenu);

module.exports = router; 
