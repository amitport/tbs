import '../room/index.css!';

import Room from './room';

export default ['$scope', '$routeParams', 'gameClientRepo',
  function ($scope, $routeParams, gameClientRepo) {
    const gameClient = gameClientRepo.get($routeParams.gameTypeId);

    $scope.room = new Room(gameClient);
  }];
