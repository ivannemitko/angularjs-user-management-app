angular.module('userManagementApp')
    .filter('userTypeDisplay', function () {
        const map = {
            'Admin': 'Administrator',
            'Driver': 'Driver'
        };
        return function (input) {
            return map[input] || input;
        };
    });
