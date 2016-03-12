import jwt from 'jwt-simple';
import moment from 'moment';

import config from 'config';

const secret = config.get('auth.tokens.secret');

export function encodeUser(user) {
  return jwt.encode({
      sub: user._id,
      role: user.role
    },
    secret);
}

export function decodeUser(token) {
  var payload = jwt.decode(token, secret);

  return {
    _id: payload.sub,
    role: payload.role
  };
}
export function encodeAuth(auth) {
  return jwt.encode({
      auth,
      exp: moment().add(1, 'hours').unix()
    },
    secret);
}

export function decodeAuth(token) {
  const payload = jwt.decode(token, secret);
  // not needed since jwt-simple 0.5.0
  //if (payload.exp < moment().unix()) {
  //  throw Error('Token expired');
  //}
  return payload.auth;
}
