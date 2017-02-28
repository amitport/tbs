const jwt = require('jwt-simple');
const moment = require('moment');

const config = require('config');

const secret = config.get('auth.tokens.secret');

function encodeUser(user) {
  return jwt.encode({
      sub: user._id,
      role: user.role
    },
    secret);
}

function decodeUser(token) {
  var payload = jwt.decode(token, secret);

  return {
    _id: payload.sub,
    role: payload.role
  };
}
function encodeAuth(auth) {
  return jwt.encode({
      auth,
      exp: moment().add(1, 'hours').unix()
    },
    secret);
}

function decodeAuth(token) {
  const payload = jwt.decode(token, secret);
  // not needed since jwt-simple 0.5.0
  //if (payload.exp < moment().unix()) {
  //  throw Error('Token expired');
  //}
  return payload.auth;
}

module.exports = {
  encodeUser,
  decodeUser,
  encodeAuth,
  decodeAuth
};
