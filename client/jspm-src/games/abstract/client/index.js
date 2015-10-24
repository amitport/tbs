import config from './config';


class AbstractGameClient {
  constructor(Master, templateUrl, actionTypes) {
    this.Master = Master;
    this.templateUrl = templateUrl;
    this.bindToActions = (dispatch) => actionTypes.reduce((boundActions, type) =>
        Object.defineProperty(boundActions, type, {value: (payload) => dispatch({type, payload}), enumerable: true})
      , {});
  }

  createLocalSession(gameEndedCb) {
    var masterSession = new this.Master((result) => {
      //this.onGameEnd(result, masterSession);

      this.updateSessionState(session, masterSession.serialize());

      gameEndedCb(result);
    }, true);

    var session = this.createSession(masterSession.serialize(), ({type, payload}) => {
      masterSession[type](payload);
      this.updateSessionState(session, masterSession.serialize());
    });
    session.recycle = () => {
      masterSession.recycle();
      this.updateSessionState(session, masterSession.serialize());
    };
    return session;
  }
  createSessionProxy(currentState, roomId, io) {
    return this.createSession(currentState, ({type, payload}) => io.emit('session:action', {roomId: roomId, actionId: type, payload}));
  }
  createSession(initialState, dispatch) {
    const session = this.bindToActions(dispatch);

    session.templateUrl = this.templateUrl;
    session.isEnded = function () {return this.result;};

    session.players = [
      {
        ready: true,
        color: config.playerColors[0],
        idx: 0
      },
      {
        ready: true,
        color: config.playerColors[1],
        idx: 1
      }
    ];

    session.players.own = session.players[0];
    session.players.opp = session.players[1];

    this.updateSessionState(session, initialState);
    return session;
  }

  updateSessionState(session, state) {
    Object.assign(session, state);
    if (state.hasOwnProperty('currentPlayerIdx')) {
      session.currentPlayer = session.players[state.currentPlayerIdx]
    }

    if (state.result) {
      this.updateGameResult(state.result, session);
    } else if (session.result) {
      delete session.result;
    }
  }

  // abstract TODO rename this te deserialize result
  updateGameResult() {}
}

export default AbstractGameClient;
