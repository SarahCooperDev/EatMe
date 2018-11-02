const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../server.js');
const User = require('../models/user.js');
var request = require('supertest');
require("./user.controller.test.js");
require("./archive.controller.test.js");


chai.should();
chai.use(chaihttp);

const userCredentials = {
    email: "admin-test@gmail.com",
    password: "adminpass"
}

var authenticatedUser = request.agent(app);

after(function(done){
    this.timeout(15000);

    console.log("After...");
    User.findOne({username: "admintestfriend"}).exec((err, user) => {
        console.log("Deleting in friend after " + user.username);
        user.remove();
        done();
    });
});

describe('Check add friend functionality', function(){
    this.timeout(15000);

    it('register for friend test exist', function(){
        return authenticatedUser
        .post('/api/user/register')
        .send({
            user: {
                email: "admin-test-friend@gmail.com",
                username: "admintestfriend",
                password: "adminpass",
                country: "Australia",
                dateJoined: Date.now
            }
        }).then(res => {
            res.body.status.should.equal(200);
        })
    })

    it('add friend if friend user exists', function(){
        return authenticatedUser
        .post('/api/friends/addFriend')
        .send({
            searched: 'admintest'
        }).then(res => {
            var contains = false;
            if(res.body.friends.some(f => f.username === 'admintest')){
                contains = true;
            }
            res.body.status.should.equal(200);
            contains.should.be.true;
        })
    })

    it('don\'t add friend if user not logged in', function(){
        return chai.request(app)
        .post('/api/friends/addFriend')
        .send({
            searched: 'admintest'
        }).then(res => {
            res.body.status.should.equal(501);
        })
    })

    it('don\'t add friend if friend doesn\'t exist', function(){
        return authenticatedUser
        .post('/api/friends/addFriend')
        .send({
            searched: 'vnjrhgbreivaubiqureanraugnrivanuain'
        }).then(res => {
            res.body.status.should.equal(404);
        })
    })

    it('don\'t add friend if friend already friended', function(){
        return authenticatedUser
        .post('/api/friends/addFriend')
        .send({
            searched: 'admintest'
        }).then(res => {
            res.body.status.should.equal(404);
        })
    })
});


describe('Check get friends functionality', function(){
    this.timeout(15000);

    it('get friends if user exists', function(){
        return authenticatedUser
        .get('/api/friends/getFriends')
        .send({
        }).then(res => {
            var contains = false;
            if(res.body.friends.some(f => f.username === 'admintest')){
                contains = true;
            }
            res.body.status.should.equal(200);
            contains.should.be.true;
            res.body.friends.length.should.equal(1);
        })
    })

    it('don\'t get friends if user not logged in', function(){
        return chai.request(app)
        .get('/api/friends/getFriends')
        .send({
        }).then(res => {
            res.body.status.should.equal(501);
        })
    })
});

describe('Check get friends dishes functionality', function(){
    this.timeout(15000);

    it('get friends dishes if user exists', function(){
        return authenticatedUser
        .get('/api/friends/friendsdishes')
        .send({
        }).then(res => {
            console.log(res.body.dishes);
            var contains = false;
            if(res.body.dishes.some(d => d.location === 'restaurant' && d.name === 'Some cookie' )){
                contains = true;
            }
            res.body.status.should.equal(200);
            contains.should.be.true;
            res.body.dishes.length.should.equal(1);
        })
    })

    it('don\'t get friends dishes if user not logged in', function(){
        return chai.request(app)
        .get('/api/friends/friendsdishes')
        .send({
        }).then(res => {
            res.body.status.should.equal(501);
        })
    })
});