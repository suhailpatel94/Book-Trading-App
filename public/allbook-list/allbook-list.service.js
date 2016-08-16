'use strict';
angular.module('allbookList').factory('Allbook', ['$http', function ($http) {

        var o = {
            allbooks: []
        };

        o.getall = function () {
            return $http.get('/books').then(function (res) {
                angular.copy(res.data, o.allbooks);
            })
        }
        return o;
   }
]);