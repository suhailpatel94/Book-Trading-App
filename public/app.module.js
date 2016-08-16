'use strict';

// Define the `phonecatApp` module
angular.module('bookTradeApp', [
    'ngRoute'








    
    , 'satellizer'








    
    , 'ngResource'








    
    , 'ngStorage'








    
    , 'userSetting'








    
    , 'userBook'








    
    , 'bookList'








    
    , 'yourRequest'








    
    , 'otherRequest'








    
    , 'allbookList'
]);

angular.
module('bookTradeApp').
config(['$locationProvider', '$routeProvider', '$authProvider'








    
    , function config($locationProvider, $routeProvider, $authProvider) {
        //locationProvider.hashPrefix('!');

        var skipIfLoggedIn = function ($q, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        };

        var loginRequired = function ($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/');
            }
            return deferred.promise;
        };

        $routeProvider.
        when('/', {
            template: '<book-list></book-list>'
            , resolve: {
                loginRequired: loginRequired
                , allbooks: ['userBookData', function (userBookData) {
                    return userBookData.getalluserbooks();
                        }]
            }
        }).
        when('/setting', {
            template: '<user-setting></user-setting>'
            , resolve: {
                loginRequired: loginRequired
                , setting: ['usersettingdata', function (usersettingdata) {
                    usersettingdata.getusersetting();
                }]
            }
        }).
        when('/mybooks', {
            template: '<user-book></user-book>'
            , resolve: {
                loginRequired: loginRequired
                , books: ['userBookData', function (userBookData) {
                    return userBookData.getmybooks();
               }]
            }


        }).when('/new-book', {
            template: '<allbook-list></allbook-list>'
            , resolve: {
                loginRequired: loginRequired
                , allbook: ['Allbook', function (Allbook) {
                    return Allbook.getall();
                }]
            }
        }).when('/your-requests', {
            template: '<your-request></your-request>'
            , resolve: {
                loginRequired: loginRequired
                , myrequest: ['userRequestdata', function (userRequestdata) {
                    return userRequestdata.getmyrequest();
                }]
            }
        }).when('/Requests-for-you', {
            template: '<other-request></other-request>'
            , resolve: {
                loginRequired: loginRequired
                , othersrequest: ['othersRequestdata', function (othersRequestdata) {
                    return othersRequestdata.getothersrequest();
                }]
            }
        }).otherwise('/')

        $locationProvider.html5Mode(true);


        $authProvider.github({
            clientId: 'a3f60f1cd9bcec24b539'
        });



        }
    ]);

angular.
module('bookTradeApp').controller('MainCtrl', ['$scope', '$auth', 'Account', '$localStorage', '$sessionStorage', '$location', function ($scope, $auth, Account, $localStorage, $sessionStorage, $location) {

    $scope.$storage = $localStorage;
    $scope.authenticate = function (provider) {
        $auth.authenticate(provider).then(function (response) {

                Account.getProfile().then(function (uname) {
                    $localStorage.UserName = uname.data;
                    
                    $location.path('/z');
                }, function (err) {

                })
            }
            , function (response) {

            });
    }

    $scope.isAuthenticated = function () {
        return $auth.isAuthenticated();
    }

    $scope.logout = function () {
        $auth.logout();
        $location.path('/');
        delete $localStorage.UserName;
    }

}]);