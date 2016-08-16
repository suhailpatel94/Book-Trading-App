'use strict';
angular.module('userBook').factory('userBookApi', ['$resource', function ($resource) {

        return $resource('/userbook/mybooks/:bookid', {})
   }
]);


angular.module('userBook').factory('userBookData', ['userBookApi', '$http', function (userBookApi, $http) {


        var userbooks = {
            alluserbooks: []
            , mybooks: []
        };

        userbooks.getalluserbooks = function () {
            
            $http.get('/userbook').then(function (books) {
                angular.copy(books.data, userbooks.alluserbooks);
                return books;
            })

        }


        userbooks.getmybooks = function () {
            var bks = userBookApi.query(function () {

                angular.copy(bks, userbooks.mybooks);
                return bks;
            })
        }

        return userbooks;

   }
]);