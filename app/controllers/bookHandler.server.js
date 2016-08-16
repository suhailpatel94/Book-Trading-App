'use strict';

//var Users = require('../models/users.js');
var Books = require('../models/books.js');
var Userbooks = require('../models/userbooks.js');
var Bookrequests = require('../models/bookrequests.js');
var Successtrades = require('../models/successtrades.js');
var Settings = require('../models/settings.js');
var bookData = require('../config/bookdata.js');
var mongoose = require('mongoose');

function BookHandler() {

    this.addBookDb = function (req, res) {

        for (var i = 0; i < bookData.items.length; i++) {
            var title = bookData.items[i].volumeInfo.title;
            var img = bookData.items[i].volumeInfo.imageLinks.thumbnail;

            var newbook = new Books();

            newbook.title = title;
            newbook.image = img;
            newbook.save();
        }
    }


    this.getBooks = function (req, res) {

        Books.find().exec(function (err, result) {
            if (err) throw err;
            res.json(result);
        });

    };

    this.addBook = function (req, res) {
        var bookId = req.body.bookId;

        Books.findById(bookId).exec(function (err, result) {
            console.log(result);

            var userbook = new Userbooks();

            userbook.bookId = bookId;
            userbook.image = result.image;
            userbook.title = result.title;
            userbook.ownerId = req.user;
            userbook.save(function (err, result) {
                if (err) throw err;
                res.json();
            })
        })
    }

    this.deletemyBook = function (req, res) {

        var bookId = req.query.bookId;
        bookId = mongoose.Types.ObjectId(bookId)
        console.log(bookId)
        Userbooks.find({
            '_id': bookId
        }).remove().exec(function (err, result) {
            console.log(result)
            res.json();
        })
    }

    this.getmyBooks = function (req, res) {

        Userbooks.find({
            'ownerId': req.user
        }, {}).exec(function (err, userbooks) {


            res.json(userbooks);

        })




    }

    this.getalluserbooks = function (req, res) {

        Userbooks.find({
            'ownerId': {
                $ne: req.user
            }
        }, {}).exec(function (err, result) {

            res.json(result);

        })


    };

    this.addmyRequest = function (req, res) {

        var requestorId = req.user;
        var ownerId = req.body.ownerId;
        var title = req.body.title;
        var bookId = req.body.bookId;

        var bookrequest = new Bookrequests();

        bookrequest.title = title;
        bookrequest.ownerId = ownerId;
        bookrequest.requestorId = requestorId;
        bookrequest.bookId = bookId;

        bookrequest.save(function (err) {
            res.json();
        })
    }


    this.getmyRequest = function (req, res) {
        Bookrequests.find({
            'requestorId': req.user
        }).exec(function (err, allrequest) {
            res.json(allrequest);
        })
    }

    this.deletemyRequest = function (req, res) {

        var bookId = req.query.bookId;

        Bookrequests.find({
            'bookId': bookId
        }).remove().exec(function (err, result) {
            res.json();
        })
    }

    this.getothersRequest = function (req, res) {

        Bookrequests.find({
            'ownerId': req.user
        }).exec(function (err, allrequest) {
            res.json(allrequest);
        })

    }

    this.deleteothersRequest = function (req, res) {

        var bookId = req.query.bookId;

        Bookrequests.find({
            'bookId': bookId
        }).remove().exec(function (err, result) {
            res.json();
        });

    }

    this.tradesuccess = function (req, res) {
        var bookId = req.body.bookId;
        var title = req.body.title;
        var requestorId = req.body.requestorId;

        console.log(req.body);

        var trade = new Successtrades();
        trade.ownerId = req.user;
        trade.requestorId = requestorId;
        trade.bookId = bookId;
        trade.title = title;

        trade.save(function (err) {
            if (err)
                throw err;
            res.json();
        });

    }

    this.getusersettings = function (req, res) {

        Settings.find({
            'userId': req.user
        }).exec(function (err, result) {
            res.json(result);
        })

    };

    this.saveusersettings = function (req, res) {
        console.log(req.body);
        var fullname = req.body.mysetting.fullname;
        var state = req.body.mysetting.state;
        var city = req.body.mysetting.city;

        Settings.update({
            'userId': req.user
        }, {
            'userId': req.user
            , 'fullname': fullname
            , 'state': state
            , 'city': city
        }, {
            upsert: true
        }).exec(function (err, setting) {
            console.log(setting);
            res.json(setting);
        });

        /*
        var setting = new Settings();
        setting.userId = req.user;
        setting.fullname = req.body.fullname;
        setting.state = req.body.state;
        setting.city = req.body.city;
        console.log(setting);
        setting.save(function (err) {
            res.json();
        })
        */
    };

}

module.exports = BookHandler;