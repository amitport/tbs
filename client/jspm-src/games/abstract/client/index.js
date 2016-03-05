import config from './config';


class AbstractGameClient {
  constructor(Master, templateUrl, actionTypes) {
    this.hasAi = Master.playerTypes.hasOwnProperty('AI');

    this.Master = Master;
    this.templateUrl = templateUrl;
    this.bindToActions = (dispatch) => actionTypes.reduce((boundActions, type) =>
        Object.defineProperty(boundActions, type, {value: (payload) => dispatch({type, payload}), enumerable: true})
      , {});
  }

  createLocalSession(gameEndedCb) {
    var masterSession = new this.Master([this.Master.playerTypes.Human, this.Master.playerTypes.AI],
    (result) => {
      this.updateSessionState(session, masterSession.serialize());

      gameEndedCb(result);
    });

    var session = this.createSession(masterSession.serialize(), ({type, payload}) => {
      masterSession[type](payload);
      this.updateSessionState(session, masterSession.serialize());
    });

    session.players.own = session.players[0];
    session.players.opp = session.players[1];

    session.recycle = () => {
      masterSession.recycle();
      this.updateSessionState(session, masterSession.serialize());
    };
    return session;
  }
  createSessionProxy(currentState, ownIdx, roomId, io) {
    const session = this.createSession(currentState, ({type, payload}) => io.emit('session:action', {roomId: roomId, actionId: type, payload}));
    session.players.own = session.players[ownIdx];
    session.players.opp = session.players[(ownIdx + 1) % 2];
    return session;
  }
  createSession(initialState, dispatch) {
    const session = this.bindToActions(dispatch);

    session.templateUrl = this.templateUrl;

    session.players = [
      {
        color: config.playerColors[0],
        idx: 0
      },
      {
        color: config.playerColors[1],
        idx: 1
      }
    ];

    this.updateSessionState(session, initialState);
    return session;
  }

  updateSessionState(session, state) {
    delete session.result;

    Object.assign(session, state);
    if (state.hasOwnProperty('currentPlayerIdx')) {
      session.currentPlayer = session.players[state.currentPlayerIdx]
    }
  }
}

export default AbstractGameClient;
