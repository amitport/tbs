import uiPreSignInModule from './base';
import templateUrl from './register-dialog.html';

uiPreSignInModule.factory('ap.registerDialog', ['$mdDialog', function ($mdDialog) {
    return {
        open(registrationToken) {
            return $mdDialog.show(
                {
                    templateUrl,
                    controllerAs: '$ctrl',
                    controller: ['$scope', '$mdDialog', 'ap.user',
                        function ($scope, $mdDialog, user) {
                            $scope.$on('auth.sign-in', () => {
                                $mdDialog.hide(user);
                            });

                            this.register = (username) => {
                                if (this.registrationForm.$invalid) {
                                    this.registrationForm.username.$setTouched();
                                    return;
                                }

                                user.register(registrationToken, {username})
                                    .catch((rejection) => {
                                        const validationError = (rejection.status === 409) ? 'conflict' : 'server';

                                        this.registrationForm.username.$setValidity(validationError, false);

                                        const formFieldWatcher = $scope.$watch(() => this.registrationForm.username.$viewValue, (newValue, oldValue) => {
                                            if (newValue === oldValue) {
                                                return;
                                            }

                                            // clean up the server error
                                            this.registrationForm.username.$setValidity(validationError, true);

                                            // clean up form field watcher
                                            formFieldWatcher();
                                        });
                                    });
                            };
                            this.cancel = () => {
                                $mdDialog.cancel();
                            }
                        }]
                });
        }
    }
}]);
