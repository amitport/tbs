import Router from 'koa-router';
import {googleCb} from './google';
import {signInWithEmail, emailCb} from './email';
import BodyParser from 'koa-bodyparser';
const bodyParser = BodyParser();

const auth = Router();

auth.get('/api/auth/google', googleCb);

auth.post('/api/auth/signInWithEmail', bodyParser, signInWithEmail);
auth.get('/et/:et', emailCb);

export default auth.routes();
