/**
 * Central server file, applies configurations 
 * (particularly passport and routing) and starts app
 * 
 * ./controllers contains actions for api calls
 * ./routes contains routing to link URL's to controller actions
 * ./sessions contains non-expired user sessions
 * ./src contains front-end code
 * ./uploads contains uploaded user images
 */

// Import classes and libraries
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const mongo = require("mongoose");
const bcrypt = require("bcrypt");
const User = require('./models/user');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
const FileStore = require('session-file-store')(session);

// Configuration for local versus deployment
const appOrigin = process.argv[2] || 'localhost';
const HOSTURL = 'http://'+appOrigin+':'+4200;

// Setup remote database connection
var uri = "mongodb+srv://ImmerSie:atlascomp1!@eatme-q3a6r.mongodb.net/test?retryWrites=true";
var db = mongo.connect(uri, { useNewUrlParser: true },function(err, response){
  if(err){
    console.log(err);
  } else {
    console.log("Connected to " + uri);
  }
});

// App container
var app = express();

// Apply relevant libaries
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up session configuration for PassportJS to use
app.use(session({
  secret: 'blackquartz',
  saveUninitialized: true,
  store: new FileStore(),
  resave: false,
  cookie : {secure: false, maxAge: 1000 * 60 * 60 * 24, httpOnly: false },
}));

// Set up header variables to allow calls from client side
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', HOSTURL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,authorization,rbr");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Add passport capabilities to app
app.use(passport.initialize());
app.use(passport.session());

// Configure serialization process for passport
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

// Configure deserialization process for passport
passport.deserializeUser(function(userId, done) {
  User.findOne().where('_id', userId).exec(function (err, user) {
    done(err, user);
   });
});

// Define local strategy, which passport uses to authenticate a user
passport.use(new LocalStrategy(function(username, password, done){
  User.findOne({username: username}).exec((err, user) =>{
    if(err){
      return done('Internal error');
    } else if(!user){
      return done('Username not found');
    } else {
      bcrypt.compare(password, user.password, function(err, result){
        if(result){
          return done(null, user);
        } else {
          return done('Password incorrect');
        }
      })
    }
  });
}));

// Import routing files
var friends = require('./routes/friends.routes');
var menus = require('./routes/menu.routes');
var archives = require('./routes/archive.routes');
var users = require('./routes/user.routes');

// Set app routes from imported routing files
app.use('/api/friends', friends);
app.use('/api/menu', menus);
app.use('/api/archive', archives);
app.use('/api/user', users);

// Start app
app.listen(8080, function(){
  console.log('Example app listening on port 8080!');
});

module.exports = app;
