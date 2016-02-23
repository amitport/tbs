import 'babel-polyfill';

import Koa from 'koa';
import {createServer} from 'http';

import spaRoutes from './routes/spa';
import usersApiRoutes from './routes/users-api';
import authApiRoutes from './routes/auth-api';

import serveStatic from './serve-static';

const app = new Koa();

app.use(spaRoutes);
app.use(usersApiRoutes);
app.use(authApiRoutes);
app.use(serveStatic);

export default createServer(app.callback());
