/*
 * Stores the user data in a schema, for MongoDB to use
 */

const mongoose = require('mongoose');


var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    email: {type: String},
    password: {type: String},
    username: {type: String},
    dateJoined: {type: Date},
    country: {type: String},
    images: [{path: String, dateAdded: Date, location: String, name: String}],
    friends: [{username: String}],
    menu: [{path: String, dateAdded: Date, location: String, name: String}]
}, {versionKey: false});

module.exports = mongoose.model('User', UsersSchema);


