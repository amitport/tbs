import config from 'config';
import http from './http';
import io from './io';

const log = config.get('log');

io(http()).listen(config.get('port'), function () {
  log.info(`server listening on ${this.address().port}`);
});
