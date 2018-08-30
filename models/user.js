const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    email: {type: String},
    password: {type: String},
    username: {type: String},
}, {versionKey: false});

module.exports = mongoose.model('User', UsersSchema);


