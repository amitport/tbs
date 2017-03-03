const validator = require('validator');
const crypto = require('crypto');
const base58 = require('bs58');
const NodeCache = require('node-cache');

const User = require('../../models/user');
const {encodeUser, encodeAuth} = require('../../utils/tokens');

// use in-memory cache for random tokens (TODO move to DB when moving to cluster)
// keep email tokens for an hour check every 10 minutes for deleting expired tokens
const emailTokenStore = new NodeCache({stdTTL: 3600, checkperiod: 600});

module.exports.signInWithEmail = async function signInWithEmail(ctx) {
  const {email, originalPath} = ctx.request.body;
  if (originalPath == null || !validator.isIn(originalPath, ['/', '/users/me']) // hard-code white-list redirect paths
    || email == null || !validator.isEmail(email)) {
    ctx.throw(400);
  }

  const emailToken = base58.encode(crypto.randomBytes(16));
  if (!emailTokenStore.set(emailToken, {email: validator.normalizeEmail(email), originalPath})) {
    ctx.throw(500);
  }

  const cbUrl = `${ctx.origin}/et/${emailToken}`;

  await ctx.mailer.sendSignInToken(email, cbUrl)
  // next if anyone calls /et/<emailToken> before exp it will be redirected to originalPath

  ctx.status = 202; //(Accepted)
};

module.exports.emailCb = async function emailCb(ctx) {
  const emailToken = ctx.params.et;

  const stored = emailTokenStore.get(emailToken);
  if (stored == null) {
    ctx.throw(401);
  }
  emailTokenStore.del(emailToken);

  const user = await User.findOne({email: stored.email}).select('role').lean().exec();

  const tokens = (user != null) ? {
    access: encodeUser(user)
  } : {
    auth: encodeAuth({method: 'email', email: stored.email})
  };

  ctx.state.__flash = JSON.stringify({tokens, originalPath: stored.originalPath})
  ctx.render('index')
};
