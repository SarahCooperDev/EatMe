const User = require('../models/user');

exports.addToMenu = (req, res) => {
    User.findOne({username: req.user.username}).exec((err, user) =>{
        if(err){
          return res.send({status: '500', 'errorMsg': "Internal Server Error"});
        } else if(!user){
          return res.send({status: '401', 'errorMsg': "Session error!"});
        } else {
          var newDish = {path: req.body.dish.path, dateAdded: Date.now(), location: req.body.dish.location, name: req.body.dish.name};
          user.menu.push(newDish);
          user.save();
    
          return res.send({status: '200'});
        }
    });
}

exports.getMenu = (req, res) => {
    User.findOne({username: req.user.username}).exec((err, user) =>{
        if(err){
          return res.send({status: '500', 'errorMsg': "Internal Server Error"});
        } else if(!user){
          return res.send({status: '401', 'errorMsg': "Session error!"});
        } else {
          console.log("User is " + user);
          return res.send({status: '200', menu: user.menu.reverse()});
        }
    });
}