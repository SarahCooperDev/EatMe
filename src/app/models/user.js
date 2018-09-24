/*
 * Simple model to contain the data that described a user
 */

 'use strict';

 const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    email: {type: String},
    password: {type: String},
    username: {type: String},
    dateJoined: {type: Date},
    country: {type: String},
}, {versionKey: false});

module.exports = mongoose.model('User', UsersSchema);