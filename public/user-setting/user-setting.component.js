'use strict';

angular.module('userSetting').
component('userSetting', {
    templateUrl: 'user-setting/user-setting.template.html'
    , controller: ['usersettingdata', 'settingApi', function BookListController(usersettingdata, settingApi) {

        
        
console.log(usersettingdata.setting);
        if (usersettingdata.setting.length != 0)
            this.mysetting = usersettingdata.setting[0];
        this.savesetting = function (mysetting) {
            this.mysetting = mysetting;
            console.log(this.mysetting);
            settingApi.save({
                mysetting: this.mysetting
            });
        }

    }]
});