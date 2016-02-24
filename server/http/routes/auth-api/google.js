import request from 'request';
import Bluebird from 'bluebird';
import config from 'config';
import b64url from 'base64-url';

import renderView from '../../render-view';
import User from '../../../models/user';
import {encodeUser, encodeAuth} from '../../../tokens';

const post = Bluebird.promisify(request.post);

const log = config.get('log');

export async function googleCb(ctx) {
  log.debug("ctx.origin + ctx.path = " + ctx.origin + ctx.path)
  // Exchange authorization code for access token.
  const googleTokensResponse = (await post({
    url: 'https://www.googleapis.com/oauth2/v4/token',
    form: {
      code: ctx.query.code,
      client_id: config.get('auth.google.id'),
      client_secret: config.get('auth.google.secret'),
      redirect_uri: ctx.origin + ctx.path,
      grant_type: 'authorization_code'
    },
    json: true
  }));

  if (googleTokensResponse.statusCode != 200) {
    log.error('unexpected return statusCode from google ' + googleTokensResponse.statusCode)
    log.error(googleTokensResponse.body);
    ctx.throw(500);
  }

  const googleTokens = googleTokensResponse.body;
  // decode the id (no need to verify since we just got this directly from google via https)
  const decodedIdToken = JSON.parse(b64url.decode(googleTokens.id_token.split('.', 2)[1]));

  const user = await User.findOne({google: decodedIdToken.sub}).select('role').lean().exec();

  const tokens = (user != null) ? {
    access: encodeUser(user)
  } : {
    auth: encodeAuth({method: 'google', google: decodedIdToken.sub})
  };

  await renderView('provider-cb.html.ejs', {__flash: JSON.stringify({tokens})})(ctx);
};
