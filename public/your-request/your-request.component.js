angular.module('yourRequest').
component('yourRequest', {
    templateUrl: 'your-request/your-request.template.html'
    , controller: ['userRequestdata', 'requestApi', '$http', function YourRequestController(userRequestdata, requestApi, $http) {

        this.myrequest = userRequestdata.myrequest;


        this.remove = function (bookId) {
          

            this.deletefromRequest(bookId);

            requestApi.delete({
                bookId: bookId
            }).$promise.then(function (a) {
          


            }, function (error) {
                console.log("error");
            });




        }

        this.deletefromRequest = function (bookId) {
          
            for (var i = 0; i < this.myrequest.length; i++) {
                if (this.myrequest[i].bookId == bookId) {
                    this.myrequest.splice(i, 1);
                }
            }
        }


     }]
});