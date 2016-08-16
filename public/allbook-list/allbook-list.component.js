angular.module('allbookList').
component('allbookList', {
    templateUrl: 'allbook-list/allbook-list.template.html'
    , controller: ['Allbook', 'userBookApi', function AllbookListController(Allbook, userBookApi) {

        this.allbooks = Allbook.allbooks;

        this.addBook = function (bookId) {

            userBookApi.save({
                bookId: bookId
            });


        }


        }]
});