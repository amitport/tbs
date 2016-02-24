import module from './base';
import template from './sign-in-dialog.html!text';

import './sign-in.js';

module.factory('ap.signInDialog', ['$mdDialog', function ($mdDialog) {
    return {
        open(targetEvent) {
            return $mdDialog.show(
                {
                    targetEvent: targetEvent,
                    clickOutsideToClose: true,
                    template,
                    controllerAs: '$ctrl',
                    controller: ['$mdDialog', '$scope', 'ap.user',
                                function ($mdDialog, $scope, user) {
                        this.cancel = () => {
                            $mdDialog.cancel();
                        };

                        $scope.$on('auth.sign-in', () => {
                            $mdDialog.hide(user);
                        });
                    }]
                });
        }
    }
}]);
