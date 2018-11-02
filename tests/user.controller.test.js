const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../server.js');
const User = require('../models/user.js');
var request = require('supertest');
require("./archive.controller.test.js");


chai.should();
chai.use(chaihttp);

const userCredentials = {
    email: "admin-test@gmail.com",
    password: "adminpass"
}

var authenticatedUser = request.agent(app);

before(function(done){
    this.timeout(15000);

    console.log("Before...");
    User.findOne({username: "admintest"}).exec((err, user) => {
        if(user){
            console.log("Deleting in before" + user.username);
            user.remove();
            done();
        } else {
            done();
        }
    });
});

after(function(done){
    this.timeout(15000);

    console.log("After...");
    User.findOne({username: "admintest"}).exec((err, user) => {
        console.log("Deleting in user after " + user.username);
        user.remove();
        done();
    });
});

describe('Check register functionality', function(){
    this.timeout(15000);

    it('register if user doesn\'t exist', function(){
        return chai.request(app)
        .post('/api/user/register')
        .send({
            user: {
                email: "admin-test@gmail.com",
                username: "admintest",
                password: "adminpass",
                country: "Australia",
                dateJoined: Date.now
            }
        }).then(res => {
            res.body.status.should.equal(200);
        })
    })

    it('doesn\'t register user if username already exists', function(){
        return chai.request(app)
        .post('/api/user/register')
        .send({
            user: {
                email: "admin-test@gmail.com",
                username: "admintest",
                password: "adminpass",
                country: "Australia",
                dateJoined: Date.now
            }
        }).then(res => {
            res.body.status.should.equal(501);
        })
    })
});

describe('Check login functionality', function(){
    this.timeout(15000);

    it('login if user credentials are right', function(){
        return authenticatedUser
        .post('/api/user/login')
        .send({
            username:"admintest",
            password: "adminpass"
        }).then(res => {
            res.body.status.should.equal(200);
        })
    })

    it('don\'t login if user password not right', function(){
        return chai.request(app)
        .post('/api/user/login')
        .send({
            username:"admintest",
            password: "wrongpass"
        }).then(res => {
            res.body.status.should.equal(404);
        })
    })

    it('don\'t login if credentials don\'t match existing user', function(){
        return chai.request(app)
        .post('/api/user/login')
        .send({
            username:"fryufhrailblaifawe",
            password: "fhuealifbeawlfefauwilfbeaw"
        }).then(res => {
            res.body.status.should.equal(404);
        })
    })
});

describe('Check authenticate functionality', function(){
    this.timeout(15000);

    it('authenticate if credentials on request', function(){
        return authenticatedUser
        .post('/api/user/authenticate')
        .send({}).then(res => {
            res.body.status.should.equal(200);
        })
    })

    it('fail authentication without user credentials', function(){
        return chai.request(app)
        .post('/api/user/authenticate')
        .send({}).then(res => {
            res.body.status.should.equal(501);
        })
    })
});

describe('Check logout functionality', function(){
    this.timeout(15000);

    it('logout user', function(){
        return authenticatedUser
        .get('/api/user/logout')
        .send().then(res => {
            res.body.status.should.equal(200);

            return chai.request(app)
            .post('/api/user/authenticate')
            .send({}).then(res => {
                res.body.status.should.equal(501);
            })
        })
    })

});