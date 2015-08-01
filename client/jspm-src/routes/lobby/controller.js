export default ['$scope', '$location', 'io',
  function ($scope, $location, io) {
    io.connect($scope);

    this.createRoom = function (gameId) {
      io.emit('room:create', gameId).then(function (roomId) {
        $location.path(`rooms/${roomId}`);
      });
    };
  }];
