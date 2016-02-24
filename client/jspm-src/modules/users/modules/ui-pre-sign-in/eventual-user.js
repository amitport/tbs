import module from './base';

module.factory('ap.eventualUser', ['ap.user', 'ap.signInDialog', 'ap.registerDialog',
    function (user, signInDialog, registerDialog) {

        let registrationDialogPromise = false;
        return {
            set(tokens) {
                if (tokens.hasOwnProperty('auth')) {
                    return registrationDialogPromise = registerDialog.open(tokens.auth).finally(() => {registrationDialogPromise = false});
                }
                return user.signIn(tokens);
            },
            get() {
                return registrationDialogPromise || user.signInPromise.catch(() => {
                    return signInDialog.open().then(() => {
                        if (!user.isSignedIn && registrationDialogPromise) {
                            return registrationDialogPromise;
                        } else {
                            return user;
                        }
                    });
                });
            }
        };
    }]);