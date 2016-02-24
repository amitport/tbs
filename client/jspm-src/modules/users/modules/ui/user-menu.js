import module from './base';
import template from './user-menu.html!text';


module.component('userMenu',
    {
    template,
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
