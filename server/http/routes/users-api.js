import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
const bodyParser = BodyParser();

import ensure from '../ensure';
import User from '../../models/user'
import {encodeUser} from '../../tokens';

const users = Router();

users.get('/api/users/me', ensure.user, async (ctx) => {
  const user = await User.findById(ctx.state.user._id, '-_id username role avatarImageUrl', {lean: true}).exec();
  if (user == null) {
    ctx.throw(404);
  }
  ctx.body = user;
});

users.get('/api/users', ensure.admin, async (ctx) => {
  ctx.body = await User.find({}, 'username role avatarImageUrl', {lean: true}).exec();
});

users.post('/api/users', ensure.auth, bodyParser, async (ctx) => {
  const user = new User();
  user.username = ctx.request.body.username;
  const auth = ctx.state.auth;
  user[auth.method] = ctx.state.auth[auth.method];

  try {
    ctx.body = {access: encodeUser(await user.trySave())};
  } catch(err) {
    if (err.name === 'ValidationError'
      &&
      err.errors.hasOwnProperty('username')
      &&
      err.errors.username.kind === 'Duplicate value') {
      ctx.throw(409);
    }
    throw err;
  }
});

export default users.routes();
