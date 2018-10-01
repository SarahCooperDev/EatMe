var express = require('express');
const session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require("mongoose");
var bcrypt = require("bcrypt");
const User = require('./models/User');
const Word = require('./models/word');
const multer = require('multer');
const FileStore = require('session-file-store')(session);

var uri = "mongodb://ImmerSie:<atlascomp1!>@eatme-shard-00-00-q3a6r.mongodb.net:27017,eatme-shard-00-01-q3a6r.mongodb.net:27017,eatme-shard-00-02-q3a6r.mongodb.net:27017/test?ssl=true&replicaSet=eatme-shard-0&authSource=admin&retryWrites=true";
var uri2 = "mongodb+srv://ImmerSie:atlascomp1!@eatme-q3a6r.mongodb.net/test?retryWrites=true";
var db = mongo.connect(uri2, { useNewUrlParser: true },function(err, response){
    if(err){
        console.log(err);
    } else {
        console.log("Connected to " + db, ' + ', response);
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
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,authorization,rbr");
    res.setHeader('Access-Control-Allow-Credentials', true);       
    next();
});


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log("Serialize user " + user);
    console.log(user);
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        console.log("In deserialize");
        console.log(user);
    done(null, user);
});


passport.use(new LocalStrategy(function(username, password, done){
    console.log("In local strategy");
    User.findOne({username: username}).exec((err, user) =>{
        console.log("Hit body of login");
        if(err){
            console.log("Error is " + err);
            return done(err);
        }
        if(!user){
            console.log("No user found  for " + username);
            return done(null, false);
        } else {
            bcrypt.compare(password, user.password, function(err, result){
                if(result){
                    console.log("Result is " + result);
                    return done(null, user);
                } else {
                    console.log("Password failed for " + user.password);
                    return done(null, false);
                }
            })
        }
    });
}));

app.post("/api/login", function(req, res){
    console.log("BOdy is " + req.body.username + req.body.password);
    passport.authenticate('local', function(status, user){
        req.login(user, function(err){
            console.log("Error in login");
            console.log(err);
            console.log(req.session.id);
            console.log(req.session);
            req.session.save(function(){
                res.send({'status': 200});
            });
        });
    })(req, res);
});

app.post("/api/authenticate", function(req, res){
    console.log("In session Auth====================================================================");
    console.log("Session ");
    console.log(req.session.id);
    console.log(req.session);
    console.log("User ");
    console.log(req.user);

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
    // If individual is a new user, create a new user in database, else
    if(req.body.mode == "SAVE"){
        bcrypt.hash(req.body.user.password, 10, function(err, hash){
            req.body.user.password = hash;
            var mod = new User(req.body.user);

            mod.save(function(err, data){
                if(err){
                    console.log("Error in saving user " + err);
                    res.send(err);
                } else {
                    console.log("User created " + data);
                    passport.authenticate('local', function(status, user){
                        console.log("In authenticate " + data);
                        req.login(data, function(err){
                            console.log("Error in login");
                            console.log(err);
                            console.log(req.session.id);
                            console.log(req.session);
                            req.session.save(function(){
                                res.send({'status': 200});
                            });
                        });
                    })(req, res);
                }
            });
        })
    } else {
        model.findByIdAndUpdate(req.body.id, {email: req.body.email, password: req.body.password, username: req.body.username},
            function(err, data){
                if(err){
                    res.send(err);
                } else {
                    res.send({data: "Record has been updated.."});
                }
            }
        );
    }
});

const DIR = './uploads';
 
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
    console.log("In api/upload server");

    console.log(req.session.id);
    console.log(req.session);

    User.findOne({username: req.user.username}).exec((err, user) =>{
        console.log("User is " + user);
        var newImage = {path: req.file.filename, dateAdded: Date.now()};
        user.images.push(newImage);
        user.save();
        console.log("New user " + user);
        return res.send({status: '200'});
    });
});

app.post('/api/eatenDishes', (req, res) => {
    console.log("In Eaten");
    
    User.findOne({username: req.user.username}).exec((err, user) =>{
        console.log("User is " + user);

        return res.send({status: '200', images: user.images});
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
    console.log("Getting friends");

    User.findOne({username: req.user.username}).exec((err, user) =>{
        console.log("User is " + user);

        return res.send({status: '200', friends: user.friends});
    });
});

app.post("/api/addFriend", function(req, res){
    console.log("Add friend");
    console.log(req.body.searched);

    User.findOne({username: req.user.username}).exec((err, user) =>{
        console.log("User is " + user);

        User.findOne({username: req.body.searched}).exec((err, friend) =>{
            console.log("Friend is " + friend);
            if(!err){
                var friName = {_id: friend._id, username: friend.username};
                user.friends.push(friName);
                user.save();
            }

            console.log("Friends");
            console.log(user);
    
            return res.send({status: '200', friends: user.friends});
        });
    });
});

app.listen(8080, function(){
    console.log('Example app listening on port 8080!');
});
