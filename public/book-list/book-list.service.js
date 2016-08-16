'use strict';
angular.module('bookList').factory('abook', ['$resource', function ($resource) {

        return $resource('/books', {})
   }
]);