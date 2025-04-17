angular.module('userManagementApp', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/users'
            })
            .when('/users', {
                templateUrl: 'views/users-layout.html',
                controller: 'UsersLayoutController',
                formVisible: false
            })
            .when('/users/new', {
                templateUrl: 'views/users-layout.html',
                controller: 'UsersLayoutController',
                formVisible: true
            })
            .when('/users/:id', {
                templateUrl: 'views/users-layout.html',
                controller: 'UsersLayoutController',
                formVisible: true
            })
            .when('/403', {
                templateUrl: 'views/403.html',
                controller: 'ErrorPageController'
            })
            .when('/404', {
                templateUrl: 'views/404.html',
                controller: 'ErrorPageController'
            })
            .otherwise({
                redirectTo: '/404'
            });
    }]);
