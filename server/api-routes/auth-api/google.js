const request = require('request-promise-native');
const config = require('config');
const b64url = require('base64-url');

const User = require('../../models/user');
const {encodeUser, encodeAuth} = require('../../tokens');

const log = config.get('log');

module.exports.googleCb = async function googleCb(ctx) {
  // Exchange authorization code for access token.
  const googleTokensResponse = (await request.post({
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
    log.error('unexpected return statusCode = require(google ' + googleTokensResponse.statusCode)
    log.error(googleTokensResponse.body);
    ctx.throw(500);
  }

  const googleTokens = googleTokensResponse.body;
  // decode the id (no need to verify since we just got this directly = require(google via https)
  const decodedIdToken = JSON.parse(b64url.decode(googleTokens.id_token.split('.', 2)[1]));

  const user = await User.findOne({google: decodedIdToken.sub}).select('role').lean().exec();

  const tokens = (user != null) ? {
    access: encodeUser(user)
  } : {
    auth: encodeAuth({method: 'google', google: decodedIdToken.sub})
  };

  ctx.state.__flase = JSON.stringify({tokens})
  ctx.render('provider-cb')
};
