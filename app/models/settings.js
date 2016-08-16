'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Setting = new Schema({
    userId: String
    , fullname: String
    , state: String
    , city: String
});

module.exports = mongoose.model('Setting', Setting);