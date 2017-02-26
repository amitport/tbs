const Router = require('koa-router');
const {googleCb} = require('./google');
const {signInWithEmail, emailCb} = require('./email');

const auth = Router();

auth.get('/api/auth/google', googleCb);

auth.post('/api/auth/signInWithEmail', signInWithEmail);
auth.get('/et/:et', emailCb);

module.exports = auth.routes();
