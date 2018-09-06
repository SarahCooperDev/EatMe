var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require("mongoose");
var bcrypt = require("bcrypt");
const User = require('./models/User');

var db = mongo.connect("mongodb://localhost:27017/eatmedb", function(err, response){
    if(err){
        console.log(err);
    } else {
        console.log("Connected to " + db, ' + ', response);
    }
});

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,authorization,rbr");
    res.setHeader('Access-Control-Allow-Credentials', true);       
    next();
});

// Set the user schema for mongodb
//var model = User;

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
                    res.send(err);
                } else {
                    res.send({data: "Record has been inserted.."});
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

app.post("/api/login", function(req, res){
    var model = User;
    model.findOne({username: req.body.user.username}).exec((err, data) =>{
        console.log("Hit body of login");
        if(err){
            res.send(err);
        } else {
            bcrypt.compare(req.body.user.password, data.password, function(err, result){
                if(result){
                    console.log("Result is " + result);
                    res.send({'data':data, 'status': 200});
                } else {
                    res.send({'status': 401});
                }
            })
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

app.listen(8080, function(){
    console.log('Example app listening on port 8080!');
});
