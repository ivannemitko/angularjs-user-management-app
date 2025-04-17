angular.module('userManagementApp')
    .controller('ErrorPageController', ['$scope', '$location',
        function ($scope, $location) {
            $scope.goHome = function () {
                $location.path('/users');
            };
        }]);
