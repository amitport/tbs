import module from './base';

module.factory('ui.toast', ['$mdToast', '$window', function ($mdToast, $window) {
  return {
    show(content) {
      return $mdToast.show({
        autoWrap: false,
        template: `
                                <md-toast>
                                    <div class="md-toast-content">
                                        <span flex role="alert" aria-relevant="all" aria-atomic="true">
                                            ${content}
                                        </span>
                                    </div>
                                </md-toast>
                            `,
        position: ($window.document.dir == 'ltr') ? 'bottom left' : 'bottom right',
        hideDelay: 5000
      });
    }
  }
}]);

module.run(['$rootScope', 'ui.toast', function ($rootScope, toast) {
  $rootScope.$on('auth.sign-in', (event, username) => {
    toast.show(`{{'SIGNED_IN_AS' | translate}} <strong style="color: #F4F459;">${username}</strong>`);
  });

  $rootScope.$on('auth.sign-out', () => {
    toast.show(`{{'SIGN_OUT_SUCCESS' | translate}}`);
  });
}]);
