import * as gameTypes from '../../games/index';

export default ['$scope', '$location', '$window', 'io', 'ap.user',
  function ($scope, $location, $window, io, user) {
    io.connect($scope);

    this.gameTypes = gameTypes;

    this.createRoom = function (gameTypeId) {
      io.emit('room:create', {gameTypeId, username: user.username || '{Anonymous}'}).then(function (roomId) {
        $location.path(`rooms/${roomId}`);
      });
    };

    this.playVsAi = function (gameTypeId) {
      $location.path(`play-local/${gameTypeId}`);
    }
  }];
