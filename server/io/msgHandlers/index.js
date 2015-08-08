import Promise from 'bluebird';

// wrap a function with support for always calling callback even when returning a value or throwing exception
function asPromised(fn) {
  const promiseWrappedHandler = Promise.method(fn);
  return function (msg, cb) {
    return promiseWrappedHandler.call(this, msg).catch(function (err) {
      console.error('io call error for msg=' + msg + ':\n\t' + (err.stack ? err.stack : err));
      return Promise.reject(err instanceof Error ? err.message : err);
    }).asCallback(cb);
  };
}

import requireDir from 'require-dir';

const msgHandlers = {};

const msgSets = requireDir();

// for each set
for (let msgSetId in msgSets) {
  if (msgSets.hasOwnProperty(msgSetId)) {
    const msgSet = msgSets[msgSetId];

    // map each msg in this msgSet to handler: {id: <msgSetId>:<msgId>, fn: asPromised(handler-function}}
    const handlers = [];
    for (let msgId in msgSet) {
      if (msgSet.hasOwnProperty(msgId)) {
        handlers.push({
          id: msgSetId + ':' + msgId,
          fn: asPromised(msgSet[msgId])
        });
      }
    }

    // add a function that apply all the set handlers to a socket
    msgHandlers[msgSetId] = function (socket) {
      handlers.forEach(function (handler) {
        socket.on(handler.id, handler.fn);
      });
    };
  }
}

export default msgHandlers;
