import config from 'config';
import ejs from 'ejs';

export default function (app) {
  app.engine('html.ejs', ejs.renderFile);
  app.set('view engine', 'html.ejs');
  app.set('views', config.get('paths.client') + '/server-views');
  app.get(/^\/(index\.html)?$/, function (req, res) {
    res.render('index', {env: process.env.NODE_ENV});
  });

}
