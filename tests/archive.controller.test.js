const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;
const app = require('../server.js');
const user = require('../models/user.js');

chai.should()
chai.use(chaihttp)
