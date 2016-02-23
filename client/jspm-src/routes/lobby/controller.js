export default ['$scope', '$location', '$window', 'io',
  function ($scope, $location, $window, io) {
    io.connect($scope);

    this.createRoom = function (gameId) {
      io.emit('room:create', gameId).then(function (roomId) {
        $location.path(`rooms/${roomId}`);
      });
    };

    this.playVsAi = function (gameTypeId) {
      $location.path(`play-local/${gameTypeId}`);
    }

    this.testGoogle = function() {
      console.log('here')
      const width = 452;
      const height = 633;
      $window.open(
        `https://accounts.google.com/o/oauth2/v2/auth?\
client_id=162817514604-3flbnsg9cali5j0mrnqjmgi2h6keo7uk.apps.googleusercontent.com&\
response_type=code&\
scope=openid&\
redirect_uri=${$window.location.origin}/api/auth/google`,

        'google_oauth2_login_popup',

        `width=${width},\
height=${height},\
left=${($window.screenX + (($window.outerWidth - width) / 2))},\
top=${($window.screenY + (($window.outerHeight - height) / 2.5))}`);
    }
  }];
