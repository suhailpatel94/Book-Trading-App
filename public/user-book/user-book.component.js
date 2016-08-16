angular.module('userBook').
component('userBook', {
    templateUrl: 'user-book/user-book.template.html'
    , controller: ['userBookData', 'userBookApi', function UserBookController(userBookData, userBookApi) {


        this.mybooks = userBookData.mybooks;
        console.log(this.mybooks);
        this.remove = function (bookId) {
            userBookApi.delete({
                bookId: bookId
            });
            this.deletefrommybooks(bookId);
        }


        this.deletefrommybooks = function (bookId) {

            for (var i = 0; i < this.mybooks.length; i++) {
                if (this.mybooks[i]._id == bookId) {
                    this.mybooks.splice(i, 1);
                }
            }
        }

}]
});