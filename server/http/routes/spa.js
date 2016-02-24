import Router from 'koa-router';
import renderView from '../render-view';

const spa = Router();

spa.get(['/', '/index.html', '/rooms/:roomId', '/users/me'], renderView('index.html.ejs', {env: process.env.NODE_ENV}));

export default spa.routes();
