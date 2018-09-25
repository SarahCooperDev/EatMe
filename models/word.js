const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WordsSchema = new Schema({
    word: {type: String},
}, {versionKey: false});

module.exports = mongoose.model('Word', WordsSchema);