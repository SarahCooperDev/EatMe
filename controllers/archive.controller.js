/**
 * Performs server-side actions related to the users images
 */

// Import required models
const User = require('../models/user');

/**
 * Method for retrieving all images a user has uploaded
 * 
 * @param {HTTP request object} req 
 * @param {HTTP response object} res 
 */
exports.getEatenDishes = (req, res) => {
  if(!req.user){
    return res.send({status: 501, errorMsg: 'User not logged in!'});
  }
  User.findOne({username: req.user.username}).exec((err, user) =>{
    if (err) {
      return res.send({status: 500, errorMsg: 'Internal Server Error'});
    } else if (!user) {
      return res.send({status: 501, errorMsg: 'User not found!'});
    } else {
      return res.send({status: 200, images: user.images.reverse()});
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
  if(!req.user){
    return res.send({status: 501, errorMsg: 'User not logged in!'});
  } else if(!req.file){
    return res.send({status: 401, errorMsg: 'Image not attached!'});
  }
  User.findOne({username: req.user.username}).exec((err, user) =>{
    if (err) {
      return res.send({status: 500, errorMsg: 'Internal Server Error'});
    } else if (!user) {
      return res.send({status: 501, errorMsg: 'User not found!'});
    } else {
      var newImage = {path: req.file.filename, dateAdded: Date.now(), location: req.body.location, name: req.body.name};
      user.images.push(newImage);
      user.save();

      return res.send({status: 200});
    }
  });
}