'use strict';
angular.module('userSetting').factory('settingApi', ['$resource', function ($resource) {

        return $resource('/usersettings', {})
   }
]);

angular.module('userSetting').factory('usersettingdata', ['settingApi', function (settingApi) {

        var o = {
            setting: []
        };

        o.getusersetting = function () {
            var temp = settingApi.query(function () {
                angular.copy(temp, o.setting);
                return temp;
            })
        }
        return o;
   }
]);