angular.module('userManagementApp')
    .directive('matchTo', function () {
        return {
            require: 'ngModel',
            scope: {
                matchTo: '='
            },
            link: function (scope, element, attrs, ctrl) {
                ctrl.$validators.matchTo = function (modelValue) {
                    if (!modelValue && !scope.matchTo) {
                        return true;
                    }

                    return modelValue == scope.matchTo;
                };
                scope.$watch('matchTo', function () {
                    ctrl.$validate();
                });
            }
        };
    });
