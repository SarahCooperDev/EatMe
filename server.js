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

//origin header = 'http://13.211.135.245' // 'http://'+'localhost'+':4200'
//const appOrigin = arg[2] (after node server.js)
const appOrigin = process.argv[2] || 'localhost';
const HOSTURL = 'http://'+appOrigin+':'+4200;

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
  cookie : {secure: false, maxAge: 60 * 60 * 24, httpOnly: false },
}));

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', HOSTURL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,authorization,rbr");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
  User.findOne().where('_id', userId).exec(function (err, user) {
    done(err, user);
   });
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

var friends = require('./routes/friends.routes');
var menus = require('./routes/menu.routes');
var archives = require('./routes/archive.routes');
var users = require('./routes/user.routes');

app.use('/api/friends', friends);
app.use('/api/menu', menus);
app.use('/api/archive', archives);
app.use('/api/user', users);

app.listen(8080, function(){
  console.log('Example app listening on port 8080!');
});
