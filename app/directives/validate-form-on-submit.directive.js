angular.module('userManagementApp')
    .directive('validateFormOnSubmit', function () {
        return {
            restrict: 'A',
            require: 'form',
            link: function (scope, element, attrs, formCtrl) {
                function updateInvalidTouchedClasses() {
                    // Find all named child controls (inputs, selects, textareas)
                    let fields = element[0].querySelectorAll('input[name], select[name], textarea[name]');
                    angular.forEach(fields, function (fieldEl) {
                        let fieldName = fieldEl.getAttribute('name');
                        if (fieldName && formCtrl[fieldName]) {
                            let fieldCtrl = formCtrl[fieldName];
                            let angularElement = angular.element(fieldEl);
                            if (fieldCtrl.$invalid && fieldCtrl.$touched) {
                                angularElement.addClass('is-invalid-touched');
                            } else {
                                angularElement.removeClass('is-invalid-touched');
                            }
                        }
                    });
                }

                // Watch for form submission
                scope.$watch(function () {
                    return formCtrl.$submitted;
                }, function (submitted) {
                    if (submitted) {
                        // Mark all fields as touched to show validation messages
                        angular.forEach(formCtrl.$error, function (errors, field) {
                            angular.forEach(errors, function (error) {
                                error.$touched = true;
                            });
                        });
                        // Update error highlight classes after submission
                        updateInvalidTouchedClasses();
                    }
                });

                // Watch for individual field changes and update classes
                scope.$watch(
                    function () {
                        // Map of names to $invalid/$touched values (to detect any change)
                        let map = {};
                        angular.forEach(formCtrl, function (ctrl, key) {
                            if (ctrl && ctrl.$invalid !== undefined && ctrl.$touched !== undefined) {
                                map[key] = ctrl.$invalid + '_' + ctrl.$touched;
                            }
                        });
                        return map;
                    },
                    function () {
                        updateInvalidTouchedClasses();
                    },
                    true // deep watch
                );
            }
        };
    });
