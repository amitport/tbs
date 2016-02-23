import Koa from 'koa';

import clientRelative from './client-relative';
import convert from 'koa-convert';
import serve from 'koa-static';
import mount from 'koa-mount';

const app = new Koa();

app.use(convert(serve(clientRelative('jspm-src'))));
if (process.env.NODE_ENV === 'production') {
  app.use(convert(serve(clientRelative('jspm-sfx'))));
}

export default mount(app);
