import uiPreSignInModule from './base';
import templateUrl from './sign-in-dialog.html';

import './sign-in.js';

uiPreSignInModule.factory('ap.signInDialog', ['$mdDialog', function ($mdDialog) {
    return {
        open(targetEvent) {
            return $mdDialog.show(
                {
                    targetEvent: targetEvent,
                    clickOutsideToClose: true,
                    templateUrl,
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
