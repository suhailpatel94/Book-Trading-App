angular.module('bookList').
component('bookList', {
    templateUrl: 'book-list/book-list.template.html'
    , controller: ['abook', 'userBookApi', 'userBookData', 'userRequestdata', 'requestApi', function BookListController(abook, userBookApi, userBookData, userRequestdata, requestApi) {

        this.allusersbooks = userBookData.alluserbooks;

        this.myrequest = userRequestdata.myrequest;

        this.addRequest = function (title, ownerId, bookId) {
            if (!this.alreadyrequested(bookId)) {
                this.myrequest.push({
                    ownerId: ownerId
                    , bookId: bookId
                });
                requestApi.save({
                    ownerId: ownerId
                    , bookId: bookId
                    , title: title
                })
            }

        }

        this.alreadyrequested = function (bookId) {
            for (var i = 0; i < this.myrequest.length; i++) {
                if (this.myrequest[i].bookId == bookId)
                    return true;
            }
            return false;
        }


        }]
});