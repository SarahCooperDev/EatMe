/**
 * Performs server-side actions related to the users friends
 */

// Import required models
const User = require('../models/user');
var {performance} = require('perf_hooks')

/**
 * Retrieves all of a users friends
 * 
 * @param {HTTP request object} req 
 * @param {HTTP response object} res 
 */
exports.getFriends = (req, res)=>{
  User.findOne({username: req.user.username}).exec((err, user) =>{
    if (err) {
      return res.send({status: '500', 'errorMsg': "Internal Server Error"});
    } else if (!user) {
      return res.send({status: '401', 'errorMsg': "Session error!"});
    } else {
      return res.send({status: '200', friends: user.friends.reverse()});
    }
  });
}

/**
 * Adds an existing user to another users friend list
 * 
 * @param {HTTP request object} req 
 * @param {HTTP response object} res 
 */
exports.addFriend = (req, res) => {
  // Get current user
  User.findOne({username: req.user.username}).exec((err, user) =>{
    if (err) {
      return res.send({status: '500', 'errorMsg': "Internal Server Error"});
    } else if (!user) {
      return res.send({status: '401', 'errorMsg': "Session error!"});
    } else {
      // Get person user is trying to friend
      User.findOne({username: req.body.searched}).exec((err, friend) =>{
        if (err) {
          return res.send({status: '500', 'errorMsg': "Internal Server Error"});
        } else if (!friend) {
          return res.send({status: '404', 'errorMsg': "Searched username not found!"});
        } else {
          // Check is person being friended is already friended
          var isFriended = user.friends.find(function(f){
            return f.username == friend.username;
          });

          // Add friend only if not already friended
          if (isFriended) {
            return res.send({status: '404', 'errorMsg': "You've already added this friend!"});
          } else {
            var friName = {_id: friend._id, username: friend.username};
            user.friends.push(friName);
            user.save();

            return res.send({status: '200', friends: user.friends.reverse()});
          }
        }
      });
    }
  });
}

/**
 * Iterates through all of a users friends, retrieves them from database,
 * then returns their images
 * 
 * @param {HTTP request object} req 
 * @param {HTTP response object} res 
 */
exports.getFriendsDishes = (req, res) => {
  var start = performance.now();
  console.log("Performance " + start);
  // Get current user
  User.findOne({username: req.user.username}).exec((err, user) =>{
    if (err) {
      return res.send({status: '500', 'errorMsg': "Internal Server Error"});
    } else if (!user) {
      return res.send({status: '401', 'errorMsg': "Session error!"});
    } else {
      // Get current users friends as database objects
      User.find({'_id': {$in: user.friends}}, function(err, friends){
        if(err){
          return res.send({status: '500', 'errorMsg': "Internal Server Error"});
        } else if(!friends){
          return res.send({status: '401', 'errorMsg': "Error retrieving friends!"});
        } else {
          var dishes = [];

          friends.forEach(friend => {
            //friend.images.forEach(image => {
              //dishes.push(image);
            //})
            dishes = dishes.concat(friend.images);
          });
          
          dishes.sort(function(a, b){return a.dateAdded - b.dateAdded});
          var now = performance.now() - start;
          console.log("To " + now);
          return res.send({status: '200', dishes: dishes.reverse()});
        }
      });
      /*User.aggregate([{$project: {a: '$user.images'}}, {$unwind: '$a'}, {$group: {images: 'a', res:{$addToSet: '$a'}}}], function(err, images){
        console.log("In aggregate");
        console.log(images);
        var dishes = [];
        return res.send({status: '200', dishes: dishes});
      });*/
    }
  });
}