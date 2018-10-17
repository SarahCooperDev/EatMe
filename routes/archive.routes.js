var Router = require('express');
var ArchiveController = require('../controllers/archive.controller');
const multer = require('multer');

var path = require('path');

const DIR = './uploads';
//const DIR = '/var/www/html/uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.fieldname + ' - ' + file.originalname + '-' + Date.now() + '.' + path.extname(file.originalname));
  }
});
let upload = multer({storage: storage});

const router = new Router();
router.route('/eatenDishes').get(ArchiveController.getEatenDishes);
router.route('/upload').post(upload.single('dish'), ArchiveController.upload);

module.exports = router; 