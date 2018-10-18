/**
 * Performs server-side actions related to the users images
 */

// Import required models and libraries
const User = require('../models/user');
const multer = require('multer');

// Configuration for image 
const DIR = './uploads';
//const DIR = '/var/www/html/uploads';

// Configures the location for the image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.fieldname + ' - ' + file.originalname + '-' + Date.now() + '.' + path.extname(file.originalname));
  }
});

// Creates image upload function call
const upload = multer({storage: storage});

/**
 * Method for retrieving all images a user has uploaded
 * 
 * @param {HTTP request object} req 
 * @param {HTTP response object} res 
 */
exports.getEatenDishes = (req, res) => {
  User.findOne({username: req.user.username}).exec((err, user) =>{
    if (err) {
      return res.send({status: '500', 'errorMsg': "Internal Server Error"});
    } else if (!user) {
      return res.send({status: '501', 'errorMsg': "User not found!"});
    } else {
      return res.send({status: '200', images: user.images.reverse()});
    }
  });
}

/**
 * Method for user uploading an image (image uploaded as middleware in
 * archive.routes.js)
 * 
 * @param {HTTP request object} req 
 * @param {HTTP response object} res 
 */
exports.upload = (req, res) => {
  User.findOne({username: req.user.username}).exec((err, user) =>{
    if (err) {
      return res.send({status: '500', 'errorMsg': "Internal Server Error"});
    } else if (!user) {
      return res.send({status: '501', 'errorMsg': "User not found!"});
    } else {
      var newImage = {path: req.file.filename, dateAdded: Date.now(), location: req.body.location, name: req.body.name};
      user.images.push(newImage);
      user.save();

      return res.send({status: '200'});
    }
  });
}