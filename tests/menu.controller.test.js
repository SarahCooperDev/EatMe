const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../server.js');
const User = require('../models/user.js');
var request = require('supertest');
require("./user.controller.test.js");
require("./archive.controller.test.js");
require("./friend.controller.test.js");

chai.should();
chai.use(chaihttp);

const userCredentials = {
    email: "admin-test@gmail.com",
    password: "adminpass"
}

var authenticatedUser = request.agent(app);

describe('Check add friend dish functionality', function(){
    this.timeout(15000);

    it('login for menu', function(){
        return authenticatedUser
        .post('/api/user/login')
        .send({
            username:"admintestfriend",
            password: "adminpass"
        }).then(res => {
            res.body.status.should.equal(200);
        })
    })

    it('add dish to menu if user exists', function(){
        return authenticatedUser
        .get('/api/friends/friendsdishes')
        .send({
        }).then(res => {
            return authenticatedUser
            .post('/api/menu/addToMenu')
            .send({
                dish: {
                    path: res.body.dishes[0].path,
                    location: res.body.dishes[0].location,
                    name: res.body.dishes[0].name
                }
            }).then(response => {                
                response.body.status.should.equal(200);
            })
        })
    })

    it('don\'t add dish to menu if user doesn\'t exists', function(){
        return authenticatedUser
        .get('/api/friends/friendsdishes')
        .send({
        }).then(res => {
            return chai.request(app)
            .post('/api/menu/addToMenu')
            .send({
                dish: {
                    path: res.body.dishes[0].path,
                    location: res.body.dishes[0].location,
                    name: res.body.dishes[0].name
                }
            }).then(response => {                
                response.body.status.should.equal(501);
            })
        })
    })
});


describe('Check get menu dishes functionality', function(){
    this.timeout(15000);

    it('get menu if user exists', function(){
        return authenticatedUser
        .get('/api/menu/getMenu')
        .send({
        }).then(res => {
            var contains = false;
            if(res.body.menu.some(d => d.location === 'restaurant' && d.name === 'Some cookie' )){
                contains = true;
            }
            res.body.status.should.equal(200);
            contains.should.be.true;
            res.body.menu.length.should.equal(1);
        })
    })

    it('don\'t get menu if user doesn\'t exists', function(){
        return chai.request(app)
        .get('/api/menu/getMenu')
        .send({
        }).then(res => {
            res.body.status.should.equal(501);
        })
    })
});