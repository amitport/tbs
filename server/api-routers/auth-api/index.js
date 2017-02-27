const Router = require('koa-router');
const {googleCb} = require('./google');
const {signInWithEmail, emailCb} = require('./email');

const auth = Router({prefix: '/auth'});

auth.get('/google', googleCb);

auth.post('/signInWithEmail', signInWithEmail);
auth.get('/et/:et', emailCb);

module.exports = auth;
