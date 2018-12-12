'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

var UserSchema = Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    image: String,
    role: String
    }, {
        versionKey: false
    });

module.exports = mongoose.model('User', UserSchema);


