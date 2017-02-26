import usersUiModule from './base';
import templateUrl from './user-menu.html';


usersUiModule.component('userMenu',
    {
    templateUrl,
    controller: ['$location', 'ap.signInDialog', 'ap.user', function($location, signInDialog, user) {
        return {
            user,
            gotoUserProfile() {
              $location.path('/users/me');
            },
            signIn(targetEvent) {
                return signInDialog.open(targetEvent);
            }
        }
    }]
});
