angular.module('userManagementApp')
    .controller('UsersLayoutController', ['$scope', '$route', '$routeParams', '$location', function ($scope, $route, $routeParams, $location) {
        $scope.formVisible = $route.current.formVisible;

        $scope.selectedUserId = $routeParams.id ? parseInt($routeParams.id, 10) : null;

        $scope.createUser = function () {
            $location.path('/users/new');
        };
    }]);
