'use strict';
var path = process.cwd();

var BookHandler = require(path + '/app/controllers/bookHandler.server.js');

var LoginHandler = require(path + '/app/controllers/LoginHandler.server.js');

module.exports = function (app) {

    var loginHandler = new LoginHandler();
    var bookHandler = new BookHandler();

    //all books

    app.route('/secret').get(bookHandler.addBookDb);

    app.route('/books').get(bookHandler.getBooks);

    // User books
    app.route('/userbook/').get(loginHandler.ensureAuthenticated, bookHandler.getalluserbooks);

    app.route('/userbook/mybooks').post(loginHandler.ensureAuthenticated, bookHandler.addBook);

    app.route('/userbook/mybooks').get(loginHandler.ensureAuthenticated, bookHandler.getmyBooks);

    app.route('/userbook/mybooks').delete(loginHandler.ensureAuthenticated, bookHandler.deletemyBook);

    app.route('/userbooks/request').get(loginHandler.ensureAuthenticated, bookHandler.getmyRequest);

   //users request
    app.route('/userbooks/request').post(loginHandler.ensureAuthenticated, bookHandler.addmyRequest);
    app.route('/userbooks/request').delete(loginHandler.ensureAuthenticated, bookHandler.deletemyRequest);

   //Requests for you
    app.route('/userbooks/othersrequest').get(loginHandler.ensureAuthenticated, bookHandler.getothersRequest);

    app.route('/userbooks/othersrequest').delete(loginHandler.ensureAuthenticated, bookHandler.deleteothersRequest);

   //Accept trade request 
    app.route('/userbooks/tradesuccess').post(loginHandler.ensureAuthenticated, bookHandler.tradesuccess);


    //User Settings

    app.route('/usersettings').get(loginHandler.ensureAuthenticated, bookHandler.getusersettings);

    app.route('/usersettings').post(loginHandler.ensureAuthenticated, bookHandler.saveusersettings);


    //github login route
    
    app.route('/auth/github').post(loginHandler.gitLogin);

    app.route('/api/me').get(loginHandler.ensureAuthenticated, loginHandler.getUserProfile);




};