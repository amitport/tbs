import 'babel-polyfill';

import Koa from 'koa';
import {createServer} from 'http';
import renderView from './renderView';
import clientRelative from './clientRelative';

import Router from 'koa-router';
import convert from 'koa-convert';
import serve from 'koa-static';

const indexRouter = Router();
indexRouter.get(['/', '/index.html'], renderView('index.html.ejs', {env: process.env.NODE_ENV}));

export default function () {
  const app = new Koa();

  app.use(indexRouter.routes());

  app.use(convert(serve(clientRelative('jspm-src'))));
  if (process.env.NODE_ENV === 'production') {
    app.use(convert(serve(clientRelative('jspm-sfx'))));
  }

  return createServer(app.callback());
}

//todo
//  .configureSecurity({})
//  .handleRobots({disallow: config.get('robotsDisallow')})
//  .log({stream: config.get('httpLogStream')})
//  // TODO serve-favicon middleware
//  .compress()
//  .serveFonts()
//  .renderIndex({clientRoutes: [], serverPagesDir: clientRelative('server-views')})
//  .parseBody()
//  // TODO API routes
//  .serveStatic({dirs:
//    [clientRelative('jspm-sfx'), clientRelative('jspm-src')]})
//  .handleErrors()
