import cons from 'co-views';

import clientRelative from './client-relative';

const render = cons(clientRelative('server-views'));

export default (viewName, viewParams) => {
  return async (ctx) => {
    ctx.body = await render(viewName, viewParams);
    ctx.type = 'text/html';
  };
}
