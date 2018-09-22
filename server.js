var express = require('express');
const session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require("mongoose");
var bcrypt = require("bcrypt");
const User = require('./models/User');
const Word = require('./models/word');

var db = mongo.connect("mongodb://localhost:27017/eatmedb", function(err, response){
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
    resave: false,
    cookie : {secure: false, maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
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
            return done(err);
        }
        if(!user){
            return done(null, false);
        } else {
            bcrypt.compare(password, user.password, function(err, result){
                if(result){
                    console.log("Result is " + result);
                    return done(null, user);
                } else {
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
        //res.redirect('/dashboard');
    })(req, res);
});

app.post("/api/authenticate", function(req, res){
    console.log("In session Auth====================================================================");
    //console.log(req);
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

/*app.post("/api/login", function(req, res){
    var model = User;
    model.findOne({username: req.body.user.username}).exec((err, data) =>{
        console.log("Hit body of login");
        if(!data){
            res.send({'status': 401, 'errorMsg' : 'User doesn\'t exist!'});
        } else {
            bcrypt.compare(req.body.user.password, data.password, function(err, result){
                if(result){
                    console.log("Result is " + result);
                    res.send({'data':data, 'status': 200});
                } else {
                    res.send({'status': 401, 'errorMsg': 'Password incorrect!'});
                }
            })
        }
    });
});*/

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
app.get("/api/getUser", function(req, res){
    console.log("getting users");
    model.find({}, function(err, data){
        if(err){
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

/*app.post("/api/compare", function(req, res){
    console.log("Getting words");

    /*var word = new Word();
    word.word = "Thurs";
    word.save(function(err, data){
        if(err){
            //res.send(err);
            console.log("Word didn't insert");
        } else {
            console.log("Word was inserted");
            //res.send({data: "Record has been inserted.."});
        }
    });

    Word.findOne({}, function(err, data){
        if(err){
            res.send({'result': 'Error', 'status': 500});
        } 
        if(!data){
            res.send({'result': 'No words in database', 'status': 401});
        }else {
            console.log("Word found");
            console.log(data);
            console.log("Request word is " + req.body.word);
            console.log("Data word is " + data.word);
            //console.log(req);
            
            if(data.word == req.body.word){
                res.send({'result': 'Perfect', 'status': 200});
            } else if(data.word > req.body.word){
                res.send({'result': 'Try Higher!', 'status': 200});
            } else {
                res.send({'result': 'Try Lower!', 'status': 200});
            }
        }
    });
});*/

app.listen(8080, function(){
    console.log('Example app listening on port 8080!');
});
