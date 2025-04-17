angular.module('userManagementApp').component('toastList', {
    templateUrl: 'components/toast-list/toast-list.component.html',
    controller: ['ToastNotificationService', function (ToastNotificationService) {
        const $ctrl = this;

        $ctrl.getErrors = function () {
            return ToastNotificationService.getErrors();
        };

        $ctrl.getSuccess = function () {
            return ToastNotificationService.getSuccesses();
        };

        $ctrl.hasErrors = function () {
            return ToastNotificationService.getErrors().length > 0;
        };

        $ctrl.hasSuccess = function () {
            return ToastNotificationService.getSuccesses().length > 0;
        };
    }]
});
