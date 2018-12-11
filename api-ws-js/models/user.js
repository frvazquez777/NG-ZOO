'use strict'

var mongoose = require('moongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    lastname:  String,
    email:  String,
    password:  String,
    role:  String
});

module.exports = mongoose.model('User', UserSchema);
