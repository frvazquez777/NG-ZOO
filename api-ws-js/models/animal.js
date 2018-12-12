'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

var AnimalSchema = Schema({
    name: String,
    description: String,
    year: Number,
    image: String,
    user: { type: Schema.ObjectId, ref: 'User' }
    }, {
        versionKey: false
    });

module.exports = mongoose.model('Animal', AnimalSchema);
