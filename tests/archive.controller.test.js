const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../server.js');
const User = require('../models/user.js');
var request = require('supertest');
require("./user.controller.test.js");


chai.should();
chai.use(chaihttp);

const userCredentials = {
    email: "admin-test@gmail.com",
    password: "adminpass"
}

var authenticatedUser = request.agent(app);

describe('Check upload functionality', function(){
    this.timeout(15000);

    it('login for upload', function(){
        return authenticatedUser
        .post('/api/user/login')
        .send({
            username:"admintest",
            password: "adminpass"
        }).then(res => {
            res.body.status.should.equal(200);
        })
    })

    it('upload file', function(){
        return authenticatedUser
        .post('/api/archive/upload')
        .type('form')
        .attach('dish', './tests/Cookie.png', 'A cookie')
        .field({
            location:"restaurant",
            name: "Some cookie"
        }).then(res => {
            res.body.status.should.equal(200);
        })
    })

    it('don\'t upload if not logged in', function(){
        return chai.request(app)
        .post('/api/archive/upload')
        .type('form')
        .attach('dish', './tests/Cookie.png', 'A cookie')
        .field({
            location:"restaurant",
            name: "Some cookie"
        }).then(res => {
            res.body.status.should.equal(501);
        })
    })

    it('don\'t upload file if file not attached', function(){
        return authenticatedUser
        .post('/api/archive/upload')
        .type('form')
        .field({
            location:"restaurant",
            name: "Some cookie"
        }).then(res => {
            res.body.status.should.equal(401);
        })
    })

});



describe('Check get eaten dishes functionality', function(){
    this.timeout(15000);

    it('get users eaten dishes', function(){
        return authenticatedUser
        .get('/api/archive/eatenDishes')
        .send({
        }).then(res => {
            res.body.status.should.equal(200);
            res.body.images[0].name.should.equal('Some cookie');
            res.body.images[0].location.should.equal('restaurant');
            res.body.images[0].path.should.match(/(?:A cookie:?)/);
        })
    })

    it('don\'t get eaten dishes if not logged in', function(){
        return chai.request(app)
        .get('/api/archive/eatenDishes')
        .send({
        }).then(res => {
            res.body.status.should.equal(501);
        })
    })

});