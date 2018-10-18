/**
 * Performs server-side actions related to the user
 */

// Import required models and libraries
const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt');

/**
 * Logs user out, removing credentials from users request object
 * 
 * @param {HTTP request object} req 
 * @param {HTTP response object} res 
 */
exports.logout = (req, res) => {
  req.logout();
  res.send({status: 200});
}

/**
 * Checks that a request has credentials attached
 * 
 * @param {HTTP request object} req 
 * @param {HTTP response object} res 
 */
exports.authenticate = (req, res) => {
  if (req.user) {
      res.send({status: 200, username: req.user.username});
  } else {
      res.send({status: 501});
  }
}

/**
 * Logs a user in, creating a session object and credentials
 * 
 * @param {HTTP request object} req 
 * @param {HTTP response object} res 
 */
exports.login = (req, res) => {
  // Calls local strategy defined in server.js
  passport.authenticate('local', function(status, user){
    // Local strategy has failed
    if (status === 'Internal error') {
      return res.send({status: 500, errorMsg: status});
    } else if (status === 'Username not found' || status === 'Password incorrect') {
      return res.send({status: 404, errorMsg: status});
    }

    // Generate credentials with passport
    req.login(user, function(err){
      if (err) {
        return res.send({status: 500, errorMsg: 'Error with user serialization'});
      } else {
        req.session.save(function(){
          return res.send({'status': 200});
        });
      }
    });
  })(req, res);
}

exports.register = (req, res) => {
  User.findOne({username: req.body.user.username}).exec((err, user) =>{
    if(err){
      return res.send({'status': 500, 'errorMsg': "Internal Server Error"});
    } else if(user){
      return res.send({'status': 501, 'errorMsg': "User with this username already exists!"});
    } else{
      bcrypt.hash(req.body.user.password, 10, function(err, hash){
        req.body.user.password = hash;
        var newUser = new User(req.body.user);

        newUser.save(function(err, data){
          if(err){
            res.send({'status': 500, 'errorMsg': "Internal Server Error"});
          } else {
            passport.authenticate('local', function(status, user){
              req.login(data, function(err){
                if(err){
                  return res.send({'status': 502, 'errorMsg': "Error creating session"})
                }
                req.session.save(function(){
                  res.send({'status': 200});
                });
              });
            })(req, res);
          }
        });
      })
    }
  });
}

exports.update = (req, res) => {
  console.log("updating user");
  console.log(req.user);
  bcrypt.hash(req.body.newPassword, 10, function(err, hash) {
    req.body.newPassword = hash;
    User.updateOne({username: req.user.username}, {$set:{password: req.newPassword}}, function(err, res){
      if(err) console.log(err);
      console.log("user updated");
      return res.send({status: 200});
    });
  });
}