angular.module('userManagementApp')
    .factory('ToastNotificationService', ['$timeout', function ($timeout) {
        const TIMEOUT_DURATION = 5000;

        const messages = {
            errors: [],
            successes: []
        };

        return {
            addError: function (message) {
                messages.errors.push(message);
                $timeout(() => {
                    messages.errors.shift();
                }, TIMEOUT_DURATION);
            },
            addSuccess: function (message) {
                messages.successes.push(message);
                $timeout(() => {
                    messages.successes.shift();
                }, TIMEOUT_DURATION);
            },
            getErrors: function () {
                return messages.errors;
            },
            getSuccesses: function () {
                return messages.successes;
            }
        };
    }]);
