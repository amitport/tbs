import config from 'config';
import morgan from 'morgan';

export default function (app) {
  app.use(morgan('combined', {
    stream: config.get('httpLogStream')
  }));
}
