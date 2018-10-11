//import {HOSTURL} from "./src/app/env";

//var HOSTURL = require('./src/app/env');

var express = require('express');
const session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require("mongoose");
var bcrypt = require("bcrypt");
const User = require('./models/user');
const Word = require('./models/word');
const multer = require('multer');
const FileStore = require('session-file-store')(session);

//var uri = "mongodb://ImmerSie:<atlascomp1!>@eatme-shard-00-00-q3a6r.mongodb.net:27017,eatme-shard-00-01-q3a6r.mongodb.net:27017,eatme-shard-00-02-q3a6r.mongodb.net:27017/test?ssl=true&replicaSet=eatme-shard-0&authSource=admin&retryWrites=true";
var uri = "mongodb+srv://ImmerSie:atlascomp1!@eatme-q3a6r.mongodb.net/test?retryWrites=true";
var db = mongo.connect(uri, { useNewUrlParser: true },function(err, response){
  if(err){
    console.log(err);
  } else {
    console.log("Connected to " + uri);
  }
});

var app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');


const LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'blackquartz',
  saveUninitialized: true,
  store: new FileStore(),
  resave: false,
  cookie : {secure: false, maxAge: 864000000, httpOnly: false },
}));

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', 'http://13.211.135.245');
  //res.setHeader('Access-Control-Allow-Origin', 'http://'+'localhost'+':4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,authorization,rbr");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


passport.use(new LocalStrategy(function(username, password, done){
  User.findOne({username: username}).exec((err, user) =>{
    if(err){
      return done("Internal error");
    } else if(!user){
      return done("Username not found");
    } else {
      bcrypt.compare(password, user.password, function(err, result){
        if(result){
          return done(null, user);
        } else {
          return done("Password incorrect");
        }
      })
    }
  });
}));

app.post("/api/login", function(req, res){
  passport.authenticate('local', function(status, user){
    if(status == "Internal error"){
      return res.send({'status': 500, 'errorMsg': status});
    } else if(status == "Username not found" || status == "Password incorrect"){
      return res.send({'status': 404, 'errorMsg': status});
    }

    req.login(user, function(err){
      if(err){
        return res.send({'status': 500, 'errorMsg': "Error with user serialization"});
      } else {
        req.session.save(function(){
          return res.send({'status': 200});
        });
      }
    });
  })(req, res);
});

app.post("/api/authenticate", function(req, res){
  if(req.user){
    res.send({'status': 200, 'username': req.user.username});
  } else {
    res.send({'status': 501});
  }
});

app.get("/logout", function(req, res){
  req.logout();
  res.send({'status': 200});
});

/*
 * Creates and updates a users data in the database
 * 
 * @params
 * '' - url of the route
 * function - callback for route, containing the request and response of the call
 */
app.post('/api/saveuser', function(req, res){
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
});

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

/**
 *
 */
app.post('/api/upload', upload.single('dish'), (req, res) => {
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
});

app.post('/api/eatenDishes', (req, res) => {
  User.findOne({username: req.user.username}).exec((err, user) =>{
    if(err){
      return res.send({status: '500', 'errorMsg': "Internal Server Error"});
    } else if(!user){
      return res.send({status: '501', 'errorMsg': "User not found!"});
    } else {
      return res.send({status: '200', images: user.images.reverse()});
    }
  });
});

/*
 * Deletes a user from the database
 * 
 * @params
 * '' - url of the route
 * function - callback for route, containing the request and response of the call
 */
app.post("/api/deleteUser", function(req, res){
  model.remove({_id: req.body.id}, function(err){
    if(err){
      res.send(err);
    } else {
      res.send({data: "Record has been deleted.."});
    }
  })
});

/*
 * Retrieves all users from the database
 * 
 * @params
 * '' - url of the route
 * function - callback for route, containing the request and response of the call
 */
app.get("/api/getUsers", function(req, res){
  console.log("getting users");
  model.find({}, function(err, data){
    if(err){
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.get("/api/getFriends", function(req, res){
  User.findOne({username: req.user.username}).exec((err, user) =>{
    if(err){
      return res.send({status: '500', 'errorMsg': "Internal Server Error"});
    } else if(!user){
      return res.send({status: '401', 'errorMsg': "Session error!"});
    } else {
      return res.send({status: '200', friends: user.friends.reverse()});
    }
  });
});

app.post("/api/addFriend", function(req, res){
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
});

app.get("/api/friendsdishes", function(req, res){
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
});

app.post("/api/addtomenu", function(req, res){
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
});

app.get("/api/menu", function(req, res){
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
});

app.get("/api/update", function(req, res){
  console.log("updating user");
  bcrypt.hash(req.body.newPassword, 10, function(err, hash) {
    req.body.newPassword = hash;
    User.updateOne({username: req.user.username}, {$set:{password: req.newPassword}}, function(err, res){
      if(err) console.log(err);
      console.log("user updated");
      return res.send({status: 200});
    });
  });
});

app.post("/api/addtomenu", function(req, res){
    console.log("In adding to menu");
    console.log("adding dish " + req.body.dish.path);

    User.findOne({username: req.user.username}).exec((err, user) =>{

        console.log("User is " + user);
        var newDish = {path: req.body.dish.path, dateAdded: Date.now(), location: req.body.dish.location};
        user.menu.push(newDish);
        user.save();

        console.log(user.menu);

       return res.send({status: '200'});
    });
});

app.get("/api/menu", function(req, res){
    console.log("Retrieving menu");

    User.findOne({username: req.user.username}).exec((err, user) =>{
        console.log("User is " + user);
        return res.send({status: '200', menu: user.menu});
    });
})

app.listen(8080, function(){
  console.log('Example app listening on port 8080!');
});
