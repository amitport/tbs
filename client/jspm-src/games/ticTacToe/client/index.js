import './index.css!';

import config from './config';
import Master from '../master/index';
import AbstractGameClient from '../../abstract/client/index';

import Board from '../master/board';
import Cell from '../master/cell';

class TicTacToeGameClient extends AbstractGameClient {
  constructor(app) {
    super(Master, `${config.path}board.html`, ['markCell']);
    app.directive('cell', function() {
      return {
        scope: true,
        templateUrl: `${config.path}cell.html`,
        link: function(scope, iElement, iAttrs) {

          const x = scope.x = iAttrs.x;
          const y = scope.y = iAttrs.y;
          if (x === '1' || y === '1') {
            scope.borderStyle = {
              'border-style': 'solid'
            };
            if (x !== '1') {
              scope.borderStyle['border-width'] = '0 1px';
            } else if (y !== '1') {
              scope.borderStyle['border-width'] = '1px 0';
            } else {
              scope.borderStyle['border-width'] = '1px';
            }
          }

          scope.$watch(`room.session.board[${iAttrs.x}][${iAttrs.y}]`, function(newValue) {
            scope.markColor = config.markColors[newValue];
            scope.markIcon = config.markIcons[newValue];
          });
        }
      };
    });
  }

  updateGameResult(result, session) {
    if (result === 'tie') {
      session.result = 'tie';
    } else {
      if (result === 'c0') {
        session.result = {c1: 0, r1: 0, c2: 0, r2: 2};
      }
      if (result === 'c1') {
        session.result = {c1: 1, r1: 0, c2: 1, r2: 2};
      }
      if (result === 'c2') {
        session.result = {c1: 2, r1: 0, c2: 2, r2: 2};
      }
      if (result === 'r0') {
        session.result = {c1: 0, r1: 0, c2: 2, r2: 0};
      }
      if (result === 'r1') {
        session.result = {c1: 0, r1: 1, c2: 2, r2: 1};
      }
      if (result === 'r2') {
        session.result = {c1: 0, r1: 2, c2: 2, r2: 2};
      }
      if (result === 'd0') {
        session.result = {c1: 0, r1: 0, c2: 2, r2: 2};
      }
      if (result === 'd1') {
        session.result = {c1: 0, r1: 2, c2: 2, r2: 0};
      }
    }
  }

  createSession(initialState, dispatch) {
    const session = super.createSession(initialState, dispatch);
    session.Cell = Cell;
    return session;
  }

  updateSessionState(session, state) {
    super.updateSessionState(session, state);

    if (state.board) {
      session.board = Board.deserialize(state.board);
    }
  }
}

export default TicTacToeGameClient;
