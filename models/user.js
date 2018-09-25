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
    images: [{path: String, dateAdded: Date}]
}, {versionKey: false});

module.exports = mongoose.model('User', UsersSchema);


