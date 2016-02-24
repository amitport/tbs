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
  }];
