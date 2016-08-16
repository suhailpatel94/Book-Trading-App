angular.module('otherRequest').
component('otherRequest', {
    templateUrl: 'other-request/other-request.template.html'
    , controller: ['othersRequestdata', 'othersrequestApi', '$http', function OtherRequestController(othersRequestdata, othersrequestApi, $http) {

        this.othersrequest = othersRequestdata.othersrequest;

        this.tradesuccess = function (bookId, title, requestorId) {
            $http.post('/userbooks/tradesuccess', {
                bookId: bookId
                , title: title
                , requestorId: requestorId
            })
            this.remove(bookId);

        }

        this.remove = function (bookId) {

            this.deletefromRequest(bookId);

            othersrequestApi.delete({
                bookId: bookId
            }).$promise.then(function (a) {
                console.log("done");


            }, function (error) {
                console.log("error");
            });




        }

        this.deletefromRequest = function (bookId) {
          
            for (var i = 0; i < this.othersrequest.length; i++) {
                if (this.othersrequest[i].bookId == bookId) {
                    this.othersrequest.splice(i, 1);
                }
            }
        }



}]
});