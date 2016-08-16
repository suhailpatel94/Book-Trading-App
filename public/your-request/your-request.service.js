'use strict';
angular.module('yourRequest').factory('requestApi', ['$resource', function ($resource) {

        return $resource('/userbooks/request/:requestId', {})
   }
]);


angular.module('yourRequest').factory('userRequestdata', ['requestApi', '$resource', function (requestApi, $resource) {

        var o = {
            myrequest: []
        };

        o.getmyrequest = function () {
            var temp = requestApi.query(function () {
                angular.copy(temp, o.myrequest);
                return temp;
            })
        }

        return o;
}

]);