import * as gameTypes from '../../games/index';

export default ['$scope', '$location', '$window', 'io', 'ap.user',
  function ($scope, $location, $window, io, user) {
    this.updateLobby = (rooms) => {
      this.rooms = rooms;
    };

    io.connect($scope)
      .on('room:lobbyUpdate', this.updateLobby.bind(this));

    this.gameTypes = gameTypes;

    this.createRoom = function (gameTypeName) {
      io.emit('room:create', {gameTypeName, username: user.username || '{Anonymous}'}).then(function (roomId) {
        $location.path(`rooms/${roomId}`);
      });
    };

    io.emit('room:subscribeToLobby').then(this.updateLobby.bind(this));

    this.playVsAi = function (gameTypeName) {
      $location.path(`play-local/${gameTypeName}`);
    }
  }];
