const User = require('../models/user');
const multer = require('multer');

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

exports.getEatenDishes = (req, res) => {
    console.log("In eaten dishes");
    User.findOne({username: req.user.username}).exec((err, user) =>{
        if(err){
          return res.send({status: '500', 'errorMsg': "Internal Server Error"});
        } else if(!user){
          return res.send({status: '501', 'errorMsg': "User not found!"});
        } else {
          return res.send({status: '200', images: user.images.reverse()});
        }
    });
}

exports.upload = (req, res) => {
    console.log("In upload");
    console.log(req);
    User.findOne({username: req.user.username}).exec((err, user) =>{
        if(err){
          return res.send({status: '500', 'errorMsg': "Internal Server Error"});
        } else if(!user){
          return res.send({status: '501', 'errorMsg': "User not found!"});
        } else {
          var newImage = {path: req.file.filename, dateAdded: Date.now(), location: req.body.location, name: req.body.name};
          user.images.push(newImage);
          user.save();
  
          return res.send({status: '200'});
        }
      });
}