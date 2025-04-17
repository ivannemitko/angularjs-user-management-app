angular.module('userManagementApp')
    .component('userList', {
        bindings: {
            selectedUserId: '<'
        },
        templateUrl: 'components/user-list/user-list.component.html',
        controller: ['UserService', '$location', function (UserService, $location) {
            const $ctrl = this;

            $ctrl.users = [];

            $ctrl.$onInit = function () {
                UserService.getUsers().then(function (users) {
                    $ctrl.users = users;
                });
            };

            $ctrl.editUser = function (userId) {
                $location.path('/users/' + userId);
            };
        }]
    });
