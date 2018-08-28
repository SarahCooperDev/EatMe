var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require("mongoose");
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
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
    res.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,authorization,rbr");
    res.setHeader('Access-Control-Allow-Credentials', true);       
    next();
});

var model = User;

app.post('/api/saveuser', function(req, res){
    console.log("Request");
    console.log(req);
    var mod = new model(req.body.user);
    console.log(req.body.mode);
    if(req.body.mode == "SAVE"){
        console.log("In Save");
        mod.save(function(err, data){
            if(err){
                res.send(err);
            } else {
                res.send({data: "Record has been inserted.."});
            }
        });
    } else {
        console.log("In update");
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

app.post("/api/deleteUser", function(req, res){
    model.remove({_id: req.body.id}, function(err){
        if(err){
            res.send(err);
        } else {
            res.send({data: "Record has been deleted.."});
        }
    })
});

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
