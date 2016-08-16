'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Userbook = new Schema({
    image: String
    , ownerId: String
    , bookId: String
    , title: String
    , image: String
});

module.exports = mongoose.model('Userbook', Userbook);