/**
 * Sets up routing for actions related to a users own images
 */

// Imports required libraries and classes
const Router = require('express');
const multer = require('multer');
const path = require('path');
const ArchiveController = require('../controllers/archive.controller');

// Sets directory for uploaded images to be saved in
const DIR = './uploads';

// Configures the location for the image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + ' - ' + file.originalname + '-' + Date.now() + '.' + path.extname(file.originalname));
  }
});

// Creates image upload function call
const upload = multer({storage: storage});

const router = new Router();

// Sets urls endings that begin with /api/archive
router.route('/eatenDishes').get(ArchiveController.getEatenDishes);
router.route('/upload').post(upload.single('dish'), ArchiveController.upload);

module.exports = router; 