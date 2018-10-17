const User = require('../models/user');

exports.getFriends = (req, res)=>{
    User.findOne({username: req.user.username}).exec((err, user) =>{
      if(err){
        return res.send({status: '500', 'errorMsg': "Internal Server Error"});
      } else if(!user){
        return res.send({status: '401', 'errorMsg': "Session error!"});
      } else {
        return res.send({status: '200', friends: user.friends.reverse()});
      }
    });
  }

exports.addFriend = (req, res) => {
    User.findOne({username: req.user.username}).exec((err, user) =>{
        if(err){
          return res.send({status: '500', 'errorMsg': "Internal Server Error"});
        } else if(!user){
          return res.send({status: '401', 'errorMsg': "Session error!"});
        } else {
          User.findOne({username: req.body.searched}).exec((err, friend) =>{
            if(err){
              return res.send({status: '500', 'errorMsg': "Internal Server Error"});
            } else if(!friend){
              return res.send({status: '404', 'errorMsg': "Searched username not found!"});
            } else {
              var isFriended = user.friends.find(function(f){
                return f.username == friend.username;
              });
    
              if(isFriended){
                return res.send({status: '404', 'errorMsg': "Your already added this friend"});
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

exports.getFriendsDishes = (req, res) => {
    User.findOne({username: req.user.username}).exec((err, user) =>{
        if(err){
          return res.send({status: '500', 'errorMsg': "Internal Server Error"});
        } else if(!user){
          return res.send({status: '401', 'errorMsg': "Session error!"});
        } else {
          User.find({'_id': {$in: user.friends}}, function(err, friends){
            if(err){
              return res.send({status: '500', 'errorMsg': "Internal Server Error"});
            } else if(!friends){
              return res.send({status: '401', 'errorMsg': "Error retrieving friends!"});
            } else {
              var dishes = [];
    
              friends.forEach(friend => {
                friend.images.forEach(image => {
                  dishes.push(image);
                })
              });
    
              dishes.sort(function(a, b){return a.dateAdded - b.dateAdded});
              return res.send({status: '200', dishes: dishes.reverse()});
            }
          });
        }
    });
}