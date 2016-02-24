import module from './base';
import template from './sign-in.html!text';

module.component('signIn',
    {
        template,
        controller: ['$scope', 'ap.user', function ($scope, user) {
            this.state = 'selection';

            this.signInWithAuthProvider = user.signInWithAuthProvider.bind(user);

            this.signInWithEmail = function () {
                if (this.emailSignInForm.$invalid) {
                    this.emailSignInForm.email.$setTouched();
                    return;
                }

                user.signInWithEmail(this.email)
                    .then(() => {
                        this.state = 'emailSent';
                    })
                    .catch(() => {
                        this.emailSignInForm.email.$setValidity('server', false);

                        const formFieldWatcher = $scope.$watch(() => this.emailSignInForm.email.$viewValue, (newValue, oldValue) => {
                            if (newValue === oldValue) {
                                return;
                            }

                            // clean up the server error
                            this.emailSignInForm.email.$setValidity('server', true);

                            // clean up form field watcher
                            formFieldWatcher();
                        });
                    });
            }
        }]
    });
