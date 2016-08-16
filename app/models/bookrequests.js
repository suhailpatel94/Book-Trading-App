'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bookrequests = new Schema({

    title: String
    , ownerId: String
    , requestorId: String
    , bookId: String
});

module.exports = mongoose.model('Bookrequests', Bookrequests);