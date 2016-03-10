import * as gameTypes from '../../games/index';

export default ['$scope', '$location', '$window', 'io', 'ap.user',
  function ($scope, $location, $window, io, user) {
    io.connect($scope);

    this.gameTypes = gameTypes;

    this.createRoom = function (gameTypeName) {
      io.emit('room:create', {gameTypeName, username: user.username || '{Anonymous}'}).then(function (roomId) {
        $location.path(`rooms/${roomId}`);
      });
    };

    this.playVsAi = function (gameTypeName) {
      $location.path(`play-local/${gameTypeName}`);
    }
  }];
