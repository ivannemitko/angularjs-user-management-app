angular.module('userManagementApp')
    .component('userForm', {
        bindings: {
            userId: '<'
        },
        templateUrl: 'components/user-form/user-form.component.html',
        controller: ['UserService', 'ToastNotificationService', '$scope', '$location', function (UserService, ToastNotificationService, $scope, $location) {
            const $ctrl = this;

            $ctrl.$scope = $scope;

            $ctrl.userTypes = ['Admin', 'Driver'];

            $ctrl.$onInit = function () {
                $ctrl.isEdit = !!$ctrl.userId;

                if ($ctrl.isEdit) {
                    UserService.getUser($ctrl.userId).then(function (user) {
                        $ctrl.user = angular.copy(user);
                        if (!$ctrl.user) {
                            $location.path('/404');
                            return;
                        }
                        $ctrl.originalUserFullName = $ctrl.user.first_name + ' ' + $ctrl.user.last_name;
                    });
                } else {
                    $ctrl.user = {
                        username: '',
                        first_name: '',
                        last_name: '',
                        email: '',
                        password: '',
                        user_type: 'Driver'
                    };
                }

                $ctrl.unregisterUsernameWatch = $ctrl.$scope.$watch(
                    function () {
                        return $ctrl.user?.username;
                    },
                    function (newVal, oldVal) {
                        if (newVal !== oldVal && $ctrl.userForm?.username) {
                            $ctrl.userForm.username.$setValidity('unique', true);
                            delete $ctrl.userForm.username.$error.serverMessage;
                        }
                    }
                );
            };

            $ctrl.$onDestroy = function () {
                // Clean up the watcher
                if (this.unregisterUsernameWatch) this.unregisterUsernameWatch();
            };

            $ctrl.saveUser = function (form) {
                $ctrl.userForm = form;
                if (form.$invalid) {
                    form.$submitted = true;
                    return;
                }

                const userData = angular.copy($ctrl.user);

                let promise;
                if ($ctrl.isEdit) {
                    promise = UserService.updateUser($ctrl.userId, userData);
                } else {
                    promise = UserService.createUser(userData);
                }

                promise
                    .then(function () {
                        ToastNotificationService.addSuccess('User saved successfully');
                        $location.path('/users');
                    })
                    .catch(function (errors) {
                        if (errors.username) {
                            form.username.$setValidity('unique', false);
                            form.username.$error.serverMessage = errors.username;
                            ToastNotificationService.addError(errors.username + ' - Please choose another username');
                        } else {
                            ToastNotificationService.addError('An error occurred while saving the user');
                        }
                    });
            };

            $ctrl.deleteUser = function () {
                if (!$ctrl.isEdit) return;
                UserService.deleteUser($ctrl.userId)
                    .then(function () {
                        ToastNotificationService.addSuccess("User deleted successfully.");
                        $location.path('/users');
                    })
                    .catch(function (error) {
                        ToastNotificationService.addError('Error deleting user: ' + error.error);
                    });
            };

            $ctrl.cancel = function () {
                $location.path('/users');
            };
        }]
    });
