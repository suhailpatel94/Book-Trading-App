'use strict';
angular.module('otherRequest').factory('othersrequestApi', ['$resource', function ($resource) {

        return $resource('/userbooks/othersrequest', {})
   }
]);


angular.module('otherRequest').factory('othersRequestdata', ['othersrequestApi', '$resource', function (othersrequestApi, $resource) {

        var o = {
            othersrequest: []
        };

        o.getothersrequest = function () {
            var temp = othersrequestApi.query(function () {
                angular.copy(temp, o.othersrequest);
                return temp;
            })
        }

        return o;
}

]);